let paginaActual = 1;
const pokemonsPorPagina = 50;

export function manejarPaginacion(listaCompleta, funcionParaDibujar, worker) {
    
    worker.onmessage = (e) => {
        // Cuando llegan los datos, los dibujamos de inmediato
        funcionParaDibujar(e.data);
        actualizarBotones(listaCompleta.length);
    };

    const pedirDatos = () => {
        // Pedimos la página actual
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
            paginaActual--; 
            pedirDatos(); 
        };
        document.getElementById("next").onclick = () => { 
            paginaActual++; 
            pedirDatos(); 
        };
    }

    pedirDatos();
}