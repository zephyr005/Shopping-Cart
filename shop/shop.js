// const produtc = {
//   id: 1,
//   title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   price: 109.95,
//   description:"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   category: "men's clothing",
//   image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//   rating: { rate: 3.9, count: 120 },
// };




let user_arr = JSON.parse(localStorage.getItem("user_arr")) || [];
let curr_user = JSON.parse(localStorage.getItem("curr_user")) || [];

function z() {
  if (!user_arr || user_arr.length == 0) {
    alert("Sign up first!")
    location.href = "../signUp/sign-up.html"
  } else
    if (!curr_user || curr_user.length == 0) {
      alert("Login First!");
      location.href = "../login/login.html"
    }

}
z();


let modalEl = document.querySelector(".modal");
let errorEl = document.querySelector(".error");
let pendingEl = document.querySelector(".pending");


function random_color() {
  let color_arr = ["red", "blue", "green", "grey", "black"]
  let my_arr = [];
  while (my_arr.length != 3) {
    let i = Math.floor(Math.random() * color_arr.length);
    if (!my_arr.includes(color_arr[i])) {
      my_arr.push(color_arr[i]);

    }
  }
  return my_arr.sort();
}
function random_size() {
  let size = ["S", "M", "L", "XL"];
  let my_size_arr = [];
  while (my_size_arr.length != 3) {
    let i = Math.floor(Math.random() * size.length);
    if (!my_size_arr.includes(size[i])) {

      my_size_arr.push(size[i]);

    }

  }

  return my_size_arr.sort();
}

let product_arr;
function fetch_data() {
  fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      data.forEach(element => {
        element["color"] = random_color();
        element["size"] = random_size();
      });
      product_arr = [...data];
      localStorage.setItem("product_arr", JSON.stringify(product_arr))
      show_products(product_arr);

      modalEl.style.display = "none"
    }).catch((err) => {
      errorEl.innerHTML = err.message;
      errorEl.style.display = "block"
      pendingEl.style.display = "none"

      console.log("err is:", err);
    })
}

fetch_data()

let gridcontainer = document.querySelector(".grid-container")
function show_products(arr) {
  gridcontainer.innerHTML = "";
  arr.forEach((obj) => {
    gridcontainer.innerHTML += ` <div class="item">
          <img src="${obj.image}" alt="item-pic" />
          <div class="nameC">${obj.title}</div>
          <div class="info">
            <div class="row1">
              <div class="price">${obj.price}$</div>
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
          <button id="addBtn"onclick="add_in_cart(this,${obj.id})">Add to Cart</button>
          </div>`
  })
}


function add_in_cart(el, id) {

  el.innerHTML = "Added in Cart";
  el.classList.add("button-anim")
  setTimeout(() => el.classList.remove("button-anim"), 800)

  product_arr.forEach((obj) => {
    if (obj.id == id) {
      let cart_arr = localStorage.getItem("cart_arr");

      if (!cart_arr) {
        cart_arr = [obj];
      } else {
        cart_arr = JSON.parse(cart_arr);
        cart_arr.push(obj)
      }

      localStorage.setItem("cart_arr", JSON.stringify(cart_arr))
    }

  })
}


document.getElementById("searchIn").addEventListener("keyup", (e) => {
  console.log(e.target.value);
  let searchStr = e.target.value.toLowerCase().trim()



  let allItems = document.querySelectorAll(".item")
  // console.log(allItems[0].children[1])
  for (let i = 0; i < allItems.length; i++) {
    let prod_name = allItems[i].children[1].textContent.trim().toLowerCase();

    if (prod_name.includes(searchStr)) {
      allItems[i].style.display = "";
    } else {
      allItems[i].style.display = "none";
    }
  }
})

let allFilter = document.querySelectorAll(".filter")//target all filter class element

//filter by Men,WomenJwellary,Electronics
allFilter.forEach((el) => {

  el.addEventListener("click", (e) => {//e.target  and el are same element
    remove_checkbox()

    remove_active_class()
    e.target.classList.add("active")

    el.classList.add("button-anim")
    setTimeout(() => el.classList.remove("button-anim"), 700)

    console.log(e.target.textContent);
    if (e.target.textContent == "All") {
      show_products(product_arr);
    } else if (e.target.textContent == "Mens") {
      filter_the_product("men's clothing")

    } else if (e.target.textContent == "Womens") {
      filter_the_product("women's clothing")

    } else if (e.target.textContent == "Jewelery") {
      filter_the_product("jewelery")

    } else if (e.target.textContent == "Electronics") {
      filter_the_product("electronics")

    }
  })
})

