let product = document.getElementById("product")
let closeLeft = document.getElementById("closeLeft")
let openLeft = document.getElementById("openLeft")
let leftMenu = document.getElementById("leftMenu")
let clearCart = document.getElementById("clearCart")
let cartIcon = document.getElementById("cartIcon")
let cartContainer = document.getElementById("cartContainer")
const searchOpen = document.querySelector(".search i")
const searchBar = document.querySelector(".search-bar"),
  searchBarClose = searchBar.querySelector(".search-bar .fa-xmark")
search = searchBar.querySelector(".search-bar .fa-magnifying-glass")
searchInput = searchBar.querySelector("input")
searchDropdown = searchBar.querySelector(".search-dropdown")

async function getCat() {
  const res = await fetch("./data.json");
  const data = await res.json();
  const cat = data.products.map(a => a.category)
  const uniq = new Set(cat)
  const uniqCat = [...uniq]
  return { uniqCat, data };
}

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
  const card = btn.closest(".card");
  if (!card) return;
  const id = card.dataset.id;
  const exists = (HWProducts.cardInfo || []).find(item => item.id === id);
  if (exists) {
    exists.qty += 1;
  } else {
    const cardInfo = {
      id,
      img: card.querySelector(".img").src,
      name: card.querySelector(".productName").textContent.trim(),
      price: Number(
        card.querySelector(".productPrice").textContent.replace(/[^\d]/g, "")
      ),
      qty: 1
    };
    HWProducts.cardInfo.push(cardInfo);
  }
  saveLocal();
  cartUI();
}

clearCart.onclick = () => {
  console.log('clearing ....');
  HWProducts = []
  cartUI();
  saveLocal()
}

function saveLocal() {
  localStorage.setItem("HWProducts", JSON.stringify(HWProducts))
  console.log(HWProducts);
}
// localStorage.removeItem("HWProducts")
const getProducts = async () => {
  const res = await fetch('/newdata.json');
  const data = await res.json();
  const cat = data.categories.map(cat => cat);
  return { cat, data }
}
// dummy()
product.onclick = async (e) => {
  const card = e.target.closest(".catCard");
  if (!card) return;

  const { cat } = await getProducts()
  const cardID = card.dataset.id
  console.log(cardID);
  const n = cat.find(c => c.id === cardID)
  console.log(n.items);
  cardUI(n)
}

searchOpen.onclick = () => {
  searchBar.classList.replace("hidden", 'flex')
  searchInput.focus()
}
searchBarClose.onclick = () => {
  searchBar.classList.replace("flex", 'hidden')
}
search.onclick = () => {
  console.log(searchInput.value)
}
searchInput.onkeyup = (e) => {
  console.log(e.target.value);
  if (searchInput.value.length > 3) {
    seachFind()
  }
}
async function seachFind() {
  const { cat } = await getProducts();
  const searchedProducts = cat.flatMap(c => c.items.filter(it => it.name.toLowerCase().includes(searchInput.value.toLowerCase())))
  console.log(searchedProducts);
  searchDropdown.classList.remove("hidden")
  searchDropdown.innerHTML = ``;
  const ul = document.createElement("ul")
  ul.className = `p-2 bg-neutral-50 space-y-1 text-sm`
  searchedProducts.forEach(pr => {
    let li = document.createElement('li')
    li.className = `bg-neutral-200 p-1 capitalize cursor-pointer`
    li.innerHTML = pr.name
    ul.append(li)
  })
  searchDropdown.append(ul)
  searchDropdown.addEventListener("click", (e) => {
    if (e.target.tagName !== "LI") return
    else {
      searchInput.value = e.target.textContent;
      searchDropdown.classList.add('hidden')
    }
  })
}