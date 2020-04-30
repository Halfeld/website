(async (window) => {
  const $ = element => document.querySelector(element);

  const addEventListeners = () => {
    const btnMenu = $('#btn-menu');
    const wrapper = $('#wrapper');

    window.addEventListener('load', () => {
      setTimeout(() => {
        $('#loading').style.display = 'none';
        $('#app').style.overflow = 'auto';
      }, 800)
    });
    btnMenu.addEventListener('click', () => wrapper.classList.toggle('show'));
  };

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

  const pathname = window.location.pathname;
  const route = pathname.replace(/\//g, '');
  if (routesActions[route]) {
    routesActions[route]()
  }
  addEventListeners();
})(window)
