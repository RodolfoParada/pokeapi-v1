// pokemonWorker.js
let listaMaestra = [];

self.onmessage = function(e) {
    const { tipo, lista, paginaActual, itemsPorPagina } = e.data;

    if (tipo === 'GUARDAR_LISTA') {
        listaMaestra = lista;
        return;
    }

    if (paginaActual !== undefined) {
        const inicio = (paginaActual - 1) * itemsPorPagina;
        const items = listaMaestra.slice(inicio, inicio + itemsPorPagina);
        self.postMessage(items); 
    }
};