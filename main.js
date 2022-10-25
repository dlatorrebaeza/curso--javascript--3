/* SUPERMERCADOS DUMBO - CARRITO DE COMPRAS */

class Producto {
  constructor(id, nombre, precio, img) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
    this.cantidad = 1;
  }
}

const pan = new Producto(1, "Pan", 2300, "img/pan.jpg");
const jamon = new Producto(2, "Jamon", 2750, "img/jamon.jpg");
const queso = new Producto(3, "Queso", 2500, "img/queso.jpg");
const mantequilla = new Producto(4, "Mantequilla", 3500, "img/mantequilla.jpg");
const manjar = new Producto(5, "Manjar", 2500, "img/manjar.jpg");
const mermelada = new Producto(6, "Mermelada", 2700, "img/mermelada.jpg");
const pate = new Producto(7, "Paté", 1700, "img/pate.jpg");
const te = new Producto(8, "Té", 2600, "img/te.jpg");
const cafe = new Producto(9, "Café", 2900, "img/cafe.jpg");
const azucar = new Producto(10, "Azúcar", 4200, "img/azucar.jpg");
const leche = new Producto(11, "Leche", 1800, "img/leche.jpg");
const huevos = new Producto(12, "Huevos", 3200, "img/huevos.jpg");

const productos = [pan, jamon, queso, mantequilla, manjar, mermelada, pate, te, cafe, azucar, leche, huevos];

let carrito = [];
if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

const almacenadorProductos = document.getElementById("almacenadorProductos");

const exhibirProductos = () => {
  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("col-xl-2", "col-md-6", "col-xs-12");
    card.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio}</p>
                    <a href="#" class="btn btn-primary" id="boton${producto.id}">Agregar a tu Compra</a>
                </div>
            </div>
        `;

    almacenadorProductos.appendChild(card);

    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
      sumarAlCarrito(producto.id);
    });
  });
};

exhibirProductos();

const sumarAlCarrito = (id) => {
  const producto = productos.find((producto) => producto.id === id);
  const productoEnCarrito = carrito.find((producto) => producto.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push(producto);

    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  verCarrito();
  calcularTotal();
};

const almacenadorCarrito = document.getElementById("almacenadorCarrito");
const mostrarCarrito = document.getElementById("verCarrito");

mostrarCarrito.addEventListener("click", () => {
    verCarrito();
})

const verCarrito = () => {
    almacenadorCarrito.innerHTML="";
    carrito.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add();
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre} </h5>
                    <p class="card-text">$${producto.precio}</p>
                    <p class="card-text">Cantidad: ${producto.cantidad}</p>
                    <button class="btn btn-primary" id="eliminar${producto.id}"> Eliminar Producto </button>
                </div>
            </div>
        `
    almacenadorCarrito.appendChild(card);
    
    const boton = document.getElementById(`eliminar${producto.id}`);
    boton.addEventListener("click", () => {
        sacarDelCarrito(producto.id);
    })


    })
    calcularTotal();
}

const sacarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    verCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarCarrito();
})

const eliminarCarrito = () => {
    carrito = [];
    verCarrito();

    localStorage.clear();
}

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach((producto) => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `$${totalCompra}`;
}