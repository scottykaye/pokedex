import Image from 'next/image'
import React, { Suspense } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const pokemon = [
  'Bulbasaur',
  'Ivysaur',
  'Venusaur',
  'Charmander',
  'Charmeleon',
  'Charizard',
  'Squirtle',
  'Wartortle',
  'Blastoise',
  'Caterpie',
  'Metapod',
  'Butterfree',
  'Weedle',
  'Kakuna',
  'Beedrill',
  'Pidgey',
  'Pidgeotto',
  'Pidgeot',
  'Rattata',
  'Raticate',
  'Spearow',
  'Fearow',
  'Ekans',
  'Arbok',
  'Pikachu',
  'Raichu',
  'Sandshrew',
  'Sandslash',
  'Nidoran',
  'Nidorina',
  'Nidoqueen',
  'Nidoran',
  'Nidorino',
  'Nidoking',
  'Clefairy',
  'Clefable',
  'Vulpix',
  'Ninetales',
  'Jigglypuff',
  'Wigglytuff',
  'Zubat',
  'Golbat',
  'Oddish',
  'Gloom',
  'Vileplume',
  'Paras',
  'Parasect',
  'Venonat',
  'Venomoth',
  'Diglett',
  'Dugtrio',
  'Meowth',
  'Persian',
  'Psyduck',
  'Golduck',
  'Mankey',
  'Primeape',
  'Growlithe',
  'Arcanine',
  'Poliwag',
  'Poliwhirl',
  'Poliwrath',
  'Abra',
  'Kadabra',
  'Alakazam',
  'Machop',
  'Machoke',
  'Machamp',
  'Bellsprout',
  'Weepinbell',
  'Victreebel',
  'Tentacool',
  'Tentacruel',
  'Geodude',
  'Graveler',
  'Golem',
  'Ponyta',
  'Rapidash',
  'Slowpoke',
  'Slowbro',
  'Magnemite',
  'Magneton',
  "Farfetch'd",
  'Doduo',
  'Dodrio',
  'Seel',
  'Dewgong',
  'Grimer',
  'Muk',
  'Shellder',
  'Cloyster',
  'Gastly',
  'Haunter',
  'Gengar',
  'Onix',
  'Drowzee',
  'Hypno',
  'Krabby',
  'Kingler',
  'Voltorb',
  'Electrode',
  'Exeggcute',
  'Exeggutor',
  'Cubone',
  'Marowak',
  'Hitmonlee',
  'Hitmonchan',
  'Lickitung',
  'Koffing',
  'Weezing',
  'Rhyhorn',
  'Rhydon',
  'Chansey',
  'Tangela',
  'Kangaskhan',
  'Horsea',
  'Seadra',
  'Goldeen',
  'Seaking',
  'Staryu',
  'Starmie',
  'Mr. Mime',
  'Scyther',
  'Jynx',
  'Electabuzz',
  'Magmar',
  'Pinsir',
  'Tauros',
  'Magikarp',
  'Gyarados',
  'Lapras',
  'Ditto',
  'Eevee',
  'Vaporeon',
  'Jolteon',
  'Flareon',
  'Porygon',
  'Omanyte',
  'Omastar',
  'Kabuto',
  'Kabutops',
  'Aerodactyl',
  'Snorlax',
  'Articuno',
  'Zapdos',
  'Moltres',
  'Dratini',
  'Dragonair',
  'Dragonite',
  'Mewtwo',
  'Mew',
]

function fetchPokemon() {
  //  https://pokeapi.co/api/v2/pokemon?limit=150&offset=0
  // https://pokeapi.co/api/v2/pokedex/?offset=20&limit=12
  // og pokemon pokedex
  //  return fetch('https://pokeapi.co/api/v2/pokedex/kanto/')
  return fetch('https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0')
}

async function getPokemon() {
  const data = await fetchPokemon()
  const response = data.json()

  return response
}

function getIndividualPokemon(pokemon) {
  // return pokemon.map(({ pokemon_species: { url } }) =>
  return pokemon.map(({ url }) => fetch(url).then((item) => item.json()))
}

function getFormattedNumber(number) {
  if (number < 10) {
    return `#00${number}`
  }
  if (number < 100) {
    return `#0${number}`
  }
  return `#${number}`
}

export default async function StandardPage() {
  /// const { pokemon_entries } = await getPokemon()
  const data = await getPokemon()
  // const poke = await Promise.allSettled(getIndividualPokemon(pokemon_entries))
  const poke = await Promise.allSettled(getIndividualPokemon(data.results))
  console.log(poke)

  return (
    <Suspense fallback="Loading...">
      <div className="grid grid-cols-3 gap-x-5 gap-y-32 ">
        {poke.map(({ value: poke }) => {
          return (
            <Card
              key={poke.id}
              className="p-4 flex flex-col group hover:-translate-y-2 hover:border-slate-400 transition-all"
            >
              <CardContent className="grow -mt-20 pb-20 self-center bg-background">
                <Image
                  width={150}
                  height={150}
                  className="px-5 group-hover:scale-150 transition-transform"
                  src={poke.sprites.other.dream_world.front_default}
                />
              </CardContent>
              <hr />
              <CardHeader className="mt-auto">
                <CardTitle className="text-slate-500 transition-colors group-hover:text-slate-100">
                  {getFormattedNumber(poke.id)}{' '}
                  {poke.name.toUpperCase().charAt(0) +
                    poke.name.replace(/-/g, ' ').slice(1)}{' '}
                </CardTitle>
                <CardDescription className="py-4">Not Caught</CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </div>
    </Suspense>
  )
}
