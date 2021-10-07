var data = [];

function loadprod() {
  var http = new XMLHttpRequest();
  http.open("GET", "data/product.json");
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = JSON.parse(this.response);
      console.log(result);
      data = result.products;
      //data.push(data)
    }

    //console.log(data)
    // console.log(products)
    BindItem(data);
  };
}
loadprod();

function BindItem(arr) {
  var temp = ``;
  arr.forEach((e) => {
    temp += `<div class="col-lg-4 d-flex align-items-stretch pt-4">
            <div class="card">
            <div class="card-body">
                <h2 class="card text"<b>Title : </b>${e.title}</h2>
                <h4 class="card-title">${e.id}</h4>
                <p class="card-text"<b>Price : </b> Rs. ${e.price}</p>
             <div class="img"><img src="${e.image}" /></div>
                <p class="card-text">Description : ${e.description}</p>
                <button class=" btn btn-success add-cart"  onclick="AddTocart(${e.id},${e.price})">Add To Cart</button>
            </div>
      
        </div></div>`;
  });
  var post = document.querySelector(".post");
  if (post) post.innerHTML = temp;
  //console.log("temp");
}

List = [];

function AddTocart(id, price) {
  var k = id + "," + price;
  var myObj = {
    id: id, //your  product id
    price: price, //your product price
  };
  List.push(myObj);
  console.log(JSON.stringify(List));
  localStorage.setItem("cart", JSON.stringify(List));

  let carts = document.querySelectorAll(".add-cart");

  for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener("click", () => {
      cartNumbers(data[i]);
      totalCost(data[i]);
    });
  }

  //updateCart()
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cart");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  console.log("the product clicked is", product);
  let productNumbers = localStorage.getItem("cart");

  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem("cart", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cart", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("dataInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.title] == undefined) {
      cartItems = {
        ...cartItems,
        [product.title]: product,
      };
    }
    cartItems[product.title].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.title]: product,
    };
    // console.log(cartItems1)
  }

  localStorage.setItem("dataInCart", JSON.stringify(cartItems));
}

/*function updateCart() {
    let cartString = localStorage.getItem("cart")
    let cart = JSON.parse(cartString)
    if (cart == null || cart.length == 0) {
        document.getElementsByClassName(".cart-items").innerHTML = ("(0)")
    } else {
        // document.getElementsByClass(".cart-items").innerHTML = (`${cart.length}`)
        $(".cart-items").html(`(${cart.length})`)
    }
}
*/
function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");
  console.log("My Cartcost is", cartCost);

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    console.log(typeof cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("dataInCart");
  cartItems = JSON.parse(cartItems);
  console.log(cartItems);
  let productContainer = document.querySelector(".products");
  if (cartItems && productContainer) {
    //console.log("running");
    productContainer.innerHTML = "";
    cartItems.map((item) => {
      console.log(item);
      productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle-outline"></ion-icon>
                <span>${item.price}</span>
                <span>${item.product}</span>
                <span>${item.total}</span>
                
            </div>
            `;
    });
  }
}
displayCart();

onLoadCartNumbers();
