const $=id=>document.getElementById(id);
const themeToggle=$('themeToggle');
const activeTheme=()=>document.documentElement.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
function updateThemeToggle(){const dark=activeTheme()==='dark';themeToggle.textContent=dark?'☼':'☾';themeToggle.setAttribute('aria-label',dark?'Yorug‘ rejimga o‘tish':'Qorong‘i rejimga o‘tish');themeToggle.title=dark?'Yorug‘ rejimga o‘tish':'Qorong‘i rejimga o‘tish'}
updateThemeToggle();
themeToggle.onclick=()=>{const theme=activeTheme()==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;try{localStorage.setItem('bd-theme',theme)}catch{}updateThemeToggle()};
const CATS=['Hammasi',...new Set(PROJECTS.map(p=>p.cat))];
let cat='Hammasi';
const norm=s=>s.toLowerCase().replace(/[ʻʼ‘’`´]/g,"'");
function render(){
 const q=norm($('q').value.trim());
 const list=PROJECTS.filter(p=>(cat==='Hammasi'||p.cat===cat)&&(!q||norm(p.title+' '+p.text+' '+p.fan+' '+p.cat).includes(q)));
 $('cards').innerHTML=list.map(p=>`<a class="card" style="--c:${p.color}" href="${p.slug}/index.html">
  <div class="hd"><div class="ic">${p.icon}</div></div>
  <div class="bd"><span class="tag">${p.fan}</span><h3>${p.title}</h3><p>${p.text}</p><span class="go">Ochish →</span></div></a>`).join('');
 $('empty').hidden=list.length>0;
}
$('chips').innerHTML=CATS.map(c=>`<button role="tab" data-c="${c}" class="${c===cat?'on':''}">${c}</button>`).join('');
$('chips').querySelectorAll('button').forEach(b=>b.onclick=()=>{cat=b.dataset.c;$('chips').querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));render()});
$('q').oninput=render;
$('stats').innerHTML=`<div><b>${PROJECTS.length}</b>loyiha</div><div><b>${CATS.length-1}</b>yo'nalish</div><div><b>100%</b>interaktiv</div>`;
$('yr').textContent=new Date().getFullYear();
render();
