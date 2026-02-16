// js/cargarPokemon.js


export async function cargarPokedex() { 
    const limite = 1000;
    
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limite}`);
        const data = await res.json();
        const resultados = data.results;

        const listaPokemon = [];
        const tamañoLote = 50; 

        for (let i = 0; i < resultados.length; i += tamañoLote) {
            const lote = resultados.slice(i, i + tamañoLote);
            const promesasLote = lote.map(p => 
                fetch(p.url).then(r => {
                    if (!r.ok) throw new Error("Error en petición");
                    return r.json();
                })
            );

            const resultadosLote = await Promise.all(promesasLote);
            listaPokemon.push(...resultadosLote);
        }

        return listaPokemon;

    } catch (error) {
        console.error("Error crítico cargando la Pokedex:", error);
        throw error; 
    }
}