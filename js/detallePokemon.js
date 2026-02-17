//js/detallePokemon
export function renderDetallePokemon(p) {
    // 1. Extraemos las imágenes adicionales (sprites)
    const imagenes = [
        p.sprites.front_default,
        p.sprites.back_default,
        p.sprites.front_shiny,
        p.sprites.back_shiny
    ].filter(img => img !== null); // Filtramos por si alguna no existe

    return `
        <div class="detalle-container" style="padding: 20px; max-width: 800px; margin: auto;">
            <button onclick="navegar('pokedex')" style="margin-bottom: 20px; cursor: pointer;"> Volver a la Pokedex</button>
            
            <div style="display: flex; gap: 40px; align-items: center;">
                <div class="galeria" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    ${imagenes.map(img => `<img src="${img}" width="120">`).join('')}
                </div>

                <div class="info-basica">
                    <h1 style="text-transform: capitalize;">${p.name} (#${p.id})</h1>
                    <p><strong>Altura:</strong> ${p.height / 10} m</p>
                    <p><strong>Peso:</strong> ${p.weight / 10} kg</p>
                </div>
            </div>

            <div class="stats" style="margin-top: 30px;">
                <h3>Estadísticas Base</h3>
                ${p.stats.map(s => `
                    <div style="margin-bottom: 10px;">
                        <span style="text-transform: capitalize;">${s.stat.name}: ${s.base_stat}</span>
                        <div style="background: #eee; width: 100%; height: 10px; border-radius: 5px;">
                            <div style="background: #4CAF50; width: ${(s.base_stat / 255) * 100}%; height: 10px; border-radius: 5px;"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}