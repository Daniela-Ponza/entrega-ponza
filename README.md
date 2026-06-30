# 🌿 Raíces Verdes — Vivero & Jardinería

Proyecto final desarrollado para el curso de **Desarrollo Web Front-End** de **Talento Tech** (Edición 2026).

---

## 📄 Descripción General

**Raíces Verdes** es una plataforma de e-commerce enfocada en la venta de plantas de interior, exterior y accesorios de jardinería. Tras una primera etapa dedicada exclusivamente a la maquetación estructural y de estilos, esta entrega final consolida el sitio como una **aplicación web interactiva completa** utilizando **JavaScript Vanilla** para controlar el estado, persistir datos y refinar la experiencia de usuario (UX).

---

## 🚀 Novedades de esta Entrega (Implementación de JavaScript)

En esta fase se transformó el sitio estático en una experiencia dinámica mediante los siguientes bloques funcionales:

1. **Renderizado Dinámico:** Los productos ya no están escritos en el HTML. Se consumen mediante la API Fetch desde un archivo estructurado `productos.json` y se dibujan dinámicamente en el DOM.
2. **Carrito de Compras con Persistencia (`LocalStorage`):** Flujo completo de agregar productos, cálculo de totales en tiempo real, actualización de contadores y almacenamiento persistente para que el usuario no pierda su compra al cerrar o recargar el sitio.
3. **Modal de Vista Rápida:** Un componente modal interactivo que procesa dinámicamente la información extendida de cada planta (cuidados de luz, riego y ambiente) optimizado para dispositivos móviles con scroll interno.
4. **Borrador Resiliente de Formulario (`SessionStorage`):** Salvaguarda en tiempo real de los datos del formulario de contacto para evitar la pérdida de información ante recargas accidentales de la página.
5. **Validación de Frontend y Componente Toast Multiestado:** Sistema unificado de alertas personalizadas para feedback del usuario. Reemplaza las alertas nativas del navegador por un componente propio que muta de aspecto según el contexto (Éxito en verde con tilde / Error en rojo con cruz).

---

## 🛠️ Tecnologías y Conceptos Aplicados

- **Estructura y Estilos:** HTML5 Semántico, CSS3 Puro (Custom Variables, Flexbox, CSS Grid y Media Queries).
- **Manipulación del DOM:** Selección, creación e inyección dinámica de elementos basados en eventos del usuario.
- **Asincronismo:** Uso de `fetch()` y Promesas para la simulación de carga de servicios externos.
- **Web Storage API:** Diferenciación estratégica entre `localStorage` (para el ciclo de vida del carrito) y `sessionStorage` (para datos efímeros del formulario).

---

## 📋 Guía de Pruebas / Instrucciones de Uso

Para facilitar la corrección y asegurar la evaluación de todas las interacciones de JavaScript, se sugiere seguir esta hoja de ruta de pruebas en el navegador:

### 1. Flujo del Catálogo y Vista Rápida (Modales)
* **Acción:** Dirigirse a la sección de productos y hacer clic en el enlace **"Ver más"** integrado en la descripción de cualquier tarjeta de planta.
* **Qué observar:** Se abrirá una ventana modal flotante con efecto difuminado de fondo (`backdrop-filter`). El modal renderiza la ficha técnica de cuidados específicos (Sol, Riego, Ambiente) correspondientes a *esa* planta en particular.
* **Prueba Mobile:** Si se reduce la pantalla a tamaño celular o se inspecciona en modo responsive, notarás que el modal se adapta verticalmente, limitando su altura máxima (`max-height: 85vh`) y habilitando un scroll interno para que el botón de cierre ("X") nunca quede fuera del alcance del usuario.
* **Cierre:** Se puede cerrar haciendo clic en la "X" o cliqueando en cualquier parte oscura fuera de la caja blanca del producto.

### 2. Flujo del Carrito de Compras (`LocalStorage`)
* **Acción:** Hacer clic en el botón **"Agregar"** de una o varias plantas.
* **Qué observar:** 1. Se disparará una notificación **Toast de Éxito** (color verde con ícono de tilde) confirmando la acción con el nombre de la planta elegida.
  2. El contador del ícono del carrito en el header se actualizará al instante.
* **Acción:** Hacer clic en el ícono del carrito en el encabezado.
* **Qué observar:** Se desplegará un menú lateral interactivo (*Drawer*) que lista los ítems seleccionados, permite ver sus cantidades y calcula el total de la compra automáticamente.
* **Prueba de Persistencia:** Agregar productos, cerrar la pestaña o presionar `F5` para recargar la página. Al volver, el carrito mantendrá intacto su estado y sus productos gracias al almacenamiento en `localStorage`.

### 3. Flujo del Formulario de Contacto (Validación y `SessionStorage`)
* **Acción (Prueba de Resiliencia):** Ir al formulario de contacto abajo de todo. Escribir datos en el campo de Nombre y Mensaje, pero **no** enviar. Presionar `F5` para recargar la página.
* **Qué observar:** Los textos permanecen escritos en sus respectivos campos de entrada, ya que JavaScript captura el evento `input` y los aloja temporalmente en el `sessionStorage`.
* **Acción (Prueba de Error):** Intentar enviar el formulario vacío o con un correo mal estructurado (sin el `@` o el `.com`).
* **Qué observar:** Se ha anulado la validación nativa del navegador (`novalidate`) para dar paso a la lógica propia de JS. El sistema bloqueará el envío y disparará el **Toast de Error** en una paleta roja con el ícono de una Cruz (`X`), haciendo foco automático (`.focus()`) en el campo que se debe corregir.
* **Acción (Prueba de Éxito):** Completar los campos correctamente y presionar "Enviar mensaje".
* **Qué observar:** Se muestra el Toast verde de éxito, se limpia por completo el formulario en pantalla y se destruye el borrador temporal de la sesión para dejar el formulario listo para una nueva consulta.

### 4. Menú Navegación Mobile
* **Acción:** En resoluciones menores a `768px`, hacer clic en el botón de tres líneas (menú hamburguesa) situado en el header.
* **Qué observar:** El menú cambia su estado visual cruzando las líneas para formar una "X" mediante transiciones de CSS puro, mientras despliega o repliega suavemente los enlaces de navegación por medio de clases dinámicas controladas por JS.

---

## 🤖 Uso de Inteligencia Artificial

Durante las distintas etapas de desarrollo se consultaron herramientas de IA como soporte técnico y estratégico en escenarios específicos:
- Estructuración semántica y optimización del menú hamburguesa en mobile utilizando CSS puro.
- Buenas prácticas de UX/UI aplicadas a la lógica de borrado de formularios con `sessionStorage` y refactorización del componente Toast dinámico para aceptar múltiples estados visuales (success/error).
- Estrategias de contención de layout adaptativo (`overflow` y unidades `vh`) para modales en entornos mobile.

*Todo el código sugerido fue analizado, adaptado y escrito manualmente, garantizando la total comprensión de la lógica implementada.*

---

## 👤 Autor

Desarrollado con dedicación por **Daniela Ponza** — Talento Tech, 2026.