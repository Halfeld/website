(async (window) => {
  const $ = element => document.querySelector(element);
  const loadComponent = async component => {
    const res = await fetch(`/assets/components/${component}.html`);
    return await res.text();
  };

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

  const template = res => (`
    <a href="${res.html_url}" target="_blank" class="project">
      <span class="project--star">${res.stargazers_count}
        <svg class="project--staricon"><use xlink:href="#icon-star"></use></svg>
      </span>
      <h1 class="project--title">${pretty(res.name, 'title')}</h1>
      <h2 class="project--desc">${pretty(res.description, 'desc')}</h2>
    </a>
  `);

  // const loadProjects = owner => repos => {
  //   const promises = repos.map(repo =>
  //     fetch(`https://api.github.com/repos/${owner}/${repo}`)
  //     .then(res => res.json())
  //   );

  //   Promise.all(promises)
  //   .then(res => {
  //     res.forEach(item => {
  //       $('.projects').innerHTML += template(item);
  //     })
  //   });
  // };

  const addEventListeners = () => {
    const btnMenu = $('#btn-menu');
    const wrapper = $('#wrapper');

    btnMenu.addEventListener('click', () => wrapper.classList.toggle('show'));
  };

  // const withIgorHalfeldProjects = loadProjects('IgorHalfeld');
  // const withBlackCapsProjects = loadProjects('blackcapz');
  // const withRedtubeLabsProjects = loadProjects('redtubelabs');
  // const withNOALVOProjects = loadProjects('NOALVO');

  // const runLoadProjects = () => Promise.all([
  //   withIgorHalfeldProjects(['v-notes', 'lagoinha', 'halfeld-components', 'slidefy', 'vue-2-course', 'recordall', 'negrito']),
  //   withBlackCapsProjects(['spammer-core']),
  //   withRedtubeLabsProjects(['vue']),
  //   withNOALVOProjects(['vue-architecture-boilerplate']),
  // ]);

  const changeContext = ({ bg, title, desc }) => {
    $('#stars').style.backgroundImage = `url(/assets/img/${bg})`;
    $('#title').textContent = title;
    $('#subtitle').textContent = desc;
  };

  const routesActions = {
    'articles': () => changeContext({
      bg: 'article-banner.jpg',
      title: 'Writer.',
      desc: 'Share knowledge to inspire people.',
    }),
    'talks': () => changeContext({
      bg: 'talk-banner.png',
      title: 'Speaker.',
      desc: 'Speak to be heard.',
    }),
    'training': () => changeContext({
      bg: 'training-banner.png',
      title: 'Training.',
      desc: 'Level up your skills.',
    }),
    'about-me': () => changeContext({
      bg: 'about-me-banner.png',
      title: 'About me.',
      desc: 'Don’t think you are, know you are.',
    }),
    'videos': () => changeContext({
      bg: 'video-banner.jpg',
      title: 'Videos.',
      desc: 'Registering moments.',
    }),
    'projects': () => {
      changeContext({
        bg: 'projects-banner.jpg',
        title: 'Projects.',
        desc: 'Building the future.',
      });
    },
  };

  Vue.component('collapse', {
    template: await loadComponent('Collapse'),
    props: ['title'],
    data: () => ({
      isOpen: false,
    }),
    methods: {
      toggle() {
        this.isOpen = !this.isOpen;
      },
    },
  });

  // graphql-advanced-concepts
  new Vue({
    el: '#allow-vue',
    delimiters: ['${', '}'],
    data: {
      courses: [],
    },
    async mounted() {
      const [
        graphqlAdvancedResponse,
        introVueResponse,
        vueInDepthResponse,
      ] = await Promise.all([
        fetch('/assets/courses/graphql-advanced-concepts.json'),
        fetch('/assets/courses/intro-to-vue.json'),
        fetch('/assets/courses/vue-in-depth.json'),
      ]);
      const [
        graphqlAdvanced,
        introVue,
        vueInDepth,
      ] = await Promise.all([
        graphqlAdvancedResponse.json(),
        introVueResponse.json(),
        vueInDepthResponse.json(),
      ]);

      this.courses = [
        graphqlAdvanced,
        introVue,
        vueInDepth,
      ];
    }
  });

  const pathname = window.location.pathname;
  const route = pathname.replace(/\//g, '');
  if (routesActions[route]) {
    routesActions[route]()
  }
  addEventListeners();
})(window)
