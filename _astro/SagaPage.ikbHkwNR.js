import{t as f}from"./index.iOEdMF2f.js";import{g as S,B as h}from"./Basic.Cc51y0Be.js";import{_ as d,I as y,g as b}from"./_plugin-vue_export-helper.DnLpliuS.js";/* empty css                      */import{o as l,f as m,F as x,g as T,c as p,w as o,d as V,a as c,e as _,b as k,t as w}from"./runtime-dom.esm-bundler.D67iFI9Q.js";import{S as v}from"./Default.Dfx4jGqW.js";import"./index.Dno5OIXc.js";/* empty css                           *//* empty css                      */function g(s){const i=()=>{const t=a().reduce((r,u)=>r+parseInt(u.time),0);return`${Math.ceil(t/60)} min`},a=()=>S().filter(t=>t.saga===s.key);return{getStories:a,getTime:i,firstParagraph:()=>s.description.split(`
`).filter(t=>t.trim()!=="")[0],html:()=>s.description.split(`
`).filter(t=>t.trim()!=="").map((t,r)=>`<p key=${r}>${t}</p>`).join("<br>")}}const B={__name:"SagaStories",props:{saga:{default:{},type:Object}},setup(s,{expose:i}){i();const a=s,{getStories:e}=g(a.saga),n=e(),t={props:a,getStories:e,stories:n,BasicCard:h,get useSaga(){return g}};return Object.defineProperty(t,"__isScriptSetup",{enumerable:!1,value:!0}),t}},C={class:"sections-saga"};function P(s,i,a,e,n,t){return l(),m("div",C,[(l(!0),m(x,null,T(e.stories,r=>(l(),p(e.BasicCard,{slug:r.key,key:r.key,title:r.name,time:parseInt(r.time),isStory:""},null,8,["slug","title","time"]))),128))])}const j=d(B,[["render",P],["__scopeId","data-v-fe15cb33"]]),H={__name:"SagaPage",props:{saga:{type:Object,default:{}}},setup(s,{expose:i}){i();const a=s,{getTime:e,html:n}=g(a.saga),t=e(),r=n(),u={props:a,getTime:e,html:n,totalTime:t,descriptionHtml:r,get t(){return f},get useSaga(){return g},get VText(){return y},get VContainer(){return b},SagaStories:j,SectionsDefault:v};return Object.defineProperty(u,"__isScriptSetup",{enumerable:!1,value:!0}),u}},I=["src","title"],N={class:"saga-page__title"},O=["innerHTML"];function D(s,i,a,e,n,t){return l(),p(e.VContainer,{size:"xl",class:"saga-page"},{default:o(()=>[a.saga.youtube?(l(),m("iframe",{key:0,class:"saga-page__iframe",src:`https://www.youtube.com/embed/videoseries?list=${a.saga.youtube}`,title:`Saga Playlist: ${a.saga.name}`,frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""},null,8,I)):V("",!0),c(e.VContainer,{class:"saga-page__content"},{default:o(()=>[_("div",N,[c(e.VText,{as:"h1",variant:"header"},{default:o(()=>[k(w(a.saga.name),1)]),_:1})]),c(e.VText,null,{default:o(()=>[_("article",{innerHTML:e.descriptionHtml},null,8,O)]),_:1})]),_:1}),c(e.SectionsDefault,{title:`${e.t("page.saga.stories")}(${e.totalTime})`},{default:o(()=>[c(e.SagaStories,{saga:a.saga},null,8,["saga"])]),_:1},8,["title"])]),_:1})}const J=d(H,[["render",D]]);export{J as default};