const openShopping = document.querySelector('.shopping')
const closeShopping = document.querySelector('.close-shopping')
const list = document.querySelector('.list')
const listCart = document.querySelector('.list-cart')
const total = document.querySelector('.total')
const body = document.querySelector('body')
const quantity = document.querySelector('.quantity')

openShopping.addEventListener('click', () => {
  body.classList.add('active')
})
closeShopping.addEventListener('click', () => {
  body.classList.remove('active')
})

let products = [

  {
    id: 1,
    name: "GIGABYTE GeForce RTX 4090 GAMING OC",
    images: "NVIDIA-RTX-4090.png",
    price: 250000
  },

  {
    id: 2,
    name: "Ryzen 9 5950X OEM",
    images: "RYZEN-9-5950X.webp",
    price: 27500
  },

  {
    id: 3,
    name: "ASUS ROG STRI B550-XE GAMING WIFI",
    images: "ASUS-ROG-STRI-B550-XE-GAMING-WIFI.webp",
    price: 37150
  },

  {
    id: 4,
    name: "Система охлаждения DEEPCOOL LS720",
    images: "DEEPCOOL-LS720.webp",
    price: 12150
  },

  {
    id: 5,
    name: "G.Skill TRIDENT Z Neo 32ГБ",
    images: "G.Skill TRIDENT Z Neo-32gb.webp",
    price: 25999
  },

  {
    id: 6,
    name: "Корпус LIAN-LI-PC-O1-Dynamic-XL-ROG-Certify белый",
    images: "LIAN-LI-PC-O1-Dynamic-XL-ROG-Certify.webp",
    price: 8999
  },
  {
    id: 7,
    name: "1000 ГБ SSD M.2 накопитель Samsung 980 PRO",
    images: "Samsung-980-PRO.webp",
    price: 13199
  },
  {
    id: 8,
    name: "Блок питания DeepCool PX1000G",
    images: "DeepCool-PX1000G.webp",
    price: 12199
  }

]

const listCarts = []

const addToCart = (key) => {
  if (listCarts[key] == null) {
    listCarts[key] = JSON.parse(JSON.stringify(products[key]))
    listCarts[key].quantity = 1
  }

  reloadCart()
}

const initApp = () => {
  products.forEach((value, key) => {
    let newDiv = document.createElement('div')
    newDiv.classList.add('item')
    newDiv.innerHTML = `
    
    <img src="../img/${value.images}">
    <div class="title">${value.name}</div>
    <div class="price">${value.price.toLocaleString()}₽</div>
    <button onclick="addToCart(${key})">Add To Cart</button>

    `

    list.appendChild(newDiv)
  })
}

initApp()

const reloadCart = () => {
  listCart.innerHTML = ''
  let totalPrice = 0;
  let totalQuantity = 0;

  listCarts.forEach((value, key) => {
    totalPrice += value.price 
    totalQuantity += value.quantity
    if (value !== null) {
      let newLi = document.createElement('li')
      newLi.innerHTML = `
      
      <div><img src="../img/${value.images}"></div>
      <div class="cart-title">${value.name}</div>
      <div class="cart-price">${value.price.toLocaleString()}</div>

      <div>
        <button style="background-color: rgb(134, 51, 155)"
        class="cartButton" onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
        <div class="count">${value.quantity}</div>
        <button style="background-color: rgb(134, 51, 155)"
        class="cartButton" onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
      </div>

      `
      listCart.appendChild(newLi)
    }
  })

  total.textContent = totalPrice.toLocaleString()
  quantity.textContent = totalQuantity
}

const changeQuantity = (key, quantity) => {
  if (quantity == 0) {
    listCarts.splice(key, 1)
  } else {
    listCarts[key].quantity = quantity;
    listCarts[key].price = quantity * products[key].price
  }

  reloadCart()
};