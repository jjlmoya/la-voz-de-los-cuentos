import{t as _}from"./index.CqsgeKA1.js";import{_ as C,g,A as y}from"./_plugin-vue_export-helper.CCebKmzk.js";import{S}from"./Smash.9BzNJULc.js";import{a as V}from"./index.EShsrRl_.js";/* empty css                              */import{g as i,m as d,c as u,d as f,w as k,e as x,F as A,r as v,o as l,a as I}from"./runtime-dom.esm-bundler.D02XeAb0.js";import"./index.DgijBu9w.js";/* empty css                      */const b=V();function m(){const s=[...b];return{getCharacterSagaImageKey:e=>e.includes("luna")?"luna":e.includes("eloy")?"eloy":e.includes("sdg")||e.includes("crt")?"sdg":e.includes("tupi")||e.includes("crt")?"tupi":e.includes("legends")||e.includes("leyendas")?"legends":e.includes("458")?"458":e.includes("paco")?"paco":e.includes("carlota")||e.includes("charlotte")?"cockroach":e.includes("llamarada")?"llamarada":e.includes("finalizador")||e.includes("finisher")?"finalizador":"legends",getAllCharacters:()=>s}}const w={__name:"FilteredCharacters",setup(s,{expose:t}){t();const{getAllCharacters:a}=m(),e=a(),n=i(""),c=d(()=>{let o=e;if(n.value){const p=n.value.toLowerCase();o=o.filter(h=>h.name.toLowerCase().includes(p))}return o}),r={getAllCharacters:a,stories:e,searchQuery:n,filteredAndSortedCharacters:c,get t(){return _},get VContainer(){return g},get VInput(){return y},ref:i,computed:d,SmashCard:S,get useCharacters(){return m}};return Object.defineProperty(r,"__isScriptSetup",{enumerable:!1,value:!0}),r}},B={class:"sections-filtered-character"},F={class:"sections-fildered-character__content"};function z(s,t,a,e,n,c){return l(),u("div",B,[f(e.VContainer,{class:"sections-fildered-character__search-bar",size:"xs"},{default:k(()=>[f(e.VInput,{type:"text",modelValue:e.searchQuery,"onUpdate:modelValue":t[0]||(t[0]=r=>e.searchQuery=r),placeholder:e.t("page.characters.searcher.placeholder"),class:"search-input"},null,8,["modelValue","placeholder"])]),_:1}),x("div",F,[(l(!0),u(A,null,v(e.filteredAndSortedCharacters,r=>(l(),I(e.SmashCard,{as:"h2",slug:r.key,key:r.key,image:r.image,name:r.name,order:r.order,saga:r.saga,color:r.color,faction:r.faction},null,8,["slug","image","name","order","saga","color","faction"]))),128))])])}const P=C(w,[["render",z],["__scopeId","data-v-2b4fde5f"]]);export{P as default};
