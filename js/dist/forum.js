module.exports=function(e){var r={};function t(o){if(r[o])return r[o].exports;var n=r[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,t),n.l=!0,n.exports}return t.m=e,t.c=r,t.d=function(e,r,o){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)t.d(o,n,function(r){return e[r]}.bind(null,n));return o},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=11)}([function(e,r){e.exports=flarum.core.compat.Model},function(e,r){e.exports=flarum.core.compat.extend},function(e,r){e.exports=flarum.core.compat["components/UserPage"]},function(e,r){e.exports=flarum.core.compat["models/User"]},function(e,r){e.exports=flarum.core.compat["components/UserCard"]},function(e,r){e.exports=flarum.core.compat["components/FieldSet"]},function(e,r){e.exports=flarum.core.compat["helpers/icon"]},function(e,r){e.exports=flarum.core.compat["helpers/avatar"]},function(e,r){e.exports=flarum.core.compat["helpers/username"]},function(e,r){e.exports=flarum.core.compat["utils/ItemList"]},function(e,r){e.exports=flarum.core.compat["utils/humanTime"]},function(e,r,t){"use strict";t.r(r);var o=t(3),n=t.n(o),a=t(2),i=t.n(a),s=t(4),u=t.n(s),p=t(5),c=t.n(p),l=t(6),f=t.n(l),d=t(7),v=t.n(d),w=t(8),b=t.n(w),h=t(0),y=t.n(h),x=t(9),_=t.n(x),O=t(1);t(10);function j(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function U(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var g=function(e){var r,t;function o(){for(var r,t=arguments.length,o=new Array(t),n=0;n<t;n++)o[n]=arguments[n];return U(j(j(r=e.call.apply(e,[this].concat(o))||this)),"visitedAt",y.a.attribute("visited_at",y.a.transformDate)),U(j(j(r)),"viewer",y.a.hasOne("viewer")),U(j(j(r)),"viewedUser",y.a.hasOne("viewedUser")),r}return t=e,(r=o).prototype=Object.create(t.prototype),r.prototype.constructor=r,r.__proto__=t,o}(y.a);app.initializers.add("michaelbelgium-flarum-profile-views",function(){app.store.models.userprofileview=g,n.a.prototype.profileViews=y.a.hasMany("profileViews"),Object(O.extend)(u.a.prototype,"infoItems",function(e){var r=this.props.user;e.add("profile-views",m("span",null,f()("far fa-eye")," ",app.translator.trans("flarum_profile_views.forum.user.views_count_text",{viewcount:""+r.profileViews().length})))}),Object(O.extend)(i.a.prototype,"sidebarItems",function(e){var r=new _.a;$.each(this.user.profileViews(),function(e,t){r.add("lastUser-"+t.viewer().id(),m("a",{href:app.forum.attribute("baseUrl")+"/u/"+t.viewer().username()},v()(t.viewer(),{className:"lastUser-avatar"}),b()(t.viewer())))}),e.add("lastViewedUsers",c.a.component({label:app.translator.trans("flarum_profile_views.forum.user.title_last_viewers"),className:"LastUsers",children:r.toArray()}))}),Object(O.extend)(i.a.prototype,"show",function(){void 0!==app.session.user&&app.session.user.id()!==this.user.id()&&app.request({method:"POST",url:app.forum.attribute("apiUrl")+"/profileview",data:{viewer:app.session.user.id(),viewedUser:this.user.id()}})})})}]);
//# sourceMappingURL=forum.js.map