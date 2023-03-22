import { getLocalStorage } from "./utils.mjs";

window.onload = function(){
    cartNumber();
    function cartNumber(){
        const list = getLocalStorage("so-cart");
        let counter = list.length;
        setTimeout(() => {
            if(counter > 0){
                document.querySelector("#cart-count").innerHTML = counter;
                document.querySelector("#cart-count").removeAttribute("hidden");
            }
          }, 200);
        
        
    };
}