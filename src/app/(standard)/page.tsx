import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { PrismaClient } from '@prisma/client'
import Image from 'next/image'
import { unstable_cache } from 'next/cache'
import { Suspense } from 'react'

function fetchPokemon() {
  //  https://pokeapi.co/api/v2/pokemon?limit=150&offset=0
  // https://pokeapi.co/api/v2/pokedex/?offset=20&limit=12
  // og pokemon pokedex
  //  return fetch('https://pokeapi.co/api/v2/pokedex/kanto/')
  //  we'll go to 649 for now because 650 is when we lose images
  return fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
}

async function getPokemon() {
  const data = await fetchPokemon()
  const response = data.json()

  return response
}

function getIndividualPokemon(url) {
  return fetch(url).then((pokemon) => pokemon.json())
}

const getCachedPokemon = unstable_cache(getPokemon, ['pokemon-list'], {
  tags: ['all-pokemon-list'],
  revalidate: 60 * 60,
})

const getACachedPokemon = unstable_cache(
  async (url) => getIndividualPokemon(url),
  ['pokemon'],
  {
    revalidate: 60 * 60,
  },
)

function getFormattedNumber(number) {
  if (number < 10) {
    return `#00${number}`
  }
  if (number < 100) {
    return `#0${number}`
  }
  return `#${number}`
}

async function saveUser(user) {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(user),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json()
}

const prisma = new PrismaClient()

export default async function StandardPage() {
  const users = await prisma.users.findMany()

  const data = await getCachedPokemon()

  const poke = await Promise.allSettled(
    data.results.map((result) => getACachedPokemon(result.url)),
  )

  return (
    <Suspense fallback="Loading...">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-32 ">
        {poke.map(({ value: poke }) => {
          return (
            <Card
              key={poke.id}
              className="p-4 flex flex-col group hover:-translate-y-2 hover:border-slate-400 transition-all hover:shadow-lift"
            >
              <CardContent className="grow -mt-20 pb-20 self-center bg-background">
                {poke.sprites.other.dream_world.front_default ? (
                  <Image
                    width={150}
                    height={150}
                    className="px-5 group-hover:scale-150 transition-transform"
                    alt={
                      poke.name.toUpperCase().charAt(0) +
                      poke.name.replace(/-/g, ' ').slice(1)
                    }
                    src={poke.sprites.other.dream_world.front_default}
                  />
                ) : null}
              </CardContent>
              <hr className="group-hover:border-slate-400 transition-colors" />
              <CardHeader className="mt-auto">
                <CardTitle className="text-slate-400 transition-colors group-hover:text-slate-500/90">
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
