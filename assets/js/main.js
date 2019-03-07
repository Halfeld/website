(function (window) {
  const $ = element => document.querySelector(element);
  const pretty = (value, type) => {
    const types = {
      title: () => {
        var v = value.replace(/-/g, ' ').split(' ');
        v[0] = v[0].substr(0, 1).toUpperCase() + v[0].substr(1);
        return v.toString().replace(/,/g, ' ');
      },
      desc: () => value.replace(/:.+:/g, ''),
    };
    return types[type]
      ? types[type]()
      : null;
  };

  const template = res => `
    <a href="${res.html_url}" target="_blank" class="project">
      <span class="project--star">${res.stargazers_count}
        <svg class="project--staricon"><use xlink:href="#icon-star"></use></svg>
      </span>
      <h1 class="project--title">${pretty(res.name, 'title')}</h1>
      <h2 class="project--desc">${pretty(res.description, 'desc')}</h2>
    </a>
  `;

  const loadProjects = owner => repos => {
    const promises = repos.map(repo =>
      fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then(res => res.json())
    );

    Promise.all(promises)
    .then(res => {
      res.forEach(item => {
        $('.projects').innerHTML += template(item);
      })
    });
  };

  const withIgorHalfeldProjects = loadProjects('IgorHalfeld');
  const withBlackCapsProjects = loadProjects('blackcapz');
  const withRedtubeLabsProjects = loadProjects('redtubelabs');

  const runLoadProjects = () => Promise.all([
    withIgorHalfeldProjects(['v-notes', 'lagoinha', 'halfeld-components', 'slidefy', 'vue-2-course', 'recordall']),
    withBlackCapsProjects(['spammer-core']),
    withRedtubeLabsProjects(['vue']),
  ]);

  const routesActions = {
    '/projects/': () => runLoadProjects(),
  };

  const pathname = window.location.pathname;
  if (routesActions[pathname]) {
    routesActions[pathname]()
  }
})(window)
