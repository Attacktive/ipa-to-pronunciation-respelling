/*! For license information please see main.js.LICENSE.txt */
(()=>{var e={11:function(e,t,n){e.exports=function(e,t,n,s){"use strict";return class extends n{constructor(t,n){super(),(t=s.getElement(t))&&(this._element=t,this._config=this._getConfig(n),e.set(this._element,this.constructor.DATA_KEY,this))}dispose(){e.remove(this._element,this.constructor.DATA_KEY),t.off(this._element,this.constructor.EVENT_KEY);for(const e of Object.getOwnPropertyNames(this))this[e]=null}_queueCallback(e,t,n=!0){s.executeAfterTransition(e,t,n)}_getConfig(e){return e=this._mergeConfigObj(e,this._element),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}static getInstance(t){return e.get(s.getElement(t),this.DATA_KEY)}static getOrCreateInstance(e,t={}){return this.getInstance(e)||new this(e,"object"==typeof t?t:null)}static get VERSION(){return"5.3.3"}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(e){return`${e}${this.EVENT_KEY}`}}}(n(269),n(956),n(105),n(35))},269:function(e){e.exports=function(){"use strict";const e=new Map;return{set(t,n,s){e.has(t)||e.set(t,new Map);const r=e.get(t);r.has(n)||0===r.size?r.set(n,s):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`)},get:(t,n)=>e.has(t)&&e.get(t).get(n)||null,remove(t,n){if(!e.has(t))return;const s=e.get(t);s.delete(n),0===s.size&&e.delete(t)}}}()},956:function(e,t,n){e.exports=function(e){"use strict";const t=/[^.]*(?=\..*)\.|.*/,n=/\..*/,s=/::\d+$/,r={};let o=1;const i={mouseenter:"mouseover",mouseleave:"mouseout"},u=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function c(e,t){return t&&`${t}::${o++}`||e.uidEvent||o++}function a(e){const t=c(e);return e.uidEvent=t,r[t]=r[t]||{},r[t]}function l(e,t,n=null){return Object.values(e).find((e=>e.callable===t&&e.delegationSelector===n))}function d(e,t,n){const s="string"==typeof t,r=s?n:t||n;let o=p(e);return u.has(o)||(o=e),[s,r,o]}function f(e,n,s,r,o){if("string"!=typeof n||!e)return;let[u,f,h]=d(n,s,r);if(n in i){const e=e=>function(t){if(!t.relatedTarget||t.relatedTarget!==t.delegateTarget&&!t.delegateTarget.contains(t.relatedTarget))return e.call(this,t)};f=e(f)}const m=a(e),p=m[h]||(m[h]={}),b=l(p,f,u?s:null);if(b)return void(b.oneOff=b.oneOff&&o);const S=c(f,n.replace(t,"")),_=u?function(e,t,n){return function s(r){const o=e.querySelectorAll(t);for(let{target:i}=r;i&&i!==this;i=i.parentNode)for(const u of o)if(u===i)return y(r,{delegateTarget:i}),s.oneOff&&g.off(e,r.type,t,n),n.apply(i,[r])}}(e,s,f):function(e,t){return function n(s){return y(s,{delegateTarget:e}),n.oneOff&&g.off(e,s.type,t),t.apply(e,[s])}}(e,f);_.delegationSelector=u?s:null,_.callable=f,_.oneOff=o,_.uidEvent=S,p[S]=_,e.addEventListener(h,_,u)}function h(e,t,n,s,r){const o=l(t[n],s,r);o&&(e.removeEventListener(n,o,Boolean(r)),delete t[n][o.uidEvent])}function m(e,t,n,s){const r=t[n]||{};for(const[o,i]of Object.entries(r))o.includes(s)&&h(e,t,n,i.callable,i.delegationSelector)}function p(e){return e=e.replace(n,""),i[e]||e}const g={on(e,t,n,s){f(e,t,n,s,!1)},one(e,t,n,s){f(e,t,n,s,!0)},off(e,t,n,r){if("string"!=typeof t||!e)return;const[o,i,u]=d(t,n,r),c=u!==t,l=a(e),f=l[u]||{},p=t.startsWith(".");if(void 0===i){if(p)for(const n of Object.keys(l))m(e,l,n,t.slice(1));for(const[n,r]of Object.entries(f)){const o=n.replace(s,"");c&&!t.includes(o)||h(e,l,u,r.callable,r.delegationSelector)}}else{if(!Object.keys(f).length)return;h(e,l,u,i,o?n:null)}},trigger(t,n,s){if("string"!=typeof n||!t)return null;const r=e.getjQuery();let o=null,i=!0,u=!0,c=!1;n!==p(n)&&r&&(o=r.Event(n,s),r(t).trigger(o),i=!o.isPropagationStopped(),u=!o.isImmediatePropagationStopped(),c=o.isDefaultPrevented());const a=y(new Event(n,{bubbles:i,cancelable:!0}),s);return c&&a.preventDefault(),u&&t.dispatchEvent(a),a.defaultPrevented&&o&&o.preventDefault(),a}};function y(e,t={}){for(const[n,s]of Object.entries(t))try{e[n]=s}catch(t){Object.defineProperty(e,n,{configurable:!0,get:()=>s})}return e}return g}(n(35))},333:function(e){e.exports=function(){"use strict";function e(e){if("true"===e)return!0;if("false"===e)return!1;if(e===Number(e).toString())return Number(e);if(""===e||"null"===e)return null;if("string"!=typeof e)return e;try{return JSON.parse(decodeURIComponent(e))}catch(t){return e}}function t(e){return e.replace(/[A-Z]/g,(e=>`-${e.toLowerCase()}`))}return{setDataAttribute(e,n,s){e.setAttribute(`data-bs-${t(n)}`,s)},removeDataAttribute(e,n){e.removeAttribute(`data-bs-${t(n)}`)},getDataAttributes(t){if(!t)return{};const n={},s=Object.keys(t.dataset).filter((e=>e.startsWith("bs")&&!e.startsWith("bsConfig")));for(const r of s){let s=r.replace(/^bs/,"");s=s.charAt(0).toLowerCase()+s.slice(1,s.length),n[s]=e(t.dataset[r])}return n},getDataAttribute:(n,s)=>e(n.getAttribute(`data-bs-${t(s)}`))}}()},411:function(e,t,n){e.exports=function(e){"use strict";const t=t=>{let n=t.getAttribute("data-bs-target");if(!n||"#"===n){let e=t.getAttribute("href");if(!e||!e.includes("#")&&!e.startsWith("."))return null;e.includes("#")&&!e.startsWith("#")&&(e=`#${e.split("#")[1]}`),n=e&&"#"!==e?e.trim():null}return n?n.split(",").map((t=>e.parseSelector(t))).join(","):null},n={find:(e,t=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(t,e)),findOne:(e,t=document.documentElement)=>Element.prototype.querySelector.call(t,e),children:(e,t)=>[].concat(...e.children).filter((e=>e.matches(t))),parents(e,t){const n=[];let s=e.parentNode.closest(t);for(;s;)n.push(s),s=s.parentNode.closest(t);return n},prev(e,t){let n=e.previousElementSibling;for(;n;){if(n.matches(t))return[n];n=n.previousElementSibling}return[]},next(e,t){let n=e.nextElementSibling;for(;n;){if(n.matches(t))return[n];n=n.nextElementSibling}return[]},focusableChildren(t){const n=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map((e=>`${e}:not([tabindex^="-"])`)).join(",");return this.find(n,t).filter((t=>!e.isDisabled(t)&&e.isVisible(t)))},getSelectorFromElement(e){const s=t(e);return s&&n.findOne(s)?s:null},getElementFromSelector(e){const s=t(e);return s?n.findOne(s):null},getMultipleElementsFromSelector(e){const s=t(e);return s?n.find(s):[]}};return n}(n(35))},653:function(e,t,n){e.exports=function(e,t,n,s){"use strict";const r=".bs.toast",o=`mouseover${r}`,i=`mouseout${r}`,u=`focusin${r}`,c=`focusout${r}`,a=`hide${r}`,l=`hidden${r}`,d=`show${r}`,f=`shown${r}`,h="hide",m="show",p="showing",g={animation:"boolean",autohide:"boolean",delay:"number"},y={animation:!0,autohide:!0,delay:5e3};class b extends e{constructor(e,t){super(e,t),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get Default(){return y}static get DefaultType(){return g}static get NAME(){return"toast"}show(){if(t.trigger(this._element,d).defaultPrevented)return;this._clearTimeout(),this._config.animation&&this._element.classList.add("fade");this._element.classList.remove(h),s.reflow(this._element),this._element.classList.add(m,p),this._queueCallback((()=>{this._element.classList.remove(p),t.trigger(this._element,f),this._maybeScheduleHide()}),this._element,this._config.animation)}hide(){if(!this.isShown())return;if(t.trigger(this._element,a).defaultPrevented)return;this._element.classList.add(p),this._queueCallback((()=>{this._element.classList.add(h),this._element.classList.remove(p,m),t.trigger(this._element,l)}),this._element,this._config.animation)}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove(m),super.dispose()}isShown(){return this._element.classList.contains(m)}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout((()=>{this.hide()}),this._config.delay)))}_onInteraction(e,t){switch(e.type){case"mouseover":case"mouseout":this._hasMouseInteraction=t;break;case"focusin":case"focusout":this._hasKeyboardInteraction=t}if(t)return void this._clearTimeout();const n=e.relatedTarget;this._element===n||this._element.contains(n)||this._maybeScheduleHide()}_setListeners(){t.on(this._element,o,(e=>this._onInteraction(e,!0))),t.on(this._element,i,(e=>this._onInteraction(e,!1))),t.on(this._element,u,(e=>this._onInteraction(e,!0))),t.on(this._element,c,(e=>this._onInteraction(e,!1)))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(e){return this.each((function(){const t=b.getOrCreateInstance(this,e);if("string"==typeof e){if(void 0===t[e])throw new TypeError(`No method named "${e}"`);t[e](this)}}))}}return n.enableDismissTrigger(b),s.defineJQueryPlugin(b),b}(n(11),n(956),n(248),n(35))},248:function(e,t,n){!function(e,t,n,s){"use strict";e.enableDismissTrigger=(e,r="hide")=>{const o=`click.dismiss${e.EVENT_KEY}`,i=e.NAME;t.on(document,o,`[data-bs-dismiss="${i}"]`,(function(t){if(["A","AREA"].includes(this.tagName)&&t.preventDefault(),s.isDisabled(this))return;const o=n.getElementFromSelector(this)||this.closest(`.${i}`);e.getOrCreateInstance(o)[r]()}))},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}(t,n(956),n(411),n(35))},105:function(e,t,n){e.exports=function(e,t){"use strict";return class{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(e){return e=this._mergeConfigObj(e),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}_configAfterMerge(e){return e}_mergeConfigObj(n,s){const r=t.isElement(s)?e.getDataAttribute(s,"config"):{};return{...this.constructor.Default,..."object"==typeof r?r:{},...t.isElement(s)?e.getDataAttributes(s):{},..."object"==typeof n?n:{}}}_typeCheckConfig(e,n=this.constructor.DefaultType){for(const[s,r]of Object.entries(n)){const n=e[s],o=t.isElement(n)?"element":t.toType(n);if(!new RegExp(r).test(o))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${s}" provided type "${o}" but expected type "${r}".`)}}}}(n(333),n(35))},35:function(e,t){!function(e){"use strict";const t="transitionend",n=e=>(e&&window.CSS&&window.CSS.escape&&(e=e.replace(/#([^\s"#']+)/g,((e,t)=>`#${CSS.escape(t)}`))),e),s=e=>{if(!e)return 0;let{transitionDuration:t,transitionDelay:n}=window.getComputedStyle(e);const s=Number.parseFloat(t),r=Number.parseFloat(n);return s||r?(t=t.split(",")[0],n=n.split(",")[0],1e3*(Number.parseFloat(t)+Number.parseFloat(n))):0},r=e=>{e.dispatchEvent(new Event(t))},o=e=>!(!e||"object"!=typeof e)&&(void 0!==e.jquery&&(e=e[0]),void 0!==e.nodeType),i=e=>{if(!document.documentElement.attachShadow)return null;if("function"==typeof e.getRootNode){const t=e.getRootNode();return t instanceof ShadowRoot?t:null}return e instanceof ShadowRoot?e:e.parentNode?i(e.parentNode):null},u=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,c=[],a=e=>{"loading"===document.readyState?(c.length||document.addEventListener("DOMContentLoaded",(()=>{for(const e of c)e()})),c.push(e)):e()},l=(e,t=[],n=e)=>"function"==typeof e?e(...t):n;e.defineJQueryPlugin=e=>{a((()=>{const t=u();if(t){const n=e.NAME,s=t.fn[n];t.fn[n]=e.jQueryInterface,t.fn[n].Constructor=e,t.fn[n].noConflict=()=>(t.fn[n]=s,e.jQueryInterface)}}))},e.execute=l,e.executeAfterTransition=(e,n,o=!0)=>{if(!o)return void l(e);const i=s(n)+5;let u=!1;const c=({target:s})=>{s===n&&(u=!0,n.removeEventListener(t,c),l(e))};n.addEventListener(t,c),setTimeout((()=>{u||r(n)}),i)},e.findShadowRoot=i,e.getElement=e=>o(e)?e.jquery?e[0]:e:"string"==typeof e&&e.length>0?document.querySelector(n(e)):null,e.getNextActiveElement=(e,t,n,s)=>{const r=e.length;let o=e.indexOf(t);return-1===o?!n&&s?e[r-1]:e[0]:(o+=n?1:-1,s&&(o=(o+r)%r),e[Math.max(0,Math.min(o,r-1))])},e.getTransitionDurationFromElement=s,e.getUID=e=>{do{e+=Math.floor(1e6*Math.random())}while(document.getElementById(e));return e},e.getjQuery=u,e.isDisabled=e=>!e||e.nodeType!==Node.ELEMENT_NODE||!!e.classList.contains("disabled")||(void 0!==e.disabled?e.disabled:e.hasAttribute("disabled")&&"false"!==e.getAttribute("disabled")),e.isElement=o,e.isRTL=()=>"rtl"===document.documentElement.dir,e.isVisible=e=>{if(!o(e)||0===e.getClientRects().length)return!1;const t="visible"===getComputedStyle(e).getPropertyValue("visibility"),n=e.closest("details:not([open])");if(!n)return t;if(n!==e){const t=e.closest("summary");if(t&&t.parentNode!==n)return!1;if(null===t)return!1}return t},e.noop=()=>{},e.onDOMContentLoaded=a,e.parseSelector=n,e.reflow=e=>{e.offsetHeight},e.toType=e=>null==e?`${e}`:Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(),e.triggerTransitionEnd=r,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}(t)},51:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.convert=function(e){const t=c(e),n=function(e){const t=[];let n=r(e[0]);for(let s=1;s<e.length-1;s++){const o=r(e[s]),i=r(e[s+1]);o<=n&&o<=i&&t.push(s),n=o}return t}(t),s=[];let o={currentSyllable:[],isStressed:!1};for(let e=0;e<t.length;e++)if(o=u(t[e],o.currentSyllable,o.isStressed,s),n.includes(e)){const e=i(o.currentSyllable,o.isStressed);e&&s.push(e),o.currentSyllable=[]}const a=i(o.currentSyllable,o.isStressed);return a&&s.push(a),s.join("")},t.tokenize=c;const s=n(44);function r(e){var t;return null!==(t=s.sonorityRanks.get(e))&&void 0!==t?t:0}function o(e){const t=s.mappings.get(e);if(Array.isArray(t))return t[0];if("string"==typeof t)return t;if(s.acceptedSymbols.includes(e))return e;throw Error(`Token "${e}" has no mapping!`)}function i(e,t){if(0===e.length)return"";const n=e.join("");return t?n.toUpperCase():n}function u(e,t,n,r){if(e===s.STRESS_MARK){const e=i(t,n);return e&&r.push(e),{currentSyllable:[],isStressed:!0}}if(e===s.SECONDARY_STRESS_MARK)return{currentSyllable:t,isStressed:n};if(" "===e){const e=i(t,n);return e&&r.push(e),r.push(" "),{currentSyllable:[],isStressed:!1}}return{currentSyllable:[...t,o(e)],isStressed:n}}function c(e){const t=[];for(let n=0;n<e.length;){let r=!1;for(const o of s.validChunks)e.startsWith(o,n)&&(t.push(o),n+=o.length,r=!0);if(!r)throw Error(`${e} contains unsupported symbol(s) around: "${e.charAt(n)}".`)}return t}},703:function(e,t,n){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=s(n(653)),o=n(51),i=n(44);function u(e){if("Enter"===e.key)return!1}function c(){const e=document.querySelector("#input"),t=document.querySelector("#output");let n;try{n=(0,o.convert)(e.value)}catch(e){console.error(e),n=e.message}t.textContent=n}addEventListener("load",(function(){document.querySelector("#input").select(),function(){const e=document.querySelector("#input"),t=t=>{var n,s;const r=t.target,o=null!==(n=e.selectionStart)&&void 0!==n?n:e.value.length,i=null!==(s=e.selectionEnd)&&void 0!==s?s:e.value.length;e.focus(),e.setRangeText(r.innerText,o,i,"end")},n=document.querySelector("#input-button-area-consonants");[...i.consonants,i.STRESS_MARK].map((e=>{const n=document.createElement("button");return n.type="button",n.innerText=e,n.className="col btn btn-secondary input-button",n.onclick=t,n})).forEach((e=>n.appendChild(e)));const s=document.querySelector("#input-button-area-vowels");i.vowels.map((e=>{const n=document.createElement("button");return n.type="button",n.innerText=e,n.className="col btn btn-secondary input-button",n.onclick=t,n})).forEach((e=>s.appendChild(e)))}()}));const a=document.querySelectorAll("form");for(const e of Array.from(a))e.onkeydown=u;const l=document.querySelector("#input");l.addEventListener("input",(function(){const e=document.querySelector("#input"),t=document.querySelector("#run");e.value.length>0?t.removeAttribute("disabled"):t.setAttribute("disabled","")})),l.addEventListener("keydown",(function(e){"Enter"===e.key&&c()})),document.querySelector("#run").addEventListener("click",c),document.querySelector("#copy").addEventListener("click",(function(){const e=document.querySelector("#output");navigator.clipboard.writeText(e.textContent).then((()=>{const t=`"${e.textContent}" is successfully copied to the clipboard. 😁`;console.debug(t),function(e){document.querySelector("#toast-body").textContent=e;const t=document.querySelector("#toast");r.default.getOrCreateInstance(t).show()}(t)}))}))},44:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.sonorityRanks=t.validChunks=t.acceptedSymbols=t.vowels=t.consonants=t.SECONDARY_STRESS_MARK=t.STRESS_MARK=t.mappings=void 0;const n=new Map;n.set("b","b"),n.set("tʃ","ch"),n.set("d","d"),n.set("ð","dh"),n.set("f","f"),n.set("ɡ",["g","gh"]),n.set("h","h"),n.set("ɦ","h"),n.set("dʒ","j"),n.set("k","k"),n.set("x","kh"),n.set("l","l"),n.set("ʎ","ly"),n.set("m","m"),n.set("ɱ","m"),n.set("n","n"),n.set("ɳ","n"),n.set("ŋ","ng"),n.set("ɴ","ng"),n.set("ŋk","nk"),n.set("p","p"),n.set("r","r"),n.set("ɹ","r"),n.set("ɾ","r"),n.set("ɽ","r"),n.set("s",["s","ss"]),n.set("ʃ","sh"),n.set("t","t"),n.set("ʈ","t"),n.set("tʃ","tch"),n.set("θ","th"),n.set("v","v"),n.set("w","w"),n.set("ɥ","w"),n.set("ɰ","w"),n.set("hw","wh"),n.set("j","y"),n.set("ʝ","y"),n.set("z","z"),n.set("ʒ","zh"),n.set("ç","ch"),n.set("ʣ","dz"),n.set("ʤ","j"),n.set("ʦ","ts"),n.set("ʧ","ch"),n.set("ɢ","g"),n.set("ʔ",""),n.set("c","k"),n.set("ɟ","g"),n.set("q","k"),n.set("χ","kh"),n.set("ʁ","r"),n.set("ħ","h"),n.set("ʕ","");const s=new Map;s.set("æ","a"),s.set("ɑ","ah"),s.set("ɑː","ah"),s.set("ɛər","air"),s.set("ɑːr","ar"),s.set("ær","arr"),s.set("ɔː","aw"),s.set("eɪ","ay"),s.set("ɛ",["e","eh"]),s.set("iː","ee"),s.set("i","ee"),s.set("ɪər","eer"),s.set("ɛr","err"),s.set("juː","ew"),s.set("aɪ",["eye","y"]),s.set("ɪ",["i","ih"]),s.set("aɪər","ire"),s.set("ɪr","irr"),s.set("ɒ","o"),s.set("oʊ","oh"),s.set("ɔɪər","oir"),s.set("uː","oo"),s.set("u","oo"),s.set("ʊər","oor"),s.set("ɔːr","or"),s.set("ɒr","orr"),s.set("aʊər","our"),s.set("aʊ","ow"),s.set("ɔɪ","oy"),s.set("ʌ",["u","uh"]),s.set("ɜːr","ur"),s.set("jʊər","ure"),s.set("ʌr","urr"),s.set("ʊ","uu"),s.set("ʊr","uurr"),s.set("ə","uh"),s.set("ər","er"),s.set("y","ue"),s.set("ø","eu"),s.set("œ","eu"),s.set("ɶ","a"),s.set("ɨ","i"),s.set("ʉ","u"),s.set("ɯ","u"),s.set("ɘ","uh"),s.set("ɵ","uh"),s.set("ɤ","uh"),s.set("ɜ","uh"),s.set("ɞ","uh"),s.set("ɐ","uh"),s.set("ɚ","er"),s.set("ɝ","ur"),s.set("ɔ","aw"),s.set("a","ah"),s.set("ɑ̃","on"),s.set("ɛ̃","an"),s.set("ɔ̃","on"),s.set("œ̃","un"),t.mappings=new Map([...n,...s]),t.STRESS_MARK="ˈ",t.SECONDARY_STRESS_MARK="ˌ",t.consonants=[...n.keys()],t.vowels=[...s.keys()],t.acceptedSymbols=["/","[","]"," "],t.validChunks=[...t.consonants,...t.vowels,t.STRESS_MARK,t.SECONDARY_STRESS_MARK,...t.acceptedSymbols],t.sonorityRanks=new Map([["i",8],["y",8],["ɨ",8],["ʉ",8],["ɯ",8],["u",8],["ɪ",8],["ʏ",8],["ʊ",8],["e",8],["ø",8],["ɘ",8],["ɵ",8],["ɤ",8],["o",8],["ə",8],["ɛ",8],["œ",8],["ɜ",8],["ɞ",8],["ʌ",8],["ɔ",8],["æ",8],["ɐ",8],["a",8],["ɶ",8],["ɑ",8],["ɒ",8],["ɚ",8],["ɝ",8],["ʲ",8],["aɪ",8],["eɪ",8],["ɔɪ",8],["aʊ",8],["oʊ",8],["ɪə",8],["ɛə",8],["ʊə",8],["j",7],["w",7],["ɥ",7],["ɰ",7],["l",6],["r",6],["ɹ",6],["ɾ",6],["ɽ",6],["ʎ",6],["ʟ",6],["m",5],["ɱ",5],["n",5],["ɳ",5],["ŋ",5],["ɴ",5],["f",4],["v",4],["θ",4],["ð",4],["s",4],["z",4],["ʃ",4],["ʒ",4],["ç",4],["ʝ",4],["x",4],["ɣ",4],["χ",4],["ʁ",4],["ħ",4],["ʕ",4],["h",4],["ɦ",4],["ʦ",3],["ʣ",3],["ʧ",3],["ʤ",3],["tʃ",3],["dʒ",3],["p",2],["b",2],["t",2],["d",2],["ʈ",2],["ɖ",2],["c",2],["ɟ",2],["k",2],["g",2],["q",2],["ɢ",2],["ʔ",2]])}},t={};function n(s){var r=t[s];if(void 0!==r)return r.exports;var o=t[s]={exports:{}};return e[s].call(o.exports,o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";n(51),n(703),n(44)})()})();