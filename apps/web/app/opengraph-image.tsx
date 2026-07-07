import { ImageResponse } from 'next/og';


export const alt = 'mcpkit';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: '#0d1015',
          color: '#eef1f6',
          padding: '56px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 32,
            padding: 40,
            justifyContent: 'space-between',
            background: 'linear-gradient(180deg, rgba(255,179,0,0.08), rgba(255,179,0,0) 28%), #131821',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '64%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: 999, border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 20, height: 28, borderLeft: '3px solid #42c6ff', borderBottom: '3px solid #ffb300', borderRight: '3px solid #ffb300', borderTop: '3px solid #ffb300' }} />
              </div>
              <div style={{ fontSize: 18, letterSpacing: 6, textTransform: 'uppercase', color: '#94a1b4' }}>mcpkit</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ fontSize: 62, lineHeight: 1.02, fontWeight: 700, letterSpacing: -2.5 }}>
                The create-next-app for MCP servers.
              </div>
              <div style={{ fontSize: 26, lineHeight: 1.4, color: '#b6c0cf' }}>
                Build, validate, test, diagnose, document, and ship Model Context Protocol servers with one coherent toolkit.
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, width: '30%', justifyContent: 'center' }}>
            {['init', 'dev', 'test', 'validate', 'doctor', 'build', 'ship'].map((item) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 18,
                  padding: '14px 18px',
                  background: 'rgba(255,255,255,0.03)',
                  fontSize: 20,
                }}
              >
                <span>mcpkit {item}</span>
                <span style={{ color: '#ffb300' }}>→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
