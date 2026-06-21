/* ---------- 導覽切換 ---------- */
const views = ['home','grammar','vocab'];
function show(view){
  views.forEach(v=>{
    document.getElementById('view-'+v).classList.toggle('hidden', v!==view);
  });
  document.querySelectorAll('nav button').forEach(b=>{
    b.classList.toggle('active', b.dataset.view===view);
  });
  window.scrollTo({top:0});
  if(view==='grammar' && !grammarRendered){ renderGrammar(); grammarRendered=true; }
  if(view==='vocab' && !vocabRendered){ renderVocab(); vocabRendered=true; }
}
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>show(b.dataset.view));
document.querySelectorAll('.home-card').forEach(c=>c.onclick=()=>show(c.dataset.go));

/* ---------- 工具 ---------- */
const esc = s => (s||'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
// 注音：將「漢字《よみ》」轉成 <ruby>，其餘文字仍跳脫，無 XSS 風險
const ruby = s => esc(s).replace(/([一-鿿々〆ヶ]+)《([ぁ-ゖァ-ヺー]+)》/g,'<ruby>$1<rt>$2</rt></ruby>');
const norm = s => (s||'').toLowerCase();

/* ---------- 文法 ---------- */
let grammarRendered=false;
let gCat='全部';
const gCats=['全部',...Array.from(new Set(GRAMMAR.map(g=>g.category)))];

function buildGFilters(){
  const wrap=document.getElementById('g-filters');
  wrap.innerHTML=gCats.map(c=>`<button class="chip${c===gCat?' active':''}" data-c="${esc(c)}">${esc(c)}</button>`).join('');
  wrap.querySelectorAll('.chip').forEach(ch=>ch.onclick=()=>{gCat=ch.dataset.c; renderGrammar();});
}
function renderGrammar(){
  buildGFilters();
  const q=norm(document.getElementById('g-search').value);
  const list=document.getElementById('g-list');
  const items=GRAMMAR.filter(g=>{
    if(gCat!=='全部' && g.category!==gCat) return false;
    if(!q) return true;
    const hay=norm(g.pattern+g.meaning+g.connection+(g.usage||[]).join('')+g.examples.map(e=>e.jp+e.zh).join(''));
    return hay.includes(q);
  });
  document.getElementById('g-count').textContent=`共 ${items.length} 個文法句型`;
  if(!items.length){ list.innerHTML='<div class="empty">找不到符合的文法 🙈</div>'; return; }
  list.innerHTML=items.map((g,i)=>`
    <div class="g-card" data-i="${i}">
      <div class="g-head">
        <span class="pat">${esc(g.pattern)}</span>
        <span class="mean">${esc(g.meaning)}</span>
        <span class="tag">${esc(g.category)}</span>
        <span class="arrow">▾</span>
      </div>
      <div class="g-body">
        <div class="g-sec"><div class="lbl">接續方式</div><span class="conn">${esc(g.connection)}</span></div>
        ${g.usage&&g.usage.length?`<div class="g-sec"><div class="lbl">使用時機</div><ul class="usage">${g.usage.map(u=>`<li>${esc(u)}</li>`).join('')}</ul></div>`:''}
        <div class="g-sec"><div class="lbl">例句</div>
          ${g.examples.map(e=>`<div class="ex"><div class="jp">${ruby(e.jp)}</div><div class="zh">${esc(e.zh)}</div></div>`).join('')}
        </div>
      </div>
    </div>`).join('');
  list.querySelectorAll('.g-head').forEach(h=>h.onclick=()=>h.parentElement.classList.toggle('open'));
}
document.getElementById('g-search').addEventListener('input',renderGrammar);

/* ---------- 單字 ---------- */
let vocabRendered=false;
let vCat='全部';
const POS={'動':'pos-v','名':'pos-n','形':'pos-a','副':'pos-o','他':'pos-o'};
const vFilterList=['全部','動詞','名詞','形容詞','副詞/其他'];
function posClass(p){
  if(p.includes('動')) return 'pos-v';
  if(p.includes('名')) return 'pos-n';
  if(p.includes('形')) return 'pos-a';
  return 'pos-o';
}
function matchVCat(p){
  if(vCat==='全部') return true;
  if(vCat==='動詞') return p.includes('動');
  if(vCat==='名詞') return p.includes('名');
  if(vCat==='形容詞') return p.includes('形');
  if(vCat==='副詞/其他') return !p.includes('動')&&!p.includes('名')&&!p.includes('形');
  return true;
}
function buildVFilters(){
  const wrap=document.getElementById('v-filters');
  wrap.innerHTML=vFilterList.map(c=>`<button class="chip${c===vCat?' active':''}" data-c="${esc(c)}">${esc(c)}</button>`).join('');
  wrap.querySelectorAll('.chip').forEach(ch=>ch.onclick=()=>{vCat=ch.dataset.c; renderVocab();});
}
function renderVocab(){
  buildVFilters();
  const q=norm(document.getElementById('v-search').value);
  const list=document.getElementById('v-list');
  const items=VOCAB.filter(v=>{
    if(!matchVCat(v.pos)) return false;
    if(!q) return true;
    return norm(v.word+v.kana+v.meaning).includes(q);
  });
  document.getElementById('v-count').textContent=`共 ${items.length} 個單字`;
  if(!items.length){ list.innerHTML='<div class="empty" style="grid-column:1/-1">找不到符合的單字 🙈</div>'; return; }
  list.innerHTML=items.map(v=>`
    <div class="v-card">
      <div class="v-top">
        <span class="v-word">${esc(v.word)}</span>
        <span class="v-kana">${esc(v.kana)}</span>
        <span class="v-pos ${posClass(v.pos)}">${esc(v.pos)}</span>
      </div>
      <p class="v-mean">${esc(v.meaning)}</p>
      ${v.ex?`<div class="v-ex"><span class="jp">${ruby(v.ex.jp)}</span><br>${esc(v.ex.zh)}</div>`:''}
    </div>`).join('');
}
document.getElementById('v-search').addEventListener('input',renderVocab);

/* ---------- 初始化首頁數字 ---------- */
document.getElementById('st-g').textContent=GRAMMAR.length;
document.getElementById('st-v').textContent=VOCAB.length;
document.getElementById('home-g-cnt').textContent=GRAMMAR.length+' 個句型';
document.getElementById('home-v-cnt').textContent=VOCAB.length+' 個單字';
