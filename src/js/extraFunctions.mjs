import {convertToJson} from "./EventsList.mjs";

export async function findById(id){
  const readJSON = await fetch("/src/json/eventsdb.json");
  const convJSON = await convertToJson(readJSON);
  const result = convJSON.filter(obj => obj.id == id);
  console.log(result)
  return result;
  }

export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const event = urlParams.get(param);
    /*console.log(event);*/
    return event
  }

  export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  async function loadTemplate(path){
    let response = await fetch(path);
    let result = await response.text();
    return result
  }
  export async function loadHeaderAndFooter(){
    let header = await loadTemplate("../snippets/header.html");
    let footer = await loadTemplate("../snippets/footer.html");
    document.querySelector("#header-section").insertAdjacentHTML("afterbegin", header);
    document.querySelector("#footer-section").insertAdjacentHTML("afterbegin", footer);
  }
