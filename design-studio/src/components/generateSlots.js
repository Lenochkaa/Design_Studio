export const generateSlots = (day, bookedDates) => {
  const slots = [];
  const startHour = 9;
  const endHour = 17;
  const step = 10 * 60 * 1000;

  const dayStart = new Date(day);
  dayStart.setHours(startHour, 0, 0, 0);

  const dayEnd = new Date(day);
  dayEnd.setHours(endHour, 0, 0, 0);

  for (
    let time = dayStart.getTime();
    time <= dayEnd.getTime();
    time += step
  ) {
    const overlaps = bookedDates.some(booked => {
      const start = booked;
      const end = booked + 60 * 60 * 1000;
      return time >= start && time < end;
    });

    if (!overlaps) {
      slots.push(time);
    }
  }

  return slots;
};
