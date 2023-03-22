import EventDetails from "./EventDetails.mjs";
import {getParam} from "./extraFunctions.mjs"


const eventId = getParam("event");
const dataSource = "/json/eventsdb.json";
const eventDetails = new EventDetails(eventId, dataSource);

eventDetails.init();
