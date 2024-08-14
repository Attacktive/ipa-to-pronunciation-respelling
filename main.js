/*! For license information please see main.js.LICENSE.txt */
(()=>{var e={11:function(e,t,n){e.exports=function(e,t,n,o){"use strict";return class extends n{constructor(t,n){super(),(t=o.getElement(t))&&(this._element=t,this._config=this._getConfig(n),e.set(this._element,this.constructor.DATA_KEY,this))}dispose(){e.remove(this._element,this.constructor.DATA_KEY),t.off(this._element,this.constructor.EVENT_KEY);for(const e of Object.getOwnPropertyNames(this))this[e]=null}_queueCallback(e,t,n=!0){o.executeAfterTransition(e,t,n)}_getConfig(e){return e=this._mergeConfigObj(e,this._element),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}static getInstance(t){return e.get(o.getElement(t),this.DATA_KEY)}static getOrCreateInstance(e,t={}){return this.getInstance(e)||new this(e,"object"==typeof t?t:null)}static get VERSION(){return"5.3.3"}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(e){return`${e}${this.EVENT_KEY}`}}}(n(269),n(956),n(105),n(35))},269:function(e){e.exports=function(){"use strict";const e=new Map;return{set(t,n,o){e.has(t)||e.set(t,new Map);const r=e.get(t);r.has(n)||0===r.size?r.set(n,o):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`)},get:(t,n)=>e.has(t)&&e.get(t).get(n)||null,remove(t,n){if(!e.has(t))return;const o=e.get(t);o.delete(n),0===o.size&&e.delete(t)}}}()},956:function(e,t,n){e.exports=function(e){"use strict";const t=/[^.]*(?=\..*)\.|.*/,n=/\..*/,o=/::\d+$/,r={};let s=1;const i={mouseenter:"mouseover",mouseleave:"mouseout"},u=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function c(e,t){return t&&`${t}::${s++}`||e.uidEvent||s++}function a(e){const t=c(e);return e.uidEvent=t,r[t]=r[t]||{},r[t]}function l(e,t,n=null){return Object.values(e).find((e=>e.callable===t&&e.delegationSelector===n))}function d(e,t,n){const o="string"==typeof t,r=o?n:t||n;let s=p(e);return u.has(s)||(s=e),[o,r,s]}function f(e,n,o,r,s){if("string"!=typeof n||!e)return;let[u,f,h]=d(n,o,r);if(n in i){const e=e=>function(t){if(!t.relatedTarget||t.relatedTarget!==t.delegateTarget&&!t.delegateTarget.contains(t.relatedTarget))return e.call(this,t)};f=e(f)}const m=a(e),p=m[h]||(m[h]={}),y=l(p,f,u?o:null);if(y)return void(y.oneOff=y.oneOff&&s);const _=c(f,n.replace(t,"")),S=u?function(e,t,n){return function o(r){const s=e.querySelectorAll(t);for(let{target:i}=r;i&&i!==this;i=i.parentNode)for(const u of s)if(u===i)return b(r,{delegateTarget:i}),o.oneOff&&g.off(e,r.type,t,n),n.apply(i,[r])}}(e,o,f):function(e,t){return function n(o){return b(o,{delegateTarget:e}),n.oneOff&&g.off(e,o.type,t),t.apply(e,[o])}}(e,f);S.delegationSelector=u?o:null,S.callable=f,S.oneOff=s,S.uidEvent=_,p[_]=S,e.addEventListener(h,S,u)}function h(e,t,n,o,r){const s=l(t[n],o,r);s&&(e.removeEventListener(n,s,Boolean(r)),delete t[n][s.uidEvent])}function m(e,t,n,o){const r=t[n]||{};for(const[s,i]of Object.entries(r))s.includes(o)&&h(e,t,n,i.callable,i.delegationSelector)}function p(e){return e=e.replace(n,""),i[e]||e}const g={on(e,t,n,o){f(e,t,n,o,!1)},one(e,t,n,o){f(e,t,n,o,!0)},off(e,t,n,r){if("string"!=typeof t||!e)return;const[s,i,u]=d(t,n,r),c=u!==t,l=a(e),f=l[u]||{},p=t.startsWith(".");if(void 0===i){if(p)for(const n of Object.keys(l))m(e,l,n,t.slice(1));for(const[n,r]of Object.entries(f)){const s=n.replace(o,"");c&&!t.includes(s)||h(e,l,u,r.callable,r.delegationSelector)}}else{if(!Object.keys(f).length)return;h(e,l,u,i,s?n:null)}},trigger(t,n,o){if("string"!=typeof n||!t)return null;const r=e.getjQuery();let s=null,i=!0,u=!0,c=!1;n!==p(n)&&r&&(s=r.Event(n,o),r(t).trigger(s),i=!s.isPropagationStopped(),u=!s.isImmediatePropagationStopped(),c=s.isDefaultPrevented());const a=b(new Event(n,{bubbles:i,cancelable:!0}),o);return c&&a.preventDefault(),u&&t.dispatchEvent(a),a.defaultPrevented&&s&&s.preventDefault(),a}};function b(e,t={}){for(const[n,o]of Object.entries(t))try{e[n]=o}catch(t){Object.defineProperty(e,n,{configurable:!0,get:()=>o})}return e}return g}(n(35))},333:function(e){e.exports=function(){"use strict";function e(e){if("true"===e)return!0;if("false"===e)return!1;if(e===Number(e).toString())return Number(e);if(""===e||"null"===e)return null;if("string"!=typeof e)return e;try{return JSON.parse(decodeURIComponent(e))}catch(t){return e}}function t(e){return e.replace(/[A-Z]/g,(e=>`-${e.toLowerCase()}`))}return{setDataAttribute(e,n,o){e.setAttribute(`data-bs-${t(n)}`,o)},removeDataAttribute(e,n){e.removeAttribute(`data-bs-${t(n)}`)},getDataAttributes(t){if(!t)return{};const n={},o=Object.keys(t.dataset).filter((e=>e.startsWith("bs")&&!e.startsWith("bsConfig")));for(const r of o){let o=r.replace(/^bs/,"");o=o.charAt(0).toLowerCase()+o.slice(1,o.length),n[o]=e(t.dataset[r])}return n},getDataAttribute:(n,o)=>e(n.getAttribute(`data-bs-${t(o)}`))}}()},411:function(e,t,n){e.exports=function(e){"use strict";const t=t=>{let n=t.getAttribute("data-bs-target");if(!n||"#"===n){let e=t.getAttribute("href");if(!e||!e.includes("#")&&!e.startsWith("."))return null;e.includes("#")&&!e.startsWith("#")&&(e=`#${e.split("#")[1]}`),n=e&&"#"!==e?e.trim():null}return n?n.split(",").map((t=>e.parseSelector(t))).join(","):null},n={find:(e,t=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(t,e)),findOne:(e,t=document.documentElement)=>Element.prototype.querySelector.call(t,e),children:(e,t)=>[].concat(...e.children).filter((e=>e.matches(t))),parents(e,t){const n=[];let o=e.parentNode.closest(t);for(;o;)n.push(o),o=o.parentNode.closest(t);return n},prev(e,t){let n=e.previousElementSibling;for(;n;){if(n.matches(t))return[n];n=n.previousElementSibling}return[]},next(e,t){let n=e.nextElementSibling;for(;n;){if(n.matches(t))return[n];n=n.nextElementSibling}return[]},focusableChildren(t){const n=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map((e=>`${e}:not([tabindex^="-"])`)).join(",");return this.find(n,t).filter((t=>!e.isDisabled(t)&&e.isVisible(t)))},getSelectorFromElement(e){const o=t(e);return o&&n.findOne(o)?o:null},getElementFromSelector(e){const o=t(e);return o?n.findOne(o):null},getMultipleElementsFromSelector(e){const o=t(e);return o?n.find(o):[]}};return n}(n(35))},653:function(e,t,n){e.exports=function(e,t,n,o){"use strict";const r=".bs.toast",s=`mouseover${r}`,i=`mouseout${r}`,u=`focusin${r}`,c=`focusout${r}`,a=`hide${r}`,l=`hidden${r}`,d=`show${r}`,f=`shown${r}`,h="hide",m="show",p="showing",g={animation:"boolean",autohide:"boolean",delay:"number"},b={animation:!0,autohide:!0,delay:5e3};class y extends e{constructor(e,t){super(e,t),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get Default(){return b}static get DefaultType(){return g}static get NAME(){return"toast"}show(){if(t.trigger(this._element,d).defaultPrevented)return;this._clearTimeout(),this._config.animation&&this._element.classList.add("fade");this._element.classList.remove(h),o.reflow(this._element),this._element.classList.add(m,p),this._queueCallback((()=>{this._element.classList.remove(p),t.trigger(this._element,f),this._maybeScheduleHide()}),this._element,this._config.animation)}hide(){if(!this.isShown())return;if(t.trigger(this._element,a).defaultPrevented)return;this._element.classList.add(p),this._queueCallback((()=>{this._element.classList.add(h),this._element.classList.remove(p,m),t.trigger(this._element,l)}),this._element,this._config.animation)}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove(m),super.dispose()}isShown(){return this._element.classList.contains(m)}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout((()=>{this.hide()}),this._config.delay)))}_onInteraction(e,t){switch(e.type){case"mouseover":case"mouseout":this._hasMouseInteraction=t;break;case"focusin":case"focusout":this._hasKeyboardInteraction=t}if(t)return void this._clearTimeout();const n=e.relatedTarget;this._element===n||this._element.contains(n)||this._maybeScheduleHide()}_setListeners(){t.on(this._element,s,(e=>this._onInteraction(e,!0))),t.on(this._element,i,(e=>this._onInteraction(e,!1))),t.on(this._element,u,(e=>this._onInteraction(e,!0))),t.on(this._element,c,(e=>this._onInteraction(e,!1)))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(e){return this.each((function(){const t=y.getOrCreateInstance(this,e);if("string"==typeof e){if(void 0===t[e])throw new TypeError(`No method named "${e}"`);t[e](this)}}))}}return n.enableDismissTrigger(y),o.defineJQueryPlugin(y),y}(n(11),n(956),n(248),n(35))},248:function(e,t,n){!function(e,t,n,o){"use strict";e.enableDismissTrigger=(e,r="hide")=>{const s=`click.dismiss${e.EVENT_KEY}`,i=e.NAME;t.on(document,s,`[data-bs-dismiss="${i}"]`,(function(t){if(["A","AREA"].includes(this.tagName)&&t.preventDefault(),o.isDisabled(this))return;const s=n.getElementFromSelector(this)||this.closest(`.${i}`);e.getOrCreateInstance(s)[r]()}))},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}(t,n(956),n(411),n(35))},105:function(e,t,n){e.exports=function(e,t){"use strict";return class{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(e){return e=this._mergeConfigObj(e),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}_configAfterMerge(e){return e}_mergeConfigObj(n,o){const r=t.isElement(o)?e.getDataAttribute(o,"config"):{};return{...this.constructor.Default,..."object"==typeof r?r:{},...t.isElement(o)?e.getDataAttributes(o):{},..."object"==typeof n?n:{}}}_typeCheckConfig(e,n=this.constructor.DefaultType){for(const[o,r]of Object.entries(n)){const n=e[o],s=t.isElement(n)?"element":t.toType(n);if(!new RegExp(r).test(s))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${o}" provided type "${s}" but expected type "${r}".`)}}}}(n(333),n(35))},35:function(e,t){!function(e){"use strict";const t="transitionend",n=e=>(e&&window.CSS&&window.CSS.escape&&(e=e.replace(/#([^\s"#']+)/g,((e,t)=>`#${CSS.escape(t)}`))),e),o=e=>{if(!e)return 0;let{transitionDuration:t,transitionDelay:n}=window.getComputedStyle(e);const o=Number.parseFloat(t),r=Number.parseFloat(n);return o||r?(t=t.split(",")[0],n=n.split(",")[0],1e3*(Number.parseFloat(t)+Number.parseFloat(n))):0},r=e=>{e.dispatchEvent(new Event(t))},s=e=>!(!e||"object"!=typeof e)&&(void 0!==e.jquery&&(e=e[0]),void 0!==e.nodeType),i=e=>{if(!document.documentElement.attachShadow)return null;if("function"==typeof e.getRootNode){const t=e.getRootNode();return t instanceof ShadowRoot?t:null}return e instanceof ShadowRoot?e:e.parentNode?i(e.parentNode):null},u=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,c=[],a=e=>{"loading"===document.readyState?(c.length||document.addEventListener("DOMContentLoaded",(()=>{for(const e of c)e()})),c.push(e)):e()},l=(e,t=[],n=e)=>"function"==typeof e?e(...t):n;e.defineJQueryPlugin=e=>{a((()=>{const t=u();if(t){const n=e.NAME,o=t.fn[n];t.fn[n]=e.jQueryInterface,t.fn[n].Constructor=e,t.fn[n].noConflict=()=>(t.fn[n]=o,e.jQueryInterface)}}))},e.execute=l,e.executeAfterTransition=(e,n,s=!0)=>{if(!s)return void l(e);const i=o(n)+5;let u=!1;const c=({target:o})=>{o===n&&(u=!0,n.removeEventListener(t,c),l(e))};n.addEventListener(t,c),setTimeout((()=>{u||r(n)}),i)},e.findShadowRoot=i,e.getElement=e=>s(e)?e.jquery?e[0]:e:"string"==typeof e&&e.length>0?document.querySelector(n(e)):null,e.getNextActiveElement=(e,t,n,o)=>{const r=e.length;let s=e.indexOf(t);return-1===s?!n&&o?e[r-1]:e[0]:(s+=n?1:-1,o&&(s=(s+r)%r),e[Math.max(0,Math.min(s,r-1))])},e.getTransitionDurationFromElement=o,e.getUID=e=>{do{e+=Math.floor(1e6*Math.random())}while(document.getElementById(e));return e},e.getjQuery=u,e.isDisabled=e=>!e||e.nodeType!==Node.ELEMENT_NODE||!!e.classList.contains("disabled")||(void 0!==e.disabled?e.disabled:e.hasAttribute("disabled")&&"false"!==e.getAttribute("disabled")),e.isElement=s,e.isRTL=()=>"rtl"===document.documentElement.dir,e.isVisible=e=>{if(!s(e)||0===e.getClientRects().length)return!1;const t="visible"===getComputedStyle(e).getPropertyValue("visibility"),n=e.closest("details:not([open])");if(!n)return t;if(n!==e){const t=e.closest("summary");if(t&&t.parentNode!==n)return!1;if(null===t)return!1}return t},e.noop=()=>{},e.onDOMContentLoaded=a,e.parseSelector=n,e.reflow=e=>{e.offsetHeight},e.toType=e=>null==e?`${e}`:Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(),e.triggerTransitionEnd=r,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}(t)},51:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.convert=function(e){const t=r(e);let n=!1;return t.map((e=>{if(e===o.STRESS_MARK)return n=!0,null;if(e===o.SECONDARY_STRESS_MARK)return null;let t;const r=o.mappings.get(e);if(Array.isArray(r))t=r[0];else if("string"==typeof r)t=r;else{if(!o.acceptedSymbols.includes(e))throw Error(`Token "${e}" has no mapping!`);t=e}return n&&(t=t.toUpperCase()),n=!1,t})).filter((e=>null!==e)).join("")},t.tokenize=r;const o=n(44);function r(e){const t=[];for(let n=0;n<e.length;){let r=!1;for(const s of o.validChunks)e.startsWith(s,n)&&(t.push(s),n+=s.length,r=!0);if(!r)throw Error(`${e} contains unsupported symbol(s) around: "${e.charAt(n)}".`)}return t}},703:function(e,t,n){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=o(n(653)),s=n(51),i=n(44);function u(e){if("Enter"===e.key)return!1}function c(){const e=document.querySelector("#input"),t=document.querySelector("#output");let n;try{n=(0,s.convert)(e.value)}catch(e){console.error(e),n=e.message}t.textContent=n}addEventListener("load",(function(){document.querySelector("#input").select(),function(){const e=document.querySelector("#input"),t=t=>{var n,o;const r=t.target,s=null!==(n=e.selectionStart)&&void 0!==n?n:e.value.length,i=null!==(o=e.selectionEnd)&&void 0!==o?o:e.value.length;e.focus(),e.setRangeText(r.innerText,s,i,"end")},n=document.querySelector("#input-button-area-consonants");for(const e of[...i.consonants,i.STRESS_MARK]){const o=document.createElement("button");o.type="button",o.innerText=e,o.className="col btn btn-secondary input-button",o.onclick=t,n.appendChild(o)}const o=document.querySelector("#input-button-area-vowels");for(const e of i.vowels){const n=document.createElement("button");n.type="button",n.innerText=e,n.className="col btn btn-secondary input-button",n.onclick=t,o.appendChild(n)}}()}));const a=document.querySelectorAll("form");for(const e of Array.from(a))e.onkeydown=u;const l=document.querySelector("#input");l.addEventListener("input",(function(){const e=document.querySelector("#input"),t=document.querySelector("#run");e.value.length>0?t.removeAttribute("disabled"):t.setAttribute("disabled","")})),l.addEventListener("keydown",(function(e){"Enter"===e.key&&c()})),document.querySelector("#run").addEventListener("click",c),document.querySelector("#copy").addEventListener("click",(function(){const e=document.querySelector("#output");navigator.clipboard.writeText(e.textContent).then((()=>{const t=`"${e.textContent}" is successfully copied to the clipboard. 😁`;console.debug(t),function(e){document.querySelector("#toast-body").textContent=e;const t=document.querySelector("#toast");r.default.getOrCreateInstance(t).show()}(t)}))}))},44:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.validChunks=t.acceptedSymbols=t.vowels=t.consonants=t.SECONDARY_STRESS_MARK=t.STRESS_MARK=t.mappings=void 0;const n=new Map;n.set("b","b"),n.set("tʃ","ch"),n.set("d","d"),n.set("ð","dh"),n.set("f","f"),n.set("ɡ",["g","gh"]),n.set("h","h"),n.set("dʒ","j"),n.set("k","k"),n.set("x","kh"),n.set("l","l"),n.set("m","m"),n.set("n","n"),n.set("ŋ","ng"),n.set("ŋk","nk"),n.set("p","p"),n.set("r","r"),n.set("s",["s","ss"]),n.set("ʃ","sh"),n.set("t","t"),n.set("tʃ","tch"),n.set("θ","th"),n.set("v","v"),n.set("w","w"),n.set("hw","wh"),n.set("j","y"),n.set("z","z"),n.set("ʒ","zh");const o=new Map;o.set("æ","a"),o.set("ɑː","ah"),o.set("ɛər","air"),o.set("ɑːr","ar"),o.set("ær","arr"),o.set("ɔː","aw"),o.set("eɪ","ay"),o.set("ɛ",["e","eh"]),o.set("iː","ee"),o.set("i","ee"),o.set("ɪər","eer"),o.set("ɛr","err"),o.set("juː","ew"),o.set("aɪ",["eye","y"]),o.set("ɪ",["i","ih"]),o.set("aɪər","ire"),o.set("ɪr","irr"),o.set("ɒ","o"),o.set("oʊ","oh"),o.set("ɔɪər","oir"),o.set("uː","oo"),o.set("u","oo"),o.set("ʊər","oor"),o.set("ɔːr","or"),o.set("ɒr","orr"),o.set("aʊər","our"),o.set("aʊ","ow"),o.set("ɔɪ","oy"),o.set("ʌ",["u","uh"]),o.set("ɜːr","ur"),o.set("jʊər","ure"),o.set("ʌr","urr"),o.set("ʊ","uu"),o.set("ʊr","uurr"),o.set("ə","uh"),o.set("ər","er"),t.mappings=new Map([...n,...o]),t.STRESS_MARK="ˈ",t.SECONDARY_STRESS_MARK="ˌ",t.consonants=[...n.keys()],t.vowels=[...o.keys()],t.acceptedSymbols=["/","[","]"," "],t.validChunks=[...t.consonants,...t.vowels,t.STRESS_MARK,t.SECONDARY_STRESS_MARK,...t.acceptedSymbols]}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var s=t[o]={exports:{}};return e[o].call(s.exports,s,s.exports,n),s.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";n(51),n(703),n(44)})()})();