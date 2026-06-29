// ==========================================
// 1. BLOQUE: MENÚ HAMBURGUESA (MOBILE)
// ==========================================
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navLinks.classList.toggle('open');
});


// ==========================================
// 2. BLOQUE: APERTURA Y CIERRE DEL DRAWER
// ==========================================
const cartBtn = document.getElementById('cartBtn'); // Botón de tu header
const closeCartBtn = document.getElementById('closeCartBtn'); // Cruz de cierre
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');

// Abrir Carrito
cartBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Evita que la página salte arriba al hacer click en el enlace
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
});

// Cerrar Carrito (ya sea desde la cruz o tocando el fondo oscuro)
[closeCartBtn, cartOverlay].forEach(elemento => {
    elemento.addEventListener('click', () => {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('open');
    });
});


// ==========================================
// 3. BLOQUE: LÓGICA DEL CARRITO Y LOCALSTORAGE
// ==========================================
// 🌟 CLAVE: Intentamos levantar el carrito guardado previamente. Si no hay nada, empieza vacío []
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const cartBadge = document.getElementById('cartBadge');
const cartBody = document.getElementById('cartBody');
const cartTotal = document.getElementById('cartTotal');

// Función centralizada para actualizar toda la interfaz del carrito
function actualizarInterfazCarrito() {
    // A. Guardar el estado actual en LocalStorage convirtiéndolo a Texto plano
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // B. Calcular totales
    let totalItems = 0;
    let precioTotal = 0;

    cartBody.innerHTML = ''; // Limpiamos el interior del drawer para renderizar de cero

    if (carrito.length === 0) {
        cartBody.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío.</p>';
        cartBadge.style.display = 'none';
    } else {
        carrito.forEach(item => {
            totalItems += item.cantidad;
            
            const precioNumerico = parseFloat(item.precio.replace('.', ''));
            precioTotal += precioNumerico * item.cantidad;

            const fila = document.createElement('div');
            fila.classList.add('cart-item');
            fila.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4>${item.nombre}</h4>
                    <p>$${item.precio}</p>
                    <div class="cart-item-controles">
                        <button onclick="cambiarCantidad(${item.id}, -1)">-</button>
                        <span>${item.cantidad}</span>
                        <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
                    </div>
                </div>
                
                <button class="btn-eliminar-item" onclick="eliminarProducto(${item.id})" title="Eliminar producto">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            `;
            cartBody.appendChild(fila);
        });

        // Actualizamos el globito del header
        cartBadge.textContent = totalItems;
        cartBadge.style.display = 'flex';
    }

    // Actualizamos el precio total formateado en pantalla
    cartTotal.textContent = `$${precioTotal.toLocaleString('es-AR')}`;
}

// Función global vinculada a los botones +/- de las filas del carrito
window.cambiarCantidad = function(id, cambio) {
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        producto.cantidad += cambio;
        
        // Si el usuario bajó la cantidad a 0, lo eliminamos por completo del array
        if (producto.cantidad <= 0) {
            carrito = carrito.filter(item => item.id !== id);
        }
        
        actualizarInterfazCarrito(); // Guardamos y redibujamos
    }
}

// Función global para eliminar todo un producto del carrito usando filter
window.eliminarProducto = function(id) {
    // Nos quedamos únicamente con los productos que NO coincidan con el ID que queremos borrar
    carrito = carrito.filter(item => item.id !== id);
    
    // Guardamos en LocalStorage y redibujamos la interfaz
    actualizarInterfazCarrito();
}


// ==========================================
// 4. BLOQUE: COMPONENTE TOAST (NOTIFICACIÓN)
// ==========================================
function mostrarToast(mensaje) {
    const toastElement = document.getElementById("toast");
    const toastSpan = document.getElementById("toast-mensaje");
    
    if (toastElement && toastSpan) {
        toastSpan.textContent = mensaje;
        toastElement.classList.add("visible");
        setTimeout(ocultarToast, 2500);
    }
}

function ocultarToast() {
    const toastElement = document.getElementById("toast");
    if (toastElement) {
        toastElement.classList.remove("visible");
    }
}


// ==========================================
// 5. BLOQUE: CARGA DINÁMICA DESDE JSON
// ==========================================
const productosContainer = document.getElementById('productosContainer');

fetch('data/productos.json')
    .then(response => response.json())
    .then(plantas => {
        plantas.forEach(planta => {
            const card = document.createElement('article');
            card.classList.add('producto-card');
            
            card.innerHTML = `
                <img src="${planta.imagen}" alt="${planta.nombre}" class="producto-img">
                <div class="producto-cuerpo">
                    <h3>${planta.nombre}</h3>
                    <p>${planta.descripcion}</p>
                    <div class="producto-footer">
                        <p>$${planta.precio}</p>
                        <button class="btn-agregar">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                            Agregar
                        </button>
                    </div>
                </div>
            `;
            
            productosContainer.appendChild(card);

            const botonAgregar = card.querySelector('.btn-agregar');
            botonAgregar.addEventListener('click', () => {
                // LÓGICA DE AGREGADO DE PRODUCTOS AL ARRAY
                const productoExistente = carrito.find(item => item.id === planta.id);
                
                if (productoExistente) {
                    productoExistente.cantidad++;
                } else {
                    // Copiamos las propiedades de la planta e inicializamos su cantidad en 1
                    carrito.push({ ...planta, cantidad: 1 });
                }
                
                // Ejecutamos la sincronización de pantalla y almacenamiento
                actualizarInterfazCarrito();
                mostrarToast(`¡${planta.nombre} agregada al carrito!`);
            });
        });
    })
    .catch(error => console.error('Ups! Algo falló al cargar los productos:', error));

// 🌟 EJECUCIÓN INICIAL: Al cargar la página, dibuja el estado persistido en LocalStorage
actualizarInterfazCarrito();