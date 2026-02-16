import { cargarPokedex } from "./js/cargarPokemon.js";
import { mostrarPokemon } from "./js/mostrarPokemon.js";
import { manejarPaginacion } from "./js/paginacion.js";
import { inicializarBuscador } from "./js/filtrarPokemon.js";

const mainContent = document.getElementById("main-content");

// --- VISTAS (Templates) ---

const HomeView = () => `
    <div style="text-align: center; margin-top: 50px;">
        <h1>Bienvenido a la PokeApp</h1>
        <p>Explora más de 1000 Pokémon en tiempo real.</p>
        <button id="btn-explorar" style="padding: 10px 20px; cursor:pointer;">Ir a la Pokedex</button>
    </div>
`;

const PokedexView = () => `
    <input type="text" id="buscador" placeholder="Buscar por nombre, id o tipo..." 
           style="padding:8px; width:250px; margin-bottom:20px;">
    
    <div id="pokedex" style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;">
        <p>Cargando datos maestros...</p>
    </div>

    <div id="paginacion" style="margin-top:20px; text-align: center;"></div>
`;

// --- ROUTER (Navegación) ---

async function navegar(ruta) {
    mainContent.innerHTML = ""; // Limpiamos la pantalla

    if (ruta === "home") {
        mainContent.innerHTML = HomeView();
        document.getElementById("btn-explorar").onclick = () => navegar("pokedex");
    } 
    
    else if (ruta === "pokedex") {
        mainContent.innerHTML = PokedexView();
        
        // Ejecutamos la lógica que ya tenías
        const todosLosPokemon = await cargarPokedex();
        
        if (todosLosPokemon.length > 0) {
            manejarPaginacion(todosLosPokemon, mostrarPokemon);
            
            inicializarBuscador(todosLosPokemon, (listaFiltrada) => {
                const paginacionDiv = document.getElementById("paginacion");
                if (listaFiltrada.length !== todosLosPokemon.length) {
                    mostrarPokemon(listaFiltrada);
                    if (paginacionDiv) paginacionDiv.innerHTML = "";
                } else {
                    manejarPaginacion(todosLosPokemon, mostrarPokemon);
                }
            });
        }
    }
}

// Escuchadores del menú
document.getElementById("nav-home").onclick = (e) => { e.preventDefault(); navegar("home"); };
document.getElementById("nav-pokedex").onclick = (e) => { e.preventDefault(); navegar("pokedex"); };

// Iniciar en Home por defecto
navegar("home");