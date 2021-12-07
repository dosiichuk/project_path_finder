export const appSettings = {
  numberOfPathSimulations: 5,
};

export const select = {
  templateOf:{
    homePage: '#template-home',
    pathfinder: '#template-pathfinder',
    modal: '#template-modal',
  },
  wrapperOf:{
    homePage: '.home-wrapper',
    pathfinder: '.pathfinder-wrapper',
    pages: '#pages',
    modal:'.modal-wrapper',
  },
  all: {
    navlinks: '.nav__link',
    cells: '.cell',
  },
  changeStageButton: '.button-stage',
  pathfinderWrapper: '.pathfinder',
  pathfinderTitle: '.pathfinder-title',
  start: '.start',
  finish: '.finish',
  modalClose: '.modal__close',
  modalContainer: '.modal__container',
};
export const templates = {
  homePage: Handlebars.compile(document.querySelector(select.templateOf.homePage).innerHTML),
  pathfinder: Handlebars.compile(document.querySelector(select.templateOf.pathfinder).innerHTML),
  modal: Handlebars.compile(document.querySelector(select.templateOf.modal).innerHTML),
};

export const classNames = {
  active: 'active',
  hidden: 'hidden',
  selected: 'selected',
  available: 'available',
  stageButton: 'button-stage',
  start: 'start',
  finish: 'finish',
  visited: 'visited',
  shortest: 'shortest',
  modalClose: 'modal-close',
};

export const stages = {
  1: {
    name: 'End drawing',
    code: 1,
    title: 'DRAW ROUTES',
    buttonText: 'End drawing',
  },
  2: {
    name: 'Compute',
    code: 2,
    title: 'PICK START AND FINISH',
    buttonText: 'COMPUTE',
  },
  3: {
    name: 'START AGAIN',
    code: 3,
    title: 'THE BEST ROUTE IS...',
    buttonText: 'START AGAIN',
  },
};