import {classNames, select, stages} from './settings.js';
import Homepage from './components/Homepage.js';
import Pathfinder from './components/Pathfinder.js';
import Pathcomputer from './components/Pathcomputer.js';

class App {
  constructor(){
    this.stage = 1; 
    this.getElements();
    this.renderHomepage();
    this.renderPathfinder();
    this.findAndActivatePageMatchingHash(this.pageMatchingHash);
    this.changeStageButton = document.querySelector(select.changeStageButton);
    this.activateChangeStageButton();
  }
  findAndActivatePageMatchingHash(){
    const thisApp = this;
    let idFromHash = window.location.hash.replace('#/', '');
    let pageMatchingHash = this.dom.pages[0].id;
    for(let page of this.dom.pages){
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }
    this.activatePage(pageMatchingHash);
    for(let link of this.dom.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();
        const id = clickedElement.getAttribute('href').replace('#', '');
        thisApp.activatePage(id);
        window.location.hash = '#/'+ id;
      });
    }
  }
  getElements(){
    this.dom = {};
    this.dom.homeWrapper = document.querySelector(select.wrapperOf.homePage);
    this.dom.pathfinderWrapper = document.querySelector(select.wrapperOf.pathfinder);
    this.dom.navLinks = document.querySelectorAll(select.all.navlinks);
    this.dom.pages = document.querySelector(select.wrapperOf.pages).children;
  }
  renderHomepage(){
    new Homepage(this.dom.homeWrapper);
  }
  renderPathfinder(){
    if(this.stage === 1){
      new Pathfinder(this.dom.pathfinderWrapper);
    }else if(this.stage === 2){
      new Pathcomputer(this.stage);
    }else if(this.stage === 3){
      new Pathcomputer(this.stage);
    }
    
  }
  activatePage(pageId){
    for(let page of this.dom.pages){
      page.classList.toggle(classNames.hidden, page.id != pageId);
    }
  }
  activateChangeStageButton(){
    this.changeStageButton.addEventListener('click', (event) => {
      console.log('switch was clicked', event.target);
      if(this.stage === 1){
        this.stage += 1;
        this.renderPathfinder();
        this.updateAppView(this.stage);
        console.log('current state', this.stage);
      }else if(this.stage === 2){
        this.stage += 1;
        this.updateAppView(this.stage);
        this.renderPathfinder();
      }
    });
  }
  updateAppView(stage){
    if(stage === 2){
      console.log('to update', document.querySelector(select.pathfinderTitle).innerHTML);
      document.querySelector(select.pathfinderTitle).innerHTML = stages[2].title;
      document.querySelector(select.changeStageButton).innerHTML = stages[2].buttonText;
    }else if(stage === 3){
      document.querySelector(select.pathfinderTitle).innerHTML = stages[3].title;
      document.querySelector(select.changeStageButton).innerHTML = stages[3].buttonText;
    }
  }
}

new App();