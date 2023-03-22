import EventsList from "./EventsList.mjs";
















// function eventCardTemplate(event){
//   return `<li class="product-card">
//   <a href="../event-pages/index.html?product=${event.id}">
//   <img
//   src="${event.image}"
//   alt="Image of ${event.name}"
//   />
//   <h2 class="event-card">${event.name}</h2>
//   <h3 class="event-card">${event.location}</h3>
//   <h3 class="event-card">$${event.price}</h3>
//   <p class="event-card">${event.category}</p></a>
// </li>`
// }


// const eventGrid = document.querySelector("#events-grid");


// function renderEventsList(list) {
//   const htmlStrings =  list.map(eventCardTemplate);
//   eventGrid.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
// }


// async function filterByCategory(category){
//   const readJSON = await fetch("/json/eventsdb.json");
//   const convJSON = await convertToJson(readJSON);
//   //console.log(convJSON);
//   const result = convJSON .filter(obj => obj.category == category);
//   //console.log(result);
//   return result;
// }

// async function convertToJson(res){
//  const data = await res.json();
//     if (res.ok) {
//       return data;
//     } else {
//       throw { name: "servicesError", message: data };
//     }
  
// }

// //Execute
// filterByCategory("Comedy")
// .then(data => renderEventsList(data));

