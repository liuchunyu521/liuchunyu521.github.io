  var docEl = document.documentElement;
  
  function getSize() { // 获取屏幕的宽度
      function getWdith() {
          var myWidth = 0;
          if (typeof(window.innerWidth) == 'number') {
              //Non-IE  
              myWidth = window.innerWidth;
          } else if (document.documentElement && (document.documentElement.clientWidth)) {
              //IE 6+ in 'standards compliant mode'  
              myWidth = document.documentElement.clientWidth;
          } else if (document.body && (document.body.clientWidth)) {
              //IE 4 compatible  
              myWidth = document.body.clientWidth;
          }
          return parseInt(myWidth);
      };
      var screenWidth = getWdith();
      docEl.style.fontSize = screenWidth / (750 / 40) + 'px';
  }

  function extended(s, p) {
      if (typeof s !== "object") {
          s = {};
      }
      if (typeof p != "object") {
          return s;
      }
      for (props in p) {
          if (Object.prototype.hasOwnProperty.call(s, props)) {
              if (typeof s[props] === "object") {
                  arguments.callee(s[props], p[props])
              } else {
                  s[props] = p[props];
              }

          }
      }
      return s;
  }

  function getRequest(param) {
      var url = location.search; //获取url中"?"符后的字串   
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
          var str = url.substr(1);
          strs = str.split("&");
          for (var i = 0; i < strs.length; i++) {
              theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
          }
      }
      return theRequest[param] || "";
  }

  getSize(); // 页面加载完执行一次
  window.onresize = function() {
      getSize();
  }

  function judgeVersion() {
      //判断安卓还是ios终端
      var browser = {
          versions: function() {
              var u = navigator.userAgent,
                  app = navigator.appVersion;
              return {
                  ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                  android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
              };
          }()
      }
      console.log("browser" + browser.versions);
      if (browser.versions.ios) {
          return "1";
      }
      if (browser.versions.android) {
          return "0";
      }

      return ''
  }
  //是否在微信端 
  function wxTest(fn) {
      // 对浏览器的UserAgent进行正则匹配，不含有微信独有标识的则为其他浏览器
      var useragent = navigator.userAgent;
      if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
          // 这里警告框会阻塞当前页面继续加载
          document.body.innerHTML = ''
          alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
          // 以下代码是用javascript强行关闭当前页面
          var opened = window.open('about:blank', '_self');
          opened.opener = null;
          opened.close();
          // typeof fn == 'function' && fn();
      }
  }

  var oldFn = window.onpageshow;
  if (typeof oldFn == 'function') {
      window.onpageshow = function() {
          oldFn();
          //wxTest();
      }
  } else {
      // window.onpageshow = wxTest;
  }
