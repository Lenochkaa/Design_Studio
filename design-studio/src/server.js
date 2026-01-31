const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const app = express();
const port = 5000;
const JWT_SECRET = 'super_secret_key';

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lena190404',
  database: 'design_studio_database'
});

db.connect((err) => {
  if (err) {
    console.error('error connecting to the database: ' + err.stack);
    return;
  }
  console.log('connected to the database as id ' + db.threadId);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  const query = 'INSERT INTO contact_form (name, email, message) VALUES (?, ?, ?)';
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving data');
      return;
    }
    res.status(200).send('Data saved successfully');
  });
});

// ADMIN
// app.get('/api/dev/create-admin', async (req, res) => {
//   const contractCode = 'ADMIN';
//   const plainPassword = 'Admin_01$';
//   const hashedPassword = await bcrypt.hash(plainPassword, 10);

//   const query = `
//     INSERT INTO users (contract_code, password, role, is_activated)
//     VALUES (?, ?, 'admin', true)
//   `;

//   db.query(query, [contractCode, hashedPassword], (err) => {
//     if (err) return res.status(500).send('Admin already exists or error');

//     res.json({
//       message: 'Admin created',
//       login: contractCode,
//       password: plainPassword
//     });
//   });
// });

// middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('No token');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).send('Invalid token');
  }
}

function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).send('Access denied');
  next();
}

// LOGIN
app.post('/api/auth/login', (req, res) => {
  const { contractCode, password } = req.body;

  const query = 'SELECT * FROM users WHERE contract_code = ?';
  db.query(query, [contractCode], async (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(401).send('User not found');

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).send('Wrong password');

    const token = jwt.sign(
      { id: user.id, role: user.role, contractCode: user.contract_code },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      role: user.role,
      isActivated: user.is_activated,
      contractCode: user.contract_code
    });
  });
});

// CREATE CLIENT (ADMIN)
app.post('/api/admin/create-client', authMiddleware, adminOnly, async (req, res) => {
  const { contractCode } = req.body;

  if (!contractCode || contractCode.trim() === "") {
    return res.status(400).json({ message: 'Contract code is required' });
  }

  try {
    const [existing] = await db.promise().query(
      'SELECT id FROM users WHERE contract_code = ?',
      [contractCode]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Client with this contract code already exists' });
    }

    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    await db.promise().query(
      'INSERT INTO users (contract_code, password) VALUES (?, ?)',
      [contractCode, hashedPassword]
    );

    res.json({ message: 'Client created!', tempPassword });

  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating client');
  }
});

// RESET CLIENT PASSWORD (ADMIN)
app.post('/api/admin/reset-client-password', authMiddleware, adminOnly, async (req, res) => {
  const { contractCode } = req.body;
  const tempPassword = Math.random().toString(36).slice(-8);
  const hashedPassword = await bcrypt.hash(tempPassword, 10);

  const query = `
    UPDATE users
    SET password = ?, is_activated = false
    WHERE contract_code = ? AND role = 'client'
  `;

  db.query(query, [hashedPassword, contractCode], (err, result) => {
    if (err) return res.status(500).send('Error resetting password');
    if (result.affectedRows === 0) return res.status(404).send('Client not found');

    res.json({ message: 'Password reset', tempPassword });
  });
});

