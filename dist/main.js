(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _gameover = _interopRequireDefault(require("./modules/gameover"));
var _modals = _interopRequireDefault(require("./modules/modals"));
var _gameplay = _interopRequireDefault(require("./modules/gameplay"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
  todo: Make code more pretty and divide it into diff functions DONE √
  todo: Make a move system DONE √
  todo: Make an animation of appearing for modal DONE √
  todo: Create a to play with a bot mode
*/

window.addEventListener('DOMContentLoaded', function () {
  (0, _gameplay.default)({
    blocksSel: '.block',
    modalSel: '.modal',
    modalBinderFunction: _modals.default,
    moveSel: '.move',
    gameOverFunction: _gameover.default
  });
});

},{"./modules/gameover":2,"./modules/gameplay":3,"./modules/modals":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var gameover = function gameover(blocks, typeClass) {
  var symbols = blocks.map(function (e) {
    var symbol = e.firstElementChild;
    if (symbol) {
      return symbol.classList.contains(typeClass) ? 1 : 0;
    } else {
      return 0;
    }
  });
  var isCheckFinished;
  var winCombinations = ['012', '345', '678', '036', '147', '258', '048', '246'];
  winCombinations.forEach(function (c) {
    if (symbols[c[0]] && symbols[c[1]] && symbols[c[2]]) {
      isCheckFinished = true;
    }
  });
  if (isCheckFinished) return true;

  // if (blocks.every(e => e.firstElementChild)) return true
};
var _default = gameover;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var gameplay = function gameplay() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    blocksSel = _ref.blocksSel,
    modalSel = _ref.modalSel,
    modalBinderFunction = _ref.modalBinderFunction,
    moveSel = _ref.moveSel,
    gameOverFunction = _ref.gameOverFunction;
  var ending = function ending() {
    blocks.forEach(function (b) {
      return b.innerHTML = '';
    });
    changeMove();
    nse = 0;
  };
  var blocks = document.querySelectorAll(blocksSel),
    modal = document.querySelector(modalSel),
    move = document.querySelector(moveSel);
  modalBinderFunction('.modal', ending);
  var showModal = function showModal() {
    modal.classList.remove('hide');
    modal.classList.add('fadeIn');
  };
  var changeMove = function changeMove() {
    if (nse % 2 != 0) {
      move.innerHTML = '&times;';
      move.style.cssText = "\n        font-size: 60px;\n        color: red;\n        line-height: 0;\n      ";
    } else {
      move.innerHTML = '&bigcirc;';
      move.style.cssText = "\n        font-size: 30px;\n        color: blue;\n      ";
    }
  };
  changeMove();
  var cross = "<div class=\"cross\">&times;</div>",
    circle = "<div class=\"circle\">&bigcirc;</div>";
  var nse = 0; //number of symbols entered

  blocks.forEach(function (b, i) {
    b.addEventListener('click', function () {
      if (!b.innerHTML) {
        changeMove();
        if (nse % 2 == 0) {
          b.insertAdjacentHTML("beforeend", cross);
        } else {
          b.insertAdjacentHTML("beforeend", circle);
        }
        nse++;
      }
      if (nse > 4) {
        if (gameOverFunction(_toConsumableArray(blocks), 'cross')) {
          showModal();
          modal.firstElementChild.textContent = "Red wins!";
        }
        if (gameOverFunction(_toConsumableArray(blocks), 'circle')) {
          showModal();
          modal.firstElementChild.textContent = "Blue wins!";
        }
      }
      if (nse === 9) {
        showModal();
        modal.firstElementChild.textContent = "Draw!";
      }
    });
  });
};
var _default = gameplay;
exports.default = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var modals = function modals(modalSel, callBack) {
  var modal = document.querySelector(modalSel);
  modal.addEventListener('click', function (e) {
    var target = e.target;
    if (target === modal) {
      modal.classList.add('hide');
      callBack();
    }
  });

  // closeBtns.forEach(btn => {
  //   btn.addEventListener('click', () => {
  //     modal.classList.add('hide')
  //     callBack()
  //   })
  // })
};
var _default = modals;
exports.default = _default;

},{}]},{},[1]);
