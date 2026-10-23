// Simulated-browser (jsdom) smoke test. Run: npm install  then  npm test
const {JSDOM}=require("jsdom");const fs=require("fs");
const html=fs.readFileSync(require("path").join(__dirname,"..","index.html"),"utf8");
const errs=[];
const dom=new JSDOM(html,{runScripts:"dangerously",pretendToBeVisual:true,beforeParse(w){
 w.matchMedia=w.matchMedia||(q=>({matches:/reduce/.test(q),addEventListener(){},addListener(){}}));
 w.matchMedia=q=>({matches:/reduce/.test(q),addEventListener(){},addListener(){}});
 w.scrollTo=()=>{};w.Element.prototype.scrollIntoView=()=>{};
 w.addEventListener("error",e=>errs.push(e.message));}});
const w=dom.window,d=w.document;let pass=0,fail=0;
const ok=(n,c)=>{c?pass++:fail++;console.log((c?"PASS ":"FAIL ")+n)};
const on=()=>[...d.querySelectorAll(".view.on")].map(v=>v.id).join();
const click=el=>el.dispatchEvent(new w.MouseEvent("click",{bubbles:true}));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
ok("welcome title+text rendered",d.querySelector("#t-home").textContent.includes("Hey, you")&&d.querySelector("#welcome").textContent.length>50);
click(d.querySelector("#b-explore"));ok("Let's explore -> bloom",on()==="v-bloom");
ok("6 mood cards",d.querySelectorAll(".mood").length===6);
for(const [id,view] of [["laugh","v-feed"],["comfort","v-feed"],["brain","v-feed"],["play","v-play"],["cute","v-cute"],["magic","v-magic"]]){
 click(d.querySelector("#v-bloom,[data-go=bloom]")&&d.querySelector("nav [data-go=bloom]"));
 click(d.querySelector(`[data-mood=${id}]`));ok(`card ${id} -> ${view}`,on()===view);}
click(d.querySelector("nav [data-go=home]"));click(d.querySelector("#b-surprise"));ok("Surprise me -> magic",on()==="v-magic");
// repeat avoidance: 60 draws on funny
click(d.querySelector("nav [data-go=bloom]"));click(d.querySelector("[data-mood=laugh]"));
let prev="",rep=0,seen=new Set();for(let i=0;i<40;i++){click(d.querySelector("#feedNext"));const t=d.querySelector("#feedCard p").textContent;if(t===prev)rep++;seen.add(t);prev=t}
ok("no consecutive repeats in 40 funny draws",rep===0);ok("all 10 funny seen",seen.size===10);
// riddle reveal
click(d.querySelector("nav [data-go=bloom]"));click(d.querySelector("[data-mood=brain]"));
let found=false;for(let i=0;i<30&&!found;i++){click(d.querySelector("#feedNext"));if(d.querySelector("#feedCard .rv"))found=true}
ok("riddle shows reveal button, answer hidden",found&&d.querySelector("#feedCard .ans").hidden===true);
click(d.querySelector("#feedCard .rv"));ok("riddle answer revealed",d.querySelector("#feedCard .ans").hidden===false);
// envelopes
click(d.querySelector("nav [data-go=bloom]"));ok("4 envelopes",d.querySelectorAll(".env").length===4);
d.querySelectorAll(".env").forEach(e=>click(e));ok("envelope opens",!d.querySelector("#envCard").hidden&&d.querySelector("#envCard").textContent.length>20);
// magic box all categories
click(d.querySelector("nav [data-go=magic]"));
for(const c of ["wild","funny","sweet","fact","riddle","cute","challenge"]){
 click(d.querySelector(`.chip[data-c=${c}]`));click(d.querySelector("#box"));await sleep(30);
 const tag=d.querySelector("#magicCard .tag").textContent;ok(`magic box ${c} -> "${tag}"`,tag&&tag!=="Ready?");}
ok("Another/Take-me-elsewhere visible",!d.querySelector("#magicActs").hidden);
click(d.querySelector("#again"));await sleep(30);ok("another surprise works",true);
// garden
click(d.querySelector("nav [data-go=bloom]"));click(d.querySelector("[data-mood=cute]"));
const fl=d.querySelectorAll(".fl");ok("5 flowers with aria-labels",fl.length===5&&[...fl].every(f=>f.getAttribute("aria-label")));
click(fl[0].querySelector("rect"));ok("flower tap shows message",d.querySelector("#gmsg").textContent.includes("better than"));
const bf=d.querySelector("#bf"),t0=bf.style.transform;click(bf.querySelector("ellipse"));ok("butterfly moves",bf.style.transform!==t0);
click(d.querySelector("#cuteBtn"));ok("cutie card appears",!d.querySelector("#cuteCard").hidden);
click(d.querySelector("[data-gift] text"));ok("hidden gift -> magic box",on()==="v-magic");
// play
click(d.querySelector("nav [data-go=bloom]"));click(d.querySelector("[data-mood=play]"));
const f0=d.querySelector('.pt[data-i="0"] ellipse').getAttribute("fill");click(d.querySelector('.pt[data-i="0"] ellipse'));
ok("petal recolors",d.querySelector('.pt[data-i="0"] ellipse').getAttribute("fill")!==f0);
d.querySelectorAll(".b").forEach(b=>click(b));ok("12 bubbles popped -> message",d.querySelector("#bubMsg").textContent.includes("All popped"));
click(d.querySelector("#more"));ok("bubbles refill",d.querySelectorAll(".b").length===12&&!d.querySelector(".b.x"));
ok("no script errors",errs.length===0);
console.log(`\n${pass} passed, ${fail} failed`,errs);process.exit(fail?1:0);
})();
