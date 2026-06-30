// MENÚ HAMBURGUESA
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navLinks.classList.toggle('open');
});


// APERTURA Y CIERRE DEL DRAWER
const cartBtn = document.getElementById('cartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');

// Abrir Carrito
cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
});

// Cerrar Carrito
[closeCartBtn, cartOverlay].forEach(elemento => {
    elemento.addEventListener('click', () => {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('open');
    });
});


// LÓGICA DEL CARRITO Y LOCALSTORAGE
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const cartBadge = document.getElementById('cartBadge');
const cartBody = document.getElementById('cartBody');
const cartTotal = document.getElementById('cartTotal');

function actualizarInterfazCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));

    let totalItems = 0;
    let precioTotal = 0;

    cartBody.innerHTML = '';

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

        // Actualizar cantidad de ítems
        cartBadge.textContent = totalItems;
        cartBadge.style.display = 'flex';
    }

    cartTotal.textContent = `$${precioTotal.toLocaleString('es-AR')}`;
}

// Botones +/- de las filas del carrito
window.cambiarCantidad = function(id, cambio) {
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        producto.cantidad += cambio;
        
        if (producto.cantidad <= 0) {
            carrito = carrito.filter(item => item.id !== id);
        }
        
        actualizarInterfazCarrito();
    }
}

// Eliminar todo un producto del carrito
window.eliminarProducto = function(id) {
    carrito = carrito.filter(item => item.id !== id);
    
    actualizarInterfazCarrito();
}


// TOAST (SUCCESS / ERROR)
function mostrarToast(mensaje, tipo = 'success') {
    const toastElement = document.getElementById("toast");
    const toastSpan = document.getElementById("toast-mensaje");
    
    if (toastElement && toastSpan) {
        toastSpan.textContent = mensaje;
        
        toastElement.classList.remove("visible", "error");
        
        const svgViejo = toastElement.querySelector("svg");
        
        if (tipo === 'error') {
            toastElement.classList.add("error");
            svgViejo.outerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
            `;
        } else {
            svgViejo.outerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            `;
        }

        toastElement.classList.add("visible");
        setTimeout(ocultarToast, 3000);
    }
}

function ocultarToast() {
    const toastElement = document.getElementById("toast");
    if (toastElement) {
        toastElement.classList.remove("visible");
    }
}


// CARGA DINÁMICA DESDE JSON
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
                    <p>${planta.descripcion} <span class="ver-detalles-link" style="color: #2d5a1b; cursor: pointer; text-decoration: underline; font-weight: 500; font-size: 1.3rem; display: inline-block;">Ver más</span></p>
                    <div class="producto-footer">
                        <p>$${planta.precio}</p>
                        <button class="btn-agregar">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"/></svg>
                            Agregar
                        </button>
                    </div>
                </div>
            `;
            
            productosContainer.appendChild(card);

            const linkVerMas = card.querySelector('.ver-detalles-link');
            linkVerMas.addEventListener('click', () => {
                abrirModalProducto(planta);
            });

            const botonAgregar = card.querySelector('.btn-agregar');
            botonAgregar.addEventListener('click', () => {
                const productoExistente = carrito.find(item => item.id === planta.id);
                
                if (productoExistente) {
                    productoExistente.cantidad++;
                } else {
                    carrito.push({ ...planta, cantidad: 1 });
                }
                
                actualizarInterfazCarrito();
                mostrarToast(`¡${planta.nombre} agregada al carrito!`);
            });
        });
    })
    .catch(error => console.error('Ups! Algo falló al cargar los productos:', error));

actualizarInterfazCarrito();


// VALIDACIÓN DE FORMULARIO Y SESSIONSTORAGE
const contactoForm = document.querySelector('.contacto-form');
const inputNombre = document.getElementById('nombre');
const inputEmail = document.getElementById('email');
const inputMensaje = document.getElementById('mensaje');

if (contactoForm) {
    inputNombre.value = sessionStorage.getItem('form_nombre') || '';
    inputEmail.value = sessionStorage.getItem('form_email') || '';
    inputMensaje.value = sessionStorage.getItem('form_mensaje') || '';

    inputNombre.addEventListener('input', () => sessionStorage.setItem('form_nombre', inputNombre.value));
    inputEmail.addEventListener('input', () => sessionStorage.setItem('form_email', inputEmail.value));
    inputMensaje.addEventListener('input', () => sessionStorage.setItem('form_mensaje', inputMensaje.value));

    contactoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombreVal = inputNombre.value.trim();
        const emailVal = inputEmail.value.trim();
        const mensajeVal = inputMensaje.value.trim();

        if (nombreVal.length < 3) {
            mostrarToast('Por favor, ingresá tu nombre completo (mínimo 3 letras).', 'error');
            inputNombre.focus();
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal)) {
            mostrarToast('Por favor, ingresá un correo electrónico válido.', 'error');
            inputEmail.focus();
            return;
        }

        if (mensajeVal.length < 10) {
            mostrarToast('El mensaje es muy corto. Contanos un poco más (mínimo 10 caracteres).', 'error');
            inputMensaje.focus();
            return;
        }

        mostrarToast('¡Mensaje enviado con éxito! Nos contactaremos pronto.');

        contactoForm.reset();
        sessionStorage.removeItem('form_nombre');
        sessionStorage.removeItem('form_email');
        sessionStorage.removeItem('form_mensaje');
    });
}

// MODAL
const productModal = document.getElementById('productModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalContent = document.getElementById('modalContent');

function abrirModalProducto(planta) {
    if (productModal && modalContent) {
        modalContent.innerHTML = `
            <div class="modal-detalle">
                <img src="${planta.imagen}" alt="${planta.nombre}" class="modal-detalle-img">
                <div class="modal-detalle-info">
                    <h2 style="font-family: 'Playfair Display', serif; color: #1e3d14; font-size: 2.8rem;">${planta.nombre}</h2>
                    <p style="font-size: 1.8rem; font-weight: 600; color: #2d5a1b; margin-bottom: 0.5rem;">$${planta.precio}</p>
                    <p style="color: #555; line-height: 1.6; font-size: 1.4rem;">${planta.descripcion} Es una opción perfecta para darle vida y frescura a tu entorno, adaptándose de manera excelente al espacio y destacando por su belleza natural.</p>
                    
                    <div style="margin-top: 1rem; padding-top: 1.5rem; border-top: 1px solid rgba(45, 90, 27, 0.1); font-size: 1.3rem; color: #666; display: flex; flex-direction: column; gap: 0.6rem;">
                        <span>☀️ <strong>Luz:</strong> Luz indirecta brillante o semisombra.</span>
                        <span>💧 <strong>Riego:</strong> Moderado, esperar a que el sustrato se seque.</span>
                        <span>🏡 <strong>Ambiente:</strong> Excelente adaptación en interiores ventilados.</span>
                    </div>
                </div>
            </div>
        `;
        
        productModal.classList.add('open');
    }
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        productModal.classList.remove('open');
    });
}

window.addEventListener('click', (e) => {
    if (e.target === productModal) {
        productModal.classList.remove('open');
    }
});