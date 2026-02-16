export function renderPokedexLayout() {
    return `
        <div style="padding: 20px; text-align: center;">
            <input type="text" id="buscador" placeholder="Buscar por nombre, id o tipo..." 
                   style="padding:10px; width:400px; margin-bottom:20px; border-radius: 8px; border: 1px solid #ccc;">
            
            <div id="pokedex" style="
                display: grid; 
                grid-template-columns: repeat(10, 1fr); 
                gap: 15px; 
                justify-items: center;
                min-height: 500px;
            "></div>
            
            <div id="paginacion" style="margin-top:20px; display: flex; justify-content: center; align-items: center;"></div>
        </div>
    `;
}