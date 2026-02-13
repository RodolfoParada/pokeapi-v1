// js/cargarPokemon.js

export async function cargarPokedex() {
    const limite = 1000;
    
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limite}`);
        const data = await res.json();

        // Obtenemos los detalles de cada pokemon
        const promesas = data.results.map(pokemon => fetch(pokemon.url).then(r => r.json()));
        const listaPokemon = await Promise.all(promesas);

        // Retornamos la lista para que quien llame a la función pueda usarla
        return listaPokemon;

    } catch (error) {
        console.error("Error cargando la Pokedex:", error);
        return []; // Retornamos array vacío si falla
    }
}