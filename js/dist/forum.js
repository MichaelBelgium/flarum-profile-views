module.exports=function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=11)}([function(e,t){e.exports=flarum.core.compat.Model},function(e,t){e.exports=flarum.core.compat.extend},function(e,t){e.exports=flarum.core.compat["models/User"]},function(e,t){e.exports=flarum.core.compat["components/UserPage"]},function(e,t){e.exports=flarum.core.compat["components/UserCard"]},function(e,t){e.exports=flarum.core.compat["components/FieldSet"]},function(e,t){e.exports=flarum.core.compat["helpers/icon"]},function(e,t){e.exports=flarum.core.compat["helpers/avatar"]},function(e,t){e.exports=flarum.core.compat["utils/string"]},function(e,t){e.exports=flarum.core.compat["utils/ItemList"]},function(e,t){e.exports=flarum.core.compat["utils/humanTime"]},function(e,t,r){"use strict";r.r(t);var o=r(2),n=r.n(o),i=r(3),a=r.n(i),s=r(4),u=r.n(s),l=r(5),c=r.n(l),p=r(6),f=r.n(p),d=r(7),v=r.n(d),w=r(8),b=r(0),h=r.n(b),y=r(9),x=r.n(y),g=r(1),O=r(10),_=r.n(O);function j(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function U(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var P=function(e){var t,r;function o(){for(var t,r=arguments.length,o=new Array(r),n=0;n<r;n++)o[n]=arguments[n];return U(j(t=e.call.apply(e,[this].concat(o))||this),"visitedAt",h.a.attribute("visited_at",h.a.transformDate)),U(j(t),"viewer",h.a.hasOne("viewer")),U(j(t),"viewedUser",h.a.hasOne("viewedUser")),t}return r=e,(t=o).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r,o}(h.a);app.initializers.add("michaelbelgium-profile-views",(function(){app.store.models.userprofileview=P,n.a.prototype.profileViews=h.a.hasMany("profileViews"),n.a.prototype.latestProfileViews=h.a.hasMany("latestProfileViews"),Object(g.extend)(u.a.prototype,"infoItems",(function(e){var t=this.attrs.user,r=!1===t.profileViews()?0:t.profileViews().length;e.add("profile-views",m("span",null,f()("far fa-eye")," ",app.translator.transChoice("michaelbelgium-flarum-profile-views.forum.user.view_count_text",r,{viewcount:""+r})))})),Object(g.extend)(a.a.prototype,"sidebarItems",(function(e){var t=new x.a,r=this.user.latestProfileViews();$.each(r,(function(e,r){var o=!1===r.viewer()?"Guest":Object(w.ucfirst)(r.viewer().username()),n=m("div",{className:"item-lastUser-content"},v()(!1===r.viewer()?null:r.viewer()),m("div",null,o,m("span",{className:"lastUser-visited",title:r.visitedAt().toLocaleString()},_()(r.visitedAt()))));r.viewer()&&(n=m("a",{href:app.forum.attribute("baseUrl")+"/u/"+o},n)),t.add("lastUser-"+e,n)})),e.add("lastViewedUsers",c.a.component({label:app.translator.trans("michaelbelgium-flarum-profile-views.forum.user.last_viewers_heading"),className:"LastUsers"},t.toArray()))})),Object(g.extend)(a.a.prototype,"show",(function(){app.request({method:"POST",url:app.forum.attribute("apiUrl")+"/profileview",body:{viewer:void 0===app.session.user?null:app.session.user.id(),viewedUser:this.user.id()}})}))}))}]);
//# sourceMappingURL=forum.js.map