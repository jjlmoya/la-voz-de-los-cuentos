import{u as _}from"./useStories.Dsw-fZ-h.js";import{u as i}from"./stories.DFvJuHsz.js";import{_ as f,y as u,z as m}from"./_plugin-vue_export-helper.C5XeIz0c.js";/* empty css                       */import{f as p,a as s,e as o,w as d,o as h,b as y,t as x}from"./runtime-dom.esm-bundler.BPZR5SMm.js";import"./sagas.CvFQ12-u.js";const g={__name:"Hero",setup(l,{expose:a}){a();const{getLastStory:t}=_(),e=t(),{firstParagraph:r}=i(t()),c=r(),n={getLastStory:t,story:e,firstParagraph:r,first:c,get useStories(){return _},get useStory(){return i},get VImage(){return u},get VText(){return m}};return Object.defineProperty(n,"__isScriptSetup",{enumerable:!1,value:!0}),n}},S={class:"card-hero"},V={class:"card-hero__content"},b=["href"],v=["innerHTML"];function T(l,a,t,e,r,c){return h(),p("article",S,[s(e.VImage,{aspectRatio:"16/9",src:`/assets/stories/${e.story.key}.webp`},null,8,["src"]),o("div",V,[o("a",{class:"card-hero__article",href:`/cuento/${e.story.key}/`},[s(e.VText,{class:"card-hero__title",variant:"header"},{default:d(()=>[y(x(e.story.name),1)]),_:1}),s(e.VText,{"max-lines":"3",variant:"label"},{default:d(()=>[o("div",{innerHTML:e.first},null,8,v)]),_:1})],8,b)])])}const N=f(g,[["render",T],["__scopeId","data-v-07c9be64"]]);export{N as default};
