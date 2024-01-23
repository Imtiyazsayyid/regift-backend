"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkExists = checkExists;
exports.getDateOrNull = getDateOrNull;
exports.getDateTimeOrNull = getDateTimeOrNull;
exports.getDoubleOrNull = getDoubleOrNull;
exports.getDoubleOrZero = getDoubleOrZero;
exports.getIntOrNull = getIntOrNull;
exports.getIntOrUndefined = getIntOrUndefined;
exports.getIntOrZero = getIntOrZero;
exports.getNumberOrOne = getNumberOrOne;
exports.getNumberOrZero = getNumberOrZero;
exports.getObjOrNull = getObjOrNull;
exports.getObjOrUndefined = getObjOrUndefined;
exports.getOneOrZero = getOneOrZero;
exports.getStringOrNull = getStringOrNull;
exports.getTrueOrFalse = getTrueOrFalse;
exports.knexPagination = knexPagination;
exports.removeRepetitions = removeRepetitions;
exports.validateEmail = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _knex = _interopRequireDefault(require("./knex"));
var _constant = require("./constant");
var _moment = _interopRequireDefault(require("moment"));
function getDateTimeOrNull(item) {
  try {
    if (item && (0, _moment["default"])(item).isValid()) {
      return (0, _moment["default"])(item).format(_constant.MYSQL_MOMENT_DATETIME_FORMAT);
    }
    return null;
  } catch (err) {
    return null;
  }
}
function getDateOrNull(item) {
  try {
    if (item && (0, _moment["default"])(item).isValid()) {
      return (0, _moment["default"])(item).format(_constant.MYSQL_MOMENT_DATE_FORMAT);
    }
    return null;
  } catch (err) {
    return null;
  }
}
function getStringOrNull(item) {
  try {
    if (item) {
      return item.toString();
    }
    return null;
  } catch (error) {
    return null;
  }
}
function getOneOrZero(item) {
  return item ? '1' : '0';
}
function getObjOrNull(obj) {
  return obj ? obj : null;
}
function getObjOrUndefined(value) {
  try {
    if (!value) {
      return undefined;
    }
    return value;
  } catch (err) {
    return undefined;
  }
}
function getIntOrNull(val) {
  try {
    if (!isNaN(val) && parseInt(val) >= 0) {
      return parseInt(val);
    }
    return null;
  } catch (err) {
    return null;
  }
}
function getNumberOrZero(val) {
  try {
    if (val && !isNaN(val)) {
      return Number(val);
    }
    return 0;
  } catch (err) {
    return 0;
  }
}
function getNumberOrOne(val) {
  try {
    if (val && !isNaN(val)) {
      return Number(val);
    }
    return 1;
  } catch (err) {
    return 1;
  }
}
function getDoubleOrNull(val) {
  try {
    if (!isNaN(val) && parseInt(val) >= 0) {
      return Number(val).toFixed(2);
    }
    return null;
  } catch (err) {
    return null;
  }
}
function getDoubleOrZero(val) {
  try {
    if (val && !isNaN(val)) {
      return Number(val).toFixed(2);
    }
    return 0;
  } catch (err) {
    return 0;
  }
}
function getIntOrZero(val) {
  try {
    if (!isNaN(val) && parseInt(val) >= 0) {
      return parseInt(val);
    }
    return 0;
  } catch (err) {
    return 0;
  }
}
function getIntOrUndefined(val) {
  try {
    if (!isNaN(val) && Number.isInteger(val) && val >= 0) {
      return parseInt(val);
    }
    return undefined;
  } catch (err) {
    return undefined;
  }
}
function getTrueOrFalse(value) {
  if (!value) {
    return false;
  }
  return true;
}
function removeRepetitions(array) {
  var new_arr = [];
  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    if (!new_arr.includes(item)) {
      new_arr.push(item);
    }
  }
  return new_arr;
}
function knexPagination(perPage, currentPage) {
  var paginate = {
    perPage: null,
    currentPage: null
  };
  paginate.currentPage = currentPage && !isNaN(currentPage) ? parseInt(currentPage) : 1;
  paginate.perPage = perPage && !isNaN(perPage) ? parseInt(perPage, null) : 15;
  return paginate;
}
var validateEmail = exports.validateEmail = function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};
function checkExists(_x, _x2, _x3, _x4, _x5, _x6) {
  return _checkExists.apply(this, arguments);
}
function _checkExists() {
  _checkExists = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(table_name, id_name, id, compare_column, compare_str, paramFirstString) {
    var _yield$knex$where, _yield$knex$where2, checkExists;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _knex["default"])(table_name).where(function (builder) {
            builder.where(compare_column, compare_str);
            if (id && !isNaN(id)) builder.whereNot(id_name, id);
          });
        case 2:
          _yield$knex$where = _context.sent;
          _yield$knex$where2 = (0, _slicedToArray2["default"])(_yield$knex$where, 1);
          checkExists = _yield$knex$where2[0];
          if (!checkExists) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", {
            exists: true,
            message: "".concat(paramFirstString, " ").concat(compare_str, " Already Exists")
          });
        case 7:
          return _context.abrupt("return", {
            exists: false
          });
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _checkExists.apply(this, arguments);
}