import { cargarPokedex } from "./js/cargarPokemon.js";
import { mostrarPokemon } from "./js/mostrarPokemon.js";
import { manejarPaginacion } from "./js/paginacion.js";
import { inicializarBuscador } from "./js/filtrarPokemon.js";
import { guardarEstado, state } from "./js/state.js";
import { renderPokedexLayout } from "./views/pokedex.js";

const mainContent = document.getElementById("main-content");
const worker = new Worker('./js/pokemonWorker.js'); 

// --- FUNCIÓN DE CARGA (Ahora con el nombre que busca tu error) ---
// index.js
// index.js
import { saveState, getState } from "./js/localStore.js"; // Asegúrese de tener estas importaciones

async function iniciarCargaPokemon() {
    // 1. Intentamos recuperar los datos del localStorage primero
    const datosGuardados = getState('pokedex_data');

    if (datosGuardados && datosGuardados.length > 0) {
        console.log("Cargando desde caché local...");
        state.datosMaestros = datosGuardados;
        
        // Enviamos al worker y activamos paginación de inmediato
        worker.postMessage({ tipo: 'GUARDAR_LISTA', lista: state.datosMaestros });
        manejarPaginacion(state.datosMaestros, mostrarPokemon, worker);
        
        // IMPORTANTE: El return evita que se ejecute el resto de la función
        return; 
    }
    
    // 2. Si llegamos aquí es porque el disco estaba vacío (Primera vez)
    console.log("Disco vacío, iniciando descarga desde API...");
    mostrarPokemon([], true); // Activamos skeleton

    try {
        const timeout = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Timeout")), 15000)
        );

        // Descargamos los datos pesados
        const datosSucios = await Promise.race([cargarPokedex(), timeout]);

        if (datosSucios && datosSucios.length > 0) {
            // LIMPIEZA: Filtramos solo lo necesario para no saturar el espacio (Quota)
            state.datosMaestros = datosSucios.map(p => ({
                id: p.id,
                name: p.name,
                sprites: { front_default: p.sprites.front_default },
                types: p.types 
            }));

            // Guardamos la versión ligera en el disco para el próximo F5
            saveState('pokedex_data', state.datosMaestros);
            
            worker.postMessage({ tipo: 'GUARDAR_LISTA', lista: state.datosMaestros });
            manejarPaginacion(state.datosMaestros, mostrarPokemon, worker);
        }
    } catch (error) {
        console.error("Fallo total de carga:", error);
        const pokedexContenedor = document.getElementById("pokedex");
        if (pokedexContenedor) {
            pokedexContenedor.innerHTML = `<p>Error al conectar con el servidor. Reintenta.</p>`;
        }
    }
}
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

        // LLAMADA SINCRONIZADA: Ahora el nombre coincide con el error
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

// Event Listeners del Nav
document.getElementById("nav-home").onclick = (e) => { e.preventDefault(); navegar("home"); };
document.getElementById("nav-pokedex").onclick = (e) => { e.preventDefault(); navegar("pokedex"); };

// LANZAMIENTO
navegar(state.vistaActual || "home");