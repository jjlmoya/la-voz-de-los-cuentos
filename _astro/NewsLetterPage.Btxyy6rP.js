import{_ as i,I as _,g as c}from"./_plugin-vue_export-helper.B3vTrFFa.js";import{S as f}from"./Spotify.CTgQYe-z.js";/* empty css                      */import{c as a,w as r,r as p,o as n,a as o,b as d,t as u,d as m,e as w}from"./runtime-dom.esm-bundler.BWb4HXx9.js";/* empty css                      */const g={__name:"NewsLetterPage",props:{newsletter:{type:Object,default:{}}},setup(l,{expose:s}){s();const e={get VText(){return _},get VContainer(){return c},Spotify:f,ref:p};return Object.defineProperty(e,"__isScriptSetup",{enumerable:!1,value:!0}),e}},x=["innerHTML"];function y(l,s,e,t,V,h){return n(),a(t.VContainer,{size:"xl",class:"newsletter-page"},{default:r(()=>[o(t.VText,{class:"newsletter-page__title",as:"h1"},{default:r(()=>[d(u(e.newsletter.title),1)]),_:1}),e.newsletter.spotify?(n(),a(t.Spotify,{key:0,spotify:e.newsletter.spotify},null,8,["spotify"])):m("",!0),o(t.VText,null,{default:r(()=>[w("div",{class:"newsletter-page__html",innerHTML:e.newsletter.html},null,8,x)]),_:1})]),_:1})}const L=i(g,[["render",y]]);export{L as default};
