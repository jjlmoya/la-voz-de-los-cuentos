import{a as D}from"./index.WD-CXpjI.js";import{r as u,p as s}from"./runtime-core.esm-bundler.BLIdz6c-.js";const k=D();function T(r){const i=u([]),e=u({}),p=()=>r.story.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`).filter(t=>t.trim()!=="")[0],m=()=>r.story.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`).filter(t=>t.trim()!=="").map((t,a)=>`<p key=${a}>${t}</p>`).join(""),g=()=>`${Math.ceil(parseInt(r.time)/60)} min`,f=()=>{if(r.saga)return k.find(t=>t.key===r.saga)?.name},c=()=>{i.value=JSON.parse(localStorage.getItem("storiesData"))||[],e.value=s(i).find(t=>t.key===r.key)},l=()=>{try{c();const t=s(e),a=Math.ceil(t.spentTime/parseInt(t.totalTime)*100),o=a>100?100:a;return{...t,current:o}}catch{return{}}},S=()=>l().current>=100,d=t=>{const a=e.value;a.like=t,e.value=a,n()},n=()=>{const t=JSON.parse(localStorage.getItem("storiesData"))||[],a=t.findIndex(o=>o.key===r.key);a===-1?t.push(s(e)):t[a]=s(e),localStorage.setItem("storiesData",JSON.stringify(t))},v=()=>{let t=e.value;t.spentTime+=10,t.spentTime>=parseInt(t.totalTime)&&(t.finished=!0,t.completedAt||(t.completedAt=Date.now())),e.value=t,n()};return{firstParagraph:p,getTime:g,html:m,getSaga:f,getCurrentStatus:l,setLikeStatus:d,isComplete:S,reading:()=>{c(),n(),e.value&&!e.value.startedAt&&(e.value.startedAt=Date.now(),n()),setInterval(v,1e4)}}}export{T as u};
