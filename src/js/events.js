import EventsList from "./EventsList.mjs";


const categorySelection = document.querySelector("#selectCategory");

categorySelection.addEventListener("change", function handleChange(){console.log(categorySelection.value)})

let category = categorySelection.value;
const dataSource = "/json/eventsdb.json"
const listElement = "#events-grid"
let elementList = new EventsList(category, dataSource, listElement);
elementList.init();
categorySelection.addEventListener("change", function reRender(){
  category = categorySelection.value;
  elementList = new EventsList(category, dataSource, listElement)
  elementList.init()})
