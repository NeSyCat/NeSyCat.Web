import { ImageResponse } from 'next/og'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'

export const alt =
  'NeSyCat — A monad-based categorical framework for neurosymbolic AI'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), 'public/logo.png'), 'base64')
  const logoSrc = `data:image/png;base64,${logoData}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 96px',
          backgroundColor: '#FAFAF9',
          fontFamily: 'sans-serif',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={220} height={220} alt="" />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 64,
          }}
        >
          <div
            style={{
              fontSize: 104,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: '#1F2937',
            }}
          >
            NeSyCat
          </div>
          <div
            style={{
              fontSize: 34,
              fontWeight: 500,
              lineHeight: 1.35,
              marginTop: 16,
              maxWidth: 760,
              color: '#1F2937',
            }}
          >
            A monad-based categorical framework that unifies neurosymbolic
            reasoning
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: '0.04em',
              marginTop: 32,
              color: '#3478F6',
            }}
          >
            nesycat.org
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
