(this.webpackJsonpswap=this.webpackJsonpswap||[]).push([[0],{12:function(a,t,n){},14:function(a,t,n){},15:function(a,t,n){},17:function(a,t,n){"use strict";n.r(t);var e=n(3),o=n.n(e),r=n(7),c=n.n(r),s=(n(12),n(2)),d=n.n(s),l=n(5),i=(n(14),n(15),n(0)),f=n(4),u=n.n(f),p=n(1);var b=function(){var a,t,n,o,r,c=0,s=!1,f=[];function b(){return Math.floor(6*Math.random())}function h(a){a.preventDefault(),s||(o=i(a.currentTarget).addClass("active"))}function y(t){if(t.preventDefault(),o){var n=t.pageX,e=t.pageY;if(!n&&!e){var c=t.originalEvent,s=c.touches,d=c.pageX,l=c.pageY;s?(n=s[0].pageX,e=s[0].pageY):(n=d,e=l)}var i=n-a/2,f=e-a/2,u=function(t,n){var e=r,o=e.left,c=e.top,s=t-o,d=n-c;s=Math.floor(s/a),d=Math.floor(d/a),s>=6&&(s=5);s<0&&(s=0);d>=5&&(d=4);d<0&&(d=0);return{x:s,y:d}}(n,e);M(o.attr("data-x"),o.attr("data-y"),u.x,u.y),o.css({left:i,top:f})}}function v(t){if(o){var n=r,e=n.left,d=n.top;o.removeClass("active").css({left:o.attr("data-x")*a+e,top:o.attr("data-y")*a+d}),o=null,c=0,s=!0,k()}}function k(){for(var a=[],t=0,n=0;n<6;n++)a[n]=[];for(var e=0;e<6;e++)for(var o=0;o<5;o++)o<3&&f[e][o]===f[e][o+1]&&f[e][o]===f[e][o+2]&&(t++,a[e][o]=f[e][o]+" blank",a[e][o+1]=f[e][o]+" blank",a[e][o+2]=f[e][o]+" blank",i("[data-x="+e+"][data-y="+o+"]").addClass("blank"),i("[data-x="+e+"][data-y="+(o+1)+"]").addClass("blank"),i("[data-x="+e+"][data-y="+(o+2)+"]").addClass("blank")),e<4&&f[e][o]===f[e+1][o]&&f[e][o]===f[e+2][o]&&(t++,a[e][o]=f[e][o]+" blank",a[e+1][o]=f[e][o]+" blank",a[e+2][o]=f[e][o]+" blank",i("[data-x="+e+"][data-y="+o+"]").addClass("blank"),i("[data-x="+(e+1)+"][data-y="+o+"]").addClass("blank"),i("[data-x="+(e+2)+"][data-y="+o+"]").addClass("blank")),a[e][o]||(a[e][o]=f[e][o]);f=a,t>0?x(!1):(i(".combo").hide(),s=!1)}function x(a){return m.apply(this,arguments)}function m(){return(m=Object(l.a)(d.a.mark((function a(t){var n,e,o;return d.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(!t){a.next=6;break}return++c>2&&i(".combo").text("Combo "+c+"!").show(),a.next=5,u()(300);case 5:i(".block.flash").attr("class","block");case 6:return a.next=8,u()(t?200:0);case 8:i(".block.blank").length>0?(n=i(i(".block.blank")[0]),e=parseInt(n.attr("data-x")),o=parseInt(n.attr("data-y")),O(e,o,f[e][o],!0)):g();case 10:case"end":return a.stop()}}),a)})))).apply(this,arguments)}function g(){return C.apply(this,arguments)}function C(){return(C=Object(l.a)(d.a.mark((function a(){var t,n,e;return d.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:for(t=!1,n=0;n<6;n++)for(e=5;e>=0;e--)"blank"===f[n][e]&&e>0&&"blank"!==f[n][e-1]&&(M(n,e,n,e-1),t=!0);if(!t){a.next=8;break}return a.next=5,u()(50);case 5:g(),a.next=11;break;case 8:return a.next=10,u()(50);case 10:j();case 11:case"end":return a.stop()}}),a)})))).apply(this,arguments)}function j(){return w.apply(this,arguments)}function w(){return(w=Object(l.a)(d.a.mark((function t(){var n,e,o;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(n=!1,e=0;e<6;e++)"blank"===f[e][0]&&(o=b(),f[e][0]=o,i("[data-x="+e+"][data-y=0]").css({top:-a+r.top,opacity:0}).addClass("elem-"+o),n=!0);if(!n){t.next=9;break}return t.next=5,u()(50);case 5:i("[data-y=0]").css({top:r.top,opacity:1}),g(),t.next=10;break;case 9:k();case 10:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function O(a,t,n,e){if(!(a<0||a>=6||t<0||t>=5||f[a][t]!==n)){var o=i("[data-x="+a+"][data-y="+t+"]");o.hasClass("blank")&&(f[a][t]="blank",o.removeClass("blank").addClass("flash"),O(a,t+1,n,!1),O(a,t-1,n,!1),O(a-1,t,n,!1),O(a+1,t,n,!1)),e&&x(!0)}}function M(t,n,e,o){if(t!==e||n!==o){var c=f[t][n],s=f[e][o];f[t][n]=s,f[e][o]=c;var d=i("[data-x="+t+"][data-y="+n+"]"),l=i("[data-x="+e+"][data-y="+o+"]");d.attr("data-x",e).attr("data-y",o),l.attr("data-x",t).attr("data-y",n),l.css({left:t*a+r.left,top:n*a+r.top}),d.css({left:e*a+r.left,top:o*a+r.top})}}return Object(e.useEffect)((function(){return function(){for(var a=0;a<6;a++){f[a]=[];for(var t=0;t<5;t++)f[a][t]=b()}}(),function(){var e=i("body").width()/6,o=i("body").height()/5;a=Math.floor(Math.min(e,o)),t=6*a,n=5*a,i(".play-area").css({width:t,height:n});for(var c=r=i(".play-area").offset(),s=c.left,d=c.top,l=0;l<6;l++)for(var u=0;u<5;u++){var p=i('<div class="block" data-x="'.concat(l,'" data-y="').concat(u,'" />')),b="elem-".concat(f[l][u]);p.css({left:l*a+s,top:u*a+d,width:a,height:a}).addClass(b),i(".play-area").append(p)}i(".combo").css({fontSize:.6*a}).hide()}(),i("body").on("mousedown",".block",h),i("body").on("mousemove",y),i("body").on("mouseup",v),i("body").on("touchstart",".block",h),i("body").on("touchmove",y),i("body").on("touchend",v),i("body").on("pointerdown",".block",h),i("body").on("pointermove",y),i("body").on("pointerup",v),function(){}}),[]),Object(p.jsx)("div",{className:"app",children:Object(p.jsxs)("div",{className:"container",children:[Object(p.jsx)("div",{className:"play-area"}),Object(p.jsx)("div",{className:"combo"})]})})},h=function(a){a&&a instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(t){var n=t.getCLS,e=t.getFID,o=t.getFCP,r=t.getLCP,c=t.getTTFB;n(a),e(a),o(a),r(a),c(a)}))};c.a.render(Object(p.jsx)(o.a.StrictMode,{children:Object(p.jsx)(b,{})}),document.getElementById("root")),h()}},[[17,1,2]]]);
//# sourceMappingURL=main.2a614988.chunk.js.map