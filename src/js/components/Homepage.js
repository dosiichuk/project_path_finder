import {templates} from '../settings.js';

class Homepage {
  constructor(wrapperElement){
    const thisHomePage = this;
    thisHomePage.render(wrapperElement);
  }
  render(wrapperElement){
    const thisHomePage = this;
    const generatedHtml = templates.homePage();
    thisHomePage.dom = {};
    thisHomePage.dom.wrapper = wrapperElement;
    thisHomePage.dom.wrapper.innerHTML = generatedHtml;
  }  
}

export default Homepage;