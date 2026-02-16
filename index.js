import { cargarPokedex } from "./js/cargarPokemon.js";
import { mostrarPokemon } from "./js/mostrarPokemon.js";
import { manejarPaginacion } from "./js/paginacion.js";
import { inicializarBuscador } from "./js/filtrarPokemon.js";
import { guardarEstado, state } from "./js/state.js";
import { renderPokedexLayout } from "./views/pokedex.js"; // Importamos tu layout

const mainContent = document.getElementById("main-content");
// Cambié la ruta a raíz si el worker está fuera de js, o mantenla si está dentro
const worker = new Worker('./js/pokemonWorker.js'); 

async function navegar(ruta) {
    state.vistaActual = ruta; 
    guardarEstado()
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
        // CORRECCIÓN: Usamos el layout, no mostrarPokemon
        mainContent.innerHTML = renderPokedexLayout(); 

       if (!state.datosMaestros || state.datosMaestros.length === 0) {
    state.datosMaestros = await cargarPokedex();
    
    // Verificamos que cargarPokedex realmente devolvió algo
    if (state.datosMaestros && state.datosMaestros.length > 0) {
        worker.postMessage({ tipo: 'GUARDAR_LISTA', lista: state.datosMaestros });
    }
        }
        
        // Usamos state.datosMaestros para que no vaya vacío
        manejarPaginacion(state.datosMaestros, mostrarPokemon, worker);
        
        inicializarBuscador(state.datosMaestros, (listaFiltrada) => {
            if (listaFiltrada.length !== state.datosMaestros.length) {
                mostrarPokemon(listaFiltrada);
                document.getElementById("paginacion").innerHTML = "";
            } else {
                manejarPaginacion(state.datosMaestros, mostrarPokemon, worker);
            }
        });
    }
}

document.getElementById("nav-home").onclick = (e) => { e.preventDefault(); navegar("home"); };
document.getElementById("nav-pokedex").onclick = (e) => { e.preventDefault(); navegar("pokedex"); };

navegar("state.vistaActual");