function filter_the_product(mycategory) {
  let filter_arr = product_arr.filter((obj) => obj.category == mycategory);
  show_products(filter_arr);

}

function remove_active_class() {
  allFilter.forEach((div) => {
    // if (div.classList.contains("active")) {
    div.classList.remove("active")
    // }
  })
}





//filter based on color , size , Rating and Price Range

document.getElementById("apply_filter").addEventListener("click", () => {
  remove_active_class()
  allFilter[0].classList.add("active");

  let rangeInp = document.getElementById("range").value;

  let myobj = {
    mycolor: [],
    mysize: [],
    myrating: parseInt(rangeInp),
    myprice: []
  }

  let my_filtered_arr = []


  let color_Check = document.querySelectorAll("input[name='color']")
  for (let i = 0; i < color_Check.length; i++) {
    if (color_Check[i].checked) {
      myobj.mycolor.push(color_Check[i].id)
      // console.log("color:", color_Check[i].id)
    }
  }

  let size_Check = document.querySelectorAll("input[name='size']")
  for (let i = 0; i < size_Check.length; i++) {
    if (size_Check[i].checked) {

      myobj.mysize.push(size_Check[i].id)
      // console.log("size:", size_Check[i].id)
    }
  }



  let prange_Check = document.querySelectorAll("input[name='prange']")
  for (let i = 0; i < prange_Check.length; i++) {
    if (prange_Check[i].checked) {

      myobj.myprice.push(prange_Check[i].id)
      // console.log("size:", prange_Check[i].id)
    }
  }
  console.log(myobj);



  let product_arr = JSON.parse(localStorage.getItem("product_arr")) || []
  console.log(product_arr)

  for (let i = 0; i < product_arr.length; i++) {
    let obj = product_arr[i];

    let ct = 0;
    if (myobj.mycolor.length == 0) {
      ct++
    } else
      if (myobj.mycolor.includes(obj.color[0]) || myobj.mycolor.includes(obj.color[1]) || myobj.mycolor.includes(obj.color[2])) {
        ct++;
      }


    if (myobj.mysize.length == 0) {
      ct++;
    } else
      if (myobj.mysize.includes(obj.size[0]) || myobj.mysize.includes(obj.size[1]) || myobj.mysize.includes(obj.size[2])) {
        ct++
      }

    if (myobj.myprice.length == 0) {
      ct++;
    } else {
      for (let i = 0; i < myobj.myprice.length; i++) {
        let lo = parseFloat(myobj.myprice[i].split("-")[0])
        let hi = parseFloat(myobj.myprice[i].split("-")[1])
        // console.log(lo,hi)
        if (obj.price >= lo && obj.price <= hi) {
          ct++;
          break;
        }
      }
    }


    if (myobj.myrating == 0) {
      ct++;
    } else if (myobj.myrating == Math.floor(obj.rating.rate)) {
      ct++;
    }

    if (ct == 4) {
      console.log(obj)
      my_filtered_arr.push(obj)
    }

    console.log(ct)

  }


  show_products(my_filtered_arr);

})

//function to reset checked value and rang value,it will called inside apply filter by Men,WomenJwellary,Electronics
function remove_checkbox() {

  let all_checkBoxes = document.querySelectorAll("input[type='checkbox']");
  for (let ch of all_checkBoxes) {
    if (ch.checked) {
      ch.checked = false;
    }
  }
  let rangeInp = document.getElementById("range");
  rangeInp.value = "0"
}








document.querySelector("#my-icon").addEventListener("click", () => {

  if (document.querySelector("#my-icon").innerText == "menu") {
    document.querySelector("#my-icon").innerText = "close"
  } else {
    document.querySelector("#my-icon").innerText = "menu"

  }
  document.querySelector(".nav-left").classList.toggle("nav-left2");

})


document.getElementById("fold").addEventListener("click", () => {

  if (document.getElementById("fold").innerText == "unfold_less") {
    document.getElementById("fold").innerText = "unfold_more"
  } else {
    document.getElementById("fold").innerText = "unfold_less"
  }
  document.querySelector("aside").classList.toggle("filter-leftbar");

})