const timeToMinutes = (timeString) => timeString.split(':')
  .map((item, index) => parseInt(index === 0 ? item * 60 : item))
  .reduce((total, current) => total + current);

const checkForMeetWithinWorkday = (dayStart, dayEnd, meetingStart, meetingDuration) => {
  const start = timeToMinutes(dayStart);
  const end = timeToMinutes(dayEnd);
  const meeting = timeToMinutes(meetingStart);

  return meeting >= start && (meeting + meetingDuration) <= end;
};
