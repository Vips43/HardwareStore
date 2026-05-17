document.addEventListener("DOMContentLoaded", () => {
  categoryCardsUI()
  // cardUI()
  cartUI()
})
window.addEventListener('popstate', async (event) => {
  const state = event.state;
  
  if (state && state.view === 'products') {
    const { cat } = await getProducts();
    const category = cat.find(c => String(c.id) === state.categoryId);
    if (category) cardUI(category);
  } else {
    categoryCardsUI();
  }
});
async function categoryCardsUI() {
  product.innerHTML = ``
  const { cat } = await getProducts();
  cat.forEach(d => {
    const div = document.createElement("div")
    div.className = `catCard transition-all`
    div.setAttribute("data-id", `${d.id}`)
    div.innerHTML = `
    <a href="#${d.id}" target='_parent'>
    <div data-id='${d.id}' class="w-48 h-60 flex flex-col justify-between p-2 shadow-md">
      <div>
        <img src="${d.image}" alt="">
      </div>
      <div class="text-base flex flex-col justify-between leading-10">
        <h4 class="font-semibold capitalize">${d.name}</h4>
      </div>
    </div></a>
    `
    product.append(div)
  });
}
async function fun() {

}
async function cardUI(data) {
  product.innerHTML = ``
  const fragment = document.createDocumentFragment();
  data.items.forEach(d => {
    const div = document.createElement("div")
    div.setAttribute("id", d.id)
    div.innerHTML = `
    <div class="card w-48 h-72 flex flex-col p-2 justify-between items-center rounded-lg shadow-md" data-id="${d.id}">
      <div class="w-44 h-44">
        <img loading='lazy' class='img h-44 opacity-0 ' data-src="${d.image}" alt="image">
      </div>
      <div class="text-base flex flex-col justify-between w-full">
        <h4 class="productName font-semibold capitalize">${d.name}</h4>
        <div class="flex items-center justify-between">
            <h4 class="productPrice text-neutral-500 text-sm leading-tight">${d.price} ₹</h4>
            <button class="px-2 p-0.5 text-xs border rounded-2xl text-white bg-red-800" onclick="cartBtn(this)">Add to cart</button>
        </div>
      </div>
    </div>`
    fragment.append(div)
  })
  product.append(fragment)
  initLazyImg()  //observer
}
// cardUI()

const categoryUI = async () => {
  const { uniqCat } = await getCat();
  const fragment = document.createDocumentFragment()
  uniqCat.forEach(cat => {
    const li = document.createElement("li");
    li.className = 'bg-gray-100 p-1 text-base'
    li.innerText = cat
    fragment.append(li)
  })
  leftMenu.querySelector("ul").append(fragment);

}
categoryUI()

function cartUI() {
  cartContainer.querySelector('.container').innerHTML = ''
  const data = HWProducts;
  if (!data.cardInfo || data.cardInfo.length == 0) {
    cartContainer.querySelector('.container').innerHTML = `<p class='text-center'>Cart is empty</p>`
    return;
  }
  const fragment = document.createDocumentFragment()
  data.cardInfo.forEach(d => {
    const div = document.createElement('div');
    div.className = 'm-2 space-y-2 overflow-y-auto'
    div.innerHTML = `
      <div class="h-20 w-full border border-orange-200 bg-orange-100 py-2 px-1 flex gap-2 items-center rounded-md">
        <div class="h-full w-20 shrink-0">
          <img class="h-full w-full object-cover hover:object-contain transition-all duration-300 rounded-md" src="${d.img}" alt="">
        </div>
        <div class="flex flex-col justify-between min-w-0 text-sm w-full font-semibold">
          <div class="">
            <h3 class="truncate">${d.name}</h3>
            <p class="font-light text-neutral-700">${d.price}</p>
          </div>
          <div class="flex items-start justify-start gap-1 text-xs">
            <button class="px-0.5 border border-gray-400 rounded-lg">
              <i class="fa-solid fa-minus -scale-[.7]"></i></button>
            <span class="w-8 text-center bg-gray-100">${d.qty}</span>
            <button class="px-0.5 border border-gray-400 rounded-lg">
              <i class="fa-solid fa-plus -scale-[.7]">
              </i>
            </button>
          </div>
        </div>
      </div>
  `;
    fragment.append(div)
  })
  cartContainer.querySelector('.container').append(fragment)
}
cartUI()