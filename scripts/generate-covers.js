const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const out = path.join(__dirname, '..', 'assets', 'covers');
fs.mkdirSync(out, { recursive: true });
const covers = [
  { slug: 'debut-album', source: 'assets/visuals/kurced-2.jpg', title: 'KURCED', color: '#6e3df5', position: 'centre', kicker: 'SEPTEMBER 2026', topArtist: '', titleSize: 290, titleY: 1790, footer: 'THE DEBUT ALBUM / SEPTEMBER 2026' },
  { slug: 'locked-out', source: 'assets/kurced-rooftop-hero.jpg', title: 'LOCKED\nOUT', color: '#813dff', position: 'centre', kicker: 'SINGLE 01' },
  { slug: 'all-american-boys', source: 'assets/visuals/kurced-1.jpg', title: 'ALL-AMERICAN\nBOYS', color: '#f12862', position: 'centre', kicker: 'SINGLE 02', titleSize: 184 }, 
  { slug: 'overdose', source: 'assets/visuals/kurced-3.jpg', title: 'OVER-\nDOSE', color: '#a953ff', position: 'centre', kicker: 'SINGLE 03' },
  { slug: 'last-seen', source: 'assets/visuals/kurced-4.jpg', title: 'LAST\nSEEN', color: '#ff2897', position: 'centre', kicker: 'SINGLE 04' },
  { slug: 'medicine', source: 'assets/visuals/kurced-5.jpg', title: 'MEDICINE', color: '#8e63ff', position: 'centre', kicker: 'SINGLE 05', titleSize: 226, titleY: 1790 }
];
function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function svg(c) {
  const size = c.titleSize || 260;
  const title = c.title.split('\n').map((line, i) => `<text x="128" y="${(c.titleY || 1600) + i * Math.round(size * .88)}" class="title">${esc(line)}</text>`).join('');
  return Buffer.from(`<svg width="2048" height="2048" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="shade" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#06020a" stop-opacity=".08"/><stop offset=".5" stop-color="${c.color}" stop-opacity=".12"/><stop offset="1" stop-color="#09030e" stop-opacity=".92"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <rect width="2048" height="2048" fill="url(#shade)"/>
    <rect x="58" y="58" width="1932" height="1932" fill="none" stroke="#f8eaff" stroke-opacity=".75" stroke-width="3"/>
    <text x="125" y="170" fill="#f8eaff" font-family="DejaVu Sans, sans-serif" font-size="72" font-weight="700" letter-spacing="15">${c.topArtist === undefined ? 'KURCED' : c.topArtist}</text>
    <text x="1923" y="170" text-anchor="end" fill="#f8eaff" font-family="DejaVu Sans, sans-serif" font-size="30" letter-spacing="7">${c.kicker}</text>
    <g fill="#f8eaff" font-family="DejaVu Sans, sans-serif" font-size="${size}" font-weight="900" letter-spacing="-13" filter="url(#glow)">${title}</g>
    <text x="130" y="1935" fill="#f8eaff" font-family="DejaVu Sans, sans-serif" font-size="27" letter-spacing="8">${c.footer || 'DEBUT ALBUM ERA / 2026'}</text>
  </svg>`);
}
(async () => {
 for (const c of covers) {
   await sharp(c.source).resize(2048, 2048, { fit: 'cover', position: c.position })
     .modulate({ brightness: 0.82, saturation: 1.18 })
     .composite([{ input: svg(c), top: 0, left: 0 }])
     .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
     .toFile(path.join(out, `${c.slug}.jpg`));
   console.log(`created ${c.slug}.jpg`);
 }
})();
