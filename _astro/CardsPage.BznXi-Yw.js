/* empty css                       */import{_ as i,I as N,g as E}from"./_plugin-vue_export-helper.CRow76d-.js";import{o as c,f as l,e as o,n as f,F as B,a as d,t as T,d as j,r as m,h as S,i as M,c as C,w as p,b as O,g as Y}from"./runtime-dom.esm-bundler.CryLJqEh.js";import{S as L}from"./Default.C0jyuXcl.js";import"./index.CW802EIY.js";/* empty css                       */const h=[{order:"149",storyId:"149",es:"Equilibrios de Luna",en:"Luna Balancing",key:"luna-balancing",rank:"",rate:"",decoration:"",season:"1"},{order:"172",storyId:"172",es:"Eloy Pirata",en:"Eloy Pirate",key:"eloy-pirate",rank:"",rate:"",decoration:"",season:"1"},{order:"173",storyId:"172",es:"Barbanegra",en:"Blackbeard",key:"blackbeard",rank:"",rate:"",decoration:"",season:"1"},{order:"194",storyId:"193",es:"Eloy Samurai",en:"Eloy Samurai",key:"eloy-samurai",rank:"",rate:"",decoration:"",season:"1"},{order:"198",storyId:"197",es:"Zarabé",en:"Zarabe",key:"zarabe",rank:"",rate:"",decoration:"",season:"1"},{order:"199",storyId:"198",es:"Mabel",en:"Mabel",key:"mabel",rank:"",rate:"",decoration:"",season:"1"},{order:"205",storyId:"204",es:"En Pompeya",en:"In Pompeii",key:"in-pompeii",rank:"",rate:"",decoration:"",season:"1"},{order:"226",storyId:"225",es:"Melusine",en:"Melusine",key:"melusine",rank:"",rate:"",decoration:"",season:"1"}];function x(){return{getAll:()=>h,hasCards:()=>!!h.length}}const R={__name:"Border",setup(a,{expose:t}){t();const e={lang:"es"};return Object.defineProperty(e,"__isScriptSetup",{enumerable:!1,value:!0}),e}};function X(a,t,r,e,s,n){return c(),l(B,null,[t[1]||(t[1]=o("div",{class:"tgc-card__layer tgc-card__border-fill"},[o("img",{src:"/cards/structure/border-fill.webp",alt:"Border"})],-1)),o("div",{class:f(["tgc-card__layer tgc-card__border",[`tgc-card__border--${e.lang}`]])},t[0]||(t[0]=[o("img",{src:"/cards/structure/border.webp",alt:"Border"},null,-1)]),2)],64)}const z=i(R,[["render",X]]),A={__name:"Back",setup(a,{expose:t}){t();const r={Border:z};return Object.defineProperty(r,"__isScriptSetup",{enumerable:!1,value:!0}),r}},D={class:"tgc-card__back"};function Z(a,t,r,e,s,n){return c(),l("div",D,[t[0]||(t[0]=o("div",{class:"tgc-card__layer tgc-card__image"},[o("img",{src:"/cards/rear.webp",alt:"Back Image"})],-1)),d(e.Border)])}const q=i(A,[["render",Z]]),H={__name:"Name",props:{name:{type:String,default:""},size:{type:String,default:"md"}},setup(a,{expose:t}){t();const e={props:a};return Object.defineProperty(e,"__isScriptSetup",{enumerable:!1,value:!0}),e}};function W(a,t,r,e,s,n){return r.name?(c(),l("div",{key:0,class:f(["tgc-card-header",[`tgc-card-header--${r.size}`]])},T(r.name),3)):j("",!0)}const G=i(H,[["render",W]]),J={__name:"Front",props:{name:{type:String,default:""},image:{type:String,default:""},size:{type:String,default:"md"}},setup(a,{expose:t}){t();const e={props:a,CardName:G,Border:z};return Object.defineProperty(e,"__isScriptSetup",{enumerable:!1,value:!0}),e}},K={class:"tgc-card__front"},Q={class:"tgc-card__layer tgc-card__image"},U=["src"];function ee(a,t,r,e,s,n){return c(),l("div",K,[o("div",Q,[o("img",{src:`/cards/${r.image}.webp`,alt:"Front Image"},null,8,U)]),d(e.CardName,{name:r.name,size:r.size},null,8,["name","size"]),d(e.Border)])}const re=i(J,[["render",ee]]),te={__name:"Card",props:{size:{type:String,default:"md"},name:{type:String,default:""},image:{type:String,default:"default"},flipped:{type:Boolean,default:!1}},setup(a,{expose:t}){t();const r=a,e=m(r.flipped),s=m(0),n=m(0),_=()=>{e.value=!e.value,e.value&&y()},P=g=>{if(e.value)return;const u=g.currentTarget.getBoundingClientRect(),k=u.width,v=u.height,I=u.left+k/2,w=u.top+v/2,V=g.clientX,F=g.clientY;n.value=(V-I)/k*30,s.value=(w-F)/v*30},y=()=>{s.value=0,n.value=0},$=S(()=>e.value?{transform:"rotateY(180deg)",transition:"transform 0.3s ease-out"}:{transform:`rotateX(${s.value}deg) rotateY(${n.value}deg)`,transition:"transform 0.3s ease-out"}),b={props:r,isFlipped:e,rotateX:s,rotateY:n,flipCard:_,rotateCard:P,resetRotation:y,cardStyle:$,Back:q,Front:re,ref:m,computed:S};return Object.defineProperty(b,"__isScriptSetup",{enumerable:!1,value:!0}),b}};function ae(a,t,r,e,s,n){return c(),l("div",{class:f(["tgc-card",[{"tgc-card--flipped":e.isFlipped},`tgc-card--${r.size}`]]),onClick:e.flipCard,onMousemove:e.rotateCard,onMouseleave:e.resetRotation,onTouchstart:e.rotateCard,onPointerdown:e.rotateCard,onTouchend:e.resetRotation},[o("div",{class:"tgc-card__content",style:M(e.cardStyle)},[d(e.Front,{name:r.name,image:r.image,size:r.size},null,8,["name","image","size"]),d(e.Back)],4)],34)}const ne=i(te,[["render",ae]]),se={__name:"CardsPage",setup(a,{expose:t}){t();const{getAll:r}=x(),e=r(),n={getAll:r,cards:e,lang:"es",get useCards(){return x},Card:ne,get VText(){return N},get VContainer(){return E},SectionsDefault:L};return Object.defineProperty(n,"__isScriptSetup",{enumerable:!1,value:!0}),n}},oe={class:"card-page__title"},ce={class:"card-page__cards"};function de(a,t,r,e,s,n){return c(),C(e.VContainer,{size:"xl",class:"card-page"},{default:p(()=>[d(e.VContainer,{class:"card-page__content"},{default:p(()=>[o("div",oe,[d(e.VText,{as:"h1",variant:"header"},{default:p(()=>t[0]||(t[0]=[O(" Temp Card Page ")])),_:1})])]),_:1}),d(e.SectionsDefault,{title:"List All Cards"},{default:p(()=>[o("div",ce,[(c(!0),l(B,null,Y(e.cards,_=>(c(),C(e.Card,{size:"xs",name:_[e.lang],image:`season/${_.season}/${_.key}`},null,8,["name","image"]))),256))])]),_:1})]),_:1})}const fe=i(se,[["render",de]]);export{fe as default};
