(()=>{"use strict";var e,t={825:(e,t,l)=>{const o=window.wp.element,r=window.wp.blocks,a=window.wp.i18n,n=window.wp.blockEditor,c=window.wp.components;var s=l(819);const i=window.wp.compose,h=JSON.parse('{"Chart":[{"color":"#FF6384","slug":"darker-pink"},{"color":"#36A2EB","slug":"bluey"},{"color":"#FFCE56","slug":"goldish"},{"color":"#F78DA7","slug":"pale-pink"},{"color":"#4BC0C0","slug":"turquoise"},{"color":"#9966FF","slug":"purpley"},{"color":"#FF9F40","slug":"goldie"},{"color":"#2271b1"},{"color":"#646970"},{"color":"#d63638"},{"color":"996800"},{"color":"#008a20"}],"Gutenberg":[{"color":"#F78DA7","slug":"pale-pink"},{"color":"#CF2E2E","slug":"vivid-red"},{"color":"#FF6900","slug":"luminous-vivid-orange"},{"color":"#FCB900","slug":"luminous-vivid-amber"},{"color":"#7BDCB5","slug":"light-green-cyan"},{"color":"#00D084","slug":"vivid-green-cyan"},{"color":"#8ED1FC","slug":"pale-cyan-blue"},{"color":"#0693E3","slug":"vivid-cyan-blue"},{"color":"#9B51E0","slug":"vivid-purple"},{"color":"#ABB8C3","slug":"cyan-bluish-gray"},{"color":"#313131","slug":"very-dark-gray"},{"color":"#EEEE00","slug":"yellowish-grey"}],"Visualizer":[{"color":"#3366CC"},{"color":"#DC3912"},{"color":"#FF9900"},{"color":"#109618"},{"color":"#990099"},{"color":"#0099C6"},{"color":"#DD4477"},{"color":"#66AA00"},{"color":"#B82E2E"},{"color":"#316395"},{"color":"#994499"},{"color":"#22AA99"},{"color":"#AAAA11"},{"color":"#6633CC"}],"Tertiary":[{"color":"#F1E70D"},{"color":"#E42426"},{"color":"#2072B2"},{"color":"#FDC70F"},{"color":"#C31A7F"},{"color":"#1D96BB"},{"color":"#F28F1F"},{"color":"#6E398D"},{"color":"#0A905D"},{"color":"#EC6224"},{"color":"#424F9B"},{"color":"#8CBD3F"}],"WordPress":[{"color":"#4f94d4"},{"color":"#8c8f94"},{"color":"#f86368"},{"color":"#dba617"},{"color":"#00ba37"},{"color":"#2271b1"},{"color":"#646970"},{"color":"#d63638"},{"color":"996800"},{"color":"#008a20"},{"color":"#0a4b78"},{"color":"#3c434a"},{"color":"#8a2424"},{"color":"#614200"},{"color":"#005c12"}],"Rainbow":[{"color":"#ee82ee"},{"color":"#4b0082"},{"color":"#0000ff"},{"color":"#008000"},{"color":"#ffff00"},{"color":"#ffa500"},{"color":"#ff0000"}]}');function b(e,t){const l=h[e].map((e=>{console.log(e.color);var l=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;const l=parseInt(e.slice(1,3),16),o=parseInt(e.slice(3,5),16),r=parseInt(e.slice(5,7),16);return`rgba(${l}, ${o}, ${r}, ${t})`}(e.color,t);return l}));return l}function u(e,t){let l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.5;const o=b(t,l);var r=(e-1)%o.length,a=o[r];return a}const m=l(819);class g{constructor(){console.log("constructor"),this.datasets=[],this.labels=[]}setStuff(e){this.setLines(e.content),this.theme=e.theme,this.attributes=e,console.log(this.attributes)}setLines(e){console.log(e),this.lines=e.split("\n"),console.log(this.lines),this.labels=this.lines.shift(),this.labels=this.labels.split(","),this.asMatrix(this.lines),this.series=this.transpose(this.matrix),console.log(this.series)}asMatrix(e){this.matrix=[];for(const t of e)this.matrix.push(t.split(","))}transpose(e){return m.zip(...e)}getLegend(e){return this.labels[e]}getDataset(e){var t=new Object({});return t.label=this.getLegend(e),t.data=this.series[e],"pie"===this.attributes.type?t.backgroundColor=b(this.theme,this.attributes.opacity):(t.backgroundColor=u(e,this.theme,this.attributes.opacity),t.borderColor=function(e,t){return u(e,t,1)}(e,this.theme)),t.borderWidth=1,t.fill=this.attributes.fill,this.attributes.barThickness&&(t.barThickness=this.attributes.barThickness),t.tension=this.attributes.tension,t}getDatasets(){var e=[];for(let t=1;t<this.series.length;t++)e.push(this.getDataset(t));return console.log(e),e}getLabels(){return this.series[0]}getOptions(){var e=new Object({});if(e.maintainAspectRatio=!1,e.plugins=new Object({legend:{labels:{font:{size:12}}}}),e.plugins.legend.labels.font.size=this.attributes.labelsFontSize,"pie"==this.attributes.type)return e;e.scales=new Object({});var t=this.attributes.beginYAxisAt0,l=this.getAxisTimeOptions();return e.scales.y=new Object({}),e.scales.x=new Object({}),"horizontalBar"===this.attributes.type?(e.indexAxis="y",e.scales.y=l):e.scales.x=l,e.scales.y.beginAtZero=t,e.scales.y.stacked=this.attributes.stacked,e.scales.x.stacked=this.attributes.stacked,e.scales.x.ticks=new Object({font:{size:this.attributes.xTicksFontSize}}),e}getAxisTimeOptions(){var e=new Object({});return this.attributes.time&&(e.type="time",e.time=new Object({unit:this.attributes.timeunit,displayFormats:{minute:"dd MMM hh:mm",hour:"dd MMM hh:mm",day:"dd MMM"}})),e}showChart(e,t,l,o,r){var a=null;Chart.helpers.each(Chart.instances,(function(t){t.ctx===e&&(a=t)})),a&&a.destroy(),a=new Chart(e,{type:t,data:l,options:o})}runChart(e,t){var l=t.current;if(l){this.setStuff(e),l=l.getContext("2d");var o={labels:this.getLabels(),datasets:this.getDatasets()},r=this.getOptions(),a="horizontalBar"===e.type?"bar":e.type;return this.showChart(l,a,o,r,e)}console.log("No ctx for: "+e.myChartId)}}const d=(0,o.createElement)(c.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,o.createElement)(c.Path,{fillRule:"evenodd",d:"m3 18v-11h3v11v0h-3m5 0v-9h3v9h-3m5 0v-13v0h3v13h-3",clipRule:"evenodd"})),p=(0,o.createElement)(c.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,o.createElement)(c.Path,{fillRule:"evenodd",d:"M2 3H12V6H2H2V3M2 8H10V11H2V8M2 13H15V16H2V13"})),v=(0,o.createElement)(c.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,o.createElement)(c.Path,{d:"M 9.5626743,8.46667 H 18.029337 A 8.4263424,8.4666865 0 0 0 9.6029683,0 8.4263424,8.4666865 0 0 0 9.5626783,\r 1.0700004e-4 Z\r M 8.4716429,1.0583348 A 8.4666704,8.4666723 0 0 0 1.4954554e-6,\r 9.5199618 8.4666704,8.4666723 0 0 0 8.4616259,17.991664 8.4666704,8.4666723 0 0 0 16.933333,9.5299798 a 8.4666704,\r 8.4666723 0 0 0 -8.7e-5,-0.04049 l -8.4665871,-0.005 z"})),k=window.wp.primitives,_=(0,o.createElement)(k.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"-2 -2 24 24"},(0,o.createElement)(k.Path,{d:"M18 3.5c0 .62-.38 1.16-.92 1.38v13.11H1.99l4.22-6.73c-.13-.23-.21-.48-.21-.76C6 9.67 6.67 9 7.5 9S9 9.67 9 10.5c0 .13-.02.25-.05.37l1.44.63c.27-.3.67-.5 1.11-.5.18 0 .35.04.51.09l3.58-6.41c-.36-.27-.59-.7-.59-1.18 0-.83.67-1.5 1.5-1.5.19 0 .36.04.53.1l.05-.09v.11c.54.22.92.76.92 1.38zm-1.92 13.49V5.85l-3.29 5.89c.13.23.21.48.21.76 0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5l.01-.07-1.63-.72c-.25.18-.55.29-.88.29-.18 0-.35-.04-.51-.1l-3.2 5.09h12.29z"})),y=[{icon:_,title:(0,a.__)("Line chart","sb-chart-block"),type:"line"},{icon:d,title:(0,a.__)("Bar chart","sb-chart-block"),type:"bar"},{icon:p,title:(0,a.__)("Horizontal bar chart","sb-chart-block"),type:"horizontalBar"},{icon:v,title:(0,a.__)("Pie chart","sb-chart-block"),type:"pie"}],C={position:"bottom right",isAlternate:!0};function E(e){const{value:t,onChange:l,typeControls:r=y,label:n=(0,a.__)("Chart type","sb-chart-block"),describedBy:i=(0,a.__)("Change chart type","sb-chart-block"),isCollapsed:h=!0}=e;function b(e){return console.log(e),()=>l(e)}const u=(0,s.find)(r,(e=>e.type===t)),m=[{icon:_,title:(0,a.__)("Line chart","sb-chart-block"),isActive:"line"===t,onClick:b("line")},{icon:d,title:(0,a.__)("Bar chart","sb-chart-block"),isActive:"bar"===t,onClick:b("bar")},{icon:p,title:(0,a.__)("Horizontal bar chart","sb-chart-block"),isActive:"horizontalBar"===t,onClick:b("horizontalBar")},{icon:v,title:(0,a.__)("Pie chart","sb-chart-block"),isActive:"pie"===t,onClick:b("pie")}];return(0,o.createElement)(c.ToolbarGroup,{isCollapsed:h,icon:function(){if(u)return u.icon}(),label:n,toggleProps:{describedBy:i},popoverProps:C,controls:m})}const w=(0,i.withInstanceId)((function(e){let{attributes:t,className:l,isSelected:r,setAttributes:i,instanceId:b}=e;i({myChartId:`myChart-${b}`});const u=e=>{i({type:e})},m=(0,a.__)("Choose Line, Bar, Horizontal bar or Pie.","sb-chart-block"),d={line:(0,a.__)("Line chart","sb-chart-block"),bar:(0,a.__)("Bar chart","sb-chart-block"),horizontalBar:(0,a.__)("Horizontal bar chart","sb-chart-block"),pie:(0,a.__)("Pie chart","sb-chart-block")},p=Object.getOwnPropertyNames(h).map((e=>({value:e,label:e}))),v={year:(0,a.__)("Year","sb-chart-block"),quarter:(0,a.__)("Quarter","sb-chart-block"),month:(0,a.__)("Month","sb-chart-block"),week:(0,a.__)("Week","sb-chart-block"),day:(0,a.__)("Day","sb-chart-block"),hour:(0,a.__)("Hour","sb-chart-block"),minute:(0,a.__)("Minute","sb-chart-block"),second:(0,a.__)("Second","sb-chart-block"),millisecond:(0,a.__)("Millisecond","sb-chart-block")};var k=(0,s.map)(d,((e,t)=>({value:t,label:e}))),_=(0,s.map)(v,((e,t)=>({value:t,label:e})));const y=(0,o.useRef)(),C=e=>{console.log(e),i({error:e})};(0,o.useEffect)((()=>{if(t.content&&!t.error){var e=new g;try{e.runChart(t,y)}catch(e){C(e)}}}));var w=t.error?(()=>{if(t.time){var e=(new Date).toISOString();e=(e=e.replace("T"," ")).replace("Z","");var l=(0,a.__)("Error displaying chart. Please check your dates then choose Refresh, or change the Time unit.","sb-chart-block"),r=(0,a.__)("Expected date format: ccyy-mm-dd hh:mm:ss.ttt","sb-chart-block"),n=(0,a.__)("For example: ","sb-chart-block")+" "+e,c=(0,a.__)("Message: ","sb-chart-block")+" ";return(0,o.createElement)("p",null,l,(0,o.createElement)("br",null),r,(0,o.createElement)("br",null),n,(0,o.createElement)("br",null),c," ",t.error.message)}return(0,o.createElement)("p",null,(0,a.__)("An error occurred displaying the chart.","sb-chart-block"),(0,o.createElement)("br",null),t.error.message)})():null;const f=(0,n.useBlockProps)();return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(n.BlockControls,null,(0,o.createElement)(E,{value:t.type,onChange:u}),(0,o.createElement)(c.ToolbarButton,{label:(0,a.__)("Refresh","sb-chart-block"),onClick:e=>{console.log(e),C(null);var l=new g;try{l.runChart(t,y)}catch(e){C(e)}}},(0,a.__)("Refresh","sb-chart-block"))),(0,o.createElement)(n.InspectorControls,null,(0,o.createElement)(c.PanelBody,null,(0,o.createElement)(c.SelectControl,{label:(0,a.__)("Type","sb-chart-block"),value:t.type,onChange:u,options:k,help:m}),(0,o.createElement)(c.PanelRow,null,(0,o.createElement)(c.ToggleControl,{label:(0,a.__)("Stacked","sb-chart-block"),checked:!!t.stacked,onChange:e=>{i({stacked:!t.stacked})}})),(0,o.createElement)(c.PanelRow,null,(0,o.createElement)(c.ToggleControl,{label:(0,a.__)("Begin Y-axis at 0","sb-chart-block"),checked:!!t.beginYAxisAt0,onChange:e=>{i({beginYAxisAt0:!t.beginYAxisAt0})}})),(0,o.createElement)(c.PanelRow,null,(0,o.createElement)(c.ToggleControl,{label:(0,a.__)("Fill","sb-chart-block"),checked:!!t.fill,onChange:e=>{i({fill:!t.fill})}})),(0,o.createElement)(c.PanelRow,null,(0,o.createElement)(c.ToggleControl,{label:(0,a.__)("Time line","sb-chart-block"),checked:!!t.time,onChange:e=>{i({time:!t.time})}})),(0,o.createElement)(c.SelectControl,{label:(0,a.__)("Time unit (stepSize)","sb-chart-block"),value:t.timeunit,onChange:e=>{i({timeunit:e}),C(null)},options:_}),(0,o.createElement)(c.PanelRow,null,(0,o.createElement)(c.TextControl,{label:(0,a.__)("Y-axes","sb-chart-block"),value:t.yAxes,onChange:e=>{i({yAxes:e})}}))),(0,o.createElement)(c.PanelBody,null,(0,o.createElement)(c.SelectControl,{label:(0,a.__)("Color palette","sb-chart-block"),value:t.theme,onChange:e=>{i({theme:e})},options:p}),(0,o.createElement)(c.PanelRow,null,(0,o.createElement)(c.TextControl,{label:(0,a.__)("Background color overrides","sb-chart-block"),value:t.backgroundColors,onChange:e=>{i({backgroundColors:e})}})),(0,o.createElement)(c.PanelRow,null,(0,o.createElement)(c.TextControl,{label:(0,a.__)("Border color overrides","sb-chart-block"),value:t.borderColors,onChange:e=>{i({borderColors:e})}}))),(0,o.createElement)(c.PanelBody,null,(0,o.createElement)(c.PanelRow,null,(0,o.createElement)(c.RangeControl,{label:(0,a.__)("Opacity","sb-chart-block"),value:t.opacity,initialPosition:t.opacity,onChange:e=>{i({opacity:e})},min:0,max:1,step:.1,allowReset:!0}))),(0,o.createElement)(c.PanelBody,null,(0,o.createElement)(c.PanelRow,null,(0,o.createElement)(c.RangeControl,{label:(0,a.__)("Height (pixels)","sb-chart-block"),value:t.height,initialPosition:450,onChange:e=>{i({height:e})},min:100,max:1e3,allowReset:!0}))),(0,o.createElement)(c.PanelBody,null,(0,o.createElement)(c.PanelRow,null,(0,o.createElement)(c.RangeControl,{label:(0,a.__)("Bar thickness (pixels)","sb-chart-block"),value:t.barThickness,initialPosition:t.barThickness,onChange:e=>{i({barThickness:e})},min:1,max:100,allowReset:!0}))),(0,o.createElement)(c.PanelBody,null,(0,o.createElement)(c.PanelRow,null,(0,o.createElement)(c.RangeControl,{label:(0,a.__)("Tension","sb-chart-block"),value:t.tension,initialPosition:t.tension,onChange:e=>{i({tension:e})},min:0,max:1,step:.1,allowReset:!0}))),(0,o.createElement)(c.PanelBody,null,(0,o.createElement)(c.PanelRow,null,(0,o.createElement)(c.RangeControl,{label:(0,a.__)("Legend font size","sb-chart-block"),value:t.labelsFontSize,initialPosition:t.labelsFontSize,onChange:e=>{i({labelsFontSize:e})},min:6,max:100,step:2,allowReset:!0})),(0,o.createElement)(c.PanelRow,null,(0,o.createElement)(c.RangeControl,{label:(0,a.__)("X-axis font size","sb-chart-block"),value:t.xTicksFontSize,initialPosition:t.xTicksFontSize,onChange:e=>{i({xTicksFontSize:e})},min:6,max:100,step:2,allowReset:!0})))),(0,o.createElement)("div",f,t.content&&(0,o.createElement)("div",{className:"chartjs",style:{height:t.height}},(0,o.createElement)("canvas",{id:t.myChartId,height:"450px",ref:y})),t.error&&(0,o.createElement)("div",{className:"error"},w),(0,o.createElement)(n.PlainText,{value:t.content,placeholder:(0,a.__)("Enter Chart data in CSV format"),onChange:e=>{e=e.replace(/<br>/g,"\n"),i({content:e})}})))}));(0,r.registerBlockType)("oik-sb/chart",{example:{attributes:{type:"pie",content:(0,a.__)("Label,Value\nOne,1\nTwo,2\nThree,3","sb-chart-block"),myChartId:"myChartExample"}},edit:w,save:function(e){let{attributes:t}=e;const l=n.useBlockProps.save();return(0,o.createElement)("div",l,(0,o.createElement)("div",{className:"chartjs",style:{height:t.height}},(0,o.createElement)("canvas",{id:t.myChartId})))},deprecated:[{attributes:{type:{type:"string",default:"line"},content:{type:"string",default:""},theme:{type:"string",default:function(){const e=Object.getOwnPropertyNames(h)[0];return console.log(e),e}()},myChartId:{type:"string",default:"myChart-"},stacked:{type:"boolean",default:!1},fill:{type:"boolean",default:!1},height:{type:"integer",default:null},beginYAxisAt0:{type:"boolean",default:!1},opacity:{type:"number",default:.8}},supports:{html:!1,align:!1},save:e=>(0,o.createElement)("div",{className:"chartjs",style:{height:e.attributes.height}},(0,o.createElement)("canvas",{id:e.attributes.myChartId}))}]})},819:e=>{e.exports=window.lodash}},l={};function o(e){var r=l[e];if(void 0!==r)return r.exports;var a=l[e]={exports:{}};return t[e](a,a.exports,o),a.exports}o.m=t,e=[],o.O=(t,l,r,a)=>{if(!l){var n=1/0;for(h=0;h<e.length;h++){l=e[h][0],r=e[h][1],a=e[h][2];for(var c=!0,s=0;s<l.length;s++)(!1&a||n>=a)&&Object.keys(o.O).every((e=>o.O[e](l[s])))?l.splice(s--,1):(c=!1,a<n&&(n=a));if(c){e.splice(h--,1);var i=r();void 0!==i&&(t=i)}}return t}a=a||0;for(var h=e.length;h>0&&e[h-1][2]>a;h--)e[h]=e[h-1];e[h]=[l,r,a]},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={826:0,431:0};o.O.j=t=>0===e[t];var t=(t,l)=>{var r,a,n=l[0],c=l[1],s=l[2],i=0;if(n.some((t=>0!==e[t]))){for(r in c)o.o(c,r)&&(o.m[r]=c[r]);if(s)var h=s(o)}for(t&&t(l);i<n.length;i++)a=n[i],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(h)},l=self.webpackChunksb_chart_block=self.webpackChunksb_chart_block||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})();var r=o.O(void 0,[431],(()=>o(825)));r=o.O(r)})();