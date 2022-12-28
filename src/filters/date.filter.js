export default function dateFilter (value, format = 'date') {

  const options = {
    weekday: 'long',
    // year: 'numeric', month: 'numeric', day: 'numeric',
    // hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false
  };

  if (format.includes('date')) {
    options.year = 'numeric';
    options.month = 'short';
    options.day = '2-digit';
  }

  if (format.includes('time')) {
    options.hour = '2-digit';
    options.minute = '2-digit';
    options.second = '2-digit';
  }

  return new Intl.DateTimeFormat('en-US', options).format(Date.now(value));
}
