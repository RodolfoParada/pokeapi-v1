export function renderPokedexLayout() {
    return `
        <div style="padding: 20px; text-align: center;">
            <input type="text" id="buscador" placeholder="Buscar por nombre, id o tipo..." 
                   style="padding:10px; width:400px; margin-bottom:20px; border-radius: 8px; border: 1px solid #ccc;">
            
            <div id="pokedex" 
            "></div>
            
            <div id="paginacion" style="margin-top:20px; display: flex; justify-content: center; align-items: center;"></div>
        </div>
    `;
}