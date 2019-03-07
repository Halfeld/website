(function (window) {

  // const pretty = (value, type) => {
  //   const types = {
  //     title: () => {
  //       var v = value.replace(/-/g, ' ').split(' ');
  //       v[0] = v[0].substr(0, 1).toUpperCase() + v[0].substr(1);
  //       return v.toString().replace(/,/g, ' ');
  //     },
  //     desc: () => value.replace(/:.+:/g, ''),
  //   };
  //   return types[type]
  //     ? types[type]()
  //     : null;
  // };

  // const template = res => `
  //   '<a href="' + res.html_url + '" class="project">'
  //     '<span class="project--star">'${res.stargazers_count}
  //       '<svg class="project--staricon"><use xlink:href="#icon-star"></use></svg>'
  //     '</span>'
  //     '<h1 class="project--title">${pretty(res.name, 'title')}</h1>'
  //     '<h2 class="project--desc">'${pretty(res.description, 'desc')}'</h2>'
  //   '</a>'
  // `;

  // const loadProjects = () => {
  //   const owner = 'IgorHalfeld';
  //   const repos = [
  //     'v-notes',
  //     'vue-component-menu',
  //     'slidefy',
  //     'react-cards',
  //     'vue-2-course',
  //     'angular-cards',
  //     'recordall',
  //     'attached'
  //   ];
  //   const promises = repos.map(repo => {
  //     return fetch(`https://api.github.com/repos/${owner}/${repo}`)
  //     .then(res => res.json())
  //   });
  //   Promise.all(promises)
  //   .then(res => {
  //     debugger
  //   })
  //   .catch();
  // };

  const routesActions = {
    '/projects/': () => loadProjects(),
  };

  // var app = {

  //   // Load projects
  //   // =============
  //   // owner {String}
  //   // repos {Array}
  //   loadProjects: function (owner, repos) {
  //     repos.forEach(function (el) {
  //       $.ajax({
  //         url: 'https://api.github.com/repos/' + owner + '/' + el,
  //         type: 'GET',
  //         success: function (res) {
  //           $('.projects').append(template(res))
  //         },
  //         error: function (err) {
  //           console.log(err)
  //         }
  //       })
  //     })
  //   }
  // }

  // app.loadProjects('Halfeld', [
  //   'v-notes',
  //   'vue-component-menu',
  //   'slidefy',
  //   'react-cards',
  //   'vue-2-course',
  //   'angular-cards',
  //   'recordall',
  //   'attached'
  // ])

  const pathname = window.location.pathname;
  if (routesActions[pathname]) {
    routesActions[pathname]()
  }
})(window)
