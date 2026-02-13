import tiposPokemons from "./tiposPokemons.js";

/**
 * @param {Array} lista - La lista completa de 1000 pokemons
 * @param {Function} callbackMostrar - La función mostrarPokemon para renderizar
 */
export function inicializarBuscador(lista, callbackMostrar) {
    const buscador = document.getElementById("buscador");
    if (!buscador) return;

    buscador.addEventListener("input", e => {
        const valor = e.target.value.toLowerCase().trim();
        const valorTraducido = tiposPokemons[valor] || valor;

        // Si no hay valor, volvemos a mostrar la lista original (o la página inicial)
        if (!valor) {
            callbackMostrar(lista);
            return;
        }

        const filtrados = lista.filter(pokemon => {
            // Buscar por nombre
            const porNombre = pokemon.name.includes(valor);
            
            // Buscar por ID
            const porId = pokemon.id.toString() === valor;
            
            // Buscar por tipo (usando el valor original o el traducido)
            const porTipo = pokemon.types.some(t => 
                t.type.name.includes(valor) || 
                t.type.name.includes(valorTraducido)
            );

            return porNombre || porId || porTipo;
        });

        callbackMostrar(filtrados);
    });
}