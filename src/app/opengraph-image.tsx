import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '70px',
        color: '#f4f7fb',
        background: '#05070b',
        backgroundImage:
          'radial-gradient(circle at 80% 20%, #30256c 0, transparent 42%), radial-gradient(circle at 10% 90%, #123b37 0, transparent 40%)',
      }}
    >
      <div style={{ display: 'flex', fontSize: 24, letterSpacing: 5, color: '#2bd9b5' }}>
        MS / PORTFOLIO
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: -5,
            lineHeight: 1,
          }}
        >
          Md. Nazmus Shakib
        </div>
        <div style={{ display: 'flex', fontSize: 36, color: '#9aa6b7', marginTop: 20 }}>
          Full Stack Developer
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 22,
          color: '#9aa6b7',
        }}
      >
        <span>Laravel · MySQL · Next.js · React · AI APIs</span>
        <span>Khulna, Bangladesh</span>
      </div>
    </div>,
    size
  )
}

