import{_ as f,y,z as v}from"./_plugin-vue_export-helper.BeEKGKz9.js";/* empty css                       */import{o as d,d as _,e as l,a as u,w as p,b as h,t as x,r as L,F as V,j as b,c as B}from"./runtime-dom.esm-bundler.CLHyqRja.js";import{s as I}from"./sagas.CvFQ12-u.js";const N={__name:"Description",props:{title:{type:String,default:""},slug:{type:String,default:""},isStory:{type:Boolean,default:!0},content:{type:String,default:""}},setup(t,{expose:n}){n();const e={get VImage(){return y},get VText(){return v}};return Object.defineProperty(e,"__isScriptSetup",{enumerable:!1,value:!0}),e}},k=["href"],w={class:"description-card__wrapper"},D={class:"description-card__content"},T=["innerHTML"],F={class:"description-card__image"};function M(t,n,e,a,c,r){return d(),_("a",{class:"description-card",href:`/${e.isStory?"cuento":"saga"}/${e.slug}/`},[l("div",w,[l("div",D,[u(a.VText,{variant:"header"},{default:p(()=>[h(x(e.title),1)]),_:1}),u(a.VText,{"max-lines":"4",variant:"body"},{default:p(()=>[l("div",{innerHTML:e.content},null,8,T)]),_:1})]),l("div",F,[u(a.VImage,{aspectRation:"1/1",src:`/assets/${e.isStory?"stories":"sagas"}/${e.slug}.png`},null,8,["src"])])])],8,k)}const P=f(N,[["render",M],["__scopeId","data-v-e53ee214"]]);function S(){const t=L([...I].sort((s,i)=>new Date(s.order)-new Date(i.order)));return{getFirstSaga:()=>t.value[0],getLastSaga:()=>t.value[t.value.length-1],getRandomSaga:()=>{const s=Math.floor(Math.random()*t.value.length);return t.value[s]},getAllSagas:()=>t.value,getSagasByPage:(s,i)=>{const g=(s-1)*i,m=g+i;return t.value.slice(g,m)},getLastNSagas:s=>t.value.slice(0,s)}}const $={__name:"Sagas",props:{amount:{type:Number,default:7}},setup(t,{expose:n}){n();const e=t,{getLastNSagas:a}=S(),c=a(e.amount),r={props:e,getLastNSagas:a,sagas:c,DescriptionCard:P,get useSagas(){return S}};return Object.defineProperty(r,"__isScriptSetup",{enumerable:!1,value:!0}),r}},j={class:"sections-new"};function C(t,n,e,a,c,r){return d(),_("div",j,[(d(!0),_(V,null,b(a.sagas,o=>(d(),B(a.DescriptionCard,{slug:o.key,isStory:!1,key:o.key,title:o.name,content:o.description},null,8,["slug","title","content"]))),128))])}const E=f($,[["render",C],["__scopeId","data-v-c09d84c4"]]);export{E as default};
