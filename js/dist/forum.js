module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=14)}([function(e,t){e.exports=flarum.core.compat.Model},function(e,t){e.exports=flarum.core.compat.extend},function(e,t,r){"use strict";function n(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}r.d(t,"a",function(){return n})},function(e,t){e.exports=flarum.core.compat["components/UserPage"]},function(e,t){e.exports=flarum.core.compat["models/User"]},function(e,t){e.exports=flarum.core.compat["components/UserCard"]},function(e,t){e.exports=flarum.core.compat["components/FieldSet"]},function(e,t){e.exports=flarum.core.compat["helpers/icon"]},function(e,t){e.exports=flarum.core.compat["helpers/avatar"]},function(e,t){e.exports=flarum.core.compat["utils/string"]},function(e,t){e.exports=flarum.core.compat["utils/ItemList"]},function(e,t){e.exports=flarum.core.compat["utils/humanTime"]},,,function(e,t,r){"use strict";r.r(t);var n=r(4),o=r.n(n),i=r(3),a=r.n(i),s=r(5),u=r.n(s),c=r(6),l=r.n(c),p=r(7),f=r.n(p),d=r(8),v=r.n(d),b=r(9),w=r(0),h=r.n(w),y=r(10),x=r.n(y),g=r(1),O=r(11),_=r.n(O);function j(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var U=r(2);function P(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var S=function(e){function t(){for(var t,r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return P(j(t=e.call.apply(e,[this].concat(n))||this),"visitedAt",h.a.attribute("visited_at",h.a.transformDate)),P(j(t),"viewer",h.a.hasOne("viewer")),P(j(t),"viewedUser",h.a.hasOne("viewedUser")),t}return Object(U.a)(t,e),t}(h.a);app.initializers.add("michaelbelgium-profile-views",function(){app.store.models.userprofileview=S,o.a.prototype.profileViews=h.a.hasMany("profileViews"),Object(g.extend)(u.a.prototype,"infoItems",function(e){var t=this.props.user,r=!1===t.profileViews()?0:t.profileViews().length;e.add("profile-views",m("span",null,f()("far fa-eye")," ",app.translator.transChoice("michaelbelgium-flarum-profile-views.forum.user.view_count_text",r,{viewcount:""+r})))}),Object(g.extend)(a.a.prototype,"sidebarItems",function(e){var t=new x.a,r=this.user.profileViews();r.length>=5&&(r=r.slice(0,5)),$.each(r,function(e,r){var n=!1===r.viewer()?"Guest":Object(b.ucfirst)(r.viewer().username()),o=m("div",{className:"item-lastUser-content"},v()(!1===r.viewer()?null:r.viewer()),m("div",null,n,m("span",{className:"lastUser-visited",title:r.visitedAt().toLocaleString()},_()(r.visitedAt()))));r.viewer()&&(o=m("a",{href:app.forum.attribute("baseUrl")+"/u/"+n},o)),t.add("lastUser-"+e,o)}),e.add("lastViewedUsers",l.a.component({label:app.translator.trans("michaelbelgium-flarum-profile-views.forum.user.last_viewers_heading"),className:"LastUsers",children:t.toArray()}))}),Object(g.extend)(a.a.prototype,"show",function(){app.request({method:"POST",url:app.forum.attribute("apiUrl")+"/profileview",data:{viewer:void 0===app.session.user?null:app.session.user.id(),viewedUser:this.user.id()}})})})}]);
//# sourceMappingURL=forum.js.map