// CHANGE PASSWORD (CLIENT)
app.post('/api/auth/change-password', authMiddleware, async (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword) return res.status(400).send('New password is required');

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const query = 'UPDATE users SET password = ?, is_activated = true WHERE id = ?';
    db.query(query, [hashedPassword, req.user.id], (err) => {
      if (err) return res.status(500).send('Error updating password');
      res.send('Password changed successfully');
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get all clients for dropdown
app.get('/api/admin/clients', authMiddleware, adminOnly, (req, res) => {
  const query = `SELECT contract_code FROM users WHERE role = 'client'`;
  db.query(query, (err, results) => {
    if (err) return res.status(500).send('Error fetching clients');
    res.json(results);
  });
});

// CREATE PROJECT (ADMIN)
app.post('/api/admin/create-project', authMiddleware, adminOnly, (req, res) => {
  const { contractCode, projectName, description } = req.body;

  const checkQuery = `SELECT id FROM projects WHERE contract_code = ?`;
  db.query(checkQuery, [contractCode], (err, results) => {
    if (err) return res.status(500).send('Error checking existing project');

    if (results.length > 0) {
      return res.status(400).json({ message: 'This client already has a project' });
    }

    const insertQuery = `
      INSERT INTO projects (contract_code, project_name, description, status)
      VALUES (?, ?, ?, 'contract_signed')
    `;
    db.query(insertQuery, [contractCode, projectName, description], (err, result) => {
      if (err) return res.status(500).send('Error creating project');
      res.json({ message: 'Project created successfully' });
    });
  });
});

// UPDATE PROJECT STATUS (ADMIN)
app.put('/api/admin/update-project-status', authMiddleware, adminOnly, async (req, res) => {
  const { projectId, status } = req.body;

  if (!projectId || !status) {
    return res.status(400).json({ message: 'Project ID and status are required' });
  }

  try {
    const meetingRequired = status === 'briefing';

    const [result] = await db.promise().query(
      `UPDATE projects
       SET status = ?, meeting_required = ?
       WHERE id = ?`,
      [status, meetingRequired, projectId]
    );

    if (result.affectedRows === 0) return res.status(404).send('Project not found');

    res.json({ message: 'Project status updated' });

  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating status');
  }
});

// GET contact form messages (ADMIN)
app.get("/api/admin/contact-messages", authMiddleware, adminOnly, (req, res) => {
    const query = `
      SELECT id, name, email, message, status
      FROM contact_form
      ORDER BY id DESC
    `;

    db.query(query, (err, results) => {
      if (err) return res.status(500).send("Error fetching contact messages");
      res.json(results);
    });
  }
);

// MARK contact message as processed (ADMIN)
app.put("/api/admin/contact-messages/:id/processed", authMiddleware, adminOnly,(req, res) => {
    const { id } = req.params;

    const query = `
      UPDATE contact_form
      SET status = 'processed'
      WHERE id = ?
    `;

    db.query(query, [id], (err, result) => {
      if (err) return res.status(500).send("Error updating message");
      if (result.affectedRows === 0)
        return res.status(404).send("Message not found");

      res.json({ message: "Message marked as processed" });
    });
  }
);

// get client project
app.get('/api/client/project', authMiddleware, (req, res) => {
  const contractCode = req.user.contractCode;
  const query = `
    SELECT id, contract_code, project_name, status, description, meeting_required
    FROM projects
    WHERE contract_code = ?
  `;
  db.query(query, [contractCode], (err, results) => {
    if (err) return res.status(500).send('Error fetching project');
    if (results.length === 0) return res.status(404).send('No project found');
    res.json(results[0]);
  });
});

// get all projects (ADMIN)
app.get('/api/admin/projects', authMiddleware, adminOnly, (req, res) => {
  const query = `
    SELECT id, contract_code, project_name, status
    FROM projects
    ORDER BY id ASC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching projects');
    }
    res.json(results);
  });
});
  
// GET all meetings (ADMIN)
app.get('/api/admin/meetings', authMiddleware, (req, res) => {
  const query = `
    SELECT m.id, m.date, m.type, m.topic, m.status, p.project_name, p.contract_code
    FROM meetings m
    JOIN projects p ON m.project_id = p.id
    ORDER BY m.date ASC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).send('Error fetching meetings');
    res.json(results);
  });
});

// MARK meeting as done (ADMIN)
app.put('/api/admin/meetings/:id/done', authMiddleware, (req, res) => {
  const meetingId = req.params.id;
  const query = 'UPDATE meetings SET status = "done" WHERE id = ?';
  db.query(query, [meetingId], (err, result) => {
    if (err) return res.status(500).send('Error updating meeting');
    if (result.affectedRows === 0) return res.status(404).send('Meeting not found');
    res.json({ message: 'Meeting marked as done' });
  });
});

