function eventCardTemplate(event){
  return `<li class="product-card">
  <a href="../event-pages/index.html?event=${event.id}">
  <img
  src="${event.image}"
  alt="Image of ${event.name}"
  />
  <h2 class="event-card">${event.name}</h2>
  <h3 class="event-card">${event.location}</h3>
  <h3 class="event-card">$${event.price}</h3>
  <p class="event-card">${event.category}</p></a>
</li>`
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

// async function filterByCategory(category){
//   const readJSON = await fetch("/json/eventsdb.json");
//   const convJSON = await convertToJson(readJSON);
//   //console.log(convJSON);
//   const result = convJSON .filter(obj => obj.category == category);
//   //console.log(result);
//   return result;
//}

// function renderEventsList(list) {
//   const htmlStrings =  list.map(eventCardTemplate);
//   this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
// }
