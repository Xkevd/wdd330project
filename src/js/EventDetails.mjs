import {convertToJson} from "./EventsList.mjs"
import { getLocalStorage, setLocalStorage } from "./extraFunctions.mjs";
export default class EventDetails{
  constructor(eventId, dataSource) {
    this.eventId = eventId;
    this.eventOpen
    this.dataSource = dataSource;
  }
  async init() {
    this.eventOpen = await this.findById(this.eventId);
    this.eventOpen = this.eventOpen[0];
    this.renderEventDetails("#event-details");
    document.getElementById("buyEvent").addEventListener("click", this.addtoCart.bind(this));
    
  }
  async findById(id){
    const readJSON = await fetch("/json/eventsdb.json");
    const convJSON = await convertToJson(readJSON);
    const result = convJSON.filter(obj => obj.id == id);
    console.log(result)
    return result;
  }
  renderEventDetails(htmlElement) {
    const element = document.querySelector(htmlElement);
    element.insertAdjacentHTML("afterBegin", `
    <img
    src="${this.eventOpen.image}"
    alt="${this.eventOpen.name}"
  />
      <section class="event-details">
      
      <h2>${this.eventOpen.name}</h2>
      <p>
      ${this.eventOpen.description}
      </p>
      <h3>$${this.eventOpen.price}</h3>
      <h4>&#128205;${this.eventOpen.location}</h4>
      <a id="buyEvent" href="">Buy</a>
      
      </section>`);
}
    addtoCart() {
      let cartContents = getLocalStorage("cart");
      if(!cartContents) {
        cartContents = [];
      }
      cartContents.push(this.eventOpen);
      setLocalStorage("cart", cartContents);
      alert("Event added to cart!");
    }

}

