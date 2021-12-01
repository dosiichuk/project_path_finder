export const select = {
  templateOf:{
    homePage: '#template-home',
  },
  wrapperOf:{
    homePage: '.home-wrapper',
  }

};
export const templates = {
  homePage: Handlebars.compile(document.querySelector(select.templateOf.homePage).innerHTML),
};