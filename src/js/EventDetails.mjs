import {convertToJson} from "./EventsList.mjs"
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
    //document.getElementById("addToCart").addEventListener("click", this.addtoCart.bind(this));
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
    element.insertAdjacentHTML("afterBegin", `<section class="event-details">
      <img
        src="${this.eventOpen.image}"
        alt="${this.eventOpen.name}"
      />
      <h2>${this.eventOpen.name}</h2>
      <h3>${this.eventOpen.price}</h3>

      <p>
      ${this.eventOpen.description}
      </p>
      </section>`);
}

}
