import{a as f,g as h}from"./index.I8TPOaze.js";import{j as S,o as g,c as i,e as n,b as y,d as l,w as d,f as m,t as u,n as I}from"./runtime-dom.esm-bundler.D02XeAb0.js";import{a as p}from"./index.LRqcBlVy.js";import{_ as C,I as x,y as v}from"./_plugin-vue_export-helper.CCebKmzk.js";/* empty css                      */const b=f();function _(s){return{getSagaImageKey:()=>{const e=s.saga;return e.includes("luna")?"luna":e.includes("eloy")?"eloy":e.includes("sdg")||e.includes("crt")?"sdg":e.includes("tupi")||e.includes("crt")?"tupi":e.includes("llamarada")?"llamarada":"tupi"},getCharactersSameSaga:()=>{const e=S(s);return b.filter(t=>t.saga&&t.saga===e.saga&&t.order!==e.order)},getRelatedStories:()=>h().filter(t=>{if(!(s.saga&&t.saga!==s.saga))return console.log(t),t.saga===s.saga&&(t.story.includes(s.name)||t.story.includes(s.name.toLowerCase()))})}}const V={__name:"Smash",props:{name:{type:String,default:""},order:{type:[String,Number],default:0},slug:{type:String,default:""},saga:{type:String,default:""},color:{type:String,default:""},image:{type:String,default:""},as:{type:String,default:"div"},faction:{type:String,default:""}},setup(s,{expose:o}){o();const a=s,{getSagaImageKey:r}=_(a),c={props:a,getSagaImageKey:r,getImage:()=>`/assets/characters/${a.image}.webp`,getImageFoe:()=>"/assets/icons/foe.webp",getSagaImage:()=>`/assets/sagas/${r()}.webp`,get useCharacter(){return _},get toCharacter(){return p},get VText(){return x},get VImage(){return v}};return Object.defineProperty(c,"__isScriptSetup",{enumerable:!1,value:!0}),c}},w=["href"],R={class:"smash-card__content"},N={key:0,class:"smash-card__foe"},k=["alt","src"],z={class:"smash-card__saga"},T=["alt","src"],B={class:"smash-card__image"},F=["alt","src"];function K(s,o,a,r,e,t){return g(),i("a",{ref:"cardRef",class:"smash-card",href:r.toCharacter(a.slug)},[n("div",{class:"smash-card__wrapper",style:I({backgroundImage:`linear-gradient(270deg, ${a.color||"white"} 0%, rgb(255 255 255 / 0%) 45%)`})},[n("div",R,[a.faction==="enemy"?(g(),i("div",N,[n("img",{alt:`Imagen de ${a.name}`,class:"smash-card__img",aspectRatio:2/1,src:r.getImageFoe(),loading:"lazy"},null,8,k)])):y("",!0),l(r.VText,{class:"smash-card__order",variant:"header",color:"primary",maxLines:"2",as:a.as},{default:d(()=>[m(u(a.order<10?`0${a.order}`:`${a.order}`),1)]),_:1},8,["as"]),l(r.VText,{class:"smash-card__name",variant:"header",color:"primary",maxLines:"2",as:a.as},{default:d(()=>[m(u(a.name),1)]),_:1},8,["as"])])],4),n("div",z,[n("img",{alt:`Icon ${a.saga}`,class:"smash-card__img",aspectRatio:1/1,src:r.getSagaImage(),loading:"lazy"},null,8,T)]),n("div",B,[n("img",{alt:`Imagen de ${a.name}`,class:"smash-card__img",aspectRatio:2/1,src:r.getImage(),loading:"lazy"},null,8,F)])],8,w)}const q=C(V,[["render",K],["__scopeId","data-v-30960429"]]);export{q as S,_ as u};
