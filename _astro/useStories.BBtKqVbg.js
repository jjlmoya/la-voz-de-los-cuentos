import{s as i}from"./stories.DX8l9Rjp.js";import{r as l}from"./runtime-dom.esm-bundler.CLHyqRja.js";function M(){const e=l([...i].sort((t,a)=>new Date(t.date)-new Date(a.date)));return{getFirstStory:()=>e.value[0],getLastStory:()=>e.value[e.value.length-1],getRandomStory:()=>{const t=Math.floor(Math.random()*e.value.length);return e.value[t]},getAllStories:()=>e.value,getStoriesByPage:(t,a)=>{const s=(t-1)*a,o=s+a;return e.value.slice(s,o)},getLastNStories:t=>e.value.slice(-t),getRelatedStories:t=>{const a=e.value.filter(s=>s.saga===t.saga&&s.key!==t.key);if(a.length<8){const s=8-a.length,o=e.value.filter(r=>r.saga!==t.saga&&Math.abs(r.time-t.time)<=2&&r.key!==t.key).sort((r,n)=>Math.abs(r.time-t.time)-Math.abs(n.time-t.time)).slice(0,s);return[...a,...o]}return a.slice(0,8)}}}export{M as u};
