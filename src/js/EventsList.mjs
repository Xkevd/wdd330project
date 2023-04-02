import { setLocalStorage, getLocalStorage, findById } from "./extraFunctions.mjs";

function eventCardTemplate(event){
  return `
  <li class="product-card">
    
  <a id="event-info" href="../event-pages/index.html?event=${event.id}">
  <img
  src="${event.image}"
  alt="Image of ${event.name}"
  />
  <h2 >${event.name}</h2>
  <h3 class="event-text">${event.location}</h3>
  <h4>$${event.price}</h4>
  <p  class="event-text right">${event.category}</p></a>
</li>`
}

export function renderLike(elementId){
  //console.log(button);
  const element = findById(elementId);
  setLocalStorage("liked-events", element)

}

export async function convertToJson(res){
 const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw { name: "servicesError", message: data };
    }
  
}

export default class EventsList{
  constructor(category, dataSource, listElement){
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = document.querySelector(listElement);

  }
  async init(){
    this.filterByCategory(this.category)
.then(data => this.renderEventsList(data));
  }
  async filterByCategory(category){
    if (this.category != "All"){
    const readJSON = await fetch(this.dataSource);
    const convJSON = await convertToJson(readJSON);
    const result = convJSON .filter(obj => obj.category == category);
    return result;
  }else{
    const readJSON = await fetch(this.dataSource);
    const convJSON = await convertToJson(readJSON);
    return convJSON;
  }
}
  search(value, list){
    const regExp = new RegExp(value, "i");
    const listOfMatches = list.filter(element=>{
      if (element.name.match(regExp) != null){ 
        console.log(element.name.match(regExp))
        return true;
      }else{
        console.log("false")
        return false;
      };
    });
    //console.log(listOfMatches);
    return listOfMatches;
  };
  
   async runSearch(value){
    const preSearch = await this.filterByCategory(this.category);
    //console.log(preSearch);
    const searchList = this.search(value, preSearch);
    console.log(searchList);
    this.renderEventsList(searchList);
  }
  renderEventsList(list) {
    let htmlStrings =  list.map(eventCardTemplate);
    htmlStrings = htmlStrings.join("");
    this.listElement.innerHTML = htmlStrings;
  }
}
