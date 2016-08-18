(function ($, particlesJS, window) {
  particlesJS.load('stars', '/assets/particles.json')

  var template = function (res) {
    return '<a href="' + res.html_url + '" class="project">' +
              '<span class="project--star">' + res.stargazers_count +
                '<svg class="project--staricon"><use xlink:href="#icon-star"></use></svg>' +
              '</span>' +
              '<h1 class="project--title">' + res.name.replace(/-/g, ' ') + '</h1>' +
              '<h2 class="project--desc">' + res.description.replace(/:.+:/g, '') + '</h2>' +
            '</a>'
  }

  var app = {
    loadProjects: function (repos) {
      repos.forEach(function (el) {
        $.ajax({
          url: 'https://api.github.com/repos/Halfeld/' + el,
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

  app.loadProjects([
    'v-notes',
    'vue-component-menu',
    'react-cards',
    'angular-cards'
  ])

  window.App = app
})(Zepto, particlesJS, window)

var particlesJS = particlesJS || {}
var Zepto = Zepto || {}
