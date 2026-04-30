const timeToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

const checkForMeetWithinWorkday = (dayStart, dayEnd, meetingStart, meetingDuration) => {
  const start = timeToMinutes(dayStart);
  const end = timeToMinutes(dayEnd);
  const meeting = timeToMinutes(meetingStart);

  return meeting >= start && (meeting + meetingDuration) <= end;
};
