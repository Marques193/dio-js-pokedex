# Trilha JS Developer - Pokedex

<div class="pokemon-page">
        <span><--</span>
        <span>Pokemon</span>
        
        <div class="detail-page">
            <ol class="types">
                ${pokemon.types
                  .map((type) => `<li class="type ${type}">${type}</li>`)
                  .join("")}
            </ol>
      </div>
      <div class="img-page">
        <img src="${pokemon.photo}"alt="${pokemon.name}">
      </div>

      <div class="stats-page">
          <span>species</span>
          <span>height</span>
          <span>weight</span>
          <span>abilities</span>
    </div>

</div>
