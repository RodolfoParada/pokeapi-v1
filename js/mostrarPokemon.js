// js/mostrarPokemon.js
import { saveState, getState } from "./localStore.js";

export function mostrarPokemon(lista, cargando = false) {
    const contenedor = document.getElementById("pokedex");
    if (!contenedor) return;

    if (cargando) {
        // ... (Tu lógica de skeleton actual)
        return;
    }

    const favoritos = getState('poke_favs') || [];

    const html = lista.map(p => {
        const esFavorito = favoritos.includes(p.id);
        return `
            <div class="poke-card" style="position: relative;">
                <button 
                    onclick="window.toggleFavorito(event, ${p.id})" 
                    id="fav-${p.id}"
                    style="position: absolute; top: 5px; right: 5px; background: none; border: none; cursor: pointer; font-size: 1.5rem;"
                >
                    ${esFavorito ? '❤️' : '🤍'}
                </button>
                <img src="${p.sprites.front_default}" alt="${p.name}" width="80" height="80">
                <h3 style="font-size: 14px; margin: 5px 0; text-transform: capitalize;">${p.name}</h3>
                <h3 style="font-size: 14px; margin: 5px 0;">tipo : ${p.types[0].type.name}</h3>
                <span style="font-size: 10px; color: #777;">ID: ${p.id}</span>
            </div>
        `;
    }).join('');

    contenedor.innerHTML = html;
}

// DEFINICIÓN GLOBAL (Fuera de la función principal)
window.toggleFavorito = function(event, id) {
    event.stopPropagation(); // Evita que el clic afecte a la carta
    
    let favoritos = getState('poke_favs') || [];
    const btn = document.getElementById(`fav-${id}`);

    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(favId => favId !== id);
        if (btn) btn.innerText = '🤍';
    } else {
        favoritos.push(id);
        if (btn) btn.innerText = '❤️';
    }
    
    saveState('poke_favs', favoritos);
    console.log("Favorito actualizado localmente:", id);
};