import About from '@/components/sections/About'
import Footer from '@/components/sections/Footer'
import Hero from '@/components/sections/Hero'
import Layers from '@/components/sections/Layers'
import Nav from '@/components/sections/Nav'
import Paper from '@/components/sections/Paper'
import Pillars from '@/components/sections/Pillars'
import Repos from '@/components/sections/Repos'

export default function Home() {
  return (
    <>
      <Nav />
      <main style={{ flex: 1 }}>
        <Hero />
        <About />
        <Pillars />
        <Layers />
        <Paper />
        <Repos />
      </main>
      <Footer />
    </>
  )
}
