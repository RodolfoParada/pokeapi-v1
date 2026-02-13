let todosLosPokemon = [];

const traduccionTipos = {
    fuego: "fire",
    agua: "water",
    planta: "grass",
    electrico: "electric",
    eléctrico: "electric",
    hielo: "ice",
    lucha: "fighting",
    veneno: "poison",
    tierra: "ground",
    volador: "flying",
    psiquico: "psychic",
    psíquico: "psychic",
    bicho: "bug",
    roca: "rock",
    fantasma: "ghost",
    dragon: "dragon",
    dragón: "dragon",
    siniestro: "dark",
    acero: "steel",
    hada: "fairy",
    normal: "normal"
};


async function cargarPokedex() {
    const contenedor = document.getElementById("pokedex");
    const limite = 1000; // Puedes cambiarlo a 151 para la primera generación
    
    try {
        // 1. Obtenemos la lista básica (nombre y URL)
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limite}`);
        const data = await res.json();

        // 2. Por cada Pokémon en la lista, pedimos sus detalles (foto, etc.)
        const promesas = data.results.map(pokemon => fetch(pokemon.url).then(r => r.json()));
        const listaPokemon = await Promise.all(promesas);


         // Guardamos global para usarla en el buscador
        todosLosPokemon = listaPokemon;

        // 3. Dibujamos todos en el HTML
         mostrarPokemon(listaPokemon)

    } catch (error) {
        console.error("Error cargando la Pokedex:", error);
    }
}

// Ejecutamos la función al cargar la página
cargarPokedex();


function mostrarPokemon(lista){
   const contenedor = document.getElementById("pokedex");

   contenedor.innerHTML = lista.map(p => `
            <div style="border: 1px solid #ddd; border-radius: 8px; padding: 10px; width: 120px; text-align: center; background: #f9f9f9;">
                <img src="${p.sprites.front_default}" alt="${p.name}" style="width: 80px;">
                <h3 style="font-size: 14px; margin: 5px 0;">${p.name}</h3>
                <h3 style="font-size: 14px; margin: 5px 0;">"tipo :"${p.types[0].type.name}</h3>
                <span style="font-size: 10px; color: #777;">ID: ${p.id}</span>
            </div>
        `).join('');

}

document.getElementById("buscador").addEventListener("input", e => {
   const valor = e.target.value.toLowerCase().trim();

   // buscar en inglés o español el tipo del pokemon
//    if(traduccionTipos[valor]){
//     valor = traduccionTipos[valor];
//    }
 
const valorTraducido = traduccionTipos[valor] || valor;

   if(!valor){
    mostrarPokemon(todosLosPokemon);
    return
   }

   const filtrados = todosLosPokemon.filter(pokemon => {

   // Buscar por nombre
   if (pokemon.name.includes(valor)) return true; 

   // Buscar por ID
   if (pokemon.id.toString() === valor) return true; 

   // Buscar por tipo
   if (pokemon.types.some(t => t.type.name.includes(valor) || t.type.name.includes(valorTraducido))) return true;  

   return false; 

   })
   mostrarPokemon(filtrados)

})