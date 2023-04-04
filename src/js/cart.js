import { getLocalStorage, setLocalStorage } from "./extraFunctions.mjs";

function renderCartContents() {
  const cartEvents = getLocalStorage("cart");
  console.log(cartEvents)
  const htmlItems = cartEvents.map((event) => cartItemTemplate(event));
  let totalValue = 0;
  cartEvents.map((item) => totalValue += parseInt(item.price));
  document.querySelector(".event-list").innerHTML = htmlItems.join("");
  document.querySelector(".cart-total").innerHTML = `Total: $${totalValue}`;
  //To remove from cart
  const deleteButtons = document.querySelectorAll(".delete-event");
  const buttonPressed = b => {
    removeFromCartByIndex(b.target.id, "cart")
  }
  for (let button of deleteButtons) {
    button.addEventListener("click", buttonPressed);
  }
}

function cartItemTemplate(elem) {
  if(elem != null){
  const newEvent = `<li class="cart-event">
  <a id="${elem.id}" class="delete-event">&#215;</a>
  <div class="cart-card">
  <a href="../event-pages/index.html?event=${elem.id}&category=${elem.category}">
    <img src="${elem.image}" alt="${elem.name}"/>
  <h2 class="card__name">${elem.name}</h2>
  <p class="cart-card__price">$${elem.price}</p>
  </a>
  </div>
</li>`;
/*const total = document.querySelector(".cart-total").innerHTML += elem.FinalPrice; */
return newEvent;
  }
  
}



function removeFromCartByIndex(elemId, localStorage){
  let source = getLocalStorage(localStorage)
  const elementIndex = source.findIndex(e => e.Id === elemId);
  source.splice(elementIndex, 1)
  setLocalStorage(localStorage, source)
  renderCartContents()
}

renderCartContents();
