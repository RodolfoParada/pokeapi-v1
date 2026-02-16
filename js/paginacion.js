// paginación.js
import { state, guardarEstado } from "./state.js"; // IMPORTANTE: Agregamos guardarEstado

// Inicializamos con el valor del estado para que persista al recargar
let paginaActual = state.paginaActual || 1; 
const pokemonsPorPagina = 50;

export function manejarPaginacion(listaCompleta, funcionParaDibujar, worker) {
    
    // Configuramos la escucha del worker
    worker.onmessage = (e) => {
        // e.data contiene la lista de 50 pokemons procesada por el worker
        funcionParaDibujar(e.data);
        actualizarBotones(listaCompleta.length);
    };

    const pedirDatos = () => {
        // Sincronizamos el estado global antes de guardar
        state.paginaActual = paginaActual; 
        guardarEstado(); 
        
        worker.postMessage({
            paginaActual: paginaActual,
            itemsPorPagina: pokemonsPorPagina
        });
    };

    function actualizarBotones(total) {
        const contenedor = document.getElementById("paginacion");
        if (!contenedor) return;
        
        const totalPaginas = Math.ceil(total / pokemonsPorPagina);

        contenedor.innerHTML = `
          <button id="prev" ${paginaActual === 1 ? "disabled" : ""}>Anterior</button>
          <span style="margin: 0 10px;">Página ${paginaActual} de ${totalPaginas}</span>
          <button id="next" ${paginaActual === totalPaginas ? "disabled" : ""}>Siguiente</button>
        `;

        document.getElementById("prev").onclick = () => { 
            if (paginaActual > 1) {
                paginaActual--; 
                pedirDatos(); 
            }
        };
        
        document.getElementById("next").onclick = () => { 
            if (paginaActual < totalPaginas) {
                paginaActual++; 
                pedirDatos(); 
            }
        };
    }

    // Carga inicial al entrar a la vista
    pedirDatos();
}