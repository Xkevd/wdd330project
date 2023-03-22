import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import {loadHeaderFooter} from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  let totalValue = 0;
  cartItems.map((item) => totalValue += item.FinalPrice);
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  document.querySelector(".cart-total").innerHTML = `Total: $${totalValue}`;

  //To remove from cart
  const deleteButtons = document.querySelectorAll(".delete-item-cart");
  //console.log(deleteButtons)
  const buttonPressed = b => {
    //console.log(b.target.id);
    removeFromCartByIndex(b.target.id, "so-cart")
  }
  for (let button of deleteButtons) {
    button.addEventListener("click", buttonPressed);
  }
}

function cartItemTemplate(item) {
  if(item != null){
  const newItem = `<li class="divider">
  <a id="${item.Id}" class="delete-item-cart">&#215;</a>
  <div class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryLarge}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  </div>
</li>`;
const total = document.querySelector('.cart-total').innerHTML += item.FinalPrice //Need to correct when there are more items in the cart make a sum
return newItem;
  }
  return ""
  
}



function removeFromCartByIndex(elemId, localStorage){
  //console.log(elemId)
  let source = getLocalStorage(localStorage)
  const elementIndex = source.findIndex(e => e.Id === elemId);
  //console.log(elementIndex);
  source.splice(elementIndex, 1)
  //console.log(source)
  setLocalStorage(localStorage, source)
  renderCartContents()
  
}

renderCartContents();
loadHeaderFooter()
