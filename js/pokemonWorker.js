// pokemonWorker.js
let listaMaestra = [];

self.onmessage = function(e) {
    const { tipo, lista, paginaActual, itemsPorPagina } = e.data;

    // 1. Recibimos la lista completa de 1000 pokemons y la guardamos en la memoria del Worker
    if (tipo === 'GUARDAR_LISTA') {
        listaMaestra = lista;
        console.log("Worker: Lista guardada y lista para procesar.");
        return;
    }

    // 2. Lógica de Paginación: Solo enviamos al hilo principal el "trozo" de datos necesario
    if (paginaActual !== undefined && itemsPorPagina !== undefined) {
        const inicio = (paginaActual - 1) * itemsPorPagina;
        const fin = inicio + itemsPorPagina;
        
        const itemsPaginados = listaMaestra.slice(inicio, fin);
        
        // Devolvemos solo los 50 pokemons de la página solicitada
        self.postMessage(itemsPaginados); 
    }
};