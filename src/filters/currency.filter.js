export default {
  install(app) {
    app.config.globalProperties.$currencyFilter = (value, currency = 'USD') => {
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency,
        currencyDisplay: 'narrowSymbol'
      }).format(value);      
    }
  }
}

