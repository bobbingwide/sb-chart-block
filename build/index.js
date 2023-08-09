(()=>{"use strict";var e,t={443:(e,t,o)=>{const r=window.wp.element,l=window.wp.blocks,a=window.wp.i18n,n=window.wp.blockEditor,s=window.wp.components;var i=o(819);const c=window.wp.compose,h=JSON.parse('{"Chart":[{"color":"#FF6384","slug":"darker-pink"},{"color":"#36A2EB","slug":"bluey"},{"color":"#FFCE56","slug":"goldish"},{"color":"#F78DA7","slug":"pale-pink"},{"color":"#4BC0C0","slug":"turquoise"},{"color":"#9966FF","slug":"purpley"},{"color":"#FF9F40","slug":"goldie"},{"color":"#2271b1"},{"color":"#646970"},{"color":"#d63638"},{"color":"996800"},{"color":"#008a20"}],"Gutenberg":[{"color":"#F78DA7","slug":"pale-pink"},{"color":"#CF2E2E","slug":"vivid-red"},{"color":"#FF6900","slug":"luminous-vivid-orange"},{"color":"#FCB900","slug":"luminous-vivid-amber"},{"color":"#7BDCB5","slug":"light-green-cyan"},{"color":"#00D084","slug":"vivid-green-cyan"},{"color":"#8ED1FC","slug":"pale-cyan-blue"},{"color":"#0693E3","slug":"vivid-cyan-blue"},{"color":"#9B51E0","slug":"vivid-purple"},{"color":"#ABB8C3","slug":"cyan-bluish-gray"},{"color":"#313131","slug":"very-dark-gray"},{"color":"#EEEE00","slug":"yellowish-grey"}],"Visualizer":[{"color":"#3366CC"},{"color":"#DC3912"},{"color":"#FF9900"},{"color":"#109618"},{"color":"#990099"},{"color":"#0099C6"},{"color":"#DD4477"},{"color":"#66AA00"},{"color":"#B82E2E"},{"color":"#316395"},{"color":"#994499"},{"color":"#22AA99"},{"color":"#AAAA11"},{"color":"#6633CC"}],"Tertiary":[{"color":"#F1E70D"},{"color":"#E42426"},{"color":"#2072B2"},{"color":"#FDC70F"},{"color":"#C31A7F"},{"color":"#1D96BB"},{"color":"#F28F1F"},{"color":"#6E398D"},{"color":"#0A905D"},{"color":"#EC6224"},{"color":"#424F9B"},{"color":"#8CBD3F"}],"WordPress":[{"color":"#4f94d4"},{"color":"#8c8f94"},{"color":"#f86368"},{"color":"#dba617"},{"color":"#00ba37"},{"color":"#2271b1"},{"color":"#646970"},{"color":"#d63638"},{"color":"996800"},{"color":"#008a20"},{"color":"#0a4b78"},{"color":"#3c434a"},{"color":"#8a2424"},{"color":"#614200"},{"color":"#005c12"}],"Rainbow":[{"color":"#ee82ee"},{"color":"#4b0082"},{"color":"#0000ff"},{"color":"#008000"},{"color":"#ffff00"},{"color":"#ffa500"},{"color":"#ff0000"}]}');function b(e="",t=1){return`rgba(${parseInt(e.slice(1,3),16)}, ${parseInt(e.slice(3,5),16)}, ${parseInt(e.slice(5,7),16)}, ${t})`}function u(e){return m(e)[0]}function g(e,t,o){var r=u(o),l=function(e,t){return h[e].map((e=>(console.log(e.color),b(e.color,t))))}(e,t);if(console.log(r),void 0===r)return l;for(var a=0;a<l.length;a++){var n=r[a];if(console.log("bgColor:"+n+":"),void 0!==n&&""!==n){var s=b(n,t);l[a]=s}}return l}function d(e,t,o,r){const l=g(t,o,r);return l[(e-1)%l.length]}function m(e){var t=[],o=!1;if(void 0===e)return t;for(var r=0,l=0,a=0;a<e.length;a++){var n=e[a],s=e[a+1];t[r]=t[r]||[],t[r][l]=t[r][l]||"",'"'==n&&o&&'"'==s?(t[r][l]+=n,++a):'"'!=n?","!=n||o?"\r"!=n||"\n"!=s||o?"\n"==n&&!o||"\r"==n&&!o?(++r,l=0):t[r][l]+=n:(++r,l=0,++a):++l:o=!o}return t}const p=o(819);class v{constructor(){console.log("constructor"),this.datasets=[],this.labels=[]}setStuff(e){this.setLines(e.content),this.theme=e.theme,this.attributes=e,console.log(this.attributes)}setLines(e){console.log(e),this.lines=e.split("\n"),console.log(this.lines),this.labels=this.lines.shift(),this.labels=m(this.labels),this.labels=this.labels[0],this.asMatrix(this.lines.join("\n")),this.series=this.transpose(this.matrix),console.log(this.series)}asMatrix(e){this.matrix=m(e)}transpose(e){return p.zip(...e)}getLegend(e){var t=this.labels[e];return void 0!==t&&(t=t.trim()),t}getDataset(e){var t=new Object({});return t.label=this.getLegend(e),t.data=this.series[e].map((e=>void 0===e||0===e.trim().length?void 0:e.trim())),"pie"===this.attributes.type?t.backgroundColor=g(this.theme,this.attributes.opacity,this.attributes.backgroundColors):(t.backgroundColor=d(e,this.theme,this.attributes.opacity,this.attributes.backgroundColors),t.borderColor=function(e,t,o,r,l){var a=u(r),n=function(e){return m(e)[0]}(l),s=function(e,t){if(void 0===t)return e;if(void 0===e)return t;for(var o=0;o<Math.max(e.length,t.length);o++){var r=t[o];void 0!==r&&""!==r&&(e[o]=r)}return e}(a,n);return d(e,t,o,void 0===s?"":s.join())}(e,this.theme,this.attributes.opacity,this.attributes.backgroundColors,this.attributes.borderColors)),t.borderWidth=1,t.fill=this.attributes.fill,this.attributes.barThickness&&(t.barThickness=this.attributes.barThickness),t.tension=this.attributes.tension,t.yAxisID=this.getyAxisID(e,this.attributes.yAxes),t}getDatasets(){var e=[];for(let t=1;t<this.series.length;t++)e.push(this.getDataset(t));return console.log(e),e}getLabels(){return this.series[0].map((e=>void 0===e||0===e.trim().length?void 0:e.trim()))}getOptions(){var e=new Object({});if(e.maintainAspectRatio=!1,e.plugins=new Object({legend:{labels:{font:{size:12}}}}),e.plugins.legend.labels.font.size=this.attributes.labelsFontSize,"pie"==this.attributes.type)return e;e.scales=new Object({});var t=this.attributes.beginYAxisAt0,o=this.getAxisTimeOptions();return e.scales.y=new Object({}),e.scales.x=new Object({}),"horizontalBar"===this.attributes.type?(e.indexAxis="y",e.scales.y=o):e.scales.x=o,e.scales.y.beginAtZero=t,e.scales.y.stacked=this.attributes.stacked,e.scales.x.stacked=this.attributes.stacked,e.scales.x.ticks=new Object({font:{size:this.attributes.xTicksFontSize}}),void 0!==this.attributes.yAxes&&this.attributes.yAxes.includes("y1")&&(e.scales.y1=new Object({}),e.scales.y1.beginAtZero=t,e.scales.y1.stacked=this.attributes.stacked,e.scales.y1.position="right"),e}getAxisTimeOptions(){var e=new Object({});return this.attributes.time&&(e.type="time",e.time=new Object({unit:this.attributes.timeunit,displayFormats:{minute:"dd MMM hh:mm",hour:"dd MMM hh:mm",day:"dd MMM"}})),e}getyAxisID(e,t){var o="y",r=m(t);return void 0!==r&&void 0!==(r=r[0])&&e-1 in r&&"y"!==(o=r[e-1])&&"y1"!==o&&(o="y"),o}showChart(e,t,o,r,l){var a=null;Chart.helpers.each(Chart.instances,(function(t){t.ctx===e&&(a=t)})),a&&a.destroy(),a=new Chart(e,{type:t,data:o,options:r})}runChart(e,t){var o=t.current;if(o){this.setStuff(e),o=o.getContext("2d");var r={labels:this.getLabels(),datasets:this.getDatasets()},l=this.getOptions(),a="horizontalBar"===e.type?"bar":e.type;return this.showChart(o,a,r,l,e)}console.log("No ctx for: "+e.myChartId)}}const y=(0,r.createElement)(s.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,r.createElement)(s.Path,{fillRule:"evenodd",d:"m3 18v-11h3v11v0h-3m5 0v-9h3v9h-3m5 0v-13v0h3v13h-3",clipRule:"evenodd"})),k=(0,r.createElement)(s.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,r.createElement)(s.Path,{fillRule:"evenodd",d:"M2 3H12V6H2H2V3M2 8H10V11H2V8M2 13H15V16H2V13"})),C=(0,r.createElement)(s.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,r.createElement)(s.Path,{d:"M 9.5626743,8.46667 H 18.029337 A 8.4263424,8.4666865 0 0 0 9.6029683,0 8.4263424,8.4666865 0 0 0 9.5626783,\r 1.0700004e-4 Z\r M 8.4716429,1.0583348 A 8.4666704,8.4666723 0 0 0 1.4954554e-6,\r 9.5199618 8.4666704,8.4666723 0 0 0 8.4616259,17.991664 8.4666704,8.4666723 0 0 0 16.933333,9.5299798 a 8.4666704,\r 8.4666723 0 0 0 -8.7e-5,-0.04049 l -8.4665871,-0.005 z"})),_=window.wp.primitives,f=(0,r.createElement)(_.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"-2 -2 24 24"},(0,r.createElement)(_.Path,{d:"M18 3.5c0 .62-.38 1.16-.92 1.38v13.11H1.99l4.22-6.73c-.13-.23-.21-.48-.21-.76C6 9.67 6.67 9 7.5 9S9 9.67 9 10.5c0 .13-.02.25-.05.37l1.44.63c.27-.3.67-.5 1.11-.5.18 0 .35.04.51.09l3.58-6.41c-.36-.27-.59-.7-.59-1.18 0-.83.67-1.5 1.5-1.5.19 0 .36.04.53.1l.05-.09v.11c.54.22.92.76.92 1.38zm-1.92 13.49V5.85l-3.29 5.89c.13.23.21.48.21.76 0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5l.01-.07-1.63-.72c-.25.18-.55.29-.88.29-.18 0-.35-.04-.51-.1l-3.2 5.09h12.29z"})),w=[{icon:f,title:(0,a.__)("Line chart","sb-chart-block"),type:"line"},{icon:y,title:(0,a.__)("Bar chart","sb-chart-block"),type:"bar"},{icon:k,title:(0,a.__)("Horizontal bar chart","sb-chart-block"),type:"horizontalBar"},{icon:C,title:(0,a.__)("Pie chart","sb-chart-block"),type:"pie"}],E={position:"bottom right",isAlternate:!0};function x(e){const{value:t,onChange:o,typeControls:l=w,label:n=(0,a.__)("Chart type","sb-chart-block"),describedBy:c=(0,a.__)("Change chart type","sb-chart-block"),isCollapsed:h=!0}=e;function b(e){return console.log(e),()=>o(e)}const u=(0,i.find)(l,(e=>e.type===t)),g=[{icon:f,title:(0,a.__)("Line chart","sb-chart-block"),isActive:"line"===t,onClick:b("line")},{icon:y,title:(0,a.__)("Bar chart","sb-chart-block"),isActive:"bar"===t,onClick:b("bar")},{icon:k,title:(0,a.__)("Horizontal bar chart","sb-chart-block"),isActive:"horizontalBar"===t,onClick:b("horizontalBar")},{icon:C,title:(0,a.__)("Pie chart","sb-chart-block"),isActive:"pie"===t,onClick:b("pie")}];return(0,r.createElement)(s.ToolbarGroup,{isCollapsed:h,icon:function(){if(u)return u.icon}(),label:n,toggleProps:{describedBy:c},popoverProps:E,controls:g})}const A=(0,c.withInstanceId)((function({attributes:e,className:t,isSelected:o,setAttributes:l,instanceId:c}){l({myChartId:`myChart-${c}`});const b=e=>{l({type:e})},u=(0,a.__)("Choose Line, Bar, Horizontal bar or Pie.","sb-chart-block"),g={line:(0,a.__)("Line chart","sb-chart-block"),bar:(0,a.__)("Bar chart","sb-chart-block"),horizontalBar:(0,a.__)("Horizontal bar chart","sb-chart-block"),pie:(0,a.__)("Pie chart","sb-chart-block")},d=Object.getOwnPropertyNames(h).map((e=>({value:e,label:e}))),m={year:(0,a.__)("Year","sb-chart-block"),quarter:(0,a.__)("Quarter","sb-chart-block"),month:(0,a.__)("Month","sb-chart-block"),week:(0,a.__)("Week","sb-chart-block"),day:(0,a.__)("Day","sb-chart-block"),hour:(0,a.__)("Hour","sb-chart-block"),minute:(0,a.__)("Minute","sb-chart-block"),second:(0,a.__)("Second","sb-chart-block"),millisecond:(0,a.__)("Millisecond","sb-chart-block")};var p=(0,i.map)(g,((e,t)=>({value:t,label:e}))),y=(0,i.map)(m,((e,t)=>({value:t,label:e})));const k=(0,r.useRef)(),C=e=>{console.log(e),l({error:e})};(0,r.useEffect)((()=>{if(e.content&&!e.error){var t=new v;try{t.runChart(e,k)}catch(e){C(e)}}}));var _=e.error?(()=>{if(e.time){var t=(new Date).toISOString();t=(t=t.replace("T"," ")).replace("Z","");var o=(0,a.__)("Error displaying chart. Please check your dates then choose Refresh, or change the Time unit.","sb-chart-block"),l=(0,a.__)("Expected date format: ccyy-mm-dd hh:mm:ss.ttt","sb-chart-block"),n=(0,a.__)("For example: ","sb-chart-block")+" "+t,s=(0,a.__)("Message: ","sb-chart-block")+" ";return(0,r.createElement)("p",null,o,(0,r.createElement)("br",null),l,(0,r.createElement)("br",null),n,(0,r.createElement)("br",null),s," ",e.error.message)}return console.log(e.error),(0,r.createElement)("p",null,(0,a.__)("An error occurred displaying the chart.","sb-chart-block"),(0,r.createElement)("br",null),e.error.message)})():null;const f=(0,n.useBlockProps)();return(0,r.createElement)(r.Fragment,null,(0,r.createElement)(n.BlockControls,null,(0,r.createElement)(x,{value:e.type,onChange:b}),(0,r.createElement)(s.ToolbarButton,{label:(0,a.__)("Refresh","sb-chart-block"),onClick:t=>{console.log(t),C(null);var o=new v;try{o.runChart(e,k)}catch(e){C(e)}}},(0,a.__)("Refresh","sb-chart-block"))),(0,r.createElement)(n.InspectorControls,null,(0,r.createElement)(s.PanelBody,null,(0,r.createElement)(s.SelectControl,{label:(0,a.__)("Type","sb-chart-block"),value:e.type,onChange:b,options:p,help:u}),(0,r.createElement)(s.PanelRow,null,(0,r.createElement)(s.ToggleControl,{label:(0,a.__)("Stacked","sb-chart-block"),checked:!!e.stacked,onChange:t=>{l({stacked:!e.stacked})}})),(0,r.createElement)(s.PanelRow,null,(0,r.createElement)(s.ToggleControl,{label:(0,a.__)("Begin Y-axis at 0","sb-chart-block"),checked:!!e.beginYAxisAt0,onChange:t=>{l({beginYAxisAt0:!e.beginYAxisAt0})}})),(0,r.createElement)(s.PanelRow,null,(0,r.createElement)(s.ToggleControl,{label:(0,a.__)("Fill","sb-chart-block"),checked:!!e.fill,onChange:t=>{l({fill:!e.fill})}})),(0,r.createElement)(s.PanelRow,null,(0,r.createElement)(s.ToggleControl,{label:(0,a.__)("Time line","sb-chart-block"),checked:!!e.time,onChange:t=>{l({time:!e.time})}})),(0,r.createElement)(s.SelectControl,{label:(0,a.__)("Time unit (stepSize)","sb-chart-block"),value:e.timeunit,onChange:e=>{l({timeunit:e}),C(null)},options:y}),(0,r.createElement)(s.PanelRow,null,(0,r.createElement)(s.TextControl,{label:(0,a.__)("Y-axes","sb-chart-block"),value:e.yAxes,onChange:e=>{l({yAxes:e})}}))),(0,r.createElement)(s.PanelBody,null,(0,r.createElement)(s.SelectControl,{label:(0,a.__)("Color palette","sb-chart-block"),value:e.theme,onChange:e=>{l({theme:e})},options:d}),(0,r.createElement)(s.PanelRow,null,(0,r.createElement)(s.TextControl,{label:(0,a.__)("Background color overrides","sb-chart-block"),value:e.backgroundColors,onChange:e=>{l({backgroundColors:e})}})),(0,r.createElement)(s.PanelRow,null,(0,r.createElement)(s.TextControl,{label:(0,a.__)("Border color overrides","sb-chart-block"),value:e.borderColors,onChange:e=>{l({borderColors:e})}}))),(0,r.createElement)(s.PanelBody,null,(0,r.createElement)(s.RangeControl,{label:(0,a.__)("Opacity","sb-chart-block"),value:e.opacity,initialPosition:e.opacity,onChange:e=>{l({opacity:e})},min:0,max:1,step:.01,allowReset:!0}),(0,r.createElement)(s.RangeControl,{label:(0,a.__)("Height (pixels)","sb-chart-block"),value:e.height,initialPosition:450,onChange:e=>{l({height:e})},min:100,max:1e3,allowReset:!0}),(0,r.createElement)(s.RangeControl,{label:(0,a.__)("Bar thickness (pixels)","sb-chart-block"),value:e.barThickness,initialPosition:e.barThickness,onChange:e=>{l({barThickness:e})},min:1,max:100,allowReset:!0}),(0,r.createElement)(s.RangeControl,{label:(0,a.__)("Tension","sb-chart-block"),value:e.tension,initialPosition:e.tension,onChange:e=>{l({tension:e})},min:0,max:1,step:.1,allowReset:!0}),(0,r.createElement)(s.RangeControl,{label:(0,a.__)("Legend font size","sb-chart-block"),value:e.labelsFontSize,initialPosition:e.labelsFontSize,onChange:e=>{l({labelsFontSize:e})},min:6,max:100,step:2,allowReset:!0}),(0,r.createElement)(s.RangeControl,{label:(0,a.__)("X-axis font size","sb-chart-block"),value:e.xTicksFontSize,initialPosition:e.xTicksFontSize,onChange:e=>{l({xTicksFontSize:e})},min:6,max:100,step:2,allowReset:!0}))),(0,r.createElement)("div",{...f},e.content&&(0,r.createElement)("div",{className:"chartjs",style:{height:e.height}},(0,r.createElement)("canvas",{id:e.myChartId,height:"450px",ref:k})),e.error&&(0,r.createElement)("div",{className:"error"},_),(0,r.createElement)(n.PlainText,{value:e.content,placeholder:(0,a.__)("Enter Chart data in CSV format"),onChange:e=>{e=e.replace(/<br>/g,"\n"),l({content:e})}})))}));(0,l.registerBlockType)("oik-sb/chart",{example:{attributes:{type:"pie",content:(0,a.__)("Label,Value\nOne,1\nTwo,2\nThree,3","sb-chart-block"),myChartId:"myChartExample"}},edit:A,save:function({attributes:e}){const t=n.useBlockProps.save();return(0,r.createElement)("div",{...t},(0,r.createElement)("div",{className:"chartjs",style:{height:e.height}},(0,r.createElement)("canvas",{id:e.myChartId})))},deprecated:[{attributes:{type:{type:"string",default:"line"},content:{type:"string",default:""},theme:{type:"string",default:function(){const e=Object.getOwnPropertyNames(h)[0];return console.log(e),e}()},myChartId:{type:"string",default:"myChart-"},stacked:{type:"boolean",default:!1},fill:{type:"boolean",default:!1},height:{type:"integer",default:null},beginYAxisAt0:{type:"boolean",default:!1},opacity:{type:"number",default:.8}},supports:{html:!1,align:!1},save:e=>(0,r.createElement)("div",{className:"chartjs",style:{height:e.attributes.height}},(0,r.createElement)("canvas",{id:e.attributes.myChartId}))}]})},819:e=>{e.exports=window.lodash}},o={};function r(e){var l=o[e];if(void 0!==l)return l.exports;var a=o[e]={exports:{}};return t[e](a,a.exports,r),a.exports}r.m=t,e=[],r.O=(t,o,l,a)=>{if(!o){var n=1/0;for(h=0;h<e.length;h++){o=e[h][0],l=e[h][1],a=e[h][2];for(var s=!0,i=0;i<o.length;i++)(!1&a||n>=a)&&Object.keys(r.O).every((e=>r.O[e](o[i])))?o.splice(i--,1):(s=!1,a<n&&(n=a));if(s){e.splice(h--,1);var c=l();void 0!==c&&(t=c)}}return t}a=a||0;for(var h=e.length;h>0&&e[h-1][2]>a;h--)e[h]=e[h-1];e[h]=[o,l,a]},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={826:0,431:0};r.O.j=t=>0===e[t];var t=(t,o)=>{var l,a,n=o[0],s=o[1],i=o[2],c=0;if(n.some((t=>0!==e[t]))){for(l in s)r.o(s,l)&&(r.m[l]=s[l]);if(i)var h=i(r)}for(t&&t(o);c<n.length;c++)a=n[c],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return r.O(h)},o=self.webpackChunksb_chart_block=self.webpackChunksb_chart_block||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var l=r.O(void 0,[431],(()=>r(443)));l=r.O(l)})();