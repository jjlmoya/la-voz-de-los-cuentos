import{_ as c,z as f,a as d}from"./_plugin-vue_export-helper.C5XeIz0c.js";import{S as p}from"./Spotify.B_E_qVWG.js";/* empty css                      */import{r as n,c as o,w as a,o as l,a as i,b as u,t as m,d as w,e as x}from"./runtime-dom.esm-bundler.BPZR5SMm.js";/* empty css                      */const y={__name:"NewsLetterPage",props:{newsletter:{type:Object,default:{}}},setup(_,{expose:s}){s();const e=n(!1),r={iframe:e,iframeLoaded:()=>{e.value=!0},get VText(){return f},get VContainer(){return d},Spotify:p,ref:n};return Object.defineProperty(r,"__isScriptSetup",{enumerable:!1,value:!0}),r}},V=["innerHTML"];function g(_,s,e,t,r,h){return l(),o(t.VContainer,{size:"xl",class:"newsletter-page"},{default:a(()=>[i(t.VText,{class:"newsletter-page__title",as:"h1"},{default:a(()=>[u(m(e.newsletter.title),1)]),_:1}),e.newsletter.spotify?(l(),o(t.Spotify,{key:0,spotify:e.newsletter.spotify},null,8,["spotify"])):w("",!0),i(t.VText,null,{default:a(()=>[x("div",{class:"newsletter-page__html",innerHTML:e.newsletter.html},null,8,V)]),_:1})]),_:1})}const C=c(y,[["render",g]]);export{C as default};
