// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
window.hashMap = xObject.length !== 0 ? xObject : [{
  url: "https://www.acfun.cn",
  shortCut: "acfun"
}, {
  url: "https://www.bilibili.com/",
  shortCut: "bili"
}, {
  url: "https://xiedaimala.com/",
  shortCut: "xiedaimala"
}, {
  url: "https://flatuicolors.com/",
  shortCut: "color"
}, {
  url: "https://www.iconfont.cn",
  shortCut: "icon"
}, {
  url: "https://docs.qq.com/",
  shortCut: "doc"
}];

var simpleUrl = function simpleUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace(/\/.*/, '');
};

var render = function render() {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n            <div class=\"site\" title=\"\u5FEB\u6377\u952E\u4E3A'".concat(node.shortCut, "'\">\n                <div class=\"logo\">\n                    <img src='https://").concat(simpleUrl(node.url), "/favicon.ico' onerror=\"faviconOnErr(this)\"/>\n                </div>\n                <div class=\"link\">").concat(simpleUrl(node.url), "</div>\n                <div class=\"close\">\n                <svg class=\"icon\">\n                    <use xlink:href=\"#icon-close\"></use>\n                </svg></div>\n            </div>\n    </li>")).insertBefore($('.last'));
    $li.on('click', function (e) {
      window.open(node.url);
    });
    $li.on('click', '.close', function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();
$('.addButton').on('click', function (e) {
  var url = window.prompt('输入网址');

  if (!url.trim()) {
    return;
  }

  var shortCut = window.prompt('输入快捷命令').trim();

  if (url.indexOf('http') !== 0) {
    url = "https://" + url;
  }

  hashMap.push({
    url: url,
    shortCut: shortCut
  });
  render();
  setLocalStorage();
});

window.onbeforeunload = function () {
  setLocalStorage();
};

faviconOnErr = function faviconOnErr(e) {
  $(" <svg class=\"icon\"><use xlink:href=\"#icon-default\"></use></svg>").insertBefore($(e));
  $(e).remove();
};

setLocalStorage = function setLocalStorage() {
  localStorage.setItem('x', JSON.stringify(hashMap));
};

var isInputing = true;
var currentValue = "";
$(document).on('keydown', function (e) {
  var key = e.key;
  var altKey = e.altKey;

  if (altKey && key === 's') {
    $('.searchForm>svg').trigger("click");
  }
});
$(document).on('keypress', function (e) {
  var key = e.key;

  if (!isInputing) {
    return;
  }

  currentValue += key;
  setTimeout(function () {
    currentValue = "";
  }, 1500);

  for (var i = 0; i < hashMap.length; i++) {
    var element = hashMap[i];

    if (element.shortCut === currentValue) {
      window.open(element.url);
    }
  }
});
$('#searchValue').focus(function () {
  isInputing = false;
});
$('#searchValue').blur(function () {
  isInputing = true;
});
$('.shiftModel').on('click', function (e) {
  var iconType = $('.shiftIcon').attr("xlink:href");

  if (iconType === '#icon-taiyang') {
    $('.shiftIcon').attr("xlink:href", "#icon-yueliang");
    $('body').removeClass('dark');
  } else if (iconType === '#icon-yueliang') {
    $('.shiftIcon').attr("xlink:href", "#icon-taiyang");
    $('body').addClass('dark');
  }
});
$('.searchForm>svg').on('click', function () {
  var icon = $('.searchForm>svg>use');
  var iconType = icon.attr("xlink:href");
  var searchForm = $('.searchForm');
  var searchValue = $('#searchValue');

  if (iconType === '#icon-google') {
    icon.attr("xlink:href", "#icon-baidu");
    searchForm.attr("action", "https://www.baidu.com/s");
    searchValue.attr("name", "wd");
  } else if (iconType === '#icon-baidu') {
    icon.attr("xlink:href", "#icon-google");
    searchForm.attr("action", "https://www.google.com/search?");
    searchValue.attr("name", "q");
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.4017cde9.js.map