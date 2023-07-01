// Link for the documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration

// Add button code documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration#code-to-add-pay-button


let cart_arr = JSON.parse(localStorage.getItem("cart_arr")) || []
let curr_user = JSON.parse(localStorage.getItem("curr_user")) || []



function get_total_price(cart_arr) {
  let sum = 0;
  cart_arr.forEach((obj) => {
    sum = sum + parseFloat(obj.price);
  })
    return sum==0? 1:sum; //convert price from doller to Rs (1 United States Dollar equals 82.46 Indian Rupee)

}


document.getElementById("rzp-button1").onclick = function (e) {
  var options = {
    key: "rzp_test_ET44gHlkhvHKqu", // Enter the Key ID generated from the Dashboard
    amount: get_total_price(cart_arr) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Me Shop",
    description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    theme: {
      color: "#0000",
    },
    image: "../landingPagePic.png",
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.open();
  localStorage.removeItem("cart_arr")

  document.querySelector(".thank").style.display = "block"
  let name=curr_user.fname.toUpperCase()+" "+curr_user.lname.toUpperCase()
  document.querySelector("h3").innerText=`${name}`

  document.querySelector("h3").style.display = "block"

  document.querySelector("button").style.display = "none"


  // var instance = new Razorpay({ key_id: 'rzp_test_ET44gHlkhvHKqu', key_secret: 'f4SKNbLLKf0AA44QpLxWE3Q6' })
  // console.log(instance)


  e.preventDefault();
};



//Key Id      rzp_test_ET44gHlkhvHKqu
//Key Secret  f4SKNbLLKf0AA44QpLxWE3Q6

// image:"https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
document.querySelector("#my-icon").addEventListener("click",()=>{
  if (document.querySelector("#my-icon").innerText == "menu") {
    document.querySelector("#my-icon").innerText = "close"
  } else {
    document.querySelector("#my-icon").innerText = "menu"

  }
  document.querySelector(".nav-left").classList.toggle("nav-left2");
 
})