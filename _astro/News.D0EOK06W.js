import{B as _}from"./Basic.BXaE9pc2.js";import{u as i}from"./useStories.BBtKqVbg.js";/* empty css                       */import{_ as p}from"./_plugin-vue_export-helper.BeEKGKz9.js";import{d as n,F as m,j as u,o,c as l}from"./runtime-dom.esm-bundler.CLHyqRja.js";import"./stories.DX8l9Rjp.js";import"./sagas.CvFQ12-u.js";/* empty css                         */const d={__name:"News",setup(c,{expose:a}){a();const{getLastNStories:r}=i(),e=r(10),s={getLastNStories:r,stories:e,BasicCard:_,get useStories(){return i}};return Object.defineProperty(s,"__isScriptSetup",{enumerable:!1,value:!0}),s}},f={class:"sections-new"};function k(c,a,r,e,s,B){return o(),n("div",f,[(o(!0),n(m,null,u(e.stories,t=>(o(),l(e.BasicCard,{slug:t.key,key:t.key,title:t.name,time:parseInt(t.time),isStory:""},null,8,["slug","title","time"]))),128))])}const j=p(d,[["render",k],["__scopeId","data-v-7153031a"]]);export{j as default};