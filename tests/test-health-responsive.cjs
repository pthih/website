const assert=require('node:assert/strict');
const fs=require('node:fs');const path=require('node:path');const vm=require('node:vm');
class Element{
 constructor(){this.children=[];this.style={};this.textContent='';}
 append(...children){this.children.push(...children)}
 replaceChildren(){this.children=[]}
 setAttribute(){}
}
const elements=new Map();const el=id=>{if(!elements.has(id))elements.set(id,new Element());return elements.get(id)};
let width=1280;const media=[];
const window={matchMedia:query=>{const max=Number(query.match(/\d+/)[0]);const m={get matches(){return width<=max},addEventListener:(event,fn)=>{m.change=fn}};media.push(m);return m}};
const document={getElementById:el,createElement:()=>new Element()};
const html=fs.readFileSync(path.join(__dirname,'../health/index.html'),'utf8');
const script=html.slice(html.indexOf('<script>')+8,html.indexOf('async function refresh()'));
const ctx=vm.createContext({window,document,Date});vm.runInContext(script,ctx);
const now=new Date().toISOString();ctx.fixture={updated_at:now,report_source:'outpost',home_state:'healthy',days:{},incidents:[]};
vm.runInContext('data=fixture;remote={...fixture,website_state:"healthy",outpost_state:"healthy",website_days:{},outpost_days:{}}',ctx);
for(const [screen,days] of [[375,30],[430,30],[560,30],[561,60],[768,60],[1024,60],[1025,90],[1280,90]]){
 width=screen;media[0].change();
 assert.equal(el('history-heading').textContent,'System Status · Past '+days+' Days');
 assert.equal(el('services').children.length,3);
 for(const row of el('services').children){
  const bars=row.children[1].children;
  assert.equal(bars.length,days);assert.equal(row.children[2].children[0].textContent,(days-1)+' days ago');
  assert.ok(bars.at(-1).title.includes(now.slice(0,10)));
  const first=new Date();first.setUTCDate(first.getUTCDate()-days+1);
  assert.ok(bars[0].title.includes(first.toISOString().slice(0,10)));
  bars[0].onclick();assert.equal(el('inspector').textContent,bars[0].title);
 }
}
console.log('Public history checks passed: 30/60/90 counts, boundary changes, dates, labels and day selection.');
