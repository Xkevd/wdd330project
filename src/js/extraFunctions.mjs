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
    console.log(event);
    return event
  }
