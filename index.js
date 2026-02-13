// index.js
import { cargarPokedex } from "./js/cargarPokemon.js";
import { mostrarPokemon } from "./js/mostrarPokemon.js";
import { manejarPaginacion } from "./js/paginacion.js";
import { inicializarBuscador } from "./js/filtrarPokemon.js";


async function iniciarApp() {
    // 1. Cargamos todos los datos (los 1000)
    const todosLosPokemon = await cargarPokedex();

    if (todosLosPokemon.length > 0) {
        
        // 2. Iniciamos la paginación. 
        // Le pasamos la lista completa y la función que sabe dibujar las cards.
        manejarPaginacion(todosLosPokemon, mostrarPokemon);

        // 3. Iniciamos el buscador.
        // Cuando el buscador esté vacío, queremos que vuelva a la paginación.
        inicializarBuscador(todosLosPokemon, (listaFiltrada) => {
            // Si hay texto en el buscador, mostramos los filtrados y quitamos botones
            if (listaFiltrada.length !== todosLosPokemon.length) {
                mostrarPokemon(listaFiltrada);
                document.getElementById("paginacion").innerHTML = ""; 
            } else {
                // Si el buscador se vacía, reiniciamos la paginación
                manejarPaginacion(todosLosPokemon, mostrarPokemon);
            }
        });
        
    }
}

iniciarApp();
