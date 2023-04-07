import EventsList from "./EventsList.mjs";

const categorySelection = document.querySelector("#selectCategory");
const searchForm = document.querySelector("form");

let category = categorySelection.value;
const dataSource = "/json/eventsdb.json"
const listElement = "#events-grid"

let elementList = new EventsList(category, dataSource, listElement);
elementList.init();

categorySelection.addEventListener("change", function reRender(){
  category = categorySelection.value;
  elementList = new EventsList(category, dataSource, listElement)
  elementList.init()});

searchForm.addEventListener("submit", showSearch);
function showSearch(event){
  event.preventDefault()
  const form = event.target;
  const formFields = form.elements;
  const search = formFields.searchingBox;
  const searchValue = search.value;
  elementList.runSearch(searchValue);
}

