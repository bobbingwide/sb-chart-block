(window["sb-chart-block"]=window["sb-chart-block"]||[]).push([[1],{13:function(e,t,n){}}]),function(e){function t(t){for(var r,c,a=t[0],i=t[1],s=t[2],b=0,h=[];b<a.length;b++)c=a[b],Object.prototype.hasOwnProperty.call(o,c)&&o[c]&&h.push(o[c][0]),o[c]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);for(u&&u(t);h.length;)h.shift()();return l.push.apply(l,s||[]),n()}function n(){for(var e,t=0;t<l.length;t++){for(var n=l[t],r=!0,a=1;a<n.length;a++){var i=n[a];0!==o[i]&&(r=!1)}r&&(l.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={0:0},l=[];function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var a=window["sb-chart-block"]=window["sb-chart-block"]||[],i=a.push.bind(a);a.push=t,a=a.slice();for(var s=0;s<a.length;s++)t(a[s]);var u=i;l.push([20,1]),n()}([function(e,t){e.exports=window.wp.element},function(e,t){e.exports=window.wp.i18n},function(e,t){e.exports=window.wp.components},function(e,t){e.exports=window.lodash},function(e,t){e.exports=window.wp.blockEditor},function(e){e.exports=JSON.parse('{"Chart":[{"color":"#F78DA7","slug":"pale-pink"},{"color":"#FF6384","slug":"darker-pink"},{"color":"#36A2EB","slug":"bluey"},{"color":"#FFCE56","slug":"goldish"},{"color":"#4BC0C0","slug":"turquoise"},{"color":"#9966FF","slug":"purpley"},{"color":"#FF9F40","slug":"goldie"}],"Gutenberg":[{"color":"#F78DA7","slug":"pale-pink"},{"color":"#CF2E2E","slug":"vivid-red"},{"color":"#FF6900","slug":"luminous-vivid-orange"},{"color":"#FCB900","slug":"luminous-vivid-amber"},{"color":"#7BDCB5","slug":"light-green-cyan"},{"color":"#00D084","slug":"vivid-green-cyan"},{"color":"#8ED1FC","slug":"pale-cyan-blue"},{"color":"#0693E3","slug":"vivid-cyan-blue"},{"color":"#9B51E0","slug":"vivid-purple"},{"color":"#ABB8C3","slug":"cyan-bluish-gray"},{"color":"#313131","slug":"very-dark-gray"},{"color":"#EEEE00","slug":"yellowish-grey"}],"Visualizer":[{"color":"#3366CC"},{"color":"#DC3912"},{"color":"#FF9900"},{"color":"#109618"},{"color":"#990099"},{"color":"#0099C6"},{"color":"#DD4477"},{"color":"#66AA00"},{"color":"#B82E2E"},{"color":"#316395"},{"color":"#994499"},{"color":"#22AA99"},{"color":"#AAAA11"},{"color":"#6633CC"}],"Tertiary":[{"color":"#F1E70D"},{"color":"#E42426"},{"color":"#2072B2"},{"color":"#FDC70F"},{"color":"#C31A7F"},{"color":"#1D96BB"},{"color":"#F28F1F"},{"color":"#6E398D"},{"color":"#0A905D"},{"color":"#EC6224"},{"color":"#424F9B"},{"color":"#8CBD3F"}]}')},function(e,t){e.exports=window.wp.primitives},function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}},function(e,t){e.exports=window.wp.blocks},function(e,t){e.exports=window.wp.compose},function(e,t,n){var r=n(16),o=n(17),l=n(18),c=n(19);e.exports=function(e){return r(e)||o(e)||l(e)||c()}},function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t){function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}e.exports=function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}},,function(e,t){e.exports=window.wp.editor},function(e,t,n){},function(e,t,n){var r=n(7);e.exports=function(e){if(Array.isArray(e))return r(e)}},function(e,t){e.exports=function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},function(e,t,n){var r=n(7);e.exports=function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},function(e,t,n){"use strict";n.r(t);var r=n(8),o=n(1),l=(n(13),n(0)),c=(n(14),n(4)),a=n(2),i=n(3),s=n(9),u=(n(15),n(10)),b=n.n(u),h=n(11),p=n.n(h),f=n(12),d=n.n(f),g=n(5);function y(e){return g[e].map((function(e){return e.color}))}function v(e,t){var n=y(t);return n[(e-1)%n.length]}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var O=n(3),j=function(){function e(){p()(this,e),console.log("constructor"),this.datasets=[],this.labels=[]}return d()(e,[{key:"setStuff",value:function(e){this.setLines(e.content),this.theme=e.theme,this.attributes=e,console.log(this.attributes)}},{key:"setLines",value:function(e){console.log(e),this.lines=e.split("\n"),console.log(this.lines),this.labels=this.lines.shift(),this.labels=this.labels.split(","),this.asMatrix(this.lines),this.series=this.transpose(this.matrix),console.log(this.series)}},{key:"asMatrix",value:function(e){this.matrix=[];var t,n=function(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return m(e,void 0);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,void 0):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var l,c=!0,a=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return c=e.done,e},e:function(e){a=!0,l=e},f:function(){try{c||null==n.return||n.return()}finally{if(a)throw l}}}}(e);try{for(n.s();!(t=n.n()).done;){var r=t.value;this.matrix.push(r.split(","))}}catch(e){n.e(e)}finally{n.f()}}},{key:"transpose",value:function(e){return O.zip.apply(O,b()(e))}},{key:"getLegend",value:function(e){return this.labels[e]}},{key:"getDataset",value:function(e){var t=new Object({});return t.label=this.getLegend(e),t.data=this.series[e],"pie"===this.attributes.type?t.backgroundColor=y(this.theme):(t.backgroundColor=v(e,this.theme),t.borderColor=function(e,t){return v(e,t)}(e,this.theme)),t.borderWidth=1,t.fill=this.attributes.fill,t}},{key:"getDatasets",value:function(){for(var e=[],t=1;t<this.series.length;t++)e.push(this.getDataset(t));return console.log(e),e}},{key:"getLabels",value:function(){return this.series[0]}},{key:"getOptions",value:function(){var e=new Object({});if(e.maintainAspectRatio=!1,"pie"==this.attributes.type)return e;e.scales=new Object({}),e.scales.yAxes=[],e.scales.xAxes=[];var t=this.attributes.beginYAxisAt0,n=new Object({ticks:{beginAtZero:t}});return e.scales.yAxes.push(n),this.attributes.stacked&&(e.scales.yAxes[0].stacked=!0,e.scales.xAxes.push({stacked:!0})),e}},{key:"showChart",value:function(e,t,n,r){var o=null;Chart.helpers.each(Chart.instances,(function(t){t.ctx===e&&(o=t)})),o&&o.destroy(),o=new Chart(e,{type:t,data:n,options:r})}},{key:"runChart",value:function(e){var t=document.getElementById(e.myChartId);if(t){this.setStuff(e),t=t.getContext("2d");var n={labels:this.getLabels(),datasets:this.getDatasets()},r=this.getOptions();return this.showChart(t,e.type,n,r)}}}]),e}(),w=n(6),C=Object(l.createElement)(w.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"-2 -2 24 24"},Object(l.createElement)(w.Path,{d:"M18 3.5c0 .62-.38 1.16-.92 1.38v13.11H1.99l4.22-6.73c-.13-.23-.21-.48-.21-.76C6 9.67 6.67 9 7.5 9S9 9.67 9 10.5c0 .13-.02.25-.05.37l1.44.63c.27-.3.67-.5 1.11-.5.18 0 .35.04.51.09l3.58-6.41c-.36-.27-.59-.7-.59-1.18 0-.83.67-1.5 1.5-1.5.19 0 .36.04.53.1l.05-.09v.11c.54.22.92.76.92 1.38zm-1.92 13.49V5.85l-3.29 5.89c.13.23.21.48.21.76 0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5l.01-.07-1.63-.72c-.25.18-.55.29-.88.29-.18 0-.35-.04-.51-.1l-3.2 5.09h12.29z"})),k=Object(l.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(l.createElement)(a.Path,{fillRule:"evenodd",d:"m3 18v-11h3v11v0h-3m5 0v-9h3v9h-3m5 0v-13v0h3v13h-3",clipRule:"evenodd"})),_=Object(l.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(l.createElement)(a.Path,{fillRule:"evenodd",d:"M2 3H12V6H2H2V3M2 8H10V11H2V8M2 13H15V16H2V13"})),x=Object(l.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(l.createElement)(a.Path,{d:"M 9.5626743,8.46667 H 18.029337 A 8.4263424,8.4666865 0 0 0 9.6029683,0 8.4263424,8.4666865 0 0 0 9.5626783, 1.0700004e-4 Z M 8.4716429,1.0583348 A 8.4666704,8.4666723 0 0 0 1.4954554e-6, 9.5199618 8.4666704,8.4666723 0 0 0 8.4616259,17.991664 8.4666704,8.4666723 0 0 0 16.933333,9.5299798 a 8.4666704, 8.4666723 0 0 0 -8.7e-5,-0.04049 l -8.4665871,-0.005 z"})),E=[{icon:C,title:Object(o.__)("Line chart"),type:"line"},{icon:k,title:Object(o.__)("Bar chart"),type:"bar"},{icon:_,title:Object(o.__)("Horizontal bar chart","sb-chart-block"),type:"horizontalBar"},{icon:x,title:Object(o.__)("Pie chart"),type:"pie"}],A={position:"bottom right",isAlternate:!0};function B(e){var t=e.value,n=e.onChange,r=e.typeControls,c=void 0===r?E:r,s=e.label,u=void 0===s?Object(o.__)("Chart type"):s,b=e.describedBy,h=void 0===b?Object(o.__)("Change chart type"):b,p=e.isCollapsed,f=void 0===p||p;function d(e){return console.log(e),function(){return n(e)}}var g=Object(i.find)(c,(function(e){return e.type===t})),y=[{icon:C,title:Object(o.__)("Line chart"),isActive:"line"===t,onClick:d("line")},{icon:k,title:Object(o.__)("Bar chart"),isActive:"bar"===t,onClick:d("bar")},{icon:_,title:Object(o.__)("Horizontal bar chart"),isActive:"horizontalBar"===t,onClick:d("horizontalBar")},{icon:x,title:Object(o.__)("Pie chart"),isActive:"pie"===t,onClick:d("pie")}];return Object(l.createElement)(a.ToolbarGroup,{isCollapsed:f,icon:function(){if(g)return g.icon}(),label:u,toggleProps:{describedBy:h},popoverProps:A,controls:y})}var S=Object(s.withInstanceId)((function(e){var t=e.attributes,n=(e.className,e.isSelected,e.setAttributes),r=e.instanceId,s="myChart-".concat(r);n({myChartId:s});var u=function(e){n({type:e})},b=Object(o.__)("Choose Line, Bar, Horizontal bar or Pie.","sb-chart-block"),h={line:Object(o.__)("Line chart","sb-chart-block"),bar:Object(o.__)("Bar chart","sb-chart-block"),horizontalBar:Object(o.__)("Horizontal bar chart","sb-chart-block"),pie:Object(o.__)("Pie chart","sb-chart-block")},p=Object.getOwnPropertyNames(g).map((function(e){return{value:e,label:e}})),f=Object(i.map)(h,(function(e,t){return{value:t,label:e}}));return Object(l.useEffect)((function(){t.content&&(new j).runChart(t)})),Object(l.createElement)(l.Fragment,null,Object(l.createElement)(c.BlockControls,null,Object(l.createElement)(B,{value:t.type,onChange:u}),!1),Object(l.createElement)(c.InspectorControls,null,Object(l.createElement)(a.PanelBody,null,Object(l.createElement)(a.SelectControl,{label:Object(o.__)("Type","sb-chart-block"),value:t.type,onChange:u,options:f,help:b}),Object(l.createElement)(a.PanelRow,null,Object(l.createElement)(a.ToggleControl,{label:Object(o.__)("Stacked","sb-chart-block"),checked:!!t.stacked,onChange:function(e){n({stacked:!t.stacked})}})),Object(l.createElement)(a.PanelRow,null,Object(l.createElement)(a.ToggleControl,{label:Object(o.__)("Begin Y-axis at 0","sb-chart-block"),checked:!!t.beginYAxisAt0,onChange:function(e){n({beginYAxisAt0:!t.beginYAxisAt0})}})),Object(l.createElement)(a.PanelRow,null,Object(l.createElement)(a.ToggleControl,{label:Object(o.__)("Fill","sb-chart-block"),checked:!!t.fill,onChange:function(e){n({fill:!t.fill})}}))),Object(l.createElement)(a.PanelBody,null,Object(l.createElement)(a.SelectControl,{label:Object(o.__)("Theme","sb-chart-block"),value:t.theme,onChange:function(e){n({theme:e})},options:p})),Object(l.createElement)(a.PanelBody,null,Object(l.createElement)(a.PanelRow,null,Object(l.createElement)(a.RangeControl,{label:Object(o.__)("Height (pixels)","sb-chart-block"),value:t.height,initialPosition:450,onChange:function(e){n({height:e})},min:100,max:1e3,allowReset:!0})))),Object(l.createElement)("div",{className:"wp-block-oik-sb-chart"},t.content&&Object(l.createElement)("div",{className:"chartjs",style:{height:t.height}},Object(l.createElement)("canvas",{id:t.myChartId,height:"450px"})),Object(l.createElement)(c.PlainText,{value:t.content,placeholder:Object(o.__)("Enter Chart data in CSV format"),onChange:function(e){e=e.replace(/<br>/g,"\n"),n({content:e})}}),!1))}));Object(r.registerBlockType)("oik-sb/chart",{title:Object(o.__)("Chart","sb-chart-block"),description:Object(o.__)("Displays a chart for CSV content.","sb-chart-block"),category:"widgets",icon:"chart-line",keywords:[Object(o.__)("Chart","sb-chart-block"),Object(o.__)("Line","sb-chart-block"),Object(o.__)("Bar","sb-chart-block"),Object(o.__)("Horizontal bar","sb-chart-block"),Object(o.__)("Pie","sb-chart-block")],supports:{html:!1,align:!1},attributes:{type:{type:"string",default:"line"},content:{type:"string",default:""},theme:{type:"string",default:"Gutenberg"},myChartId:{type:"string",default:"myChart-"},stacked:{type:"boolean",default:!1},fill:{type:"boolean",default:!1},height:{type:"integer",default:null},beginYAxisAt0:{type:"boolean",default:!1}},example:{attributes:{type:"pie",content:Object(o.__)("Label,Value\nOne,1\nTwo,2\nThree,3","sb-chart-block"),myChartId:"myChartExample"}},edit:S,save:function(e){var t=e.attributes;return console.log("Save()"),console.log(t.height),Object(l.createElement)("div",{className:"chartjs",style:{height:t.height}},Object(l.createElement)("canvas",{id:t.myChartId}))}})}]);