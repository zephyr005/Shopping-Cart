
let user_arr = JSON.parse(localStorage.getItem("user_arr"));
let curr_user = JSON.parse(localStorage.getItem("curr_user"));

function z() {
    if (!user_arr) {
        alert("Sign up first!")
       location.href="../signUp/sign-up.html"
    }else
    if (!curr_user) {
        alert("Login First!");
       location.href="../login/login.html"
    } 

}
z();


let gridcontainer = document.querySelector(".grid-container");
let rowsEl = document.querySelector(".rows");
let lastrowEl = document.querySelector(".last-row");

function get_total_price(cart_arr)
{
    let sum=0;
    cart_arr.forEach((obj)=>{
        sum=sum + parseFloat(obj.price);
        console.log(sum)
    })
    return sum.toFixed(2)
}
function show_cart_item() {
    let cart_arr =JSON.parse( localStorage.getItem("cart_arr"));

    if (!cart_arr||cart_arr.length==0) {
        gridcontainer.innerHTML = "<h1> NO CART ADDED</h1>";
        return;
    } else {
        // cart_arr = JSON.parse(cart_arr);
        let tprice=get_total_price(cart_arr)
        gridcontainer.innerHTML = ""
        rowsEl.innerHTML = ""
        cart_arr.forEach(obj => {
            gridcontainer.innerHTML += ` <div class="item">
            <img src="${obj.image}" alt="item-pic" />
            <div class="nameC">${obj.title}</div>
            <div class="info">
              <div class="row1">
                <div class="price">${obj.price}</div>
                <div class="sized">${obj.size[0] + " " + obj.size[1] + " " + obj.size[2]}</div>
              </div>
              <div class="colors">
                <div>Colors:</div>
                <div class="row2">
                  <div class="circle" style="background-color: ${obj.color[0]}"></div>
                  <div class="circle" style="background-color: ${obj.color[1]}"></div>
                  <div class="circle" style="background-color: ${obj.color[2]}"></div>
                </div>
              </div>
              <div class="rat">Rating: ${obj.rating.rate}<i class="fa fa-star-o"></i></div>
            </div>
            <button id="addBtn"onclick="remove_cart(this,${obj.id})">Remove from Cart</button>
            </div>`


            rowsEl.innerHTML += ` <div class="row">
                                    <div>${obj.title.split(" ")[0] + " " + obj.title.split(" ")[1] + " " + obj.title.split(" ")[2]} </div>
                                    <div>${obj.price}$</div>
                                  </div>`

        });

        lastrowEl.innerHTML=`  <div>Total</div>
        <div>${tprice}$/-</div>`
    }
}
show_cart_item()

function remove_cart(el,id)
{
    // el.remove()
    console.log(id)
    let cart_arr=JSON.parse(localStorage.getItem("cart_arr"))||[];
    // cart_arr.forEach((obj,idx)=>{
    //     if(obj.id=id)
    //     {
    //         cart_arr.splice(idx , 1);

    //     }
        
    // })

    for(let i=0; i<cart_arr.length; i++)
    {
        if(cart_arr[i].id == id)
        {
            cart_arr.splice(i , 1);
            break;

        }
    }
    localStorage.setItem("cart_arr",JSON.stringify(cart_arr));
    show_cart_item()
}


document.getElementById("chechoutbtn").addEventListener("click",()=>{
    let cart_arr = JSON.parse(localStorage.getItem("cart_arr"))||[];

    if(cart_arr.length==0)
    {
        alert("You did not select any item!")
    }else{
        alert("item purchaed!")
        location.href="../razorpay/index.html"
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