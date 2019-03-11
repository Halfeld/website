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

  const addEventListeners = () => {
    const btnMenu = $('#btn-menu');
    const wrapper = $('#wrapper');

    btnMenu.addEventListener('click', () => wrapper.classList.toggle('show'));
  };

  const withIgorHalfeldProjects = loadProjects('IgorHalfeld');
  const withBlackCapsProjects = loadProjects('blackcapz');
  const withRedtubeLabsProjects = loadProjects('redtubelabs');
  const withNOALVOProjects = loadProjects('NOALVO');

  const runLoadProjects = () => Promise.all([
    withIgorHalfeldProjects(['v-notes', 'lagoinha', 'halfeld-components', 'slidefy', 'vue-2-course', 'recordall', 'negrito']),
    withBlackCapsProjects(['spammer-core']),
    withRedtubeLabsProjects(['vue']),
    withNOALVOProjects(['vue-architecture-boilerplate']),
  ]);

  const routesActions = {
    '/articles/': () => {
      $('#stars').style.backgroundImage = 'url(/assets/img/article-banner.jpg)';
      $('#title').textContent = 'Writer.';
      $('#subtitle').textContent = 'Share knowledge to inspire people.';
    },
    '/talks/': () => {
      $('#stars').style.backgroundImage = 'url(/assets/img/talk-banner.png)';
      $('#title').textContent = 'Speaker.';
      $('#subtitle').textContent = 'Speak to be heard.';
    },
    '/about-me/': () => {
      $('#stars').style.backgroundImage = 'url(/assets/img/about-me-banner.png)';
      $('#title').textContent = 'About me.';
      $('#subtitle').textContent = 'Don’t think you are, know you are.';
    },
    '/videos/': () => {
      $('#stars').style.backgroundImage = 'url(/assets/img/video-banner.jpg)';
      $('#title').textContent = 'Videos.';
      $('#subtitle').textContent = 'Registering moments.';
    },
    '/projects/': () => {
      runLoadProjects();
      $('#stars').style.backgroundImage = 'url(/assets/img/projects-banner.jpg)';
      $('#title').textContent = 'Projects';
      $('#subtitle').textContent = 'Building the future.';
    },
  };

  const pathname = window.location.pathname;
  if (routesActions[pathname]) {
    routesActions[pathname]()
  }
  addEventListeners();
})(window)
