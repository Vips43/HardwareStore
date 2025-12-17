const loginForm = document.getElementById("loginForm")
createLoginForm()
const loginClose = document.getElementById("loginClose")

function createLoginForm(){
    const div = document.createElement("div");
    div.className = 'shadow-lg w-2xs p-5 bg-white rounded-2xl';
    div.innerHTML = `
    <div class="scroll-py-4">
        <div id="loginClose" class="w-fit px-2 py-1.5 text-sm ml-auto hover:text-red-500 cursor-pointer"><i
            class="fa-solid fa-xmark"></i></div>
        <div class="capitalize text-2xl font-semibold text-center mb-3">
        <h3>login</h3>
        </div>
        <div class="space-y-3">
        <div class="flex flex-col">
            <label for="" class="text-sm">Email</label>
            <input type="email" class="bg-gray-200 p-1">
        </div>
        <div class="flex flex-col">
            <label for="" class="text-sm">Password</label>
            <input type="password" class="bg-gray-200 p-1">
        </div>
        <div class="text-center mt-6">
            <button type="submit" class="px-3 py-1 rounded-2xl outline-1 outline-gray-300 hover:bg-neutral-200">Login</button>
        </div>
        </div>
    </div>
    `;
    loginForm.append(div)
}

loginClose.addEventListener('click',()=>{
    loginForm.classList.add('hidden');
})

loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();
})

