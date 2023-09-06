export default {
  install(app) {
    app.config.globalProperties.$dateFilter = (value, format = 'date') => {
      const options = {
        hour12: false
      };

      if (format.includes('full')) {
        options.weekday = 'long';
        options.month = 'short';
        options.day = 'numeric';
        options.year = 'numeric';
      }
    
      if (format.includes('date')) {
        options.year = 'numeric';
        options.month = '2-digit';
        options.day = '2-digit';
      }
    
      if (format.includes('time')) {
        options.hour = '2-digit';
        options.minute = '2-digit';
        options.second = '2-digit';
      }
    
      return new Intl.DateTimeFormat('en-US', options).format(new Date(value));
    }
  }
}
