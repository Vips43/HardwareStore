
const signupForm = document.getElementById("signupForm")
// const loginForm = document.getElementById("loginForm")

function createSignupForm() {
    const div = document.createElement('div');
    div.className = 'bg-white mx-auto h-fit w-2xs transition-all duration-500 scale-0';
    div.innerHTML = `
    <div id="signupClose" class="w-fit px-2 py-1.5 text-sm ml-auto hover:text-red-500 cursor-pointer"><i class="fa-solid fa-xmark"></i></div>
        <div class="mx-auto mb-5 text-center font-semibold text-2xl">
          <h2>Register</h2>
        </div>
        <div class="space-y-2 my-3 mx-auto w-2xs py-5 px-10 grid justify-center">
          <div class="flex flex-col">
            <label for="name" class="text-sm ">Your name</label>
            <input type="text" class="focus:ring-1 focus:ring-amber-300 p-1 bg-gray-200">
          </div>
          <div class="flex flex-col">
            <label for="email" class="text-sm ">Your email</label>
            <input type="email" class="focus:ring-1 focus:ring-amber-300 p-1 bg-gray-200">
          </div>
          <div class="flex flex-col">
            <label for="pass" class="text-sm ">Your password</label>
            <input type="password" class="focus:ring-1 focus:ring-amber-300 p-1 bg-gray-200">
          </div>
          <div class="text-center my-4">
            <button type="submit" class="px-2 py-1 bg-green-200 rounded-lg cursor-pointer">SignUp</button>
            <button type="submit" class="loginBtn px-3 py-1 rounded-2xl outline-1 outline-gray-300 hover:bg-neutral-200">Login</button>
          </div>

          <div class="flex gap-3 mx-auto">
            <div class="w-fit border-2 border-red-200 text-red-300 p-1 rounded-full text-sm cursor-pointer">
              <i class="fa-brands fa-google"></i>
            </div>
            <div class="w-fit p-1 rounded-full border-2 border-blue-200 text-blue-300 text-sm cursor-pointer">
              <i class="fa-brands fa-facebook-f"></i>
            </div>
          </div>
        </div>
    `;
    signupForm.append(div)
}
createSignupForm()

let signupFormDiv = document.querySelector("#signupForm div"),
    loginBtn = document.querySelector(".loginBtn"),
    closeIcon = document.getElementById("signupClose"),
    userIcon = document.getElementById("user")

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
})
closeIcon.addEventListener("click", () => {
    signupFormDiv.classList.add("scale-0")
    signupFormDiv.classList.remove("scale-100")
    setTimeout(() => {
        signupForm.classList.replace("flex", 'hidden')
    }, 700);
})
userIcon.addEventListener('click', () => {
    signupForm.classList.replace("hidden", 'flex')
    setTimeout(() => {
        signupFormDiv.classList.add("scale-100")
        signupFormDiv.classList.remove("scale-0")
    }, 300);
})
loginBtn.onclick = () => {
    loginForm.classList.replace('hidden','grid')
    signupForm.classList.add('hidden')
    signupFormDiv.classList.add("scale-0")
    signupFormDiv.classList.remove("scale-100")
}