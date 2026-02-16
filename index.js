// 1. ÚNICOS IMPORTS (Asegúrate de que las rutas coincidan con tus carpetas)
import { cargarPokedex } from "./js/cargarPokemon.js";
import { mostrarPokemon } from "./js/mostrarPokemon.js";
import { manejarPaginacion } from "./js/paginacion.js";
import { inicializarBuscador } from "./js/filtrarPokemon.js";
import { guardarEstado, state } from "./js/state.js";
import { renderPokedexLayout } from "./views/pokedex.js";
import { renderDetallePokemon } from "./js/detallePokemon.js"; // Verifica que el archivo esté en /js/
import { saveState, getState } from "./js/localStore.js";

const mainContent = document.getElementById("main-content");
const worker = new Worker('./js/pokemonWorker.js'); 

// --- FUNCIÓN DE CARGA ---
async function iniciarCargaPokemon() {
    const datosGuardados = getState('pokedex_data');

    if (datosGuardados && datosGuardados.length > 0) {
        console.log("Cargando desde caché local...");
        state.datosMaestros = datosGuardados;
        worker.postMessage({ tipo: 'GUARDAR_LISTA', lista: state.datosMaestros });
        manejarPaginacion(state.datosMaestros, mostrarPokemon, worker);
        return; 
    }
    
    console.log("Disco vacío, iniciando descarga desde API...");
    mostrarPokemon([], true); 

    try {
        const timeout = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Timeout")), 15000)
        );

        const datosSucios = await Promise.race([cargarPokedex(), timeout]);

        if (datosSucios && datosSucios.length > 0) {
            state.datosMaestros = datosSucios.map(p => ({
                id: p.id,
                name: p.name,
                sprites: { front_default: p.sprites.front_default },
                types: p.types 
            }));

            saveState('pokedex_data', state.datosMaestros);
            worker.postMessage({ tipo: 'GUARDAR_LISTA', lista: state.datosMaestros });
            manejarPaginacion(state.datosMaestros, mostrarPokemon, worker);
        }
    } catch (error) {
        console.error("Fallo total de carga:", error);
        const pokedexContenedor = document.getElementById("pokedex");
        if (pokedexContenedor) {
            pokedexContenedor.innerHTML = `<p>Error al conectar con el servidor.</p>`;
        }
    }
}

// --- NAVEGACIÓN ---
async function navegar(ruta) {
    state.vistaActual = ruta; 
    guardarEstado();
    mainContent.innerHTML = ""; 

    if (ruta === "home") {
        mainContent.innerHTML = `
            <div style="text-align: center; margin-top: 50px;">
                <h1>Bienvenido a la PokeApp</h1>
                <button id="btn-explorar" style="padding: 10px 20px; cursor:pointer;">Ir a la Pokedex</button>
            </div>`;
        document.getElementById("btn-explorar").onclick = () => navegar("pokedex");
    } 
    else if (ruta === "pokedex") {
        mainContent.innerHTML = renderPokedexLayout(); 
        iniciarCargaPokemon(); 
        
        inicializarBuscador(state.datosMaestros, (listaFiltrada) => {
            const paginacionDiv = document.getElementById("paginacion");
            if (listaFiltrada.length !== state.datosMaestros.length) {
                mostrarPokemon(listaFiltrada);
                if (paginacionDiv) paginacionDiv.innerHTML = "";
            } else {
                manejarPaginacion(state.datosMaestros, mostrarPokemon, worker);
            }
        });
    }
}

// --- VISTA DE DETALLE (Disponible globalmente) ---
window.verDetalle = async (id) => {
    const mainContent = document.getElementById("main-content");
    // Mostramos un mensaje de carga mientras traemos los datos extras
    mainContent.innerHTML = "<div style='text-align:center; padding:50px;'><h2>Cargando información detallada...</h2></div>";

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error("No se encontró el Pokémon");
        const data = await response.json();
        
        mainContent.innerHTML = renderDetallePokemon(data);
        
        state.vistaActual = `detalle-${id}`;
        guardarEstado();
    } catch (error) {
        console.error("Error al cargar detalle:", error);
        mainContent.innerHTML = "<div style='text-align:center;'><h2>⚠️ Error al cargar detalles.</h2><button onclick='window.navegar(\"pokedex\")'>Volver</button></div>";
    }
};

// index.js

// Función para aplicar el tema visualmente
function aplicarTema() {
    const btnDark = document.getElementById("btn-dark");
    
    if (state.modoOscuro) {
        // MODO OSCURO ACTIVO
        document.body.classList.add('dark-mode');
        if (btnDark) {
            btnDark.innerHTML = "☀️"; // Mostramos el Sol para volver a la luz
            btnDark.title = "Cambiar a modo claro";
        }
    } else {
        // MODO CLARO ACTIVO
        document.body.classList.remove('dark-mode');
        if (btnDark) {
            btnDark.innerHTML = "🌙"; // Mostramos la Luna para ir a la sombra
            btnDark.title = "Cambiar a modo oscuro";
        }
    }
}

// Agregamos el listener al botón (asumiendo que tienes un id="btn-dark")
const btnDark = document.getElementById("btn-dark");
if (btnDark) {
    btnDark.onclick = () => {
        state.modoOscuro = !state.modoOscuro; // Cambiamos el booleano
        aplicarTema(); // Cambiamos el CSS
        guardarEstado(); // Guardamos en localStorage
    };
}

// Al arrancar la App, aplicamos el tema guardado
aplicarTema();





// --- GLOBALES Y LISTENERS ---
window.navegar = navegar;
document.getElementById("nav-home").onclick = (e) => { e.preventDefault(); navegar("home"); };
document.getElementById("nav-pokedex").onclick = (e) => { e.preventDefault(); navegar("pokedex"); };

// ARRANQUE
navegar(state.vistaActual || "home");