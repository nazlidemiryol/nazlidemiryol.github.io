(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const CDN = 'https://cdn.myportfolio.com/4564cd85-35c9-43f8-9bcf-4c15df20e7f4/';
const u = s => (s || '').replace(/^~/, CDN);
const arr = x => Array.isArray(x) ? x : (x ? [x] : []);
const RAW = window.RAW || {};
let L = 'tr';
try { L = localStorage.getItem('dil') === 'en' ? 'en' : 'tr'; } catch {}

/* ---------- PROJELER ---------- */
// t: başlık, d: açıklama, g: şerit (1 = video/ai/3d, 2 = fotoğraf)
const P = [
  { s:'duguncom', y:2025, g:1, t:{tr:'Düğün.com',en:'Düğün.com'},
    d:{tr:'Reklam, sosyal medya ve YouTube için baştan sona ürettiğim video içerikleri.',en:'Video content I produced end to end for ads, social media and YouTube.'},
    links:[['Düğün.com YouTube','https://www.youtube.com/@duguncomTV/videos'],['İş Ortağım YouTube','https://www.youtube.com/@DugunComIsOrtagim'],['Düğün.com Instagram','https://www.instagram.com/duguncom/'],['İş Ortağım Instagram','https://www.instagram.com/duguncomisortagim/']] },
  { s:'ai-urun', y:2026, g:1, t:{tr:'AI Gelinlik Ürün',en:'AI Bridal Product'},
    d:{tr:'Gelinliklerin hepsi ürünlerden alınmıştır. Mekanlarla beraber görselleştirilip videolaştırılmıştır.',en:'Every gown comes from a real product, visualised in venues and turned into video with AI.'} },
  { s:'ai-1', y:2026, g:1, t:{tr:'AI',en:'AI'} },
  { s:'kisa-film', y:2024, g:1, t:{tr:'Kısa Film',en:'Short Film'} },
  { s:'3d', y:2024, g:1, t:{tr:'3D',en:'3D'} },
  { s:'temptetease', y:2025, g:1, t:{tr:'TempteTease',en:'TempteTease'} },
  { s:'ai', y:2025, g:1, t:{tr:'Bitirme Projesi',en:'Graduation Project'} },
  { s:'mardin', y:2026, g:1, t:{tr:'Mardin',en:'Mardin'} },
  { s:'bts', y:2026, g:1, t:{tr:'Kamera Arkası',en:'Behind the Scenes'} },
  { s:'fuar-cekimi', y:2024, g:1, t:{tr:'Fuar Çekimi',en:'Trade Fair Video'} },
  { s:'tbilisi', y:2026, g:2, t:{tr:'Tiflis',en:'Tbilisi'} },
  { s:'taki-cekim', y:2024, g:2, t:{tr:'Takı Çekimi',en:'Jewellery Shoot'} },
  { s:'mobilya', y:2024, g:2, t:{tr:'Mobilya Çekimi',en:'Furniture Shoot'} },
  { s:'sena', y:2023, g:2, t:{tr:'Sena',en:'Sena'} },
  { s:'konser', y:2023, g:2, t:{tr:'Konser',en:'Concert'} },
  { s:'shoes', y:2023, g:2, t:{tr:'Ayakkabı',en:'Shoes'} },
  { s:'koc', y:2023, g:2, t:{tr:'Koç',en:'Koç'} },
  { s:'assistant', y:2023, g:2, t:{tr:'Asistan',en:'Assistant'} },
  { s:'han', y:2023, g:2, t:{tr:'Han',en:'Han'} },
  { s:'photography', y:2022, g:2, t:{tr:'Fotoğraf',en:'Photography'} },
  { s:'fatih', y:2022, g:2, t:{tr:'Fatih',en:'Fatih'} },
  { s:'model', y:2022, g:2, t:{tr:'Model',en:'Model'} },
  { s:'helin', y:2022, g:2, t:{tr:'Helin',en:'Helin'} },
  { s:'meric', y:2022, g:2, t:{tr:'Meriç',en:'Meriç'} },
  { s:'ceren-v2', y:2022, g:2, t:{tr:'Portre I',en:'Portrait I'} },
  { s:'ceren', y:2022, g:2, t:{tr:'Portre II',en:'Portrait II'} },
  { s:'cansin-v2', y:2022, g:2, t:{tr:'Cansın',en:'Cansın'} },
  { s:'beyoglu', y:2022, g:2, t:{tr:'Beyoğlu',en:'Beyoğlu'} },
  { s:'motor', y:2022, g:2, t:{tr:'Motor',en:'Motor'} },
].filter(p => RAW[p.s]).map(p => {
  const r = RAW[p.s];
  return { ...p, cover: u(r.cover), videos: arr(r.videos).slice(), images: arr(r.images).map(i => ({ s: u(i.s), l: u(i.l), r: i.r })) };
});

// AI klasöründeki ilk video (animasyon) Düğün.com'un son sırasına taşınır
(() => {
  const ai = P.find(p => p.s === 'ai-1'), dg = P.find(p => p.s === 'duguncom');
  if (ai && dg && ai.videos.length) dg.videos.push(ai.videos.shift());
})();

// Kapak yönü: Adobe'deki kapakların hepsi 4:3 yatay. Konusu ortada duranlar dikey (3:4) karta sığıyor,
// yazı / geniş kadraj içerenler yatay kalıyor. Aynı boydakiler şeritte yan yana dizilir.
const DIKEY = new Set(['ai-urun','mardin','bts','mobilya','sena','konser','han','model','ceren-v2','ceren','cansin-v2']);
P.forEach((p, i) => { p.o = DIKEY.has(p.s) ? 'p' : 'l'; p.k = i; });
P.sort((a, b) => (a.g - b.g) || (a.o === b.o ? a.k - b.k : (a.o === 'l' ? -1 : 1)));

/* ---------- METİNLER ---------- */
const T = {
  tr: {
    'nav.work':'İşler','nav.about':'Hakkımda','nav.contact':'İletişim',
    'about.title':'Hakkımda','contact.title':'İletişim',
    'about.p1':'Üniversitede birçok farklı stajda deneyim kazandıktan sonra, son stajımı tamamladığım Düğün.com\'da video editör olarak çalışmaya başladım.',
    'about.p2':'Bugün çekimden kurguya, motion tasarımdan AI destekli prodüksiyona kadar video üretim sürecinin tamamını yürütüyorum. AI-first bir iş akışıyla çalışıyorum: Claude üzerinde kurduğum agent\'lar ve skill\'lerle Remotion ve FFmpeg kullanarak programatik kurgu yapıyor, Higgsfield ve Kling gibi üretken araçlarla AI video ve görsel üretiyorum.',
    'about.p3':'Mayıs 2026\'dan beri kendi YouTube ve Instagram hesaplarımda kişisel içerikler de üretiyorum. Boş zamanlarımda gezmek, yeni yerler keşfetmek, fotoğraf ve video çekmek, doğa yürüyüşleri yapmak, müzik dinlemek ve yeni insanlarla tanışıp farklı hayatlar öğrenmekten keyif alıyorum.',
    rows:[['Video kurgu','AI video','3D & motion'],['Fotoğraf','I'],['Fotoğraf','II']],
    mv:'Videolar', mi:'Kareler', wait:'Video yükleniyor',
  },
  en: {
    'nav.work':'Works','nav.about':'About','nav.contact':'Contact',
    'about.title':'About','contact.title':'Contact',
    'about.p1':'After several internships during university, I started working as a video editor at Düğün.com, where I completed my last one.',
    'about.p2':'Today I run the whole video pipeline, from shooting and editing to motion design and AI-assisted production. My workflow is AI-first: with agents and skills I built on Claude, I edit programmatically using Remotion and FFmpeg, and create AI video and visuals with generative tools like Higgsfield and Kling.',
    'about.p3':'Since May 2026 I have also been making personal content on my own YouTube and Instagram. In my free time I enjoy travelling, discovering new places, taking photos and videos, hiking, listening to music, and meeting new people to learn about different lives.',
    rows:[['Video editing','AI video','3D & motion'],['Photography','I'],['Photography','II']],
    mv:'Videos', mi:'Stills', wait:'Loading video',
  }
};
const t = k => T[L][k] ?? k;
let cur = -1, lbList = [], lbIdx = 0;

/* ---------- ÇİZİM ---------- */
function applyI18n() {
  document.documentElement.lang = L;
  $$('[data-i18n]').forEach(e => { e.textContent = t(e.dataset.i18n); });
}
function renderWorks() {
  const rows = [P.filter(p => p.g === 1), P.filter(p => p.g === 2 && p.o === 'l'), P.filter(p => p.g === 2 && p.o === 'p')];
  const card = p => {
    const i = P.indexOf(p);
    return `<button class="card ${p.o}" data-i="${i}">
      <span class="ph"><img src="${p.cover}" alt="${p.t[L]}" loading="lazy" draggable="false">${p.videos.length ? '<span class="play">▶ Play</span>' : ''}</span>
      <span class="cap"><b>${String(i + 1).padStart(2, '0')}.</b><i>${p.t[L]}</i></span>
    </button>`;
  };
  $('#works').innerHTML = rows.map((r, k) => `
    <div class="row reveal">
      ${k ? `<p class="label row-label ${k % 2 ? 'r' : 'l'}">${t('rows')[k].map((x, j) => j ? `<small>${x}</small>` : x).join('')}</p>` : ''}
      <div class="strip">${r.map(card).join('')}</div>
    </div>`).join('');
  $$('.strip').forEach(dragScroll);
  observe();
}

/* şeritleri fareyle sürükleyerek kaydırma */
let dragged = false;
function dragScroll(el) {
  let down = false, x0 = 0, s0 = 0;
  el.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; dragged = false; x0 = e.clientX; s0 = el.scrollLeft; });
  addEventListener('pointermove', e => {
    if (!down) return;
    const dx = e.clientX - x0;
    if (Math.abs(dx) > 5) { dragged = true; el.classList.add('drag'); }
    if (dragged) el.scrollLeft = s0 - dx;
  });
  addEventListener('pointerup', () => { down = false; el.classList.remove('drag'); setTimeout(() => { dragged = false; }, 0); });
}

