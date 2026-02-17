# Pokeapi-v1 — Pokedex de Alto

**Pokeapi-v1** es una Single Page Application (SPA) desarrollada con **JavaScript Vanilla (ES6 Modules)** que ofrece una experiencia rápida, fluida y moderna para explorar el mundo Pokémon.

Este proyecto no solo consume datos, sino que implementa técnicas avanzadas de:

- Optimización de rendimiento
- Manejo de estado
- Persistencia local
- Procesamiento multihilo
- Experiencia de usuario moderna

---

## Características Principales

### Arquitectura SPA Pura
- Navegación sin recargas de página  
- Sistema de rutas personalizado  
- Control manual del renderizado del DOM  

---

### ⚡ Multihilo con Web Workers
- Procesamiento de **1000+ Pokémon** fuera del hilo principal  
- UI siempre fluida  
- Paginación y filtrado optimizados  

---

### 🌙 Modo Oscuro Nativo
- Implementado con **CSS Variables**
- Persistencia en localStorage
- Cambio instantáneo sin recargar

---

### Sistema de Caché Inteligente
- Datos guardados en localStorage
- Evita múltiples llamadas a la API
- Carga instantánea en visitas posteriores

---

### Diseño Responsive
Grid dinámico adaptable a:

- 🖥 Desktop → 10 columnas  
- 💻 Laptop → 5 columnas  
- 📱 Tablet → 4 columnas  
- 📲 Mobile → 3 columnas  

---

## Experiencia de Usuario (UX)

### Skeleton Loading
- Animaciones shimmer
- Sensación de carga instantánea

---

### Buscador Inteligente
Permite buscar por:

- Nombre  
- ID  
- Tipo  
- Traducción Español → Inglés  

---

### Vista Detallada
Incluye:

- Sprites normal y shiny  
- Estadísticas base  
- Información técnica  

---

## Stack Tecnológico

### Lenguaje
- JavaScript ES6 Modules

### Estilos
- CSS3
- CSS Variables
- Animaciones Keyframes

### API
- PokeAPI

### Optimización
- Web Workers
- Batching de requests
- Cache LocalStorage

---

## Arquitectura de Optimización — Web Workers

Para evitar bloqueos en la interfaz:

### Separación de Hilos
- UI Thread → Renderizado + Eventos
- Worker Thread → Procesamiento de datos

---

### Gestión de Lista Maestra
El Worker mantiene en memoria los 1000 Pokémon completos.

---

### 📄 Paginación Eficiente
Solo se envían **50 Pokémon por página** al hilo principal.

---

### Comunicación Asíncrona
Se implementa usando la API nativa de Web Workers:

- postMessage() → Enviar datos entre hilos  
- onmessage → Recibir datos procesados  

Esto permite que el procesamiento de datos ocurra fuera del hilo principal sin bloquear la interfaz.

---

##  Beneficios Técnicos

✅ Input sin latencia  
✅ Scroll fluido  
✅ Animaciones a 60 FPS  
✅ Bajo uso del DOM  
✅ Menor consumo de red  

---

## 🗂 Gestión de Estado y Persistencia

### Estado Centralizado (`state.js`)
Controla:
- Página actual  
- Vista actual  
- Modo oscuro  
- Datos maestros  

---

### Persistencia (`localStore.js`)

Permite:

- Recuperar sesión
- Mantener configuración del usuario
- Cachear datos de la Pokedex

---

### Instalación y Uso

### 1️⃣ Clonar repositorio
```bash
git clone 
