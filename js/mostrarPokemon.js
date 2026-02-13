
export function mostrarPokemon(lista){

    const contenedor = document.getElementById("pokedex");
    if (!contenedor) return;

    contenedor.innerHTML = lista.map(p => `
        <div style="border: 1px solid #ddd; border-radius: 8px; padding: 10px; width: 120px; text-align: center; background: #f9f9f9;">
            <img src="${p.sprites.front_default}" alt="${p.name}" style="width: 80px;">
            <h3 style="font-size: 14px; margin: 5px 0;">${p.name}</h3>
            <h3 style="font-size: 14px; margin: 5px 0;">Tipo: ${p.types[0].type.name}</h3>
            <span style="font-size: 10px; color: #777;">ID: ${p.id}</span>
        </div>
    `).join('');
}