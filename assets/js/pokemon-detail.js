const pokemonSelect = JSON.parse(localStorage.getItem('pokemonSelect'))
const content = document.getElementById('content')

function getPokemonSpecies(url){
    return fetch(url)
        .then((response) => response.json())
        .then((pokemonSpecies) => pokemonSpecies)
}

function convertPokemonSelectToDetails(pokeDetail) {
    const pokemon = new Details()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    pokemon.abilities = ''
    pokeDetail.abilities.forEach((ability, index) => {
        pokemon.abilities += index > 0 ? ', ' + ability.ability.name : ability.ability.name 
    })

    this.getPokemonSpecies(pokeDetail.species.url).then((pokemonSpecies)=> {
        let species = pokemonSpecies.genera.filter((generas)=>{
            return generas.language.name == "en"
        })

        pokemon.species = species[0].genus.replace('Pokémon', '')

        document.getElementById('species').innerHTML = pokemon.species

        pokemon.eggGroup = ''
        pokemonSpecies.egg_groups.forEach((group, index) => {
            pokemon.eggGroup += index > 0 ? ', ' + group.name : group.name 
        })
        
        document.getElementById('eggGroup').innerHTML = pokemon.eggGroup
    })

    return pokemon
}

const pokemon = convertPokemonSelectToDetails(pokemonSelect)

content.classList.add(pokemon.type)

document.getElementById('name').innerHTML = pokemon.name
document.getElementById('number').innerHTML = '#' + pokemon.number

pokemon.types.map((type) => {
    let li = document.createElement('li')
    li.innerHTML = type
    li.classList.add('type', type)
    document.getElementById('types').appendChild(li)
})

document.getElementById('imgPokemon').attributes.src.value = pokemon.photo

document.getElementById('height').innerHTML = pokemon.height / 10 + ' m'
document.getElementById('weight').innerHTML = pokemon.weight / 10 + ' kg'

document.getElementById('abilities').innerHTML = pokemon.abilities

