// js/paginacion.js
let paginaActual = 1;
const pokemonsPorPagina = 20;

export function manejarPaginacion(listaCompleta, funcionParaDibujar) {
    const renderizar = () => {
        const inicio = (paginaActual - 1) * pokemonsPorPagina;
        const fin = inicio + pokemonsPorPagina;
        const items = listaCompleta.slice(inicio, fin);
        
        funcionParaDibujar(items); // Llamamos a mostrarPokemon
        actualizarBotones(listaCompleta.length, renderizar);
    };

    renderizar();
}

function actualizarBotones(total, callback) {
    const contenedor = document.getElementById("paginacion");
    if (!contenedor) return;

    const totalPaginas = Math.ceil(total / pokemonsPorPagina);

    contenedor.innerHTML = `
      <button id="prev" ${paginaActual === 1 ? "disabled" : ""}>Anterior</button>
      <span style="margin: 0 10px;">Página ${paginaActual} de ${totalPaginas}</span>
      <button id="next" ${paginaActual === totalPaginas ? "disabled" : ""}>Siguiente</button>
    `;

    // Asignamos los eventos después de crear el HTML
    document.getElementById("prev").onclick = () => { 
        paginaActual--; 
        callback(); 
    };
    document.getElementById("next").onclick = () => { 
        paginaActual++; 
        callback(); 
    };
}