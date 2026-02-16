// js/state.js

import { saveState, getState } from "./localStore.js";

// Usamos tu propia función getState para recuperar la sesión
const persistencia = getState('pokeAppState');

export const state = {
    datosMaestros: [],
    paginaActual: persistencia?.paginaActual || 1,
    vistaActual: persistencia?.vistaActual || 'home'
};

export function guardarEstado() {
    const { paginaActual, vistaActual } = state;
    // Usamos tu propia función saveState
    saveState('pokeAppState', { paginaActual, vistaActual });
}