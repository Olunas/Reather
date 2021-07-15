export const getDay = function (day) {
  var days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
const d = new Date(day);
const n = d.getDay();
return(days[n]);
}

export const getDirection = function (angle) {
const directions = ['N', 'NW', 'W', 'SW', 'S', 'SE', 'E', 'NE']
return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8]
}

export const addDays = function (day) {
  return new Date(day)
}