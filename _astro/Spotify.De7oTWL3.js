/* empty css                      */import{_ as d}from"./_plugin-vue_export-helper.41V5Xjgf.js";import{r as a,o as r,f as i,e as f,n,d as _}from"./runtime-dom.esm-bundler.C4veuAXy.js";const p={__name:"Spotify",props:{spotify:{type:String,default:""}},setup(c,{expose:t}){t();const e=a(!1),s={iframe:e,iframeLoaded:()=>{e.value=!0},ref:a};return Object.defineProperty(s,"__isScriptSetup",{enumerable:!1,value:!0}),s}},l={key:0,class:"spotify"},m=["src"],y={key:0,class:"spotify__loading"};function u(c,t,e,o,s,v){return e.spotify?(r(),i("div",l,[f("iframe",{class:n(["spotify__iframe",{"spotify__iframe--active":o.iframe}]),title:"Spotify Audio Player",frameborder:"0",scrolling:"no",loading:"lazy",onLoad:o.iframeLoaded,src:`https://podcasters.spotify.com/pod/show/lavozdeloscuentos/embed/episodes/${e.spotify}`},null,42,m),o.iframe?_("",!0):(r(),i("div",y)),f("div",{class:n([{"spotify__mask--animation":o.iframe},"spotify__mask"])},null,2)])):_("",!0)}const b=d(p,[["render",u]]);export{b as S};