// BOOK MEETING (CLIENT)
app.post('/api/client/meetings', authMiddleware, (req, res) => {
  const { date, type, topic } = req.body;
  const contractCode = req.user.contractCode;

  if (!date || !type || !topic) {
    return res.status(400).send('Date, type and topic are required');
  }

  const meetingDate = new Date(date);
  const now = new Date();
  const day = meetingDate.getDay();
  const hour = meetingDate.getHours();
  const minutes = meetingDate.getMinutes();

  if (meetingDate <= now) {
    return res.status(400).send('Cannot book in the past');
  }

  if (day === 0 || day === 6) {
    return res.status(400).send('Weekends are not allowed');
  }

  if (hour < 9 || hour > 17 || (hour === 17 && minutes !== 0)) {
    return res.status(400).send('Outside working hours');
  }

  if (minutes % 10 !== 0) {
    return res.status(400).send('Invalid minutes step');
  }

  const projectQuery = 'SELECT id FROM projects WHERE contract_code = ?';
  db.query(projectQuery, [contractCode], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).send('Project not found');
    }
    const projectId = results[0].id;

    const activeMeetingQuery = `SELECT id FROM meetings WHERE project_id = ? AND status != 'done' AND date > NOW()`;
    db.query(activeMeetingQuery, [projectId], (err, active) => {
      if (err) return res.status(500).send('Error checking active meetings');
      if (active.length > 0) {
        return res.status(409).send('You already have an active meeting');
      }

      const conflictQuery = `SELECT id FROM meetings WHERE date < DATE_ADD(?, INTERVAL 1 HOUR) AND DATE_ADD(date, INTERVAL 1 HOUR) > ?`;
      db.query(conflictQuery, [date, date], (err, conflicts) => {
        if (err) return res.status(500).send('Error checking availability');
        if (conflicts.length > 0) {
          return res.status(409).send('Slot already booked');
        }

        const insertQuery = `INSERT INTO meetings (project_id, date, type, topic) VALUES (?, ?, ?, ?)`;
        db.query(insertQuery, [projectId, date, type, topic], (err) => {
          if (err) return res.status(500).send('Error booking meeting');

          const updateProjectQuery = `UPDATE projects SET meeting_required = 0 WHERE id = ?`;
          db.query(updateProjectQuery, [projectId]);

          res.json({ message: 'Meeting booked!' });
        });
      });
    });
  });
});

// GET booked slots for a day
app.get('/api/meetings/slots', authMiddleware, (req, res) => {
  const { day } = req.query;
  if (!day) {
    return res.status(400).send('Day is required');
  }

  const start = `${day} 00:00:00`;
  const end = `${day} 23:59:59`;
  const query = `SELECT date FROM meetings WHERE date BETWEEN ? AND ?`;
  db.query(query, [start, end], (err, results) => {
    if (err) return res.status(500).send('Error fetching slots');
    const booked = results.map(r => new Date(r.date).getTime());
    res.json(booked);
  });
});

// GET meetings (CLIENT)
app.get('/api/client/meetings', authMiddleware, (req, res) => {
  const contractCode = req.user.contractCode;
  const query = `
    SELECT m.id, m.date, m.type, m.topic, m.status
    FROM meetings m
    JOIN projects p ON m.project_id = p.id
    WHERE p.contract_code = ?
    ORDER BY m.date ASC
  `;
  db.query(query, [contractCode], (err, results) => {
    if (err) return res.status(500).send('Error fetching meetings');
    res.json(results);
  });
});

// MARK AS DONE (CLIENT)
app.put('/api/client/meetings/:id/done', authMiddleware, (req, res) => {
  const meetingId = req.params.id;
  const query = 'UPDATE meetings SET status = "done" WHERE id = ?';
  db.query(query, [meetingId], (err, result) => {
    if (err) return res.status(500).send('Error updating meeting');
    if (result.affectedRows === 0) return res.status(404).send('Meeting not found');
    res.json({ message: 'Meeting marked as done' });
  });
});

// DELETE meeting (CLIENT)
app.delete('/api/client/meetings/:id', authMiddleware, (req, res) => {
  const meetingId = req.params.id;
  const contractCode = req.user.contractCode;

  // знайти project_id клієнта
  const projectQuery = 'SELECT id FROM projects WHERE contract_code = ?';
  db.query(projectQuery, [contractCode], (err, results) => {
    if (err || results.length === 0) return res.status(404).send('Project not found');
    const projectId = results[0].id;

    const deleteQuery = 'DELETE FROM meetings WHERE id = ? AND project_id = ?';
    db.query(deleteQuery, [meetingId, projectId], (err, result) => {
      if (err) return res.status(500).send('Error deleting meeting');
      if (result.affectedRows === 0) return res.status(404).send('Meeting not found or not yours');
      res.json({ message: 'Meeting cancelled successfully' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});