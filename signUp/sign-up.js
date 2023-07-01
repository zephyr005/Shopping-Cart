let fnameEl = document.getElementById("fname");
let lnameEl = document.getElementById("lname");
let EmailEl = document.getElementById("Email");
let PassEl = document.getElementById("Pass");
let cpassEl = document.getElementById("cpass");

let user_arr = []
document.getElementById("signUpBtn").addEventListener("click", () => {


    if (fnameEl.value.trim() == "" ||
        lnameEl.value.trim() == "" ||
        EmailEl.value.trim() == "" ||
        PassEl.value.trim() == "" ||
        cpassEl.value.trim() == "") {

        alert("All field is mandatory!")
        return;
    }

    if (PassEl.value.trim() != cpassEl.value.trim()) {
        alert("confirm password not match!")
        return;
    }
    //ensure unique email
    let user_arr = JSON.parse(localStorage.getItem("user_arr")) || [];
    for(let obj of user_arr)
    {
        if (obj.email == EmailEl.value) {
            alert('Email is already used. Please use a different email.');
            return;
        }
    }
   

    user_arr.push({
        fname: fnameEl.value,
        lname: lnameEl.value,
        email: EmailEl.value,
        password: PassEl.value,
    })

    localStorage.setItem("user_arr", JSON.stringify(user_arr));
    location.href = "../login/login.html"
})









let curr_user = JSON.parse(localStorage.getItem("curr_user")) || [];

document.querySelector("#myCart").addEventListener("click",()=>{

    if(!curr_user||curr_user.length==0)
    {
        alert("You are not login!")

    }else{
        alert(`Already Login as ${curr_user.email}`)

        location.href="../cart/mycart.html"
    }
})


document.querySelector("#profile").addEventListener("click",()=>{

    if(!curr_user||curr_user.length==0)
    {
        alert("You are not login!")

    }else{
        alert(`Already Login as ${curr_user.email}`)

        location.href="../profile/profile.html"
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