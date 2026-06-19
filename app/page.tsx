import Abstract from '@/components/sections/Abstract'
import Benchmarks from '@/components/sections/Benchmarks'
import Example from '@/components/sections/Example'
import Hero from '@/components/sections/Hero'
import Layers from '@/components/sections/Layers'
import Monads from '@/components/sections/Monads'
import Nav from '@/components/sections/Nav'
import Paper from '@/components/sections/Paper'
import Repos from '@/components/sections/Repos'
import Symbols from '@/components/sections/Symbols'

export default function Home() {
  return (
    <>
      <Nav />
      <main style={{ flex: 1 }}>
        <Hero />
        <Abstract />
        <Monads />
        <Layers />
        <Symbols />
        <Example />
        <Benchmarks />
        <Paper />
        <Repos />
      </main>
    </>
  )
}
