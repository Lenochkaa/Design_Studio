# Design Studio – aplikacja webowa

## Opis projektu

**Design Studio** to aplikacja webowa wspierająca działalność studia projektowania wnętrz. System umożliwia zarządzanie klientami, projektami, statusami realizacji oraz spotkaniami. Aplikacja została zaprojektowana w architekturze klient–serwer z wykorzystaniem React oraz Node.js, a dane przechowywane są w relacyjnej bazie danych MySQL.

---

## Technologie

- Frontend: React
- Backend: Node.js (Express.js)
- Baza danych: MySQL
- Zarządzanie bazą danych: MySQL Workbench

---

## Wymagania systemowe

Aby uruchomić aplikację na nowym komputerze, należy zainstalować:

### 1. Node.js (z npm)

Pobierz i zainstaluj wersję LTS:  
https://nodejs.org

Sprawdzenie instalacji:
```bash
node -v
npm -v
```

### 2. MySQL Server

Pobierz i zainstaluj MySQL Server:
https://dev.mysql.com/downloads/mysql/

Podczas instalacji zapamiętaj:

- użytkownika (np. root)
- hasło do bazy danych

### 3. MySQL Workbench

Pobierz i zainstaluj MySQL Workbench:
https://dev.mysql.com/downloads/workbench/

---

## Uruchomienie aplikacji
#### Frontend (React)
Przejdź do folderu z aplikacją frontendową:
```bash
cd design-studio
npm install
npm start
```
Aplikacja frontendowa uruchomi się pod adresem:
http://localhost:3000

#### Backend (Node.js)
Serwer znajduje się w folderze `src`:
```bash
cd src
npm install
node server.js
```

#### Przywracanie bazy danych (backup)
Do projektu dołączony jest plik backupu:
`design-studio-database.sql`


Przywracanie bazy danych w MySQL Workbench:
- otwórz **MySQL Workbench**
- połącz się z lokalnym serwerem MySQL
- wybierz **Server** → **Data Import**
- zaznacz **Import from Self-Contained File**
- Wskaż plik `design-studio-database.sql`
- wybierz istniejący schemat lub utwórz nowy
- kliknij **Start Import**
Po zakończeniu importu baza danych będzie gotowa do użycia.

---

## Uwagi końcowe:
- MySQL Server musi być uruchomiony przed startem backendu,
- dane dostępowe do bazy danych muszą być zgodne z konfiguracją w pliku `server.js`,
- frontend i backend muszą działać jednocześnie.
