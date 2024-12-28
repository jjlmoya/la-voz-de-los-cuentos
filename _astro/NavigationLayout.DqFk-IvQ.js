import{_ as w,y as P,L as X,E as Z,T as q,I as G,F as K,z as R,A as U,g as $,M as ee,C as te,w as se}from"./_plugin-vue_export-helper.CCebKmzk.js";/* empty css                           */import{o as a,a as l,w as s,d as c,l as Y,g as m,h as I,c as p,F as C,r as S,f as o,t as i,e as n,s as ne,b as _,k as N}from"./runtime-dom.esm-bundler.D02XeAb0.js";import{t as v}from"./index.n9twUX9M.js";import{e as oe,d as ae,g as z,h as E,t as B,i as D,j as x,k as F,c as re,f as ie,l as le}from"./index._j4IZrpC.js";const ce={__name:"MenuContainer",setup(u,{expose:t}){t();const e={lang:"es",get VImage(){return P},get VNavigation(){return X}};return Object.defineProperty(e,"__isScriptSetup",{enumerable:!1,value:!0}),e}};function de(u,t,g,e,f,d){return a(),l(e.VNavigation,{class:"navigation"},{header:s(()=>[c(e.VImage,{class:"navigation__image navigation__image-logo",src:`/assets/logo/${e.lang}.webp`,aspectRatio:"1/1",loading:"eager",alt:"Logo"},null,8,["src"])]),footer:s(()=>[c(e.VImage,{class:"navigation__image",src:"/assets/utils/header-bottom.webp",loading:"lazy",alt:"Logo"})]),default:s(()=>[Y(u.$slots,"default",{},void 0,!0)]),_:3})}const ue=w(ce,[["render",de],["__scopeId","data-v-530483d3"]]),ge="es",fe={es:oe,en:ae}[ge];function T(){return{getAll:()=>fe,hasNewsLetters:()=>{return!1;//!!newsletters.length
}}}const _e={__name:"Menu",setup(u,{expose:t}){t();const{hasNewsLetters:g}=T(),e=m([{label:v("menu.home"),link:"/"},{label:v("menu.stories"),link:z()},{label:v("menu.sagas"),link:E()},{label:v("menu.characters"),link:B()},{label:v("menu.account"),link:D()},{label:v("menu.custom"),link:x()},{label:v("menu.newsletter"),link:F(),hide:!g()}].filter(d=>!d.hide));I(()=>{const d=window.location.pathname;e.value=e.value.map(r=>d===r.link?{...r,active:!0}:r)});const f={hasNewsLetters:g,menu:e,get t(){return v},get VMenu(){return Z},get VMenuItem(){return q},ref:m,onMounted:I,get toStories(){return z},get toSagas(){return E},get toCustomStory(){return x},get toNewsLetters(){return F},get toAccount(){return D},get toCharacters(){return B},get useNewsLetters(){return T}};return Object.defineProperty(f,"__isScriptSetup",{enumerable:!1,value:!0}),f}};function me(u,t,g,e,f,d){return a(),l(e.VMenu,{class:"menu"},{default:s(()=>[(a(!0),p(C,null,S(e.menu,r=>(a(),l(e.VMenuItem,{active:r.active,href:r.link},{default:s(()=>[o(i(r.label),1)]),_:2},1032,["active","href"]))),256))]),_:1})}const ve=w(_e,[["render",me]]),ke="la-voz-de-los-cuentos",pe="module",he="0.1.208",be={dev:"astro dev","dev:en":"env-cmd -f .env.en astro dev",start:"astro dev",build:"npm run statics && astro build && npm run robots",preview:"astro preview",astro:"astro",clean:"rimraf dist",statics:"npm run copy-assets",games:"npm i la-voz-de-los-cuentos-games@latest && npm run copy-assets",content:"node ./scripts/content.js",robots:"node ./scripts/generate-robots.js",redimension:"python ./scripts/redimension.py",characters:"node ./scripts/characters.js","copy-assets":"mkdirp ./public/la-voz-de-los-cuentos-games/assets && ncp ./node_modules/la-voz-de-los-cuentos-games/dist/la-voz-de-los-cuentos-games/assets ./public/la-voz-de-los-cuentos-games/assets",lint:"eslint .","lint:fix":"eslint . --fix",format:'prettier --write "src/**/*.{js,vue,css,html,md,astro}"'},ye={"@astrojs/sitemap":"^3.2.0","@astrojs/vue":"^4.5.2","@overgaming/vicius":"0.10.0","@vue/compiler-sfc":"^3.5.11",astro:"^4.15.12","eslint-plugin-vue":"^9.28.0","la-voz-de-los-cuentos-games":"^0.23.0",sharp:"^0.33.5","vite-plugin-pwa":"^0.20.5"},we={vue:"^3.4.0"},Ve={"cross-env":"^7.0.3",dotenv:"^16.4.5","env-cmd":"^10.1.0",eslint:"^9.12.0","eslint-define-config":"^2.1.0","eslint-plugin-astro":"^1.2.4",googleapis:"^144.0.0",mkdirp:"^3.0.1",ncp:"^2.0.0",prettier:"^3.3.3","prettier-plugin-astro":"^0.14.1",rimraf:"^6.0.1",stylelint:"^16.9.0","stylelint-config-html":"^1.1.0","stylelint-config-recommended":"^14.0.1","stylelint-config-recommended-vue":"^1.5.0"},Le={name:ke,type:pe,version:he,scripts:be,dependencies:ye,peerDependencies:we,devDependencies:Ve},Ce="es",j={es:re,en:ie}[Ce];function A(){return{getAll:()=>j,hasLandings:()=>!!j.length}}function O(){return{getBrands:()=>[{name:"LaVozDeLosCuentos",link:"https://lavozdeloscuentos.es",lang:"es"},{name:"BuboBoo",link:"https://buboboo.com",lang:"en"}]}}const Se={__name:"Footer",setup(u,{expose:t}){t();const{getBrands:g}=O(),e="La Voz De Los Cuentos",f="es",d="https://script.google.com/macros/s/AKfycbyf8f9poDw0Jh26Ieniy0eYZELfDpXwHlC43BWqihDzBCkmExaVhFELYQ2og72CCZHM/exec",{getAll:r}=A(),H=r(),J={email:"tus.audio.cuentos@gmail.com",instagram:"lavozdetuscuentos",tiktok:"@lavozdetuscuentos",spotify:"2fmWlaQNGSEcE7IX5Ir06z",twitter:"@TusAudioCuentos",youtube:"@LaVozDeLosCuentos",facebook:"AudioCuentosParaTodos"},h=m(""),k=m(!1),V=m(!1),b=m(!1),L=m(!1);function Q(){const y=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;b.value=y.test(String(h.value).toLowerCase()),k.value=!b.value}async function W(){if(b.value){L.value=!0,k.value=!1,V.value=!1;try{(await(await fetch(d,{method:"POST",body:JSON.stringify({email:h.value,lang:f,story:!1}),headers:{"Content-Type":"text/plain;charset=utf-8"}})).json()).result==="success"?(V.value=!0,h.value=""):k.value=!0}catch(y){console.error("Error:",y),k.value=!0}finally{L.value=!1}}}const M={getBrands:g,siteName:e,lang:f,newsletterEndpoint:d,getAll:r,landings:H,links:J,email:h,emailError:k,successMessage:V,isEmailValid:b,isSubmitting:L,validateEmail:Q,submitForm:W,get pkg(){return Le},get t(){return v},get useLandings(){return A},get toCustomStory(){return x},get toLandingsPage(){return le},ref:m,get VText(){return G},get VLink(){return K},get VDivider(){return R},get VInput(){return U},get VContainer(){return $},get VFieldLabel(){return ee},get VField(){return te},get VButton(){return se},get useBrand(){return O}};return Object.defineProperty(M,"__isScriptSetup",{enumerable:!1,value:!0}),M}},xe={class:"footer"},Me={class:"footer-header"},Ie={class:"footer-newsletter__content"},Ne={class:"footer-wrapper"},ze={class:"footer-links"},Ee={class:"footer-links"},Be={class:"footer-links"},De={class:"footer-wrapper"},Fe={class:"footer-links"},Te={class:"footer-links"},je={class:"footer-links__element"},Ae={class:"footer-links__element"},Oe={class:"footer-links__element"},Pe={class:"footer-links__element"},Ye={class:"footer-links__element"},He={class:"footer-links"},Je={class:"footer-landing"};function Qe(u,t,g,e,f,d){return a(),p("div",xe,[n("div",Me,[c(e.VText,{class:"footer-title",variant:"header",as:"h3"},{default:s(()=>[o(i(e.siteName)+" v"+i(e.pkg.version),1)]),_:1})]),c(e.VDivider,{class:"footer-divider"},{default:s(()=>[o(i(e.t("footer.newsletter")),1)]),_:1}),c(e.VContainer,{size:"xs",class:"footer-newsletter"},{default:s(()=>[n("div",Ie,[c(e.VField,null,ne({message:s(()=>[e.successMessage?(a(),l(e.VText,{key:0},{default:s(()=>[o(i(e.t("footer.newsletters.thanks")),1)]),_:1})):_("",!0),e.emailError?(a(),l(e.VText,{key:1},{default:s(()=>[o(i(e.t("footer.newsletters.error")),1)]),_:1})):_("",!0)]),default:s(()=>[e.successMessage?_("",!0):(a(),l(e.VInput,{key:0,"aria-label":"Input Email Newsletter",id:"emailInput",type:"email",name:"emailInput",modelValue:e.email,"onUpdate:modelValue":t[0]||(t[0]=r=>e.email=r),invalid:e.emailError,onInput:e.validateEmail},null,8,["modelValue","invalid"])),e.successMessage?_("",!0):(a(),l(e.VButton,{key:1,color:"primary",disabled:!e.isEmailValid||e.isSubmitting,onClick:e.submitForm},{default:s(()=>[o(i(e.t("footer.newsletter.button")),1)]),_:1},8,["disabled"]))]),_:2},[e.successMessage?void 0:{name:"label",fn:s(()=>[c(e.VFieldLabel,{for:"emailInput"},{default:s(()=>t[1]||(t[1]=[o("Email:")])),_:1})]),key:"0"}]),1024)])]),_:1}),n("div",Ne,[n("div",ze,[c(e.VDivider,null,{default:s(()=>[o(i(e.t("footer.sites")),1)]),_:1})]),n("div",Ee,[c(e.VDivider,null,{default:s(()=>[o(i(e.t("footer.community")),1)]),_:1})]),n("div",Be,[c(e.VDivider,null,{default:s(()=>[o(i(e.t("footer.interesting")),1)]),_:1})])]),n("div",De,[n("div",Fe,[(a(!0),p(C,null,S(e.getBrands(),r=>(a(),l(e.VLink,{href:r.link,rel:"noopener noreferrer dofollow"},{default:s(()=>[o(i(r.name)+" ["+i(r.lang)+"]",1)]),_:2},1032,["href"]))),256))]),n("div",Te,[n("div",je,[e.links.youtube?(a(),l(e.VLink,{key:0,href:`https://www.youtube.com/${e.links.youtube}?sub_confirmation=1`},{default:s(()=>t[2]||(t[2]=[o("Youtube")])),_:1},8,["href"])):_("",!0)]),n("div",Ae,[e.links.spotify?(a(),l(e.VLink,{key:0,href:`https://open.spotify.com/show/${e.links.spotify}`},{default:s(()=>t[3]||(t[3]=[o("Spotify")])),_:1},8,["href"])):_("",!0)]),n("div",Oe,[e.links.tiktok?(a(),l(e.VLink,{key:0,href:`https://www.tiktok.com/${e.links.tiktok}`},{default:s(()=>t[4]||(t[4]=[o("TikTok")])),_:1},8,["href"])):_("",!0)]),n("div",Pe,[e.links.instagram?(a(),l(e.VLink,{key:0,href:`https://www.instagram.com/${e.links.instagram}/`},{default:s(()=>t[5]||(t[5]=[o("Instagram")])),_:1},8,["href"])):_("",!0)]),n("div",Ye,[e.links.facebook?(a(),l(e.VLink,{key:0,href:`https://www.facebook.com/${e.links.facebook}`},{default:s(()=>t[6]||(t[6]=[o("Facebook")])),_:1},8,["href"])):_("",!0)])]),n("div",He,[c(e.VLink,{href:e.toCustomStory()},{default:s(()=>[o(i(e.t("footer.interesting.custom")),1)]),_:1},8,["href"]),e.links.email?(a(),l(e.VLink,{key:0,href:`mailto:${e.links.email}`},{default:s(()=>[o(i(e.t("footer.interesting.contact")),1)]),_:1},8,["href"])):_("",!0)])]),n("div",Je,[t[7]||(t[7]=o(" · ")),(a(!0),p(C,null,S(e.landings,r=>(a(),l(e.VLink,{href:e.toLandingsPage(r.key)},{default:s(()=>[o(i(r.title),1)]),_:2},1032,["href"]))),256))])])}const We=w(Se,[["render",Qe],["__scopeId","data-v-e054e711"]]),Xe={__name:"NavigationLayout",setup(u,{expose:t}){t();const g="es",e=m(!1),d={lang:g,isOpen:e,toggle:()=>{e.value=!e.value},ref:m,get VImage(){return P},MenuContainer:ue,Menu:ve,Footer:We};return Object.defineProperty(d,"__isScriptSetup",{enumerable:!1,value:!0}),d}},Ze={class:"navigation-layout"},qe={class:"navigation-layout__mobile"},Ge={class:"navigation-layout__mobile-image"},Ke=["src"],Re={class:"navigation-layout__inner"},Ue={class:"navigation-layout__content"};function $e(u,t,g,e,f,d){return a(),p("div",Ze,[n("div",qe,[n("button",{class:"navigation-layout__btn",onClick:e.toggle,"aria-label":"Toggle Menu"},t[0]||(t[0]=[n("svg",{xmlns:"http://www.w3.org/2000/svg",width:"25px",viewBox:"0 0 24 24",fill:"none"},[n("path",{d:"M20 7L4 7",stroke:"black","stroke-width":"1.5","stroke-linecap":"round"}),n("path",{d:"M20 12L4 12",stroke:"black","stroke-width":"1.5","stroke-linecap":"round"}),n("path",{d:"M20 17L4 17",stroke:"black","stroke-width":"1.5","stroke-linecap":"round"})],-1)])),n("div",Ge,[n("img",{src:`/assets/logo/h/${e.lang}.webp`},null,8,Ke)])]),n("div",{class:N(["navigation-layout__nav",{"navigation-layout__nav--open":e.isOpen}])},[n("div",Re,[c(e.MenuContainer,null,{default:s(()=>[c(e.Menu)]),_:1})])],2),n("div",Ue,[Y(u.$slots,"default",{},void 0,!0),c(e.Footer)]),n("div",{class:N(["navigation-layout__backdrop",{"navigation-layout__backdrop--visible":e.isOpen}]),onClick:e.toggle},null,2)])}const rt=w(Xe,[["render",$e],["__scopeId","data-v-451a2fec"]]);export{rt as default};