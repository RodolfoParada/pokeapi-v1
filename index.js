import { cargarPokedex } from "./js/cargarPokemon.js";
import { mostrarPokemon } from "./js/mostrarPokemon.js";
import { manejarPaginacion } from "./js/paginacion.js";
import { inicializarBuscador } from "./js/filtrarPokemon.js";

const mainContent = document.getElementById("main-content");
let datosMaestros = [];
const worker = new Worker('./js/pokemonWorker.js');

async function navegar(ruta) {
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
        mainContent.innerHTML = `
            <input type="text" id="buscador" placeholder="Buscar por nombre, id o tipo..." style="padding:8px; width:250px; margin-bottom:20px;">
            <div id="pokedex" style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;"></div>
            <div id="paginacion" style="margin-top:20px; text-align: center;"></div>`;
        
        if (datosMaestros.length === 0) {
            datosMaestros = await cargarPokedex();
            worker.postMessage({ tipo: 'GUARDAR_LISTA', lista: datosMaestros });
        }
        
        // Iniciamos pasándole el worker
        manejarPaginacion(datosMaestros, mostrarPokemon, worker);
        
        inicializarBuscador(datosMaestros, (listaFiltrada) => {
            if (listaFiltrada.length !== datosMaestros.length) {
                mostrarPokemon(listaFiltrada);
                document.getElementById("paginacion").innerHTML = "";
            } else {
                manejarPaginacion(datosMaestros, mostrarPokemon, worker);
            }
        });
    }
}

document.getElementById("nav-home").onclick = (e) => { e.preventDefault(); navegar("home"); };
document.getElementById("nav-pokedex").onclick = (e) => { e.preventDefault(); navegar("pokedex"); };

navegar("home");