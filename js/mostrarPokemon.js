// js/mostrarPokemon.js
import { saveState, getState } from "./localStore.js";

export function mostrarPokemon(lista, cargando = false) {
    const contenedor = document.getElementById("pokedex");
    if (!contenedor) return;

    // --- LÓGICA DE SKELETON (ESQUELETO) ---
    if (cargando) {
        // Generamos 50 tarjetas de carga (skeletons)
        contenedor.innerHTML = Array(50).fill(`
            <div class="poke-card skeleton-card" style="
                background: #f0f0f0; 
                height: 180px; 
                border-radius: 12px; 
                display: flex; 
                flex-direction: column; 
                justify-content: center; 
                align-items: center;
                border: 1px solid #ddd;
            ">
                <div class="skeleton-shimmer" style="
                    width: 80px; height: 80px; 
                    background: #e0e0e0; 
                    border-radius: 50%; 
                    margin-bottom: 10px;
                "></div>
                <div class="skeleton-shimmer" style="
                    width: 70%; height: 15px; 
                    background: #e0e0e0; 
                    border-radius: 4px;
                    margin-bottom: 8px;
                "></div>
                <div class="skeleton-shimmer" style="
                    width: 40%; height: 10px; 
                    background: #e0e0e0; 
                    border-radius: 4px;
                "></div>
            </div>
        `).join('');
        return; // Salimos para no ejecutar el resto del código
    }

    // --- LÓGICA DE RENDERIZADO REAL ---
    const favoritos = getState('poke_favs') || [];

   const html = lista.map(p => {
        // AQUÍ DECLARAMOS LA VARIABLE QUE TE DA EL ERROR
        const esFavorito = favoritos.includes(p.id);

        // Retornamos el string del HTML
        return `
            <div class="poke-card" 
                 onclick="window.verDetalle(${p.id})" 
                 style="cursor: pointer; position: relative;">
                
                <button 
                    onclick="event.stopPropagation(); window.toggleFavorito(event, ${p.id})" 
                    id="fav-${p.id}"
                    style="position: absolute; top: 5px; right: 5px; background: none; border: none; cursor: pointer; font-size: 1.5rem; z-index: 10;"
                >
                </button>

                <img src="${p.sprites.front_default}" alt="${p.name}" width="80" height="80">
                <h3 style="text-transform: capitalize; font-size: 1rem; margin: 10px 0 5px;">${p.name}</h3>
                <h3 style="font-size: 14px; margin: 5px 0;">"tipo :"${p.types[0].type.name}</h3>
                <span style="color: #666; font-size: 0.8rem;">ID: ${p.id}</span><br>
                <button>ver más</button>
            </div>
        `;
    }).join(''); // Cerramos el map y unimos el array en un solo string

    contenedor.innerHTML = html;
}