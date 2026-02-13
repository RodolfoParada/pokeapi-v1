// js/router.js

import { renderHome } from "./views/home.js";
import { renderPokedexView } from "./views/pokedexView.js";
import { iniciarAppPokedex } from "../index.js";

const routes = {
    '#/': () => {
        document.getElementById("root").innerHTML = renderHome();
    },
    '#/pokedex': async () => {
        document.getElementById("root").innerHTML = renderPokedexView();
        // Una vez que el HTML está en el DOM, ejecutamos la lógica
        await iniciarAppPokedex();
    }
};

export function inicializarRouter() {
    const manejarRuta = () => {
        const hash = window.location.hash || '#/';
        const vista = routes[hash] || routes['#/'];
        vista();
    };

    window.addEventListener('hashchange', manejarRuta);
    manejarRuta(); // Carga inicial
}