# 🌿 Raíces Verdes — Vivero & Jardinería

Proyecto desarrollado como parte del curso de **Desarrollo Web Front-End** de **Talento Tech**.

---

## 📄 Descripción del proyecto

**Raíces Verdes** es la página de inicio de un ecommerce ficticio de plantas y jardinería. La idea es simular un vivero online donde los usuarios pueden explorar productos, leer reseñas de otros clientes y ponerse en contacto con el local.

El sitio incluye:
- **Hero/Banner** de bienvenida con descripción del negocio
- **Sección de productos** con cards de plantas disponibles
- **Sección de reseñas** de clientes
- **Sección de contacto** con formulario y mapa de Google Maps embebido
- **Footer** con links de navegación e información del negocio

Es un proyecto pensado para crecer: en futuras entregas se irán sumando más páginas, funcionalidades y estilos.

---

## 🛠️ Tecnologías utilizadas

- HTML5 semántico (`<header>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<nav>`)
- CSS3 (variables, Flexbox, Grid, media queries)
- Google Fonts (`Playfair Display` y `DM Sans`)

---

## 🧱 ¿Cómo está construido?

La estructura del sitio se organizó con **HTML semántico**, priorizando el uso correcto de las etiquetas para cada tipo de contenido.

Para los estilos se utilizó **CSS puro**, sin frameworks. Los principales recursos aplicados fueron:

- **CSS Grid** para organizar la grilla de cards de productos, testimonios y el layout de contacto
- **Flexbox** dentro de cada card para alinear imagen, texto y botones
- **Media queries** para adaptar el diseño a pantallas mobile (≤768px), donde el menú de navegación se oculta y aparece un botón hamburguesa
- **Google Fonts** con dos familias tipográficas declaradas en una sola línea del `<head>`

---

## 🤖 Uso de Inteligencia Artificial

Durante el desarrollo consulté herramientas de IA como apoyo puntual, no como reemplazo del trabajo propio. Algunos ejemplos concretos:

- **Cómo importar dos fuentes de Google Fonts en una sola línea** dentro del `<head>` del HTML
- **Cómo estructurar el menú hamburguesa en mobile**: dónde ubicar el ícono (a la derecha del carrito), cómo generarlo con CSS puro usando tres `<span>` vacíos sin ninguna imagen, y cómo organizarlo dentro del HTML para que el media query funcione correctamente
- **Dudas puntuales de CSS** sobre comportamiento de Flexbox y Grid en casos específicos

En todos los casos el código fue revisado, entendido e integrado manualmente al proyecto.

---

## ⚠️ Desafíos encontrados

- Entender cuándo conviene usar **Grid vs Flexbox** y cómo combinarlos (Grid para el layout general, Flex para el interior de cada componente)
- Lograr que el **menú de navegación funcione bien en ambas resoluciones**: en desktop con los links visibles, en mobile ocultándolos y mostrando el hamburguesa sin duplicar el carrito
- Mantener el CSS ordenado y sin reglas que se pisen entre sí a medida que el archivo fue creciendo

---

## 📋 Pendientes para la próxima entrega

- [ ] Integrar **Formspree** para simular el envío real del formulario de contacto
- [ ] Implementar la **acción del menú hamburguesa** en mobile con JavaScript (drawer lateral deslizante)

---

## 👤 Autor

Desarrollado por **Daniela Ponza** — Talento Tech, 2026