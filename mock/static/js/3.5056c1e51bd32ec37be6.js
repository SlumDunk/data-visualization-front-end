webpackJsonp([3],{Cdx3:function(e,o,t){var n=t("sB3e"),a=t("lktj");t("uqUo")("keys",function(){return function(e){return a(n(e))}})},Qmna:function(e,o){},fZjL:function(e,o,t){e.exports={default:t("jFbC"),__esModule:!0}},jFbC:function(e,o,t){t("Cdx3"),e.exports=t("FeBl").Object.keys},uqUo:function(e,o,t){var n=t("kM2E"),a=t("FeBl"),r=t("S82l");e.exports=function(e,o){var t=(a.Object||{})[e]||Object[e],i={};i[e]=o(t),n(n.S+n.F*r(function(){t(1)}),"Object",i)}},wHgX:function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=t("Xxa5"),a=t.n(n),r=t("fZjL"),i=t.n(r),u=t("exGp"),s=t.n(u),c=t("UeVD"),b=t("gyMJ"),l={name:"Detail",computed:{bid:function(){return this.$route.params.bid}},created:function(){this.getData()},methods:{getData:function(){var e=this;return s()(a.a.mark(function o(){return a.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Object(b.b)(e.bid);case 2:e.book=o.sent,i()(e.book).length>0||e.$router.push("/list");case 4:case"end":return o.stop()}},o,e)}))()},update:function(){var e=this;return s()(a.a.mark(function o(){return a.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Object(b.f)(e.bid,e.book);case 2:e.$router.push("/list");case 3:case"end":return o.stop()}},o,e)}))()}},data:function(){return{book:{}}},components:{MHeader:c.a},watch:{$route:function(){this.getData()}}},f={render:function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",{staticClass:"detail"},[t("MHeader",{attrs:{back:!0}},[e._v("详情")]),e._v(" "),t("div",[t("ul",[t("li",[t("label",{attrs:{for:"bookName"}},[e._v("书的名称")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.book.bookName,expression:"book.bookName"}],attrs:{type:"text",id:"bookName"},domProps:{value:e.book.bookName},on:{input:function(o){o.target.composing||e.$set(e.book,"bookName",o.target.value)}}})]),e._v(" "),t("li",[t("label",{attrs:{for:"bookInfo"}},[e._v("书的信息")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.book.bookInfo,expression:"book.bookInfo"}],attrs:{type:"text",id:"bookInfo"},domProps:{value:e.book.bookInfo},on:{input:function(o){o.target.composing||e.$set(e.book,"bookInfo",o.target.value)}}})]),e._v(" "),t("li",[t("label",{attrs:{for:"bookPrice"}},[e._v("书的价格")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.book.bookPrice,expression:"book.bookPrice"}],attrs:{type:"number",id:"bookPrice"},domProps:{value:e.book.bookPrice},on:{input:function(o){o.target.composing||e.$set(e.book,"bookPrice",o.target.value)}}})]),e._v(" "),t("li",[t("button",{on:{click:e.update}},[e._v("确认修改")])])])])],1)},staticRenderFns:[]};var k=t("VU/8")(l,f,!1,function(e){t("Qmna")},"data-v-4b396104",null);o.default=k.exports}});
//# sourceMappingURL=3.5056c1e51bd32ec37be6.js.map