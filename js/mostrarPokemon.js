export function mostrarPokemon(lista) {
    const contenedor = document.getElementById("pokedex");
    if (!contenedor) return;

    // Generamos el string de HTML
    const html = lista.map(p => `
        <div class="poke-card">
            <img src="${p.sprites.front_default}" alt="${p.name}" width="80" height="80">
            <h3 style="font-size: 14px; margin: 5px 0; text-transform: capitalize;">${p.name}</h3>
            <span style="font-size: 10px; color: #777;">ID: ${p.id}</span>
        </div>
    `).join('');

    // Aplicamos una transición rápida de salida para que no sea brusco
    contenedor.style.opacity = "0";
    
    setTimeout(() => {
        contenedor.innerHTML = html;
        contenedor.style.opacity = "1";
    }, 50); // 50ms es imperceptible pero suficiente para el navegador
}