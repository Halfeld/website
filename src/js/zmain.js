(function ($, particlesJS, window) {

  // Snow FX
  // =======
  particlesJS.load('stars', '/assets/particles.json')

  // Template for project list
  // =========================
  // res {Object}
  var template = function (res) {
    return '<a href="' + res.html_url + '" class="project">' +
              '<span class="project--star">' + res.stargazers_count +
                '<svg class="project--staricon"><use xlink:href="#icon-star"></use></svg>' +
              '</span>' +
              '<h1 class="project--title">' + pretty(res.name, 'title') + '</h1>' +
              '<h2 class="project--desc">' + pretty(res.description, 'desc') + '</h2>' +
            '</a>'
  }

  // Pretty visualization
  // ====================
  // value, type {String}
  var pretty = function (value, type) {
    switch (type) {

      // Tittle
      // ======
      case 'title':
        var v = value.replace(/-/g, ' ').split(' ')
        v[0] = v[0].substr(0, 1).toUpperCase() + v[0].substr(1)
        return v.toString().replace(/,/g, ' ')

      // Description
      // ===========
      case 'desc':
        return value.replace(/:.+:/g, '')
      default:
       return
    }
  }

  // Load projects
  // =============
  // owner {String}
  // repos {Array}
  var app = {
    loadProjects: function (owner, repos) {
      repos.forEach(function (el) {
        $.ajax({
          url: 'https://api.github.com/repos/' + owner + '/' + el,
          type: 'GET',
          success: function (res) {
            $('.projects').append(template(res))
          },
          error: function (err) {
            console.log(err)
          }
        })
      })
    }
  }

  app.loadProjects('Halfeld', [
    'v-notes',
    'vue-component-menu',
    'react-cards',
    'curso-vue-2',
    'angular-cards'
  ])

  window.App = app
})(Zepto, particlesJS, window)

var particlesJS = particlesJS || {}
var Zepto = Zepto || {}
