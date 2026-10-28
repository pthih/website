const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
class E{constructor(){this.children=[];this.style={};this.textContent=''}append(...e){this.children.push(...e)}replaceChildren(){this.children=[]}setAttribute(){} }
const els=new Map(),el=id=>{if(!els.has(id))els.set(id,new E());return els.get(id)};
const document={getElementById:el,createElement:()=>new E()};
const html=fs.readFileSync(require('node:path').join(__dirname,'../health/index.html'),'utf8'),scripts=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);const script=scripts.find(s=>s.includes('function render()'));
const code=script.slice(0,script.indexOf('async function refresh'));
const context=vm.createContext({document,Date,Number,Boolean});vm.runInContext(code,context);
function render(source,age,contact='recent'){context.fixture={schema_version:1,report_source:source,updated_at:new Date(Date.now()-age*1000).toISOString(),home_state:'healthy',contact_state:contact,days:{},incidents:[]};vm.runInContext('data=fixture;render()',context);return el('services').children[1].children[0].children[1].textContent}
assert.equal(render('outpost',2100),'Operational');assert.equal(render('outpost',2701),'Unknown');assert.equal(render('outpost',1,'no_recent_report'),'No recent report');assert.equal(render(undefined,1501),'Unknown');assert.equal(render(undefined,600),'Operational');
console.log('Public Home services: thirty-minute publication, stale data, no recent report and legacy migration passed.');
