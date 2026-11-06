const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(require('node:path').join(__dirname,'../health/index.html'),'utf8');
const source=html.slice(html.indexOf('<script>')+8,html.indexOf('async function refresh()'));
class E{constructor(){this.children=[];this.style={};this.textContent=''}append(...x){this.children.push(...x)}replaceChildren(){this.children=[]}setAttribute(){}}
for(const stamp of ['2026-11-06T01:00:00Z','2026-03-08T08:01:00Z','2026-11-01T07:01:00Z']){
 const NativeDate=Date;class FixedDate extends NativeDate{constructor(...args){super(...(args.length?args:[stamp]))}static now(){return new NativeDate(stamp).getTime()}}
 const today=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).format(new FixedDate());
 const saved={'2026-10-25':'degraded'};
 for(const width of [375,430,768,1280]){
  const nodes=new Map(),el=k=>{if(!nodes.has(k))nodes.set(k,new E());return nodes.get(k)};
  const ctx=vm.createContext({Date:FixedDate,Intl,document:{getElementById:el,createElement:()=>new E()},window:{matchMedia:q=>({matches:width<=Number(q.match(/\d+/)[0]),addEventListener(){}})}});
  vm.runInContext(source,ctx);
  ctx.home={updated_at:stamp,report_source:'outpost',home_state:'healthy',days:{[today]:'healthy'},incidents:[]};
  ctx.feed={updated_at:stamp,website_state:'healthy',outpost_state:'healthy',website_central_days:{[today]:'degraded'},website_days:saved,website_legacy_utc_days:saved,outpost_days:{'2026-10-25':'healthy'}};
  vm.runInContext('data=home;remote=feed;render()',ctx);
  const rows=el('services').children;
  for(const row of rows){const bars=row.children[1].children;assert.equal(bars.length,width<=560?30:width<=1024?60:90);assert.ok(bars.at(-1).title.includes(today+' · Central time'));bars.at(-1).onclick();assert.equal(el('inspector').textContent,bars.at(-1).title)}
  assert.equal(rows[0].children[1].children.at(-1).className,'bar warning');
  assert.equal(rows[2].children[1].children.at(-1).className,'bar healthy','A failed website check still proves the monitor ran');
  assert.ok(el('legacy-history').children.some(x=>x.textContent==='2026-10-25 · UTC · Service interruption observed'));
  assert.deepEqual(saved,{'2026-10-25':'degraded'});
  // Legacy-only feeds cannot be used as Central-day evidence.
  vm.runInContext('remote.website_central_days={};render()',ctx);
  assert.equal(el('services').children[0].children[1].children.at(-1).className,'bar unknown');
  assert.equal(el('services').children[2].children[1].children.at(-1).className,'bar unknown');
 }
}
console.log('Central dates, DST, responsive bars, UTC archive preservation, and legacy-only feeds passed.');
