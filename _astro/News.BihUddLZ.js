import{B as p}from"./Basic.PU33DIGA.js";import{u as a}from"./useStories.BR3oDYDH.js";/* empty css                       */import{_ as m}from"./_plugin-vue_export-helper.C9hBSDQp.js";import{g as c,F as l,h as u,o,c as d}from"./runtime-dom.esm-bundler.BomD5kKh.js";import"./landings.QdnRsL1j.js";/* empty css                            */const f={__name:"News",setup(_,{expose:i}){i();const{getLastNStories:s}=a(),e=s(11).reverse(),n=e.slice(1,e.length),r={getLastNStories:s,_stories:e,stories:n,BasicCard:p,get useStories(){return a}};return Object.defineProperty(r,"__isScriptSetup",{enumerable:!1,value:!0}),r}},g={class:"sections-new"};function k(_,i,s,e,n,r){return o(),c("div",g,[(o(!0),c(l,null,u(e.stories,t=>(o(),d(e.BasicCard,{slug:t.key,key:t.key,title:t.name,time:parseInt(t.time),isStory:""},null,8,["slug","title","time"]))),128))])}const b=m(f,[["render",k],["__scopeId","data-v-4e15f895"]]);export{b as default};
