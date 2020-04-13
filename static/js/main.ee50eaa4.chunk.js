(this.webpackJsonpmemory=this.webpackJsonpmemory||[]).push([[0],{12:function(e,t,a){},13:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),i=a(6),l=a.n(i),s=a(1),c=a(2),o=a(4),m=a(3),p=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"notifyClick",value:function(e){this.props.flipped||this.props.blocked||this.props.onClick(this.props.id),e.preventDefault()}},{key:"render",value:function(){var e=this;return this.props.flipped?n.a.createElement("div",{onClick:function(t){return e.notifyClick(t)},className:"card memory-card d-flex justify-content-center align-items-center"},n.a.createElement("img",{className:"front-image",src:this.props.imageURL})):n.a.createElement("div",{onClick:function(t){return e.notifyClick(t)},className:"card memory-card memory-card-back d-flex justify-content-center align-items-center"},n.a.createElement("img",{className:"back-image",src:"pokeball.png"}))}}]),a}(r.Component),u=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"createCard",value:function(e){var t=this;return n.a.createElement(p,{key:e,id:e,onClick:function(e){return t.handleClick(e)},imageURL:this.props.images[e],flipped:this.props.permanentlyFlipped[e]||e===this.props.temporaryFlipped[0]||e===this.props.temporaryFlipped[1],blocked:this.props.blockAll})}},{key:"createGrid",value:function(){for(var e=[],t=0;t<4;t++){for(var a=[],r=0;r<4;r++)a.push(this.createCard(4*t+r));e.push(n.a.createElement("div",{key:t,className:"row flex-nowrap"},a))}return e}},{key:"handleClick",value:function(e){this.props.reportClicked(e)}},{key:"render",value:function(){return n.a.createElement("div",{className:"container d-flex justify-content-center flex-nowrap"},n.a.createElement("div",null,this.createGrid()))}}]),a}(r.Component);function d(e){var t=[];return e.botActive?(t.push(n.a.createElement("div",{key:"botNav",className:"p-3 col-6 text-center settings-nav border-right",onClick:function(){return e.navBot()}},"Play Against Bot")),t.push(n.a.createElement("div",{key:"twoPlayerNav",className:"p-3 col-6 text-center settings-nav bg-light border-bottom",onClick:function(){return e.navTwoPlayer()}},"Two Players"))):(t.push(n.a.createElement("div",{key:"botNav",className:"p-3 col-6 text-center settings-nav bg-light border-right border-bottom",onClick:function(){return e.navBot()}},"Play Against Bot")),t.push(n.a.createElement("div",{key:"twoPlayerNav",className:"p-3 col-6 text-center settings-nav",onClick:function(){return e.navTwoPlayer()}},"Two Players"))),n.a.createElement("div",{className:"row ml-0 mr-0 mt-0"},t)}function h(e){var t=[];e.botActive?(t.push(n.a.createElement("div",{key:"player",className:"col-6"},n.a.createElement("label",{htmlFor:"player"},"Player"),n.a.createElement("input",{type:"text",id:"player",className:"form-control"}))),t.push(n.a.createElement("div",{key:"bot",className:"col-6"},n.a.createElement("label",{htmlFor:"bot"},"Bot"),n.a.createElement("select",{id:"bot",className:"custom-select",required:!0},n.a.createElement("option",{value:"stupid"},"Stupid"),n.a.createElement("option",{value:"smart"},"Smart"),n.a.createElement("option",{value:"genius"},"Genius"))))):(t.push(n.a.createElement("div",{key:"player1",className:"col-6"},n.a.createElement("label",{htmlFor:"player1"},"Player 1"),n.a.createElement("input",{type:"text",id:"player1",className:"form-control"}))),t.push(n.a.createElement("div",{key:"player2",className:"col-6"},n.a.createElement("label",{htmlFor:"player2"},"Player 2"),n.a.createElement("input",{type:"text",id:"player2",className:"form-control"}))));var a=n.a.createElement("div",{className:"d-flex justify-content-center flex-nowrap mt-3"},n.a.createElement("legend",{className:"col-form-label col-3"},"Difficulty:"),n.a.createElement("div",{className:"form-check form-check-inline"},n.a.createElement("input",{className:"form-check-input",type:"radio",name:"difficulty",id:"diff-easy",value:"easy",defaultChecked:"checked"}),n.a.createElement("label",{className:"form-check-label",htmlFor:"diff-easy"},"Easy")),n.a.createElement("div",{className:"form-check form-check-inline"},n.a.createElement("input",{className:"form-check-input",type:"radio",name:"difficulty",id:"diff-medium",value:"medium"}),n.a.createElement("label",{className:"form-check-label",htmlFor:"diff-medium"},"Medium")),n.a.createElement("div",{className:"form-check form-check-inline"},n.a.createElement("input",{className:"form-check-input",type:"radio",name:"difficulty",id:"diff-hard",value:"hard"}),n.a.createElement("label",{className:"form-check-label",htmlFor:"diff-hard"},"Hard")));return n.a.createElement("div",{className:"form-group"},n.a.createElement("div",{className:"row ml-0 mr-0 mt-3"},t),a)}var f=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(s.a)(this,a),(r=t.call(this,e)).state={botActive:!0},r}return Object(c.a)(a,[{key:"renderBotOptions",value:function(){this.setState({botActive:!0})}},{key:"renderTwoPlayerOptions",value:function(){this.setState({botActive:!1})}},{key:"submitSettings",value:function(){var e,t,a,r="stupid";this.state.botActive?(e=document.getElementById("player").value?document.getElementById("player").value:"Player",t="Bot",r=document.getElementById("bot").value):(e=document.getElementById("player1").value?document.getElementById("player1").value:"Player 1",t=document.getElementById("player2").value?document.getElementById("player2").value:"Player 2"),document.getElementById("diff-easy").checked&&(a=2e3),document.getElementById("diff-medium").checked&&(a=750),document.getElementById("diff-hard").checked&&(a=250);var n={timeoutTime:a,playerName1:e,playerName2:t,botActive:this.state.botActive,botIQ:r};this.props.submitSettings(n)}},{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"d-flex align-items-center justify-content-center vh-100"},n.a.createElement("div",{className:"card settings-card"},n.a.createElement(d,{botActive:this.state.botActive,navTwoPlayer:function(){return e.renderTwoPlayerOptions()},navBot:function(){return e.renderBotOptions()}}),n.a.createElement(h,{botActive:this.state.botActive}),n.a.createElement("div",{className:"d-flex justify-content-center"},n.a.createElement("button",{className:"btn btn-primary mt-3 mb-3",onClick:function(){return e.submitSettings()}},"Start game"))))}}]),a}(r.Component),y=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){var e;if(this.props.finished){var t=this.props.playerPoints[0]>this.props.playerPoints[1]?0:1;e=null===(t=this.props.playerPoints[0]===this.props.playerPoints[1]?null:t)?n.a.createElement("h5",{className:"card-title"},"Game finished with a draw!"):n.a.createElement("h5",{className:"card-title"},"Game finished, winner is ".concat(this.props.playerNames[t]))}else e=n.a.createElement("h5",{className:"card-title"},"".concat(this.props.playerNames[this.props.currentPlayer],": Go!"));return n.a.createElement("div",{className:"container d-flex justify-content-center"},n.a.createElement("div",{className:"card status-card text-center mt-3 mb-1"},n.a.createElement("div",{className:"card-body"},e,n.a.createElement("h5",{className:"card-title"},"Points"),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-4"},"".concat(this.props.playerNames[0],": ").concat(this.props.playerPoints[0])),n.a.createElement("div",{className:"col-4"},"".concat(this.props.playerNames[1],": ").concat(this.props.playerPoints[1])),n.a.createElement("div",{className:"col-4"},n.a.createElement("button",{className:"btn btn-primary",onClick:function(){window.confirm("Are you sure you want to restart the game?")&&window.location.reload()}},"Restart Game"))))))}}]),a}(r.Component);function v(e,t){return t.map((function(t,a){if(!t&&(!e.length||a!==e[0]))return a})).filter((function(e){return void 0!==e}))}var b=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(s.a)(this,a),(r=t.call(this,e)).state={initializing:!0,images:[],permanentlyFlipped:Array(16).fill(!1),temporaryFlipped:[],onceFlipped:Array(16).fill(!1),timeoutTime:null,blockAll:!1,playerPoints:[0,0],playerNames:[null,null],currentPlayer:0,finished:!1},r}return Object(c.a)(a,[{key:"gameStart",value:function(e){var t=function(e){for(var t=new Set;t.size<e;)t.add(Math.floor(807*Math.random())+1);t=Array.from(t);var a=[];return t.forEach((function(e){a.push("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+e+".png")})),a}(8);t.forEach((function(e){(new Image).src=e})),t=function(e){for(var t,a,r=e.length-1;r>0;r--)t=Math.floor(Math.random()*r),a=e[r],e[r]=e[t],e[t]=a;return e}(t=t.concat(t)),this.setState({timeoutTime:e.timeoutTime,initializing:!1,images:t,playerNames:[e.playerName1,e.playerName2],botActive:e.botActive,botIQ:e.botIQ})}},{key:"setTemporaryFlipped",value:function(e){var t=this,a=this.state.onceFlipped.slice();if(a[e]=!0,0===this.state.temporaryFlipped.length)this.setState({temporaryFlipped:[e],onceFlipped:a},(function(){t.state.botActive&&1===t.state.currentPlayer&&setTimeout((function(){t.botFlip()}),t.state.timeoutTime)}));else if(this.state.images[this.state.temporaryFlipped[0]]===this.state.images[e]){var r=this.state.permanentlyFlipped.slice();r[e]=!0,r[this.state.temporaryFlipped[0]]=!0;var n=this.state.playerPoints.slice();n[this.state.currentPlayer]=n[this.state.currentPlayer]+1;var i=r.every((function(e){return e})),l=this.state.currentPlayer&&this.state.botActive;this.setState({permanentlyFlipped:r,playerPoints:n,onceFlipped:a,blockAll:l,temporaryFlipped:[],finished:i},(function(){t.state.botActive&&1===t.state.currentPlayer&&!t.state.finished&&setTimeout((function(){t.botFlip()}),t.state.timeoutTime)}))}else{setTimeout((function(){var e=t.state.currentPlayer?0:1,r=e&&t.state.botActive;t.setState({currentPlayer:e,onceFlipped:a,blockAll:r,temporaryFlipped:[]},(function(){t.state.botActive&&1===t.state.currentPlayer&&setTimeout((function(){t.botFlip()}),t.state.timeoutTime)}))}),this.state.timeoutTime);var s=this.state.temporaryFlipped.slice();s.push(e),this.setState({temporaryFlipped:s,blockAll:!0})}}},{key:"botFlip",value:function(){if("stupid"===this.state.botIQ){var e=function(e,t){var a=v(e,t);return a[Math.floor(Math.random()*(a.length-1))]}(this.state.temporaryFlipped,this.state.permanentlyFlipped);this.setTemporaryFlipped(e)}else if("smart"===this.state.botIQ){var t=function(e,t,a,r){console.log(a);var n=v(e,t);if(1===e.length){var i=n.filter((function(t){return r[t]===r[e[0]]&&a[t]}));return i.length?i[0]:n.filter((function(e){return!a[e]}))[0]}for(var l=n.filter((function(e){return a[e]})).map((function(e){return r[e]})),s=[],c=0;c<l.length;c++)for(var o=c+1;o<l.length;o++)l[c]===l[o]&&s.push(l[c]);if(s.length>0){var m=[];return n.forEach((function(e){r[e]===s[0]&&m.push(e)})),m[0]}return n.filter((function(e){return!a[e]}))[0]}(this.state.temporaryFlipped,this.state.permanentlyFlipped,this.state.onceFlipped,this.state.images);this.setTemporaryFlipped(t)}else if("genius"===this.state.botIQ){var a=function(e,t,a){var r=v(e,t);return 1===e.length?r.filter((function(t){return a[t]===a[e[0]]}))[0]:r[Math.floor(Math.random()*(r.length-1))]}(this.state.temporaryFlipped,this.state.permanentlyFlipped,this.state.images);this.setTemporaryFlipped(a)}}},{key:"render",value:function(){var e=this;return this.state.initializing?n.a.createElement(f,{submitSettings:function(t){return e.gameStart(t)}}):n.a.createElement("div",null,n.a.createElement(y,{currentPlayer:this.state.currentPlayer,playerNames:this.state.playerNames,playerPoints:this.state.playerPoints,finished:this.state.finished}),n.a.createElement(u,{images:this.state.images,reportClicked:function(t){return e.setTemporaryFlipped(t)},permanentlyFlipped:this.state.permanentlyFlipped,temporaryFlipped:this.state.temporaryFlipped,blockAll:this.state.blockAll}))}}]),a}(r.Component);a(12);l.a.render(n.a.createElement(b,null),document.getElementById("root"))},7:function(e,t,a){e.exports=a(13)}},[[7,1,2]]]);
//# sourceMappingURL=main.ee50eaa4.chunk.js.map