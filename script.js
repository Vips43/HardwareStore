let product = document.getElementById("product")
let closeLeft = document.getElementById("closeLeft")
let openLeft = document.getElementById("openLeft")
let leftMenu = document.getElementById("leftMenu")
let clearCart = document.getElementById("clearCart")
let cartIcon = document.getElementById("cartIcon")
let cartContainer = document.getElementById("cartContainer")

async function getProducts() {
    const res = await fetch("./data.json");
    const data = await res.json();
    const cat = data.products.map(a => a.category)
    const uniq = new Set(cat)
    const uniqCat = [...uniq]
    return { uniqCat, data };
}
getProducts()
function toggleMenus(el, val1, val2) {
    el.classList.replace(val1, val2)

}

closeLeft.addEventListener("click", () => {
    toggleMenus(leftMenu, 'translate-x-0', '-translate-x-full')
})
openLeft.addEventListener("click", () => {
    toggleMenus(leftMenu, '-translate-x-full', 'translate-x-0')
})
cartIcon.onclick = () => {
    if (cartContainer.classList.contains('-translate-y-full')) {
        toggleMenus(cartContainer, '-translate-y-full', 'translate-y-16')
    } else {
        toggleMenus(cartContainer, 'translate-y-16','-translate-y-full')
    }
}


let hardwareProducts = JSON.parse(localStorage.getItem("hardwareProducts")) || { cardInfo: [] };

function cartBtn(btn) {
    const card = btn.closest(".card")
    cardInfo = {
        img: card.querySelector(".img").src,
        name: card.querySelector(".productName").textContent,
        price: card.querySelector(".productPrice").textContent
    }
    hardwareProducts.cardInfo.push(cardInfo)
    console.log(hardwareProducts);
}