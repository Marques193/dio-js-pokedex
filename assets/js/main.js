const pokemonList = document.getElementById("pokemonList");
const toHide = document.querySelector("#page");
const loadMoreButton = document.getElementById("loadMoreButton");
const pageContent = document.querySelector("#pokemon-page");
const api = "https://pokeapi.co/api/v2/";

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}" onClick="getPokemon(${
    pokemon.number
  })">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

// funcao pegar dados do pokemon clicado
async function getPokemon(pokemon) {
  const response = await fetch(`${api}pokemon/${pokemon}`);
  const data = await response.json();
  const getSpecies = await fetch(`${api}pokemon-species/${pokemon}`);
  const species = await getSpecies.json();

  console.log(species);
  console.log(data);
  loadMoreButton.setAttribute("hidden", "");
  toHide.setAttribute("hidden", "");

  pageContent.innerHTML = `      
    <div class="pokemon-page ${data.types[0].type.name}">
				<span class="back" onClick="backPressed()">←</span>
			<div class="page-top">
        <span class="name">${data.name}</span>
				<span>#${data.id}</span>
			</div>
			

        <div class="detail-page">
          <ol class="types">
            ${data.types
              .map(
                (type) => `
            <li class="type ${type.type.name}">${type.type.name}</li>
            `
              )
              .join("")}
          </ol>
        </div>
        <div class="img-page">
          <img src="${data.sprites.other.dream_world.front_default}" alt="${
    data.name
  }" />
        </div>

        <div class="stats-page">
          <div class="description-double">
						<span>Description</span>
						<span class="description">${species.flavor_text_entries[15].flavor_text}</span>
					</div>

					<div class="double">
						<span class="span-list">Species</span>
						<span>${species.genera[7].genus}</span>
					</div>
					<div class="double">
						<span class="span-list">Height</span>
						<span>${(data.height * 0.1).toFixed(2)} m</span>
					</div>
					<div class="double">
						<span class="span-list">Weight</span>
						<span>${(data.weight * 0.1).toFixed(2)} kg</span>
					</div>
					<div class="double">
						<span class="span-list">Abilities</span>
						<span class="ability">${data.abilities
              .map(
                (ability) => `
            <span>${ability.ability.name}</span>
            `
              )
              .join("/")}</span>
					</div>

					<span class="span-title">Breeding</span>

					<div class="double">
						<span class="span-list">Gender</span>
            <span class="male">♂</span>
						<span class="gender">${100 - (species.gender_rate / 8) * 100}%</span>
            <span class="female">♀</span>
						<span class="gender">${(species.gender_rate / 8) * 100}%</span>
						</div>

					<div class="double">
						<span class="span-list">Egg group</span>
						<span class="ability">${species.egg_groups
              .map(
                (group) => `
            <span>${group.name}</span>
            `
              )
              .join("/")}</span>
						</div>
					
        </div>
      </div>
    `;
}

function backPressed() {
  toHide.removeAttribute("hidden");
  loadMoreButton.removeAttribute("hidden");
  pageContent.innerHTML = "";
}

async function getPokemonSpecies(pokemon) {
  const getSpecies = await fetch(`${api}pokemon-species/${pokemon}`);
  const species = await getSpecies.json();

  console.log(species);
}
