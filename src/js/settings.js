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
    cells: '.cell',
  },
};
export const templates = {
  homePage: Handlebars.compile(document.querySelector(select.templateOf.homePage).innerHTML),
  pathfinder: Handlebars.compile(document.querySelector(select.templateOf.pathfinder).innerHTML),
};

export const classNames = {
  active: 'active',
  hidden: 'hidden',
  selected: 'selected',
  available: 'available',
  stageButton: 'button-stage',
};

export const stages = {
  endDrawing: {
    name: 'End drawing',
    code: 1,
    title: 'DRAW ROUTES',
    buttonText: 'End drawing',
  },
  compute: {
    name: 'Compute',
    code: 2,
    title: 'PICK START AND FINISH',
    buttonText: 'COMPUTE',
  },
  getResult: {
    name: 'START AGAIN',
    code: 3,
    title: 'THE BEST ROUTE IS...',
    buttonText: 'START AGAIN',
  },
};