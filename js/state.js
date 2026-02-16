// js/state.js

// Intentamos recuperar el estado previo del "disco duro" del navegador
const persistencia = JSON.parse(localStorage.getItem('pokeAppState'));

export const state = {
    datosMaestros: [],
    // Si existe en el disco, usamos esa página, si no, la 1
    paginaActual: persistencia?.paginaActual || 1,
    vistaActual: persistencia?.vistaActual || 'home'
};

// Esta función es vital: guarda el estado para que no se pierda al recargar (F5)
export function guardarEstado() {
    const { paginaActual, vistaActual } = state;
    localStorage.setItem('pokeAppState', JSON.stringify({ paginaActual, vistaActual }));
}