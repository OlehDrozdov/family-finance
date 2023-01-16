import M from 'materialize-css'

export default {
  install(app) {
    app.config.globalProperties.$notification = function(html) {
      M.toast({ html })
    }

    app.config.globalProperties.$successNotification = function(html) {
      M.toast({ html, classes: 'green darken-3' })
    }

    app.config.globalProperties.$warningNotification = function(html) {
      M.toast({ html, classes: 'yellow darken-3 black-text' })
    }

    app.config.globalProperties.$errorNotification = function(html) {
      M.toast({ html, classes: 'red darken-3', displayLength: 7000 })
    }
  }
}
