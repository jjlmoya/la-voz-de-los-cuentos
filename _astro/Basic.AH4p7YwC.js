import{_ as S,z as x}from"./_plugin-vue_export-helper.C5XeIz0c.js";import{u as m}from"./stories.DFvJuHsz.js";/* empty css                         */import{r as c,k as f,l as v,o as i,f as b,e as o,d as g,a as B,w as y,b as h,t as p,c as T}from"./runtime-dom.esm-bundler.BPZR5SMm.js";const V={__name:"Basic",props:{title:{type:String,default:""},slug:{type:String,default:""},time:{type:Number,default:0},isStory:{type:Boolean,default:!0},as:{type:String,default:"div"}},setup(n,{expose:d}){d();const e=n,{getTime:t}=m({time:e.time}),l=t(),s=c(null),_=c(!1);let a;f(()=>{a=new IntersectionObserver(([r])=>{r.isIntersecting&&(_.value=!0,a.unobserve(s.value))},{threshold:.1}),s.value&&a.observe(s.value)}),v(()=>{a&&s.value&&a.unobserve(s.value)});const u={props:e,getTime:t,renderedTime:l,cardRef:s,isIntersecting:_,get observer(){return a},set observer(r){a=r},ref:c,onMounted:f,onUnmounted:v,get VText(){return x},get useStory(){return m}};return Object.defineProperty(u,"__isScriptSetup",{enumerable:!1,value:!0}),u}},k=["href"],I={class:"basic-card__image"},N=["src"],w={class:"basic-card__content"},C={class:"basic-card__article"};function R(n,d,e,t,l,s){return i(),b("a",{ref:"cardRef",class:"basic-card",href:`/${e.isStory?"cuento":"saga"}/${e.slug}/`},[o("div",I,[t.isIntersecting?(i(),b("img",{key:0,class:"basic-card__img",aspectRatio:1/1,src:`/assets/${e.isStory?"stories":"sagas"}/${e.slug}.webp`,loading:"lazy"},null,8,N)):g("",!0)]),o("div",w,[o("div",C,[B(t.VText,{class:"basic-card__title",variant:"header",color:"primary",maxLines:"2",as:e.as},{default:y(()=>[h(p(e.title),1)]),_:1},8,["as"])])]),e.time?(i(),T(t.VText,{key:0,variant:"body",class:"basic-card__time"},{default:y(()=>[h(p(t.renderedTime),1)]),_:1})):g("",!0)],8,k)}const E=S(V,[["render",R],["__scopeId","data-v-4c27a054"]]);export{E as B};
