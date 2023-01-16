export default {
  install(app) {
    app.config.globalProperties.$dateFilter = (value, format = 'date') => {
      const options = {
        weekday: 'long',
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
  }
}