/* başlık: PORTFOLIO ekran genişliğini tam doldursun */
function fitTitle() {
  const h = $('#h1'), s = h.firstElementChild;
  h.style.fontSize = '200px';
  const avail = h.parentElement.clientWidth - parseFloat(getComputedStyle(h.parentElement).paddingLeft) * 2;
  h.style.fontSize = (200 * avail / s.getBoundingClientRect().width * 1.012) + 'px';
}

/* ---------- PROJE PENCERESİ ---------- */
const embed = id => `https://www-ccv.adobe.io/v1/player/ccv/${id}/embed?bgcolor=%230a0a0a&lazyLoading=true&api_key=BehancePro2View`;
let vidIO;
function openProject(i) {
  cur = (i + P.length) % P.length;
  const p = P[cur], b = $('#mBody');
  $('#mMeta').textContent = `${String(cur + 1).padStart(2, '0')}. / ${p.y}`;
  $('#mTitle').textContent = p.t[L];
  let h = '';
  if (p.d) h += `<p class="m-desc">${p.d[L]}</p>`;
  if (p.links) h += `<div class="m-links">${p.links.map(([n, l]) => `<a href="${l}" target="_blank" rel="noopener">${n} ↗</a>`).join('')}</div>`;
  if (p.videos.length) {
    h += `<h3 class="m-h">${t('mv')} (${p.videos.length})</h3><div class="vids">` + p.videos.map(v =>
      `<div class="vid ${v.r > 100 ? 'v' : ''} ${p.videos.length === 1 ? 'solo' : ''}" style="aspect-ratio:${100 / (v.r || 56.25)}" data-id="${v.id}"><span class="wait">${t('wait')}…</span></div>`).join('') + '</div>';
  }
  if (p.images.length) {
    h += `<h3 class="m-h">${t('mi')} (${p.images.length})</h3><div class="shots">` + p.images.map((im, k) =>
      `<button data-k="${k}"><img src="${im.s}" loading="lazy" alt="${p.t[L]} ${k + 1}" ${im.r ? `style="aspect-ratio:${100 / im.r}"` : ''}></button>`).join('') + '</div>';
  }
  b.innerHTML = h; b.scrollTop = 0;
  vidIO && vidIO.disconnect();
  vidIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const f = document.createElement('iframe');
    f.src = embed(e.target.dataset.id); f.allowFullscreen = true; f.title = 'Video'; f.allow = 'autoplay; fullscreen';
    e.target.appendChild(f); vidIO.unobserve(e.target);
  }), { root: b, rootMargin: '300px' });
  $$('.vid', b).forEach(v => vidIO.observe(v));
  $('#modal').hidden = false; document.body.classList.add('lock');
  history.replaceState(null, '', '#p-' + p.s);
}
function closeProject() {
  $('#modal').hidden = true; $('#mBody').innerHTML = ''; document.body.classList.remove('lock'); cur = -1;
  history.replaceState(null, '', location.pathname + location.search);
}
function openLb(k) {
  lbList = P[cur].images; lbIdx = (k + lbList.length) % lbList.length;
  $('#lbImg').src = lbList[lbIdx].l; $('#lbCount').textContent = `${lbIdx + 1} / ${lbList.length}`;
  $('#lb').hidden = false;
}

