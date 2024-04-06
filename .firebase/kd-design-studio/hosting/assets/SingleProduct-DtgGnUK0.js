import{t as W,f as Ce,j as x,$ as Re,h as Be,i as w,k as M,l as Me,m as ke,n as Ve,o as A,q as L,s as Ke,r as G,v as T,w as B,x as F,y as He,z as We,u as we,d as s,A as Ae,p as Le,T as S}from"./index-BdNt8x2L.js";import{B as Te}from"./BodyLayout-BMNTq5Ln.js";import{f as _}from"./chunk-BSXPKUBX-CpV8cQnv.js";var V=W({slots:{base:"flex items-center",item:["flex gap-1 items-center","cursor-pointer","whitespace-nowrap","line-clamp-1","outline-none","tap-highlight-transparent",...Ce],separator:"text-default-400 px-1"},variants:{color:{foreground:{item:"text-foreground/50",separator:"text-foreground/50"},primary:{item:"text-primary/80",separator:"text-primary/80"},secondary:{item:"text-secondary/80",separator:"text-secondary/80"},success:{item:"text-success/80",separator:"text-success/80"},warning:{item:"text-warning/80",separator:"text-warning/80"},danger:{item:"text-danger/80",separator:"text-danger/80"}},size:{sm:{item:"text-tiny"},md:{item:"text-small"},lg:{item:"text-medium"}},underline:{none:{item:"no-underline"},hover:{item:"hover:underline"},always:{item:"underline"},active:{item:"active:underline"},focus:{item:"focus:underline"}},isCurrent:{true:{item:"cursor-default"},false:{item:["hover:opacity-80","active:opacity-disabled"]}},isDisabled:{true:{item:"opacity-disabled pointer-events-none",separator:"opacity-disabled"}},disableAnimation:{false:{item:"transition-opacity"},true:{item:"transition-none"}}},defaultVariants:{size:"md",color:"foreground",underline:"hover",isDisabled:!1,disableAnimation:!1},compoundVariants:[{isCurrent:!0,color:"foreground",class:{item:"text-foreground"}},{isCurrent:!0,color:"primary",class:{item:"text-primary"}},{isCurrent:!0,color:"secondary",class:{item:"text-secondary"}},{isCurrent:!0,color:"success",class:{item:"text-success"}},{isCurrent:!0,color:"warning",class:{item:"text-warning"}},{isCurrent:!0,color:"danger",class:{item:"text-danger"}},{isCurrent:!1,underline:"none",class:{item:"no-underline"}},{underline:["hover","always","active","focus"],class:"underline-offset-4"}]}),K=W({slots:{base:"",list:"flex flex-wrap list-none",ellipsis:"text-medium",separator:"text-default-400 px-1"},variants:{size:{sm:{},md:{},lg:{}},radius:{none:{list:"rounded-none"},sm:{list:"rounded-small"},md:{list:"rounded-medium"},lg:{list:"rounded-large"},full:{list:"rounded-full"}},variant:{solid:{list:"bg-default-100"},bordered:{list:"border-medium border-default-200 shadow-sm"},light:{}}},defaultVariants:{size:"md",radius:"sm",variant:"light"},compoundVariants:[{variant:["solid","bordered"],class:{list:"max-w-fit"}},{variant:["solid","bordered"],size:"sm",class:{list:"px-2 py-1"}},{variant:["solid","bordered"],size:"md",class:{list:"px-2.5 py-1.5"}},{variant:["solid","bordered"],size:"lg",class:{list:"px-3 py-2"}}]}),Fe={},H={};function _e(e,a,...o){var i;const t=`[Next UI]${a?` [${a}]`:" "}: ${e}`;if(!(typeof console>"u")&&!H[t]&&(H[t]=!0,((i=process==null?void 0:Fe)==null?void 0:i.NODE_ENV)!=="production"))return console.warn(t,o)}var ze=e=>x.jsxs("svg",{"aria-hidden":"true",fill:"none",height:"1em",shapeRendering:"geometricPrecision",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",viewBox:"0 0 24 24",width:"1em",...e,children:[x.jsx("circle",{cx:"12",cy:"12",fill:"currentColor",r:"1"}),x.jsx("circle",{cx:"19",cy:"12",fill:"currentColor",r:"1"}),x.jsx("circle",{cx:"5",cy:"12",fill:"currentColor",r:"1"})]}),Oe=e=>x.jsx("svg",{"aria-hidden":"true",fill:"none",focusable:"false",height:"1em",role:"presentation",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",viewBox:"0 0 24 24",width:"1em",...e,children:x.jsx("path",{d:"m9 18 6-6-6-6"})}),z={};z={breadcrumbs:"عناصر الواجهة"};var O={};O={breadcrumbs:"Трохи хляб"};var U={};U={breadcrumbs:"Popis cesty"};var Y={};Y={breadcrumbs:"Brødkrummer"};var q={};q={breadcrumbs:"Breadcrumbs"};var J={};J={breadcrumbs:"Πλοηγήσεις breadcrumb"};var Z={};Z={breadcrumbs:"Breadcrumbs"};var Q={};Q={breadcrumbs:"Migas de pan"};var X={};X={breadcrumbs:"Lingiread"};var ee={};ee={breadcrumbs:"Navigointilinkit"};var re={};re={breadcrumbs:"Chemin de navigation"};var se={};se={breadcrumbs:"שבילי ניווט"};var te={};te={breadcrumbs:"Navigacijski putovi"};var ae={};ae={breadcrumbs:"Morzsamenü"};var ie={};ie={breadcrumbs:"Breadcrumb"};var oe={};oe={breadcrumbs:"パンくずリスト"};var ne={};ne={breadcrumbs:"탐색 표시"};var ue={};ue={breadcrumbs:"Naršymo kelias"};var le={};le={breadcrumbs:"Atpakaļceļi"};var ce={};ce={breadcrumbs:"Navigasjonsstier"};var de={};de={breadcrumbs:"Broodkruimels"};var me={};me={breadcrumbs:"Struktura nawigacyjna"};var be={};be={breadcrumbs:"Caminho detalhado"};var pe={};pe={breadcrumbs:"Categorias"};var fe={};fe={breadcrumbs:"Miez de pâine"};var xe={};xe={breadcrumbs:"Навигация"};var Ne={};Ne={breadcrumbs:"Navigačné prvky Breadcrumbs"};var ve={};ve={breadcrumbs:"Drobtine"};var De={};De={breadcrumbs:"Putanje navigacije"};var Ee={};Ee={breadcrumbs:"Sökvägar"};var ge={};ge={breadcrumbs:"İçerik haritaları"};var Pe={};Pe={breadcrumbs:"Навігаційна стежка"};var he={};he={breadcrumbs:"导航栏"};var je={};je={breadcrumbs:"導覽列"};function Ue(e,a){let{elementType:o="a",onPress:i,onPressStart:r,onPressEnd:t,onClick:b,isDisabled:u,...l}=e,n={};o!=="a"&&(n={role:"link",tabIndex:u?void 0:0});let{focusableProps:N}=Re(e,a),{pressProps:d,isPressed:D}=Be({onPress:i,onPressStart:r,onPressEnd:t,isDisabled:u,ref:a}),h=w(l,{labelable:!0,isLink:o==="a"}),j=M(N,d),p=Me();return{isPressed:D,linkProps:M(h,{...j,...n,"aria-disabled":u||void 0,"aria-current":e["aria-current"],onClick:c=>{var m;(m=d.onClick)===null||m===void 0||m.call(d,c),b&&(b(c),console.warn("onClick is deprecated, please use onPress")),!p.isNative&&c.currentTarget instanceof HTMLAnchorElement&&c.currentTarget.href&&!c.isDefaultPrevented()&&ke(c.currentTarget,c)&&(c.preventDefault(),p.open(c.currentTarget,c))}})}}function Ye(e){return e&&e.__esModule?e.default:e}function qe(e,a){let{isCurrent:o,isDisabled:i,"aria-current":r,elementType:t="a",...b}=e,{linkProps:u}=Ue({isDisabled:i||o,elementType:t,...b},a),l=/^h[1-6]$/.test(t),n={};return l||(n=u),o&&(n["aria-current"]=r||"page",n.tabIndex=e.autoFocus?-1:void 0),{itemProps:{"aria-disabled":i,...n}}}var $e={};$e={"ar-AE":z,"bg-BG":O,"cs-CZ":U,"da-DK":Y,"de-DE":q,"el-GR":J,"en-US":Z,"es-ES":Q,"et-EE":X,"fi-FI":ee,"fr-FR":re,"he-IL":se,"hr-HR":te,"hu-HU":ae,"it-IT":ie,"ja-JP":oe,"ko-KR":ne,"lt-LT":ue,"lv-LV":le,"nb-NO":ce,"nl-NL":de,"pl-PL":me,"pt-BR":be,"pt-PT":pe,"ro-RO":fe,"ru-RU":xe,"sk-SK":Ne,"sl-SI":ve,"sr-SP":De,"sv-SE":Ee,"tr-TR":ge,"uk-UA":Pe,"zh-CN":he,"zh-TW":je};function Je(e){let{"aria-label":a,...o}=e,i=Ve(Ye($e),"@react-aria/breadcrumbs");return{navProps:{...w(o,{labelable:!0}),"aria-label":a||i.format("breadcrumbs")}}}function Ze(e){const[a,o]=A(e,V.variantKeys),{ref:i,as:r,className:t,children:b,isLast:u,separator:l,startContent:n,endContent:N,classNames:d,hideSeparator:D=!1,...h}=a,j=r||"li",p=!!(e!=null&&e.isCurrent),c=e==null?void 0:e.isDisabled,m=e!=null&&e.href&&!p?"a":"span",f=typeof m=="string",E=L(i),{itemProps:y}=qe({...e,isCurrent:p,elementType:m},E),{isFocusVisible:$,isFocused:R,focusProps:v}=Ke(),g=G.useMemo(()=>V({...o,isCurrent:p,underline:(e==null?void 0:e.underline)!==void 0&&!p?e==null?void 0:e.underline:"none",className:t}),[...Object.values(o),p,t]),I=T(d==null?void 0:d.base,t);return{Component:m,WrapperComponent:j,children:b,separator:l,startContent:n,endContent:N,isDisabled:c,isCurrent:p,isLast:u,hideSeparator:D,getBaseProps:()=>({ref:E,"data-slot":"base",className:g.base({class:I}),..._(h,{enabled:f})}),getItemProps:()=>({href:p||e==null?void 0:e.href,"data-slot":"item","data-focus":B(R),"data-focus-visible":B($),"data-disabled":e==null?void 0:e.isDisabled,"data-current":e==null?void 0:e.isCurrent,className:g.item({class:d==null?void 0:d.item}),...M(y,c?{}:v)}),getSeparatorProps:()=>({"data-slot":"separator","aria-hidden":B(!0),className:g.separator({class:d==null?void 0:d.separator})})}}var Se=F((e,a)=>{const{Component:o,WrapperComponent:i,children:r,isLast:t,separator:b,startContent:u,endContent:l,hideSeparator:n,getBaseProps:N,getItemProps:d,getSeparatorProps:D}=Ze({...e,ref:a});return x.jsxs(i,{...N(),children:[x.jsxs(o,{...d(),children:[u,r,l]}),!t&&!n&&x.jsx("span",{...D(),children:b})]})});Se.displayName="NextUI.Breadcrumbs";var Ge=Se;function Qe(e){const[a,o]=A(e,K.variantKeys),{ref:i,as:r,color:t,underline:b,isDisabled:u,separator:l,children:n,itemsBeforeCollapse:N=1,itemsAfterCollapse:d=2,maxItems:D=8,hideSeparator:h,disableAnimation:j,renderEllipsis:p,className:c,classNames:m,itemClasses:f,onAction:E,...y}=a,$=r||"nav",R=typeof $=="string",{navProps:v}=Je(e),[,g]=He(n,Ge),I=G.Children.count(g),C=L(i),P=G.useMemo(()=>K({...o,className:c}),[...Object.values(o),c]),k=T(m==null?void 0:m.base,c),Ie={color:t,underline:b,disableAnimation:j,hideSeparator:h,size:e==null?void 0:e.size,classNames:f};return{Component:$,children:g,slots:P,separator:l,childCount:I,itemsAfterCollapse:d,itemsBeforeCollapse:N,maxItems:D,classNames:m,isDisabled:u,itemProps:Ie,renderEllipsis:p,getBaseProps:()=>({ref:C,"data-slot":"base",className:P.base({class:k}),...M(v,_(y,{enabled:R}))}),getListProps:()=>({"data-slot":"list",className:P.list({class:m==null?void 0:m.list})}),getEllipsisProps:()=>({"data-slot":"ellipsis",className:P.ellipsis({class:m==null?void 0:m.ellipsis})}),getSeparatorProps:()=>({"data-slot":"separator","aria-hidden":B(!0),className:P.separator({class:m==null?void 0:m.separator})}),onAction:E}}var ye=F((e,a)=>{const{Component:o,children:i,childCount:r,itemProps:t,separator:b=x.jsx(Oe,{}),maxItems:u,itemsBeforeCollapse:l,itemsAfterCollapse:n,isDisabled:N,renderEllipsis:d,getBaseProps:D,getListProps:h,getEllipsisProps:j,getSeparatorProps:p,onAction:c}=Qe({...e,ref:a}),m=G.useMemo(()=>{let f=i==null?void 0:i.map((v,g)=>{var I;const C=g===r-1,P=(v==null?void 0:v.key)||g;return G.cloneElement(v,{...t,isLast:C,separator:b,isDisabled:N&&!C,isCurrent:C||v.props.isCurrent,...v.props,key:P,onPress:We((I=v.props)==null?void 0:I.onPress,()=>c==null?void 0:c(P))})});if(!f)return null;if(r<u)return f;if(l+n>=r)return _e(`You have provided an invalid combination of props to the Breadcrumbs. itemsAfterCollapse={${n}} + itemsBeforeCollapse={${l}} >= itemsCount={${r}}`,"Breadcrumbs"),f;const E=f.slice(l,f.length-n);if(E.length<1)return f;const y=x.jsx(ze,{...j()}),$=G.cloneElement(E[0],{...E[0].props,key:"ellipsis",children:y}),R=typeof d=="function"?d({collapsedItem:$,items:E.map(v=>v.props),maxItems:u,ellipsisIcon:y,itemsBeforeCollapse:l,itemsAfterCollapse:n,separator:x.jsx("span",{...p(),children:b})}):$;return[...f.slice(0,l),R,...f.slice(f.length-n,f.length)]},[i,r,b,t,l,n,N]);return x.jsx(o,{...D(),children:x.jsx("ol",{...h(),children:m})})});ye.displayName="NextUI.Breadcrumbs";var Xe=ye;function er({options:e}){const a=we(),o=e[e.length-1].label,[i,r]=G.useState(o);return s.jsxDEV(Xe,{onAction:t=>r(t),itemClasses:{item:"text-foreground-500 hover:text-text-foregroun-900 hover:underline data-[current=true]:text-foreground-800 data-[current=true]:font-semibold",separator:"text-foreground-500"},children:e.map(t=>s.jsxDEV(Ge,{isCurrent:i===t.label,onPress:()=>t.allowClick&&a(t.value),children:t.label},t.label,!1,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/components/Breadcrumbs/Breadcrumbs.jsx",lineNumber:25,columnNumber:11},this))},void 0,!1,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/components/Breadcrumbs/Breadcrumbs.jsx",lineNumber:16,columnNumber:5},this)}function ur(){var i;const{slug:e}=Ae(),a=Le.find(r=>r.slug===e),o=[{label:"Products",value:"/products",allowClick:!0},{label:a.name,value:`/products/${e}`,allowClick:!1}];return s.jsxDEV(Te,{children:s.jsxDEV("div",{className:"w-full h-full flex flex-col md:flex-row max-md:gap-4",children:[s.jsxDEV("div",{className:"pb-7 md:py-14 min-w-[55%] max-md:top-24 ",children:s.jsxDEV("div",{className:"md:fixed md:top-36 md:left-8 lg:left-14 m-auto h-fit md:h-[70vh] w-[90%] px-2 md:px-0 md:w-[50vw] flex flex-col",children:[s.jsxDEV("div",{className:"sticky top-16 max-md:pt-[12px] pb-4 md:top-0 bg-foreground-50 md:bg-foreground-50",children:[s.jsxDEV("div",{className:"mb-4",children:s.jsxDEV(er,{options:o},void 0,!1,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:30,columnNumber:17},this)},void 0,!1,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:29,columnNumber:15},this),s.jsxDEV("div",{className:"flex flex-col gap-2 text-justify",children:[s.jsxDEV(s.Fragment,{children:s.jsxDEV(S,{variant:"title",children:a.name},void 0,!1,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:35,columnNumber:19},this)},void 0,!1,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:34,columnNumber:17},this),s.jsxDEV(s.Fragment,{children:[s.jsxDEV(S,{variant:"caption",children:["Year: ",s.jsxDEV("span",{className:"font-medium",children:a.year},void 0,!1,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:39,columnNumber:27},this)]},void 0,!0,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:38,columnNumber:19},this),s.jsxDEV(S,{variant:"caption",className:"italic",children:"Prototype"},void 0,!1,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:41,columnNumber:19},this)]},void 0,!0,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:37,columnNumber:17},this)]},void 0,!0,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:33,columnNumber:15},this)]},void 0,!0,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:28,columnNumber:13},this),s.jsxDEV("div",{className:"flex flex-col gap-2 text-justify",children:(i=a==null?void 0:a.details)==null?void 0:i.map(r=>{var t,b;return r!=null&&r.listItems?s.jsxDEV("div",{children:[(r==null?void 0:r.title)&&s.jsxDEV(S,{variant:"p",children:s.jsxDEV("span",{className:"font-medium",children:r==null?void 0:r.title},void 0,!1,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:54,columnNumber:27},this)},void 0,!1,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:53,columnNumber:25},this),s.jsxDEV("ol",{className:"pl-4 list-decimal",children:(t=r==null?void 0:r.listItems)==null?void 0:t.map((u,l)=>{var n;return s.jsxDEV("li",{className:"text-foreground-500",children:s.jsxDEV(S,{variant:"caption",children:(n=u==null?void 0:u.caption)==null?void 0:n.map((N,d)=>s.jsxDEV("p",{children:N},d,!1,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:66,columnNumber:42},this))},void 0,!1,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:64,columnNumber:31},this)},"list"+l,!1,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:60,columnNumber:29},this)})},void 0,!1,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:57,columnNumber:23},this)]},r.id,!0,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:51,columnNumber:21},this):s.jsxDEV("div",{children:[s.jsxDEV(S,{variant:"p",children:s.jsxDEV("span",{className:"font-medium",children:r==null?void 0:r.title},void 0,!1,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:79,columnNumber:25},this)},void 0,!1,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:78,columnNumber:23},this),s.jsxDEV(S,{variant:"caption",children:(b=r==null?void 0:r.caption)==null?void 0:b.map((u,l)=>s.jsxDEV("p",{children:u},"caption"+l,!1,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:83,columnNumber:34},this))},void 0,!1,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:81,columnNumber:23},this)]},r.id,!0,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:77,columnNumber:21},this)})},void 0,!1,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:47,columnNumber:13},this)]},void 0,!0,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:27,columnNumber:11},this)},void 0,!1,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:26,columnNumber:9},this),s.jsxDEV("div",{className:"pb-14 md:py-14 flex flex-col items-center gap-14",children:a.imgUrls.map((r,t)=>s.jsxDEV("img",{src:r,alt:e+"_image_"+t,className:"w-[90%]"},r,!1,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:96,columnNumber:15},this))},void 0,!1,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:93,columnNumber:9},this)]},void 0,!0,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:25,columnNumber:7},this)},void 0,!1,{fileName:"D:/ENGINEERING/ExtraStudyMaterial/WebDevelopment/GitHubProjects/KDDesignStudio/src/pages/Products/SingleProduct.jsx",lineNumber:24,columnNumber:5},this)}export{ur as default};
