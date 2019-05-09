'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = autoEncodeURI;
function autoEncodeURI(templateParts) {
  var parts = new Array(templateParts.length * 2 - 1);
  parts[0] = templateParts[0];

  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  for (var i = 0, len = values.length; i < len; i++) {
    var value = values[i];
    parts[2 * i + 1] = encodeURIComponent(value);
    parts[2 * i + 2] = templateParts[i + 1];
  }
  return parts.join('');
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRvLWVuY29kZS11cmkuanMiXSwibmFtZXMiOlsiYXV0b0VuY29kZVVSSSIsInRlbXBsYXRlUGFydHMiLCJwYXJ0cyIsIkFycmF5IiwibGVuZ3RoIiwidmFsdWVzIiwiaSIsImxlbiIsInZhbHVlIiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBRXdCQSxhO0FBQVQsU0FBU0EsYUFBVCxDQUF1QkMsYUFBdkIsRUFBMEU7QUFDdkYsTUFBTUMsUUFBUSxJQUFJQyxLQUFKLENBQVVGLGNBQWNHLE1BQWQsR0FBcUIsQ0FBckIsR0FBdUIsQ0FBakMsQ0FBZDtBQUNBRixRQUFNLENBQU4sSUFBV0QsY0FBYyxDQUFkLENBQVg7O0FBRnVGLG9DQUF2QkksTUFBdUI7QUFBdkJBLFVBQXVCO0FBQUE7O0FBR3ZGLE9BQUssSUFBSUMsSUFBRSxDQUFOLEVBQVNDLE1BQUlGLE9BQU9ELE1BQXpCLEVBQWlDRSxJQUFFQyxHQUFuQyxFQUF3Q0QsR0FBeEMsRUFBNkM7QUFDM0MsUUFBTUUsUUFBZ0JILE9BQU9DLENBQVAsQ0FBdEI7QUFDQUosVUFBTSxJQUFFSSxDQUFGLEdBQUksQ0FBVixJQUFlRyxtQkFBbUJELEtBQW5CLENBQWY7QUFDQU4sVUFBTSxJQUFFSSxDQUFGLEdBQUksQ0FBVixJQUFlTCxjQUFjSyxJQUFFLENBQWhCLENBQWY7QUFDRDtBQUNELFNBQU9KLE1BQU1RLElBQU4sQ0FBVyxFQUFYLENBQVA7QUFDRCIsImZpbGUiOiJhdXRvLWVuY29kZS11cmkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhdXRvRW5jb2RlVVJJKHRlbXBsYXRlUGFydHM6IHN0cmluZ1tdLCAuLi52YWx1ZXM6IGFueVtdKTogc3RyaW5nIHtcbiAgY29uc3QgcGFydHMgPSBuZXcgQXJyYXkodGVtcGxhdGVQYXJ0cy5sZW5ndGgqMi0xKTtcbiAgcGFydHNbMF0gPSB0ZW1wbGF0ZVBhcnRzWzBdO1xuICBmb3IgKGxldCBpPTAsIGxlbj12YWx1ZXMubGVuZ3RoOyBpPGxlbjsgaSsrKSB7XG4gICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHZhbHVlc1tpXTtcbiAgICBwYXJ0c1syKmkrMV0gPSBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgIHBhcnRzWzIqaSsyXSA9IHRlbXBsYXRlUGFydHNbaSsxXTtcbiAgfVxuICByZXR1cm4gcGFydHMuam9pbignJyk7XG59XG4iXX0=