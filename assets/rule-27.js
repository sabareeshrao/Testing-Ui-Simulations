/* RULE 27 — classify diagram/control surfaces, including dynamically rendered content. */
(function(){
'use strict';
const svgSelector='svg';
const gridSelector='.grid,.grid2,.grid3,.g2,.g3,.visual-grid,.study-grid,.comparison-grid,.compare-grid,.two,.three,.overview-grid,.split';
const iconSelector='.ico,.icon,.icon-svg,.tech-icon,.brand-icon,.logo,.favicon,[role="img"][width="24"],[data-icon]';
function diagramWidth(el){
  for(let p=el.parentElement;p&&p!==document.body;p=p.parentElement){
    if(!p.matches(gridSelector))continue;
    const cs=getComputedStyle(p);
    if(!cs.display.includes('grid'))continue;
    const v=cs.gridTemplateColumns.trim();
    if(v==='none'||v==='')continue;
    const repeat=v.match(/^repeat\(\s*(\d+)\s*,/);
    const n=repeat?Number(repeat[1]):v.split(/\s+(?![^()]*\))/).length;
    if(n>=3)return 125;
    if(n===2)return 190;
  }
  return 380;
}
function markDiagram(el){
  const width=diagramWidth(el);
  el.style.setProperty('--r27-diagram-width',width+'px');
  el.dataset.r27Diagram=width===380?'standalone':String(width);
}
function scanSVG(el){
  if(el.matches(iconSelector)||el.closest('button, .copy, .icon-slot, .tech-icon-slot, .brandmark, .brand, .logo, .favicon, .icon-wrap'))return;
  const vb=el.viewBox&&el.viewBox.baseVal;
  const w=el.getAttribute('width'),h=el.getAttribute('height');
  const small=(w&&/^\d+(\.\d+)?(px)?$/.test(w)&&parseFloat(w)<=100)||(h&&/^\d+(\.\d+)?(px)?$/.test(h)&&parseFloat(h)<=45);
  if(small&&!el.matches('.diagram,.map,.cos-svg'))return;
  if(vb&&vb.width<=48&&vb.height<=48)return;
  if(el.matches('.diagram,.map,.cos-svg,.join-diagram')||(vb&&Math.max(vb.width,vb.height)>=100))markDiagram(el);
}
function labelBefore(el){
  const p=el.previousElementSibling;
  if(p&&p.matches('.row,.between,.marks,.range-label,.slider-label')&&!p.querySelector('button,select,input,svg,table,.card,.tile')&&p.textContent.trim())p.dataset.r27Label='';
}
function paint(el){
  const cs=getComputedStyle(el),accent=cs.accentColor;
  el.style.setProperty('--r27-accent',accent&&accent!=='auto'?accent:'#3b82f6');
  const min=Number(el.min||0),max=Number(el.max||100),value=Number(el.value);
  const f=Math.max(0,Math.min(100,(value-min)/Math.max(max-min,Number.EPSILON)*100));
  el.style.setProperty('--r27-fill',f+'%');
}
function slider(el){
  paint(el);
  const parent=el.parentElement;
  if(parent&&parent.matches('.range-field,.range,.chunk-range,.slider-wrap,.slider-group,.range-wrap'))parent.dataset.r27SliderGroup='';
  labelBefore(el);
  const next=el.nextElementSibling;
  if(next&&next.matches('.marks,.range-marks,.slider-marks'))next.dataset.r27Label='';
}
function bar(el){
  if(el.closest('.console,.terminal,.window-header,.toolbar,.header,.navbar')||el.matches('button,svg,span,i'))return;
  if(el.textContent.trim()&&el.children.length===0)return;
  const cls=el.className||'';
  const children=[...el.children];
  if(children.some(c=>c.matches('button,span')&&cls.includes('progress'))){
    el.dataset.r27Segments='';
    children.filter(c=>c.matches('button')&&!c.children.length&&!c.textContent.trim()).forEach(c=>c.dataset.r27Step='');
    return;
  }
  if(children.some(c=>c.matches('button'))||el.textContent.trim().length>0)return;
  const identifiers=[el.id,cls,...children.map(c=>c.id||'')].join(' ');
  const prog=/(quiz|progress|completion|stage|pipeline|requestBar|checkBar|securityBar)/i.test(identifiers);
  el.dataset.r27Bar=prog?'progress':'comparison';
  const p=el.parentElement;
  if(p&&p.matches('.bar-item,.baritem,.bar-row,.barrow,.result-bar,.metric-bar,.score-bar'))p.dataset.r27BarGroup='';
  labelBefore(el);
}
function scan(){
  document.querySelectorAll(svgSelector).forEach(scanSVG);
  document.querySelectorAll('.screenshot-diagram img,.original-diagram img').forEach(el=>{el.dataset.r27Image='';el.style.setProperty('--r27-diagram-width',diagramWidth(el)+'px');});
  document.querySelectorAll('.diagram:not(svg):not(img)').forEach(el=>{
    if(!el.querySelector('svg,img,table,input,button,select,canvas')&&el.children.length){el.dataset.r27HtmlDiagram='';el.style.setProperty('--r27-diagram-width',diagramWidth(el)+'px');}
  });
  document.querySelectorAll('input[type=range]').forEach(slider);
  document.querySelectorAll('div.bar,div.track,div.rankbar,div.progress,section.progress,progress').forEach(bar);
}
let scheduled=false;
function schedule(){
  if(scheduled)return;scheduled=true;
  requestAnimationFrame(()=>{scheduled=false;scan();});
}
function start(){
  scan();
  document.addEventListener('input',e=>{if(e.target.matches('input[type=range]'))paint(e.target);schedule();});
  document.addEventListener('change',schedule);
  document.addEventListener('click',schedule);
  document.addEventListener('reset',schedule);
  window.addEventListener('resize',schedule,{passive:true});
  new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['value','min','max','step','class','hidden']});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();