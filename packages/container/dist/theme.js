"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styles = require("@material-ui/core/styles");

var _green = _interopRequireDefault(require("@material-ui/core/colors/green"));

var _lightBlue = _interopRequireDefault(require("@material-ui/core/colors/lightBlue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var theme = (0, _styles.createMuiTheme)({
  palette: {
    primary: {
      light: _green["default"][300],
      main: _green["default"][500],
      dark: _green["default"][700],
      contrastText: '#fff'
    },
    secondary: {
      light: _lightBlue["default"][200],
      main: _lightBlue["default"][400],
      dark: _lightBlue["default"][600],
      contrastText: '#fff'
    }
  }
});
var _default = theme;
exports["default"] = _default;