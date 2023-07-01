// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))

document.getElementById("loginBtn").addEventListener("click", () => {
    location.href = "./login/login.html";
})




document.getElementById("sighupBtn").addEventListener("click", () => {

    location.href = "./signUp/sign-up.html"
})

let curr_user = JSON.parse(localStorage.getItem("curr_user")) || [];
document.getElementById("myCart").addEventListener("click", () => {
    if (!curr_user || curr_user.length == 0) {
        alert("You are not login!");

    } else {
        alert(`Already Login as ${curr_user.email}`);

        location.href = "./cart/mycart.html";
    }
})


document.getElementById("profile").addEventListener("click", () => {
    if (!curr_user || curr_user.length == 0) {
        alert("You are not login!");

    } else {
        alert(`Already Login as ${curr_user.email}`);

        location.href = "./profile/profile.html";
    }
})


if (localStorage.getItem("curr_user")) {
    alert("You are Logged in!")
    window.location.href = "./shop/shop.html";
}


document.querySelector("#my-icon").addEventListener("click", () => {
    if (document.querySelector("#my-icon").innerText == "menu") {
        document.querySelector("#my-icon").innerText = "close"
    } else {
        document.querySelector("#my-icon").innerText = "menu"

    }
    document.querySelector(".nav-left").classList.toggle("nav-left2");

})