/* ---------- KAYDIRMA ---------- */
let io;
function observe() {
  io && io.disconnect();
  io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -6% 0px' });
  $$('.reveal').forEach(e => io.observe(e));
}

/* ---------- OLAYLAR ---------- */
function renderAll() { applyI18n(); renderWorks(); if (cur >= 0) openProject(cur); }
document.addEventListener('click', e => {
  const c = e.target.closest('.card'); if (c) { if (!dragged) openProject(+c.dataset.i); return; }
  if (e.target.closest('[data-close]')) return closeProject();
  const sh = e.target.closest('.shots button'); if (sh) return openLb(+sh.dataset.k);
  if (e.target.closest('[data-lbclose]') || e.target.id === 'lb') { $('#lb').hidden = true; }
});
$('#mPrev').onclick = () => openProject(cur - 1);
$('#mNext').onclick = () => openProject(cur + 1);
$('#lbPrev').onclick = () => openLb(lbIdx - 1);
$('#lbNext').onclick = () => openLb(lbIdx + 1);
$('#lang').onclick = () => { L = L === 'tr' ? 'en' : 'tr'; try { localStorage.setItem('dil', L); } catch {} renderAll(); };
document.addEventListener('keydown', e => {
  const lb = !$('#lb').hidden, md = !$('#modal').hidden;
  if (e.key === 'Escape') { if (lb) $('#lb').hidden = true; else if (md) closeProject(); }
  if (e.key === 'ArrowRight') { if (lb) openLb(lbIdx + 1); else if (md) openProject(cur + 1); }
  if (e.key === 'ArrowLeft') { if (lb) openLb(lbIdx - 1); else if (md) openProject(cur - 1); }
});
addEventListener('scroll', () => $('#nav').classList.toggle('solid', scrollY > 30), { passive: true });
addEventListener('resize', fitTitle);

renderAll(); fitTitle();
document.fonts && document.fonts.ready.then(fitTitle);
const m = location.hash.match(/^#p-(.+)$/);
if (m) { const i = P.findIndex(p => p.s === m[1]); if (i >= 0) openProject(i); }
})();
