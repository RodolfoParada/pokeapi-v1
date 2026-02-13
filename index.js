async function cargarPokedex() {
    const contenedor = document.getElementById("pokedex");
    const limite = 1000; // Puedes cambiarlo a 151 para la primera generación
    
    try {
        // 1. Obtenemos la lista básica (nombre y URL)
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limite}`);
        const data = await res.json();

        // 2. Por cada Pokémon en la lista, pedimos sus detalles (foto, etc....) 
        const promesas = data.results.map(pokemon => fetch(pokemon.url).then(r => r.json()));
        const listaPokemon = await Promise.all(promesas);

        // 3. Dibujamos todos en el HTML
        contenedor.innerHTML = listaPokemon.map(p => `
            <div style="border: 1px solid #ddd; border-radius: 8px; padding: 10px; width: 120px; text-align: center; background: #f9f9f9;">
                <img src="${p.sprites.front_default}" alt="${p.name}" style="width: 80px;">
                <h3 style="font-size: 14px; margin: 5px 0;">${p.name}</h3>
                <h3 style="font-size: 14px; margin: 5px 0;">"tipo :"${p.types[0].type.name}</h3>
                <span style="font-size: 10px; color: #777;">ID: ${p.id}</span>
            </div>
        `).join('');

    } catch (error) {
        console.error("Error cargando la Pokedex:", error);
    }
}

// Ejecutamos la función al cargar la página
cargarPokedex();