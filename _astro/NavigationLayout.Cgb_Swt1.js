import{_ as y,y as T,L as B,E as O,T as P,I as Y,F as H,z as J,A as Q,g as W,M as X,C as Z,w as q}from"./_plugin-vue_export-helper.B3vTrFFa.js";/* empty css                           */import{o as n,c as l,w as t,a as c,m as j,r as g,j as C,f as L,F as G,g as K,b as o,t as _,e as s,x as R,d as f,l as x,p as U,i as $}from"./runtime-dom.esm-bundler.BWb4HXx9.js";import{t as v}from"./index.iOEdMF2f.js";import{e as ee,a as te,b as I,c as M,d as N,f as V,g as E}from"./index.Dno5OIXc.js";const se={__name:"MenuContainer",setup(a,{expose:r}){r();const e={lang:"es",get VImage(){return T},get VNavigation(){return B}};return Object.defineProperty(e,"__isScriptSetup",{enumerable:!1,value:!0}),e}};function oe(a,r,u,e,m,d){return n(),l(e.VNavigation,{class:"navigation"},{header:t(()=>[c(e.VImage,{class:"navigation__image navigation__image-logo",src:`/assets/logo/${e.lang}.webp`,aspectRatio:"1/1",loading:"eager",alt:"Logo"},null,8,["src"])]),footer:t(()=>[c(e.VImage,{class:"navigation__image",src:"/assets/utils/header-bottom.webp",loading:"lazy",alt:"Logo"})]),default:t(()=>[j(a.$slots,"default",{},void 0,!0)]),_:3})}const ne=y(se,[["render",oe],["__scopeId","data-v-530483d3"]]),ae="es",z={es:ee,en:te}[ae];function F(){return{getAll:()=>z,hasNewsLetters:()=>!!z.length}}const re={__name:"Menu",setup(a,{expose:r}){r();const{hasNewsLetters:u}=F(),e=g([{label:v("menu.home"),link:"/"},{label:v("menu.stories"),link:I()},{label:v("menu.sagas"),link:M()},{label:v("menu.account"),link:N()},{label:v("menu.custom"),link:V()},{label:v("menu.newsletter"),link:E(),hide:!u()}].filter(d=>!d.hide));C(()=>{const d=window.location.pathname;e.value=e.value.map(i=>d===i.link?{...i,active:!0}:i)});const m={hasNewsLetters:u,menu:e,get t(){return v},get VMenu(){return O},get VMenuItem(){return P},ref:g,onMounted:C,get toStories(){return I},get toSagas(){return M},get toCustomStory(){return V},get toNewsLetters(){return E},get toAccount(){return N},get useNewsLetters(){return F}};return Object.defineProperty(m,"__isScriptSetup",{enumerable:!1,value:!0}),m}};function ie(a,r,u,e,m,d){return n(),l(e.VMenu,{class:"menu"},{default:t(()=>[(n(!0),L(G,null,K(e.menu,i=>(n(),l(e.VMenuItem,{active:i.active,href:i.link},{default:t(()=>[o(_(i.label),1)]),_:2},1032,["active","href"]))),256))]),_:1})}const le=y(re,[["render",ie]]),ce="la-voz-de-los-cuentos",de="module",ue="0.1.19",_e={dev:"astro dev","dev:en":"env-cmd -f .env.en astro dev",start:"astro dev",build:"npm run statics && astro build && npm run robots",preview:"astro preview",astro:"astro",statics:"npm run copy-assets",games:"npm i la-voz-de-los-cuentos-games@latest && npm run copy-assets",content:"node ./scripts/content.js",robots:"node ./scripts/generate-robots.js",redimension:"python ./scripts/redimension.py",characters:"node ./scripts/characters.js","copy-assets":"mkdirp ./public/la-voz-de-los-cuentos-games/assets && ncp ./node_modules/la-voz-de-los-cuentos-games/dist/la-voz-de-los-cuentos-games/assets ./public/la-voz-de-los-cuentos-games/assets",lint:"eslint .","lint:fix":"eslint . --fix",format:'prettier --write "src/**/*.{js,vue,css,html,md,astro}"'},me={"@astrojs/sitemap":"^3.1.5","@astrojs/vue":"^4.5.0","@overgaming/vicius":"^0.10.0","@vue/compiler-sfc":"^3.4.36",astro:"^4.10.2","eslint-plugin-vue":"^9.27.0","la-voz-de-los-cuentos-games":"^0.19.0",sharp:"^0.33.4","vite-plugin-pwa":"^0.20.0"},fe={dotenv:"^16.4.5","env-cmd":"^10.1.0",eslint:"^9.8.0","eslint-define-config":"^2.1.0","eslint-plugin-astro":"^1.2.3",googleapis:"^137.1.0",mkdirp:"^3.0.1",ncp:"^2.0.0",prettier:"^3.3.3","prettier-plugin-astro":"^0.14.1",stylelint:"^16.8.1","stylelint-config-html":"^1.1.0","stylelint-config-recommended":"^14.0.1","stylelint-config-recommended-vue":"^1.5.0"},ge={name:ce,type:de,version:ue,scripts:_e,dependencies:me,devDependencies:fe},ve={__name:"Footer",setup(a,{expose:r}){r();const u="La Voz De Los Cuentos",e="es",m="https://script.google.com/macros/s/AKfycbyf8f9poDw0Jh26Ieniy0eYZELfDpXwHlC43BWqihDzBCkmExaVhFELYQ2og72CCZHM/exec",d={email:"tus.audio.cuentos@gmail.com",instagram:"lavozdetuscuentos",tiktok:"@lavozdetuscuentos",spotify:"2fmWlaQNGSEcE7IX5Ir06z",twitter:"@TusAudioCuentos",youtube:"@LaVozDeLosCuentos",facebook:"AudioCuentosParaTodos"},i=g(""),p=g(!1),b=g(!1),k=g(!1),w=g(!1);function D(){const h=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;k.value=h.test(String(i.value).toLowerCase()),p.value=!k.value}async function A(){if(k.value){w.value=!0,p.value=!1,b.value=!1;try{(await(await fetch(m,{method:"POST",body:JSON.stringify({email:i.value,lang:e,story:!1}),headers:{"Content-Type":"text/plain;charset=utf-8"}})).json()).result==="success"?(b.value=!0,i.value=""):p.value=!0}catch(h){console.error("Error:",h),p.value=!0}finally{w.value=!1}}}const S={siteName:u,lang:e,newsletterEndpoint:m,links:d,email:i,emailError:p,successMessage:b,isEmailValid:k,isSubmitting:w,validateEmail:D,submitForm:A,get pkg(){return ge},get t(){return v},get toCustomStory(){return V},ref:g,get VText(){return Y},get VLink(){return H},get VDivider(){return J},get VInput(){return Q},get VContainer(){return W},get VFieldLabel(){return X},get VField(){return Z},get VButton(){return q}};return Object.defineProperty(S,"__isScriptSetup",{enumerable:!1,value:!0}),S}},pe={class:"footer"},ke={class:"footer-header"},he={class:"footer-newsletter__content"},ye={class:"footer-wrapper"},be={class:"footer-links"},we={class:"footer-links"},Ve={class:"footer-wrapper"},Le={class:"footer-links"},Se={class:"footer-links__element"},Ce={class:"footer-links__element"},xe={class:"footer-links__element"},Ie={class:"footer-links__element"},Me={class:"footer-links__element"},Ne={class:"footer-links"};function Ee(a,r,u,e,m,d){return n(),L("div",pe,[s("div",ke,[c(e.VText,{class:"footer-title",variant:"header",as:"h3"},{default:t(()=>[o(_(e.siteName)+" v"+_(e.pkg.version),1)]),_:1})]),c(e.VDivider,{class:"footer-divider"},{default:t(()=>[o(_(e.t("footer.newsletter")),1)]),_:1}),c(e.VContainer,{size:"xs",class:"footer-newsletter"},{default:t(()=>[s("div",he,[c(e.VField,null,R({message:t(()=>[e.successMessage?(n(),l(e.VText,{key:0},{default:t(()=>[o(_(e.t("footer.newsletters.thanks")),1)]),_:1})):f("",!0),e.emailError?(n(),l(e.VText,{key:1},{default:t(()=>[o(_(e.t("footer.newsletters.error")),1)]),_:1})):f("",!0)]),default:t(()=>[e.successMessage?f("",!0):(n(),l(e.VInput,{key:0,"aria-label":"Input Email Newsletter",id:"emailInput",type:"email",name:"emailInput",modelValue:e.email,"onUpdate:modelValue":r[0]||(r[0]=i=>e.email=i),invalid:e.emailError,onInput:e.validateEmail},null,8,["modelValue","invalid"])),e.successMessage?f("",!0):(n(),l(e.VButton,{key:1,color:"primary",disabled:!e.isEmailValid||e.isSubmitting,onClick:e.submitForm},{default:t(()=>[o(_(e.t("footer.newsletter.button")),1)]),_:1},8,["disabled"]))]),_:2},[e.successMessage?void 0:{name:"label",fn:t(()=>[c(e.VFieldLabel,{for:"emailInput"},{default:t(()=>[o("Email:")]),_:1})]),key:"0"}]),1024)])]),_:1}),s("div",ye,[s("div",be,[c(e.VDivider,null,{default:t(()=>[o(_(e.t("footer.community")),1)]),_:1})]),s("div",we,[c(e.VDivider,null,{default:t(()=>[o(_(e.t("footer.interesting")),1)]),_:1})])]),s("div",Ve,[s("div",Le,[s("div",Se,[e.links.youtube?(n(),l(e.VLink,{key:0,href:`https://www.youtube.com/${e.links.youtube}?sub_confirmation=1`},{default:t(()=>[o("Youtube")]),_:1},8,["href"])):f("",!0)]),s("div",Ce,[e.links.spotify?(n(),l(e.VLink,{key:0,href:`https://open.spotify.com/show/${e.links.spotify}`},{default:t(()=>[o("Spotify")]),_:1},8,["href"])):f("",!0)]),s("div",xe,[e.links.tiktok?(n(),l(e.VLink,{key:0,href:`https://www.tiktok.com/${e.links.tiktok}`},{default:t(()=>[o("TikTok")]),_:1},8,["href"])):f("",!0)]),s("div",Ie,[e.links.instagram?(n(),l(e.VLink,{key:0,href:`https://www.instagram.com/${e.links.instagram}/`},{default:t(()=>[o("Instagram")]),_:1},8,["href"])):f("",!0)]),s("div",Me,[e.links.facebook?(n(),l(e.VLink,{key:0,href:`https://www.facebook.com/${e.links.facebook}`},{default:t(()=>[o("Facebook")]),_:1},8,["href"])):f("",!0)])]),s("div",Ne,[c(e.VLink,{href:e.toCustomStory()},{default:t(()=>[o(_(e.t("footer.interesting.custom")),1)]),_:1},8,["href"]),e.links.email?(n(),l(e.VLink,{key:0,href:`mailto:${e.links.email}`},{default:t(()=>[o(_(e.t("footer.interesting.contact")),1)]),_:1},8,["href"])):f("",!0)])])])}const ze=y(ve,[["render",Ee],["__scopeId","data-v-41e44125"]]),Fe={__name:"NavigationLayout",setup(a,{expose:r}){r();const u="es",e=g(!1),d={lang:u,isOpen:e,toggle:()=>{e.value=!e.value},ref:g,get VImage(){return T},MenuContainer:ne,Menu:le,Footer:ze};return Object.defineProperty(d,"__isScriptSetup",{enumerable:!1,value:!0}),d}},Te=a=>(U("data-v-451a2fec"),a=a(),$(),a),je={class:"navigation-layout"},De={class:"navigation-layout__mobile"},Ae=Te(()=>s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"25px",viewBox:"0 0 24 24",fill:"none"},[s("path",{d:"M20 7L4 7",stroke:"black","stroke-width":"1.5","stroke-linecap":"round"}),s("path",{d:"M20 12L4 12",stroke:"black","stroke-width":"1.5","stroke-linecap":"round"}),s("path",{d:"M20 17L4 17",stroke:"black","stroke-width":"1.5","stroke-linecap":"round"})],-1)),Be=[Ae],Oe={class:"navigation-layout__mobile-image"},Pe=["src"],Ye={class:"navigation-layout__inner"},He={class:"navigation-layout__content"};function Je(a,r,u,e,m,d){return n(),L("div",je,[s("div",De,[s("button",{class:"navigation-layout__btn",onClick:e.toggle,"aria-label":"Toggle Menu"},Be),s("div",Oe,[s("img",{src:`/assets/logo/h/${e.lang}.webp`},null,8,Pe)])]),s("div",{class:x(["navigation-layout__nav",{"navigation-layout__nav--open":e.isOpen}])},[s("div",Ye,[c(e.MenuContainer,null,{default:t(()=>[c(e.Menu)]),_:1})])],2),s("div",He,[j(a.$slots,"default",{},void 0,!0),c(e.Footer)]),s("div",{class:x(["navigation-layout__backdrop",{"navigation-layout__backdrop--visible":e.isOpen}]),onClick:e.toggle},null,2)])}const Ke=y(Fe,[["render",Je],["__scopeId","data-v-451a2fec"]]);export{Ke as default};
