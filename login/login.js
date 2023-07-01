let EmailEl = document.getElementById("Email");
let PassEl = document.getElementById("Pass");

let user_arr = JSON.parse(localStorage.getItem("user_arr")) || []

if (!user_arr || user_arr.length == 0) {
    alert("User Not Found. Please Signup first!");
    location.href = "../signUp/sign-up.html";

}



document.getElementById("LoginBtn").addEventListener("click", () => {


    if (EmailEl.value.trim() == "" || PassEl.value.trim() == "") {
        alert("All field is mandatory!")
        return;
    }

    let curr_user //current user object who is currently going to be login
    user_arr.forEach(obj => {
        if (obj.email == EmailEl.value && obj.password == PassEl.value) {
            curr_user = obj;
        }

    });

    if (!curr_user) {
        alert("Please enter correct email or password.");
    } else {
        curr_user["token"] = generateToken()
        localStorage.setItem("curr_user", JSON.stringify(curr_user))
        location.href = "../shop/shop.html"
    }

})





//function to generate random 16byte string/token
function generateToken() {
    let token = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz!@#$^&*/_?[}]{";
    for (let i = 0; i < 16; i++) {
        token = token + str[Math.floor(Math.random() * str.length)];
    }
    return token;
}



let curr_user = JSON.parse(localStorage.getItem("curr_user")) || []

document.querySelector("#profile").addEventListener("click", () => {
    if (!curr_user || curr_user.length == 0) {
        alert("Please Login first to see Profile")
    } else {
        alert(`Already Login as ${curr_user.email}`)
        location.href = "../profile/profile.html"
    }
})


document.querySelector("#myCart").addEventListener("click", () => {
    if (!curr_user || curr_user.length == 0) {
        alert("Please Login first to see Mycart!")
    } else {
        alert(`Already Login as ${curr_user.email}`)

        location.href = "../cart/mycart.html"
    }
})

document.querySelector("#my-icon").addEventListener("click",()=>{
    if (document.querySelector("#my-icon").innerText == "menu") {
        document.querySelector("#my-icon").innerText = "close"
      } else {
        document.querySelector("#my-icon").innerText = "menu"
    
      }
    document.querySelector(".nav-left").classList.toggle("nav-left2");
   
  })