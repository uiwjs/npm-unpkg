(this["webpackJsonpnpm-unpkg"]=this["webpackJsonpnpm-unpkg"]||[]).push([[7],{123:function(t,e){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n},t.exports.default=t.exports,t.exports.__esModule=!0},124:function(t,e){t.exports=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t},t.exports.default=t.exports,t.exports.__esModule=!0},158:function(t,e,r){var n=r(159),o=r(160),u=r(161),s=r(162);t.exports=function(t){return n(t)||o(t)||u(t)||s()},t.exports.default=t.exports,t.exports.__esModule=!0},159:function(t,e,r){var n=r(123);t.exports=function(t){if(Array.isArray(t))return n(t)},t.exports.default=t.exports,t.exports.__esModule=!0},160:function(t,e){t.exports=function(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)},t.exports.default=t.exports,t.exports.__esModule=!0},161:function(t,e,r){var n=r(123);t.exports=function(t,e){if(t){if("string"===typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}},t.exports.default=t.exports,t.exports.__esModule=!0},162:function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.default=t.exports,t.exports.__esModule=!0},163:function(t,e){function r(t,e,r,n,o,u,s){try{var i=t[u](s),a=i.value}catch(c){return void r(c)}i.done?e(a):Promise.resolve(a).then(n,o)}t.exports=function(t){return function(){var e=this,n=arguments;return new Promise((function(o,u){var s=t.apply(e,n);function i(t){r(s,o,u,i,a,"next",t)}function a(t){r(s,o,u,i,a,"throw",t)}i(void 0)}))}},t.exports.default=t.exports,t.exports.__esModule=!0},164:function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},t.exports.default=t.exports,t.exports.__esModule=!0},165:function(t,e){function r(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}t.exports=function(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t},t.exports.default=t.exports,t.exports.__esModule=!0},166:function(t,e,r){var n=r(167);t.exports=function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&n(t,e)},t.exports.default=t.exports,t.exports.__esModule=!0},167:function(t,e){function r(e,n){return t.exports=r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},t.exports.default=t.exports,t.exports.__esModule=!0,r(e,n)}t.exports=r,t.exports.default=t.exports,t.exports.__esModule=!0},168:function(t,e,r){var n=r(169),o=r(170),u=r(171);t.exports=function(t){var e=o();return function(){var r,o=n(t);if(e){var s=n(this).constructor;r=Reflect.construct(o,arguments,s)}else r=o.apply(this,arguments);return u(this,r)}},t.exports.default=t.exports,t.exports.__esModule=!0},169:function(t,e){function r(e){return t.exports=r=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},t.exports.default=t.exports,t.exports.__esModule=!0,r(e)}t.exports=r,t.exports.default=t.exports,t.exports.__esModule=!0},170:function(t,e){t.exports=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}},t.exports.default=t.exports,t.exports.__esModule=!0},171:function(t,e,r){var n=r(32).default,o=r(124);t.exports=function(t,e){if(e&&("object"===n(e)||"function"===typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return o(t)},t.exports.default=t.exports,t.exports.__esModule=!0},172:function(t,e,r){},513:function(t,e,r){"use strict";r.r(e),r.d(e,"default",(function(){return R}));var n=r(8),o=r(0),u=r.n(o),s=r(2),i=r(158),a=r.n(i),c=r(163),l=r.n(c),p=r(97),f=r.n(p),d=r(164),x=r.n(d),h=r(165),b=r.n(h),v=r(124),m=r.n(v),y=r(166),j=r.n(y),_=r(168),O=r.n(_),g=r(11),C=r.n(g),M=null;function w(t){var e=t.component,r=t.LoadingComponent,n=t.models,o=null;return function(t){j()(i,t);var s=O()(i);function i(t){var e;return x()(this,i),(e=s.call(this,t)).updateState=e.updateState.bind(m()(e)),e.state={Component:o},e}return b()(i,[{key:"componentDidMount",value:function(){i.load().then(this.updateState)}},{key:"updateState",value:function(){this.state.Component!==o&&this.setState({Component:o})}},{key:"render",value:function(){var t=f()({},this.props),e=this.state.Component,n=r||M;return e?u.a.createElement(e,t):n?u.a.createElement(n,t):null}}],[{key:"getInitialProps",value:function(){var t=l()(C.a.mark((function t(e){return C.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(null===o){t.next=2;break}return t.abrupt("return",o.getInitialProps?o.getInitialProps(e):Promise.resolve(null));case 2:return t.abrupt("return",Promise.resolve(null));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},{key:"load",value:function(){var t=l()(C.a.mark((function t(){var r,u;return C.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!((r=(r="function"===typeof n?n():[])||[]).length>0)){t.next=5;break}return t.next=5,Promise.all(a()(r));case 5:return t.next=7,e();case 7:(u=t.sent)&&(o=u.default||u);case 9:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()}]),i}(u.a.Component)}w.setDefaultLoadingComponent=function(t){M=t};var k=r(1),P=r(4),L=(r(172),r(18)),S=["size","fixed","bottom","zIndex","className","bgColor","color","position"];function I(t){void 0===t&&(t={});var e=t,r=e.size,n=void 0===r?80:r,o=e.fixed,u=void 0!==o&&o,s=e.bottom,i=e.zIndex,a=e.className,c=e.bgColor,l=void 0===c?"#151513":c,p=e.color,f=void 0===p?"#fff":p,d=e.position,x=void 0===d?"right":d,h=Object(P.a)(e,S),b="left"===x?{left:0,transform:"scale(-1, 1)"}:{right:0};return s&&(b.bottom=0,b.top="initial",b.transform="left"===x?"scale(-1, -1)":"scale(1, -1)"),Object(L.jsx)("a",Object(k.a)({href:t.href,"aria-label":"View source on GitHub"},h,{className:"github-corner "+(a||""),children:Object(L.jsxs)("svg",{width:n,height:n,viewBox:"0 0 250 250",style:Object(k.a)({fill:l,color:f,position:u?"fixed":"absolute",border:0,top:0,zIndex:i},b),"aria-hidden":"true",children:[Object(L.jsx)("path",{d:"M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"}),Object(L.jsx)("path",{d:"M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2",fill:"currentColor",style:{transformOrigin:"130px 106px"},className:"octo-arm"}),Object(L.jsx)("path",{d:"M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z",fill:"currentColor",className:"octo-body"})]})}))}var A=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.match,r=t.child,n=Object(s.g)(),u=Object(s.h)();return Object(o.useMemo)((function(){return Object(L.jsx)(r,{match:e,history:n,location:u})}),[n.location.key])};function E(){return Object(L.jsx)("div",{style:{color:"#fff",minHeight:100,display:"flex",textAlign:"center",justifyContent:"center",alignItems:"center"},children:Object(L.jsx)("span",{children:"Loading..."})})}var z=function(t,e){return w({models:e||null,component:t,LoadingComponent:function(){return Object(L.jsx)(E,{})}})};function R(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.routes,r=t.loadModels,o=void 0===r?function(){return[]}:r,u=Object(s.h)();return Object(L.jsxs)("div",{children:[Object(L.jsx)(I,{target:"__blank",bgColor:"#202225",size:54,href:"https://github.com/uiwjs/npm-unpkg"}),Object(L.jsx)(s.d,{children:e.map((function(e,r){if(!e.path)return null;if(t.location.pathname===e.path&&e.redirect)return Object(L.jsx)(s.a,{to:e.redirect},r);if(!e.component)return null;var i=o(e.models||[]),a=z(e.component,i),c=Object(s.f)(u.pathname,{path:e.path});return Object(L.jsx)(s.b,{exact:!0,strict:!0,path:e.path,render:function(r){return Object(L.jsx)(A,Object(n.a)(Object(n.a)(Object(n.a)({},t),r),{},{routes:e.routes||[],match:c,child:a}))}},r)}))})]})}},97:function(t,e){function r(){return t.exports=r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},t.exports.default=t.exports,t.exports.__esModule=!0,r.apply(this,arguments)}t.exports=r,t.exports.default=t.exports,t.exports.__esModule=!0}}]);
//# sourceMappingURL=7.1df87628.chunk.js.map