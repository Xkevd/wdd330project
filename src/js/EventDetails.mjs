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
      <h4>${this.eventOpen.date}</h4>
      <input type="number" id="quantity" value="1" name="quantity" placeholder="1" min="1" max="5">
      <a id="buyEvent" href="">Buy</a>      
      </section>`);
}
    addtoCart() {
      let cartContents = getLocalStorage("cart");
      const quantity = parseInt(document.querySelector("#quantity").value);
      this.eventOpen.quantity = quantity;
      if(!cartContents) {
        cartContents = [];
      }
      let duplicatedEvent = cartContents.filter(e => e.id == this.eventOpen.id);
      console.log(duplicatedEvent)
      if(duplicatedEvent.length == 0){
        cartContents.push(this.eventOpen);
      }else{
        this.eventOpen.quantity += parseInt(duplicatedEvent[0].quantity);
        /*Remove from cart by index*/
        let source = getLocalStorage("cart")
        const elementIndex = source.findIndex(e => e.id == this.eventOpen.id);
        source.splice(elementIndex, 1);
        setLocalStorage("cart", source);
        cartContents = getLocalStorage("cart");
        cartContents.push(this.eventOpen);
      }
      setLocalStorage("cart", cartContents);
      /*alert("Event added to cart!");*/
    }

}

