import{B as p}from"./Basic.C26ZYflu.js";import{u as a}from"./useStories.CABbgegH.js";/* empty css                       */import{_ as m}from"./_plugin-vue_export-helper.41V5Xjgf.js";import{f as c,F as l,j as u,o,c as d}from"./runtime-dom.esm-bundler.C4veuAXy.js";import"./index.4V_ePJKA.js";/* empty css                           */const f={__name:"News",setup(_,{expose:i}){i();const{getLastNStories:s}=a(),e=s(11).reverse(),n=e.slice(1,e.length),r={getLastNStories:s,_stories:e,stories:n,BasicCard:p,get useStories(){return a}};return Object.defineProperty(r,"__isScriptSetup",{enumerable:!1,value:!0}),r}},g={class:"sections-new"};function k(_,i,s,e,n,r){return o(),c("div",g,[(o(!0),c(l,null,u(e.stories,t=>(o(),d(e.BasicCard,{slug:t.key,key:t.key,title:t.name,time:parseInt(t.time),isStory:""},null,8,["slug","title","time"]))),128))])}const b=m(f,[["render",k],["__scopeId","data-v-4e15f895"]]);export{b as default};