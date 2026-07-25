import Nav from '@/components/sections/Nav'
import { SECTIONS } from '@/components/sections/registry'

export default function Home() {
  return (
    <>
      <Nav />
      <main style={{ flex: 1 }}>
        {SECTIONS.map(({ id, Component }) => (
          <Component key={id} />
        ))}
      </main>
    </>
  )
}
