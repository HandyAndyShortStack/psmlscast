const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

const days = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
];

function twoDigits(n) {
  let s = n.toString();
  if (s.length < 2) {
    return '0' + s;
  }
  return s;
}

function formatDate(date) {
  return days[date.getDay()] + ', ' +
    date.getDay() + ' ' +
    months[date.getMonth()] + ' ' +
    date.getFullYear() + ' ' +
    twoDigits(date.getHours()) + ':' +
    twoDigits(date.getMinutes()) + ':' +
    twoDigits(date.getSeconds()) + ' ' +
    'EST';
}

module.exports = { formatDate, twoDigits };
