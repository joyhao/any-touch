"use strict";function _interopDefault(t){return t&&"object"==typeof t&&"default"in t?t.default:t}var AnyEvent=_interopDefault(require("any-event")),extendStatics=function(t,e){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)};function __extends(t,e){function i(){this.constructor=t}extendStatics(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}var __assign=function(){return(__assign=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var o in e=arguments[i])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};function __rest(t,e){var i={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(i[n]=t[n]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(t);o<n.length;o++)e.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(t,n[o])&&(i[n[o]]=t[n[o]])}return i}function __values(t){var e="function"==typeof Symbol&&t[Symbol.iterator],i=0;return e?e.call(t):{next:function(){return t&&i>=t.length&&(t=void 0),{value:t&&t[i++],done:!t}}}}function __read(t,e){var i="function"==typeof Symbol&&t[Symbol.iterator];if(!i)return t;var n,o,r=i.call(t),s=[];try{for(;(void 0===e||e-- >0)&&!(n=r.next()).done;)s.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(i=r.return)&&i.call(r)}finally{if(o)throw o.error}}return s}function __spread(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(__read(arguments[e]));return t}var IS_WX=void 0===window,SUPPORT_TOUCH=IS_WX||"ontouchstart"in window,AUTO="auto",NONE="none",MANIPULATION="manipulation",DIRECTION_LEFT="left",DIRECTION_RIGHT="right",DIRECTION_UP="up",DIRECTION_DOWN="down",DIRECTION_X=[DIRECTION_LEFT,DIRECTION_RIGHT],DIRECTION_Y=[DIRECTION_UP,DIRECTION_DOWN],DIRECTION_ALL=[DIRECTION_LEFT,DIRECTION_RIGHT,DIRECTION_UP,DIRECTION_DOWN],PAN_X="pan-x",PAN_Y="pan-y",COMPUTE="compute",COMPUTE_INTERVAL=16,CLIENT_X="clientX",CLIENT_Y="clientY",INPUT_START="start",INPUT_MOVE="move",INPUT_CANCEL="cancel",INPUT_END="end",TOUCH="touch",MOUSE="mouse",TOUCH_START="touchstart",TOUCH_MOVE="touchmove",TOUCH_END="touchend",TOUCH_CANCEL="touchcancel",MOUSE_UP="mouseup",MOUSE_MOVE="mousemove",MOUSE_DOWN="mousedown",WRONG_DIRECTION="wrong direction!",getVLength=function(t){return Math.sqrt(t.x*t.x+t.y*t.y)},getDotProduct=function(t,e){return t.x*e.x+t.y*e.y},getRadian=function(t,e){var i=getVLength(t)*getVLength(e);if(0===i)return 0;var n=getDotProduct(t,e)/i;return n>1&&(n=1),Math.acos(n)},getCross=function(t,e){return t.x*e.y-e.x*t.y},getAngle=function(t,e){var i=getRadian(t,e);return getCross(t,e)>0&&(i*=-1),radianToAngle(i)},radianToAngle=function(t){return t/Math.PI*180},angleToRadian=function(t){return t/180*Math.PI},getCenter=function(t){var e=t.length,i=t.reduce(function(t,e){return t.x+=e[CLIENT_X],t.y+=e[CLIENT_Y],t},{x:0,y:0});return{x:Math.round(i.x/e),y:Math.round(i.y/e)}},getDirection=function(t,e){return t===e?NONE:Math.abs(t)>Math.abs(e)?0<t?DIRECTION_RIGHT:DIRECTION_LEFT:0<e?DIRECTION_DOWN:DIRECTION_UP},Vector=Object.freeze({getVLength:getVLength,getDotProduct:getDotProduct,getRadian:getRadian,getCross:getCross,getAngle:getAngle,radianToAngle:radianToAngle,angleToRadian:angleToRadian,getCenter:getCenter,getDirection:getDirection}),default_1=function(){},default_1$1=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.load=function(t){var e=Array.from(t.targetTouches||t.touches).map(function(t){return{clientX:t.clientX,clientY:t.clientY}}),i=Array.from(t.changedTouches).map(function(t){return{clientX:t.clientX,clientY:t.clientY}});return{eventType:t.type.replace("touch",""),changedPoints:i,points:e,nativeEvent:t}},e}(default_1),default_1$2=function(t){function e(){var e=t.call(this)||this;return e.isPressed=!1,e}return __extends(e,t),e.prototype.load=function(t){var e=t.clientX,i=t.clientY,n=t.type,o=t.button,r=this.prevPoints||[{clientX:e,clientY:i}],s=[{clientX:e,clientY:i}];if(this.prevPoints=[{clientX:e,clientY:i}],"mousedown"===n){if(0!==o)return;this.isPressed=!0}if("mousemove"===n){if(!this.isPressed)return}else if("mouseup"===n){if(!this.isPressed)return;s=[],this.isPressed=!1}return{eventType:{mousedown:INPUT_START,mousemove:INPUT_MOVE,mouseup:INPUT_END}[n],changedPoints:r,points:s,nativeEvent:t}},e}(default_1),default_1$3=function(){function t(){this.adapter=SUPPORT_TOUCH?new default_1$1:new default_1$2}return t.prototype.load=function(t){var e=this.adapter.load(t);if(void 0!==e){var i=e.eventType,n=e.points,o=e.changedPoints,r=n.length,s=o.length,a=INPUT_START===i,c=INPUT_END===i||INPUT_CANCEL===i;0<r&&(this._center=getCenter(e.points));var u=Date.now(),p=t.target,l=t.currentTarget,h=this._center||{},T=h.x,d=h.y;return __assign({},e,{preventDefault:function(){t.preventDefault()},isStart:a,isEnd:c,pointLength:r,changedPointLength:s,center:this._center,x:T,y:d,timestamp:u,target:p,currentTarget:l,nativeEvent:t})}},t}(),intervalCompute=function(t,e){var i=t.prevInput,n=t.input,o=0,r=0,s=0,a=0,c=NONE;if(void 0!==n){var u=i||n,p=n.timestamp-u.timestamp;if(-1===[INPUT_CANCEL,INPUT_END].indexOf(n.eventType)&&(COMPUTE_INTERVAL<p||void 0===e.get("direction"))){var l=n.x-u.x,h=n.y-u.y;s=Math.round(l/p*100)/100,a=Math.round(h/p*100)/100,o=Math.abs(s),r=Math.abs(a),c=getDirection(l,h)||e.get("direction"),e.set({speedX:s}),e.set({speedY:a}),e.set({velocityX:o}),e.set({velocityY:r}),e.set({direction:c})}else s=e.get("speedX",0),a=e.get("speedY",0),o=e.get("velocityX",0),r=e.get("velocityY",0),c=e.get("direction")}return{velocityX:o,velocityY:r,speedX:s,speedY:a,direction:c}};function computeDistance(t,e){var i=t.startInput,n=t.input,o=n.eventType,r=0,s=0;"start"===o?(e.set({displacementX:r}),e.set({displacementY:s})):"move"===o?(r=Math.round(n.points[0][CLIENT_X]-i.points[0][CLIENT_X]),s=Math.round(n.points[0][CLIENT_Y]-i.points[0][CLIENT_Y]),e.set({displacementX:r}),e.set({displacementY:s})):"end"===o&&(r=e.get("displacementX",0),s=e.get("displacementY",0));var a=Math.abs(r),c=Math.abs(s);return{displacementX:r,displacementY:s,distanceX:a,distanceY:c,distance:Math.round(getVLength({x:a,y:c})),overallDirection:getDirection(r,s)}}function computeDeltaXY(t,e){var i,n,o=t.prevInput,r=t.input,s=0;if(void 0===o?(i=0,n=0):(i=r.x-o.x,n=r.y-o.y),0!==i||0!==n){var a=Math.sqrt(Math.pow(i,2)+Math.pow(n,2));s=Math.round(radianToAngle(Math.acos(Math.abs(i)/a))),e.set({deltaXYAngle:s})}else s=e.get("deltaXYAngle",0);return{deltaX:i,deltaY:n,deltaXYAngle:s}}var computeMaxLength=function(t,e){var i=t.pointLength;return t.isStart?(e.set({maxPointLength:i}),i):e.get("maxPointLength",0)},computeVector=function(t){return{x:t.points[1][CLIENT_X]-t.points[0][CLIENT_X],y:t.points[1][CLIENT_Y]-t.points[0][CLIENT_Y]}};function computeScale(t){var e=t.startV,i=t.prevV,n=t.activeV,o=getVLength(n)/getVLength(i);return{scale:getVLength(n)/getVLength(e),deltaScale:o}}function computeAngle(t){var e=t.startV,i=t.prevV,n=t.activeV,o=getAngle(n,i);return{angle:getAngle(n,e),deltaAngle:o}}function computMulti(t,e){var i=t.startMultiInput,n=t.prevInput,o=t.input;if(void 0!==i&&void 0!==n&&1<n.points.length&&1<o.points.length){var r=computeVector(i),s=computeVector(n),a=computeVector(o),c=computeScale({startV:r,activeV:a,prevV:s}),u=c.scale,p=c.deltaScale,l=computeAngle({startV:r,prevV:s,activeV:a}),h=l.deltaAngle,T=l.angle;return e.set({angle:T}),e.set({scale:u}),{scale:u,deltaScale:p,deltaAngle:h,angle:T}}return{scale:e.get("scale",1),deltaScale:1,deltaAngle:0,angle:e.get("angle",0)}}function compute(t,e){var i=t.input,n=computeDistance(t,e),o=n.displacementX,r=n.displacementY,s=n.distanceX,a=n.distanceY,c=n.distance,u=n.overallDirection,p=t.input.timestamp-t.startInput.timestamp,l=intervalCompute(t,e),h=l.velocityX,T=l.velocityY,d=l.speedX,f=l.speedY,_=l.direction,v=computeDeltaXY(t,e),g=v.deltaX,E=v.deltaY,y=v.deltaXYAngle,N=computMulti(t,e),m=N.scale,O=N.deltaScale,S=N.angle,I=N.deltaAngle,A=computeMaxLength(i,e);return __assign({type:""},i,{velocityX:h,velocityY:T,speedX:d,speedY:f,deltaTime:p,overallDirection:u,direction:_,deltaX:g,deltaY:E,deltaXYAngle:y,displacementX:o,displacementY:r,distanceX:s,distanceY:a,distance:c,scale:m,deltaScale:O,angle:S,deltaAngle:I,maxPointLength:A})}var default_1$4=function(){function t(t){var e=t.$store;this.inputFactory=new default_1$3,this.$store=e}return t.prototype.load=function(t){var e=this.inputFactory.load(t);if(void 0!==e)return compute(this._record(e),this.$store)},t.prototype._record=function(t){var e=t.eventType;return this.prevInput=this.activeInput,INPUT_START===e&&(t.isStart&&(this.startInput=t),1<t.pointLength?this.startMultiInput=t:this.startMultiInput=void 0),this.activeInput=t,{startMultiInput:this.startMultiInput,startInput:this.startInput,prevInput:this.prevInput,input:t}},t}(),computeTouchAction=function(t){var e,i,n,o=((e={})[AUTO]=0,e[MANIPULATION]=1,e[PAN_X]=2,e[PAN_Y]=2,e[NONE]=3,e),r=o[NONE],s=[AUTO],a=0;try{for(var c=__values(t),u=c.next();!u.done;u=c.next()){var p=u.value,l=o[p];if(r===l){s=[p];break}a<l?(s=[p],a=l):a===l&&0<l&&(s.push(p),a=l)}}catch(t){i={error:t}}finally{try{u&&!u.done&&(n=c.return)&&n.call(c)}finally{if(i)throw i.error}}return s.join(" ")},default_1$5=function(){function t(){this.store={}}return t.prototype.set=function(t){this.store=__assign({},this.store,t)},t.prototype.get=function(t,e){return this.store[t]||e},t.prototype.reset=function(){this.store={}},t.prototype.destroy=function(){this.reset()},t}(),ObjectToString=Object.prototype.toString;function isRegExp(t){return"[object RegExp]"===ObjectToString.call(t)}function isFunction(t){return"[object Function]"===ObjectToString.call(t)}var STATUS_POSSIBLE="possible",STATUS_START="start",STATUS_MOVE="move",STATUS_END="end",STATUS_CANCELLED="cancel",STATUS_FAILED="failed",STATUS_RECOGNIZED="recognized",Recognizer=function(){function t(t){this.options=__assign({},this.constructor.DEFAULT_OPTIONS,{disabled:!1},t),this.name=this.options.name,this.disabled=this.options.disabled,this.status=STATUS_POSSIBLE,this.isRecognized=!1,this.requireFailureRecognizers=[],this.isWaitingOther=!1}return t.prototype.set=function(t){return void 0===t&&(t={}),this.options=__assign({},this.options,t),this.$root.update(),this},t.prototype.$injectRoot=function(t){return this.$root=t,this},t.prototype.emit=function(t,e){if(e.type=t,this.$root.eventEmitter.emit(t,e),void 0!==this.$root.el&&(this.$root.options.syncToAttr&&this.$root.el.setAttribute("at-gesture",t),this.$root.options.hasDomEvents)){e.target,e.currentTarget;var i=e.type,n=__rest(e,["target","currentTarget","type"]),o=new Event(i,e);Object.assign(o,n),this.$root.el.dispatchEvent(o)}},t.prototype.requireFailure=function(t){this.requireFailureRecognizers.includes(t)||this.requireFailureRecognizers.push(t)},t.prototype.removeRequireFailure=function(t){var e,i;try{for(var n=__values(this.requireFailureRecognizers.entries()),o=n.next();!o.done;o=n.next()){var r=__read(o.value,2),s=r[0];if(r[1].name===t.name){this.requireFailureRecognizers.splice(s,1);break}}}catch(t){e={error:t}}finally{try{o&&!o.done&&(i=n.return)&&i.call(n)}finally{if(e)throw e.error}}},t.prototype.hasRequireFailure=function(){return 0<this.requireFailureRecognizers.length},t.prototype.isAllRequireFailureRecognizersDisabled=function(){return this.requireFailureRecognizers.every(function(t){return t.disabled})},t.prototype.isAllRequiresFailedOrPossible=function(){var t,e;try{for(var i=__values(this.requireFailureRecognizers),n=i.next();!n.done;n=i.next()){var o=n.value;if(o.isWaitingOther)return!1;if(STATUS_FAILED!==o.status&&STATUS_POSSIBLE!==o.status)return!1}}catch(e){t={error:e}}finally{try{n&&!n.done&&(e=i.return)&&e.call(i)}finally{if(t)throw t.error}}return!0},t.prototype.isValidPointLength=function(t){return 0===this.options.pointLength||this.options.pointLength===t},t.prototype.isOnlyHorizontal=function(){var t,e,i=!0;try{for(var n=__values(this.options.directions),o=n.next();!o.done;o=n.next()){var r=o.value;if(!(i=-1<DIRECTION_X.indexOf(r)))return!1}}catch(e){t={error:e}}finally{try{o&&!o.done&&(e=n.return)&&e.call(n)}finally{if(t)throw t.error}}return i},t.prototype.isOnlyVertical=function(){var t,e,i=!0;try{for(var n=__values(this.options.directions),o=n.next();!o.done;o=n.next()){var r=o.value;if(!(i=-1<DIRECTION_Y.indexOf(r)))return!1}}catch(e){t={error:e}}finally{try{o&&!o.done&&(e=n.return)&&e.call(n)}finally{if(t)throw t.error}}return i},t.prototype.isVaildDirection=function(t){return-1!==this.options.directions.indexOf(t)||NONE===t},t.prototype.flow=function(t,e,i){var n,o,r,s,a,c,u,p={1:(n={},n[STATUS_POSSIBLE]=(o={},o[INPUT_MOVE]=STATUS_START,o[INPUT_END]=STATUS_RECOGNIZED,o[INPUT_CANCEL]=STATUS_CANCELLED,o),n[STATUS_START]=(r={},r[INPUT_MOVE]=STATUS_MOVE,r[INPUT_END]=STATUS_END,r[INPUT_CANCEL]=STATUS_CANCELLED,r),n[STATUS_MOVE]=(s={},s[INPUT_MOVE]=STATUS_MOVE,s[INPUT_END]=STATUS_END,s),n),0:(a={},a[STATUS_START]=(c={},c[INPUT_MOVE]=STATUS_CANCELLED,c[INPUT_END]=STATUS_END,c[INPUT_CANCEL]=STATUS_CANCELLED,c),a[STATUS_MOVE]=(u={},u[INPUT_MOVE]=STATUS_CANCELLED,u[INPUT_END]=STATUS_END,u[INPUT_CANCEL]=STATUS_CANCELLED,u),a)};return void 0!==p[Number(t)][e]&&p[Number(t)][e][i]||e},t.prototype._resetStatus=function(){-1!==[STATUS_END,STATUS_CANCELLED,STATUS_RECOGNIZED,STATUS_FAILED].indexOf(this.status)&&(this.status=STATUS_POSSIBLE)},t.prototype.recognize=function(t){var e=this.test(t);this._resetStatus();var i=t.eventType;this.status=this.flow(e,this.status,i),STATUS_CANCELLED!==i?(this.isRecognized=-1<[STATUS_START,STATUS_MOVE,STATUS_END,STATUS_RECOGNIZED].indexOf(this.status),e?(this.afterRecognized(t),this.emit(this.options.name,t),this.emit(this.options.name+this.status,t),this.afterEmit(t)):this.isRecognized&&this.emit(this.options.name+this.status,t)):this.emit(this.options.name+INPUT_CANCEL,t)},t.prototype.afterRecognized=function(t){},t.prototype.afterEmit=function(t){},t}(),TapRecognizer=function(t){function e(e){void 0===e&&(e={});var i=t.call(this,e)||this;return i.tapCount=0,i}return __extends(e,t),e.prototype.getTouchAction=function(){return 1<this.options.tapTimes?["manipulation"]:[AUTO]},e.prototype._isValidDistanceFromPrevTap=function(t){if(void 0!==this.prevTapPoint){var e=getVLength({x:t.x-this.prevTapPoint.x,y:t.y-this.prevTapPoint.y});return this.prevTapPoint=t,this.options.tapsPositionTolerance>=e}return this.prevTapPoint=t,!0},e.prototype._isValidInterval=function(){var t=Date.now();if(void 0===this.prevTapTime)return this.prevTapTime=t,!0;var e=t-this.prevTapTime;return this.prevTapTime=t,e<this.options.waitNextTapTime},e.prototype.recognize=function(t){var e=this;INPUT_END===t.eventType&&(this.status=STATUS_POSSIBLE,this.test(t)?(clearTimeout(this._delayFailTimer),clearTimeout(this._waitOtherFailedTimer),this.isWaitingOther=!1,this._isValidDistanceFromPrevTap(t)&&this._isValidInterval()?this.tapCount++:this.tapCount=1,0==this.tapCount%this.options.tapTimes?this.hasRequireFailure()&&!this.isAllRequireFailureRecognizersDisabled()?(this.isWaitingOther=!0,this._waitOtherFailedTimer=setTimeout(function(){e.isAllRequiresFailedOrPossible()?(e.status=STATUS_RECOGNIZED,e.emit(e.options.name,__assign({},t,{tapCount:e.tapCount}))):e.status=STATUS_FAILED,e.isWaitingOther=!1},this.options.waitNextTapTime)):(this.status=STATUS_RECOGNIZED,this.emit(this.options.name,__assign({},t,{tapCount:this.tapCount})),this.reset()):this._delayFailTimer=setTimeout(function(){e.status=STATUS_FAILED,e.reset()},this.options.waitNextTapTime)):(this.reset(),this.status=STATUS_FAILED))},e.prototype.reset=function(){this.tapCount=0,this.prevTapPoint=void 0,this.prevTapTime=void 0},e.prototype.test=function(t){var e=t.distance,i=t.deltaTime;return t.maxPointLength===this.options.pointLength&&this.options.positionTolerance>=e&&this.options.maxPressTime>i},e.prototype.afterEmit=function(t){},e.DEFAULT_OPTIONS={name:"tap",pointLength:1,tapTimes:1,waitNextTapTime:300,disabled:!1,positionTolerance:2,tapsPositionTolerance:9,maxPressTime:250},e}(Recognizer),PressRecognizer=function(t){function e(e){return void 0===e&&(e={}),t.call(this,e)||this}return __extends(e,t),e.prototype.getTouchAction=function(){return[AUTO]},e.prototype.recognize=function(t){var e=this,i=t.eventType,n=t.deltaTime;INPUT_START===i&&this.test(t)?(this._resetStatus(),this.cancel(),this._timeoutId=setTimeout(function(){e.status=STATUS_RECOGNIZED,e.emit(e.options.name,t)},this.options.minPressTime)):INPUT_END===i&&STATUS_RECOGNIZED===this.status?this.emit(""+this.options.name+DIRECTION_UP,t):(!this.test(t)||this.options.minPressTime>n&&-1!==[INPUT_END,INPUT_CANCEL].indexOf(i))&&(this.cancel(),this.status=STATUS_FAILED)},e.prototype.test=function(t){var e=t.distance,i=t.pointLength;return this.options.positionTolerance>e&&this.isValidPointLength(i)},e.prototype.cancel=function(){clearTimeout(this._timeoutId)},e.prototype.afterEmit=function(){},e.DEFAULT_OPTIONS={name:"press",pointLength:1,positionTolerance:9,minPressTime:251},e}(Recognizer),getHV=function(t){var e,i,n=!1,o=!1;try{for(var r=__values(t),s=r.next();!s.done;s=r.next()){var a=s.value;if(-1<DIRECTION_X.indexOf(a)){if(n=!0,o)break}else{if(!(-1<DIRECTION_Y.indexOf(a)))throw new Error(WRONG_DIRECTION);if(o=!0,n)break}}}catch(t){e={error:t}}finally{try{s&&!s.done&&(i=r.return)&&i.call(r)}finally{if(e)throw e.error}}return{hasHorizontal:n,hasVertical:o}},PanRecognizer=function(t){function e(e){return void 0===e&&(e={}),t.call(this,e)||this}return __extends(e,t),e.prototype.getTouchAction=function(){var t=[AUTO],e=getHV(this.options.directions),i=e.hasHorizontal,n=e.hasVertical;return i&&n?t=[NONE]:!i&&n?t=[PAN_X]:!n&&i&&(t=[PAN_Y]),t},e.prototype.test=function(t){var e=t.distance,i=t.direction,n=t.eventType,o=t.pointLength;return INPUT_MOVE===n&&(this.isRecognized||this.options.threshold<e)&&this.isValidPointLength(o)&&this.isVaildDirection(i)},e.prototype.afterEmit=function(t){NONE!==t.direction&&this.emit(this.options.name+t.direction,t)},e.prototype.afterRecognized=function(t){this.lockDirection(t)},e.prototype.lockDirection=function(t){if(void 0===this.options.directions||0===this.options.directions.length)return t;var e=0,i=0;return this.options.directions.forEach(function(n){DIRECTION_LEFT===n&&0>t.deltaX?e=t.deltaX:DIRECTION_RIGHT===n&&0<t.deltaX?e=t.deltaX:DIRECTION_DOWN===n&&0<t.deltaY?i=t.deltaY:DIRECTION_UP===n&&0>t.deltaY&&(i=t.deltaY)}),t.deltaX=e,t.deltaY=i,t},e.DEFAULT_OPTIONS={name:"pan",threshold:10,pointLength:1,directions:DIRECTION_ALL},e}(Recognizer),SwipeRecognizer=function(t){function e(e){return void 0===e&&(e={}),t.call(this,e)||this}return __extends(e,t),e.prototype.getTouchAction=function(){return[NONE]},e.prototype.afterEmit=function(t){NONE!==t.direction&&this.emit(this.options.name+t.direction,t)},e.prototype.test=function(t){if(INPUT_END!==t.eventType)return!1;var e=t.direction,i=t.velocityX,n=t.velocityY,o=t.maxPointLength,r=t.distance,s=i,a=n;this.isOnlyHorizontal()?a=0:this.isOnlyVertical()&&(s=0);var c=Math.sqrt(s*s+a*a);return 1===o&&this.options.threshold<r&&this.isVaildDirection(e)&&this.options.velocity<c},e.DEFAULT_OPTIONS={name:"swipe",threshold:10,velocity:.3,pointLength:1,directions:DIRECTION_ALL},e}(Recognizer),PinchRecognizer=function(t){function e(e){void 0===e&&(e={});var i=t.call(this,e)||this;return i._prevScale=1,i}return __extends(e,t),e.prototype.getTouchAction=function(){return[NONE]},e.prototype.afterEmit=function(t){if(INPUT_END!==t.eventType){var e=t.scale;if(1!==e){var i=e>this._prevScale?"out":"in";this.emit(this.options.name+i,t)}this._prevScale=e}},e.prototype.test=function(t){var e=t.pointLength,i=t.scale;return this.isValidPointLength(e)&&(this.options.threshold<Math.abs(i-1)||this.isRecognized)},e.DEFAULT_OPTIONS={name:"pinch",threshold:0,pointLength:2},e}(Recognizer),RotateRecognizer=function(t){function e(e){return void 0===e&&(e={}),t.call(this,e)||this}return __extends(e,t),e.prototype.getTouchAction=function(){return[NONE]},e.prototype.afterEmit=function(t){},e.prototype.test=function(t){var e=t.pointLength,i=t.angle;return this.isValidPointLength(e)&&(this.options.threshold<Math.abs(i)||this.isRecognized)},e.DEFAULT_OPTIONS={name:"rotate",threshold:0,pointLength:2},e}(Recognizer),default_1$6=function(){function t(t,e){this.default={touchAction:COMPUTE,hasDomEvents:!0,isPreventDefault:!0,preventDefaultExclude:/^(?:INPUT|TEXTAREA|BUTTON|SELECT)$/,syncToAttr:!1,cssPrevent:{selectText:!0,drag:!0,tapHighlight:!0,callout:!0}},void 0!==t&&(this.el=t),this.$store=new default_1$5,this.inputManage=new default_1$4({$store:this.$store}),this.touchDevice=SUPPORT_TOUCH?TOUCH:MOUSE,this.options=__assign({},this.default,e),this.eventEmitter=new AnyEvent,this._isStopped=!1;var i={eventEmitter:this.eventEmitter,options:this.options,el:t,update:this.update.bind(this)};this._root=i,this.recognizers=[(new RotateRecognizer).$injectRoot(i),(new PinchRecognizer).$injectRoot(i),(new PanRecognizer).$injectRoot(i),(new SwipeRecognizer).$injectRoot(i),(new TapRecognizer).$injectRoot(i),new TapRecognizer({name:"doubletap",pointLength:1,tapTimes:2,disabled:!0}).$injectRoot(i),(new PressRecognizer).$injectRoot(i)],this.recognizers[4].requireFailure(this.recognizers[5]),void 0!==this.el&&(this.update(),this._unbindEl=this._bindEL(this.el)._unbindEl)}return t.prototype.updateTouchAction=function(){var t,e;if(COMPUTE===this.options.touchAction){var i=[];try{for(var n=__values(this.recognizers),o=n.next();!o.done;o=n.next()){var r=o.value;i.push.apply(i,__spread(r.getTouchAction()))}}catch(e){t={error:e}}finally{try{o&&!o.done&&(e=n.return)&&e.call(n)}finally{if(t)throw t.error}}this.el.style.touchAction=computeTouchAction(i)}else this.el.style.touchAction=this.options.touchAction||AUTO},t.prototype.updateCssPrevent=function(){var t={},e=this.options.cssPrevent;if(void 0!==e)for(var i in e.selectText&&(t.mozUserSelect=NONE,t.userSelect=NONE,t.msUserSelect=NONE,t.webkitUserSelect=NONE,t.msTouchSelect=NONE),e.drag&&(t.webkitUserDrag=NONE),e.tapHighlight&&(t.webkitTapHighlightColor="rgba(0,0,0,0)"),e.callout&&(t.webkitTouchCallout=NONE),t)this.el.style[i]=t[i]},t.prototype.update=function(){void 0!==this.el&&(this.updateTouchAction(),this.updateCssPrevent())},t.prototype._bindEL=function(t){var e=this.catchEvent.bind(this);if(TOUCH===this.touchDevice){var i=[TOUCH_START,TOUCH_MOVE,TOUCH_END,TOUCH_CANCEL];return i.forEach(function(i){t.addEventListener(i,e)}),{_unbindEl:function(){i.forEach(function(i){t.removeEventListener(i,e)})}}}return t.addEventListener(MOUSE_DOWN,e),window.addEventListener(MOUSE_MOVE,e),window.addEventListener(MOUSE_UP,e),{_unbindEl:function(){t.removeEventListener(MOUSE_DOWN,e),window.removeEventListener(MOUSE_MOVE,e),window.removeEventListener(MOUSE_UP,e)}}},t.prototype.add=function(t){t.$injectRoot(this._root),this.recognizers.some(function(e){return t.name===e.name})?this.eventEmitter.emit("error",{code:1,message:t.name+"识别器已经存在!"}):(this.recognizers.push(t),this.update())},t.prototype.get=function(t){return this.recognizers.find(function(e){return t===e.options.name})},t.prototype.set=function(t){this.options=__assign({},this.default,t),this.update()},t.prototype.stop=function(){this._isStopped=!0},t.prototype.remove=function(t){var e,i;try{for(var n=__values(this.recognizers.entries()),o=n.next();!o.done;o=n.next()){var r=__read(o.value,2),s=r[0];if(t===r[1].options.name){this.recognizers.splice(s,1);break}}}catch(t){e={error:t}}finally{try{o&&!o.done&&(i=n.return)&&i.call(n)}finally{if(e)throw e.error}}},t.prototype.canPreventDefault=function(t){if(!this.options.isPreventDefault)return!1;var e=!1;if(null!==t.target){var i=this.options.preventDefaultExclude;if(isRegExp(i)){var n=t.target.tagName;void 0!==n&&(e=!i.test(n))}else isFunction(i)&&(e=!i(t))}return e},t.prototype.catchEvent=function(t){var e,i;this.canPreventDefault(t)&&t.preventDefault();var n=this.inputManage.load(t);if(void 0!==n){this.emit("input",n),n.isStart&&(this._isStopped=!1);try{for(var o=__values(this.recognizers),r=o.next();!r.done;r=o.next()){var s=r.value;if(!s.disabled&&(s.recognize(n),this._isStopped))break}}catch(t){e={error:t}}finally{try{r&&!r.done&&(i=o.return)&&i.call(o)}finally{if(e)throw e.error}}}},t.prototype.on=function(t,e,i){void 0===i&&(i=!1),this.eventEmitter.on(t,e)},t.prototype.off=function(t,e){this.eventEmitter.off(t,e)},t.prototype.emit=function(t,e){this.eventEmitter.emit(t,__assign({},e,{type:t}))},t.prototype._unbindEl=function(){},t.prototype.destroy=function(){this.$store.destroy(),this.el&&this._unbindEl(),this.eventEmitter.destroy()},t.Tap=TapRecognizer,t.Press=PressRecognizer,t.Pan=PanRecognizer,t.Swipe=SwipeRecognizer,t.Pinch=PinchRecognizer,t.Rotate=RotateRecognizer,t.version="0.5.2",t.Vector=Vector,t.EventEmitter=AnyEvent,t}();module.exports=default_1$6;