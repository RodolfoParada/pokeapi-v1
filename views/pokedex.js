export function renderPokedexLayout() {
    return `
        <div style="padding: 20px;">
            <input type="text" id="buscador" placeholder="Buscar por nombre, id o tipo..." style="padding:8px; width:250px; margin-bottom:20px;">
            <div id="pokedex" style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;"></div>
            <div id="paginacion" style="margin-top:20px;"></div>
        </div>
    `;
}