import Explorer from '@/components/Explorer'
import InformaticsPanel from '@/components/panels/InformaticsPanel'
import LinguisticsPanel from '@/components/panels/LinguisticsPanel'
import LogicPanel from '@/components/panels/LogicPanel'
import MathematicsPanel from '@/components/panels/MathematicsPanel'
import OverviewPanel from '@/components/panels/OverviewPanel'
import SemioticsPanel from '@/components/panels/SemioticsPanel'
import TypeTheoryPanel from '@/components/panels/TypeTheoryPanel'
import { fetchArxiv } from '@/lib/arxiv'
import { PAPERS } from '@/lib/papers'

// Single-screen interactive explorer: a diamond hotspot figure (left) whose
// five corners + center switch a content panel (right). All data fetching
// happens here, server-side, before the tree is handed to the client
// Explorer — see components/Explorer.tsx.
export default async function Home() {
  const papers = await Promise.all(PAPERS.map((id) => fetchArxiv(id)))

  return (
    <Explorer
      overview={<OverviewPanel />}
      logic={<LogicPanel papers={papers} />}
      mathematics={<MathematicsPanel />}
      semiotics={<SemioticsPanel />}
      informatics={<InformaticsPanel />}
      linguistics={<LinguisticsPanel />}
      typetheory={<TypeTheoryPanel />}
    />
  )
}
