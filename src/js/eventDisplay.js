import EventsList from "./EventsList.mjs";
import EventDetails from "./EventDetails.mjs";
import {getParam} from "./extraFunctions.mjs"


const eventId = getParam("event");
const category = getParam("category");
const dataSource = "/json/eventsdb.json";
const eventDetails = new EventDetails(eventId, dataSource);
const otherEvents = new EventsList(category, dataSource, "#other-events");


eventDetails.init();
otherEvents.renderOtherEvents();
