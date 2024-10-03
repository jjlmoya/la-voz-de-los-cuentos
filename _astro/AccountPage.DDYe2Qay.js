import{_ as f,I as V,g as b}from"./_plugin-vue_export-helper.B3vTrFFa.js";import{t as C}from"./index.CW802EIY.js";/* empty css                           */import{o as a,f as v,a as o,w as c,b as _,t as d,l as j,e as u,F as h,g as A,c as m,m as E,d as p,r as g,j as R,k}from"./runtime-dom.esm-bundler.BWb4HXx9.js";import{B as U}from"./Basic.CeIZ_iJM.js";import{u as S}from"./useStories.DTPrF6S1.js";import"./index.B-uUTrsV.js";/* empty css                           */const N={__name:"UserResumeEntry",props:{title:{type:String,default:""},value:{type:[Number,String],default:0},active:{type:Boolean,default:!1}},setup(n,{expose:r}){r();const t={get VText(){return V}};return Object.defineProperty(t,"__isScriptSetup",{enumerable:!1,value:!0}),t}};function O(n,r,t,e,i,l){return a(),v("div",{class:j(["user-resume-entry",{"user-resume-entry--active":t.active}])},[o(e.VText,{class:"user-resume-entry__header"},{default:c(()=>[_(d(t.title),1)]),_:1}),o(e.VText,{variant:"header",color:{primary:t.active},class:"user-resume-entry__value"},{default:c(()=>[_(d(t.value),1)]),_:1},8,["color"])],2)}const I=f(N,[["render",O]]),z={__name:"StoriesSection",props:{stories:{type:Array,default:[]}},setup(n,{expose:r}){r();const t={BasicCard:U};return Object.defineProperty(t,"__isScriptSetup",{enumerable:!1,value:!0}),t}},F={class:"sections-stories"},w={class:"sections-stories-fallback"};function D(n,r,t,e,i,l){return a(),v(h,null,[u("div",F,[(a(!0),v(h,null,A(t.stories,s=>(a(),m(e.BasicCard,{slug:s.key,key:s.key,title:s.name,time:parseInt(s.time),isStory:""},null,8,["slug","title","time"]))),128))]),u("div",w,[t.stories.length?p("",!0):E(n.$slots,"fallback",{key:0},void 0,!0)])],64)}const L=f(z,[["render",D],["__scopeId","data-v-86d7eb66"]]),M={__name:"Progress",setup(n,{expose:r}){r();const{getRandomStory:t}=S(),e=t(),i={getRandomStory:t,story:e,get t(){return C},get useStories(){return S},BasicCard:U,get VText(){return V},get VContainer(){return b}};return Object.defineProperty(i,"__isScriptSetup",{enumerable:!1,value:!0}),i}},q={class:"tutorial-progress__content"},G={class:"tutorial-progress__entry"},H={class:"tutorial-progress__overlay"},J=u("div",{class:"tutorial-progress__overlay-bar"},null,-1);function K(n,r,t,e,i,l){return a(),m(e.VContainer,{class:"tutorial-progress"},{default:c(()=>[o(e.VText,{variant:"header",class:"tutorial-progress__title"},{default:c(()=>[_(d(e.t("tutorials.progress.title")),1)]),_:1}),o(e.VText,{class:"tutorial-progress__description"},{default:c(()=>[_(d(e.t("tutorials.progress.description")),1)]),_:1}),u("div",q,[(a(),v(h,null,A([{key:"tutorials.progress.toStart",value:0},{key:"tutorials.progress.started",value:55},{key:"tutorials.progress.finished",value:100}],s=>u("div",G,[(a(),m(e.BasicCard,{slug:e.story.key,key:e.story.key,title:e.story.name,time:parseInt(e.story.time),progress:s.value,isStory:""},null,8,["slug","title","time","progress"])),u("div",H,[o(e.VText,{variant:"header"},{default:c(()=>[_(d(e.t(s.key)),1)]),_:2},1024)]),J])),64))])]),_:1})}const Q=f(M,[["render",K]]),W={__name:"Resume",setup(n,{expose:r}){r();const{getCompleteStories:t,getPendingStories:e,getFavoriteStories:i}=S(),l=g({});R(()=>{l.value={read:{text:"page.account.resume.read",stories:t()},pending:{text:"page.account.resume.pending",stories:e()},favorites:{text:"page.account.resume.favorites",stories:i()}},s.value="read",y.value=t(),x.value=k(l).read.text});const s=g(),y=g(),x=g(),T={getCompleteStories:t,getPendingStories:e,getFavoriteStories:i,map:l,activeSection:s,activeStories:y,activeText:x,setActiveSection:P=>{const B=k(l)[P];s.value=P,y.value=B.stories||[],x.value=B.text},ref:g,onMounted:R,toValue:k,get VContainer(){return b},get t(){return C},UserResumeEntry:I,StoriesSection:L,get useStories(){return S},TutorialProgress:Q};return Object.defineProperty(T,"__isScriptSetup",{enumerable:!1,value:!0}),T}},X={class:"user-resume__content"},Y={key:0},Z={key:1};function $(n,r,t,e,i,l){return e.map.read?(a(),m(e.VContainer,{key:0,size:"xs",class:"user-resume"},{default:c(()=>[u("div",X,[o(e.UserResumeEntry,{onClick:r[0]||(r[0]=s=>e.setActiveSection("read")),active:e.activeSection==="read",title:e.t("page.account.resume.read"),value:e.map?.read?.stories?.length||0},null,8,["active","title","value"]),o(e.UserResumeEntry,{onClick:r[1]||(r[1]=s=>e.setActiveSection("pending")),active:e.activeSection==="pending",title:e.t("page.account.resume.pending"),value:e.map?.pending?.stories?.length||0},null,8,["active","title","value"]),o(e.UserResumeEntry,{onClick:r[2]||(r[2]=s=>e.setActiveSection("favorites")),active:e.activeSection==="favorites",title:e.t("page.account.resume.favorites"),value:e.map?.favorites?.stories?.length||0},null,8,["active","title","value"])]),o(e.StoriesSection,{stories:e.activeStories},{fallback:c(()=>[e.activeSection==="favorites"?(a(),v("div",Y)):p("",!0),e.activeSection==="pending"?(a(),v("div",Z)):p("",!0),e.activeSection==="read"?(a(),m(e.TutorialProgress,{key:2})):p("",!0)]),_:1},8,["stories"])]),_:1})):p("",!0)}const ee=f(W,[["render",$]]),te={__name:"AccountPage",setup(n,{expose:r}){r();const t={UserResume:ee,get t(){return C},get VText(){return V},get VContainer(){return b}};return Object.defineProperty(t,"__isScriptSetup",{enumerable:!1,value:!0}),t}},re={class:"account-page__content"},se={class:"account-page__title"};function ae(n,r,t,e,i,l){return a(),m(e.VContainer,{size:"xl",class:"account-page"},{default:c(()=>[u("div",re,[u("div",se,[o(e.VText,{as:"h1",variant:"header"},{default:c(()=>[_(d(e.t("page.account.h1")),1)]),_:1})]),o(e.UserResume)])]),_:1})}const me=f(te,[["render",ae]]);export{me as default};
