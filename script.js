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
    if (cartContainer.classList.contains('ytran')) {
        toggleMenus(cartContainer, 'ytran', 'ydefault')
    } else {
        toggleMenus(cartContainer, 'ydefault', 'ytran')
    }
}


let HWProducts = JSON.parse(localStorage.getItem("HWProducts")) || { cardInfo: [] };

function cartBtn(btn) {
    const card = btn.closest(".card")
    cardInfo = {
        id: card.dataset.id,
        img: card.querySelector(".img").src,
        name: card.querySelector(".productName").textContent,
        price: card.querySelector(".productPrice").textContent
    }
    HWProducts.push(cardInfo)
    saveLocal()
}


clearCart.onclick = () => {
    HWProducts = []
    saveLocal()
}

function saveLocal() {
    localStorage.setItem("HWProducts", JSON.stringify(HWProducts))
    console.log(HWProducts);
}
// localStorage.removeItem("hardwareProducts")