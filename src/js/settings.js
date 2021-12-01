export const select = {
  templateOf:{
    homePage: '#template-home',
    pathfinder: '#template-pathfinder',
  },
  wrapperOf:{
    homePage: '.home-wrapper',
    pathfinder: '.pathfinder-wrapper',
    pages: '#pages',
  },
  all: {
    navlinks: '.nav__link',
  },
};
export const templates = {
  homePage: Handlebars.compile(document.querySelector(select.templateOf.homePage).innerHTML),
  pathfinder: Handlebars.compile(document.querySelector(select.templateOf.pathfinder).innerHTML),
};

export const classNames = {
  active: 'active',
  hidden: 'hidden',
};