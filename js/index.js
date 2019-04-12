'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Streak = undefined;

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['pipelines/', ''], ['pipelines/', '']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/boxes'], ['pipelines/', '/boxes']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/boxes?stageKey=', ''], ['pipelines/', '/boxes?stageKey=', '']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/newsfeed'], ['pipelines/', '/newsfeed']),
    _templateObject5 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/stages'], ['pipelines/', '/stages']),
    _templateObject6 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/stages/', ''], ['pipelines/', '/stages/', '']),
    _templateObject7 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/fields'], ['pipelines/', '/fields']),
    _templateObject8 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/fields/', ''], ['pipelines/', '/fields/', '']),
    _templateObject9 = (0, _taggedTemplateLiteral3.default)(['boxes/', ''], ['boxes/', '']),
    _templateObject10 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/fields'], ['boxes/', '/fields']),
    _templateObject11 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/reminders'], ['boxes/', '/reminders']),
    _templateObject12 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/comments'], ['boxes/', '/comments']),
    _templateObject13 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/files'], ['boxes/', '/files']),
    _templateObject14 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/threads'], ['boxes/', '/threads']),
    _templateObject15 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/newsfeed'], ['boxes/', '/newsfeed']),
    _templateObject16 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/tasks'], ['boxes/', '/tasks']),
    _templateObject17 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/fields/', ''], ['boxes/', '/fields/', '']),
    _templateObject18 = (0, _taggedTemplateLiteral3.default)(['files/', ''], ['files/', '']),
    _templateObject19 = (0, _taggedTemplateLiteral3.default)(['files/', '/contents'], ['files/', '/contents']),
    _templateObject20 = (0, _taggedTemplateLiteral3.default)(['threads/', ''], ['threads/', '']),
    _templateObject21 = (0, _taggedTemplateLiteral3.default)(['tasks/', ''], ['tasks/', '']),
    _templateObject22 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/webhooks'], ['pipelines/', '/webhooks']),
    _templateObject23 = (0, _taggedTemplateLiteral3.default)(['webhooks/', ''], ['webhooks/', '']),
    _templateObject24 = (0, _taggedTemplateLiteral3.default)(['search?query=', ''], ['search?query=', '']);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _autoEncodeUri = require('./auto-encode-uri');

var _autoEncodeUri2 = _interopRequireDefault(_autoEncodeUri);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConnHelper = function () {
  function ConnHelper(authKey) {
    (0, _classCallCheck3.default)(this, ConnHelper);

    this._authKey = authKey;
  }

  (0, _createClass3.default)(ConnHelper, [{
    key: '_getRequestOptions',
    value: function _getRequestOptions(method, path) {
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var encoding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'utf8';

      // By default we request the V1 of the API
      var prefix = '/api/v1/';

      // If the requested resource is a Task, then use the V2 of the API
      if (path.indexOf('tasks') > -1) prefix = '/api/v2/';
      if (path.indexOf('webhooks') > -1) prefix = '/api/v2/';

      // If the requested resource is a Task, then use the V2 of the API
      var v2prefix = '/api/v2/';
      if (path.indexOf('tasks') > -1) prefix = v2prefix;
      if (path.indexOf('webhooks') > -1) prefix = v2prefix;
      if (path.indexOf('boxes') > -1 && method.toLowerCase() === 'post') prefix = v2prefix;

      return {
        method: method, headers: headers, encoding: encoding,
        host: 'www.streak.com',
        path: prefix + path,
        auth: this._authKey
      };
    }
  }, {
    key: '_parseResponse',
    value: function _parseResponse(response) {
      return new _promise2.default(function (resolve, reject) {
        var strs = [];
        response.on('data', function (chunk) {
          strs.push(chunk);
        });
        response.on('end', function () {
          try {
            var str = strs.join('');
            if (response.statusCode === 200) {
              resolve(JSON.parse(str));
            } else {
              var json = void 0;
              var errorMessage = 'Response code ' + response.statusCode;
              try {
                json = JSON.parse(str);
                if (json && json.error) {
                  errorMessage = json.error;
                }
              } catch (err) {
                // Ignore parse error
              }
              reject((0, _assign2.default)(new Error(errorMessage), {
                str: str, json: json,
                statusCode: response.statusCode,
                headers: response.headers
              }));
            }
          } catch (err) {
            reject(err);
          }
        });
        response.on('error', reject);
      });
    }
  }, {
    key: '_plainResponse',
    value: function _plainResponse(response) {
      return new _promise2.default(function (resolve, reject) {
        var chunks = [];
        response.on('data', function (chunk) {
          chunks.push(chunk);
        });
        response.on('end', function () {
          try {
            var buf = Buffer.concat(chunks);
            if (response.statusCode === 200) {
              resolve(buf);
            } else {
              var errorMessage = 'Response code ' + response.statusCode;
              reject((0, _assign2.default)(new Error(errorMessage), {
                buf: buf,
                statusCode: response.statusCode,
                headers: response.headers
              }));
            }
          } catch (err) {
            reject(err);
          }
        });
        response.on('error', reject);
      });
    }
  }, {
    key: 'get',
    value: function get(path) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        var opts = _this._getRequestOptions('GET', path);
        var request = _https2.default.request(opts, function (res) {
          resolve(_this._parseResponse(res));
        });
        request.on('error', reject);
        request.end();
      });
    }
  }, {
    key: 'getNoParse',
    value: function getNoParse(path) {
      var _this2 = this;

      return new _promise2.default(function (resolve, reject) {
        var opts = _this2._getRequestOptions('GET', path, undefined, null);
        var request = _https2.default.request(opts, function (res) {
          resolve(_this2._plainResponse(res));
        });
        request.on('error', reject);
        request.end();
      });
    }
  }, {
    key: 'put',
    value: function put(path, data) {
      var _this3 = this;

      return new _promise2.default(function (resolve, reject) {
        var dstr = _querystring2.default.stringify(data);
        var opts = _this3._getRequestOptions('PUT', path + '?' + dstr);
        var request = _https2.default.request(opts, function (res) {
          resolve(_this3._parseResponse(res));
        });
        request.on('error', reject);
        request.end();
      });
    }
  }, {
    key: 'delete',
    value: function _delete(path) {
      var _this4 = this;

      return new _promise2.default(function (resolve, reject) {
        var opts = _this4._getRequestOptions('DELETE', path);
        var request = _https2.default.request(opts, function (res) {
          resolve(_this4._parseResponse(res));
        });
        request.on('error', reject);
        request.end();
      });
    }
  }, {
    key: 'post',
    value: function post(path, data) {
      var _this5 = this;

      return new _promise2.default(function (resolve, reject) {
        var send = _querystring2.default.stringify({ json: (0, _stringify2.default)(data) });
        var opts = _this5._getRequestOptions('POST', path, {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': send.length
        });
        var request = _https2.default.request(opts, function (res) {
          resolve(_this5._parseResponse(res));
        });
        request.write(send);
        request.on('error', reject);
        request.end();
      });
    }
  }]);
  return ConnHelper;
}();

var Me = function () {
  function Me(s, c) {
    (0, _classCallCheck3.default)(this, Me);

    this._s = s;
    this._c = c;
  }

  (0, _createClass3.default)(Me, [{
    key: 'get',
    value: function get() {
      return this._c.get('users/me');
    }
  }]);
  return Me;
}();

var Pipelines = function () {
  function Pipelines(s, c) {
    (0, _classCallCheck3.default)(this, Pipelines);

    this._s = s;
    this._c = c;
    this.Stages = new PipelineStages(s, c);
    this.Fields = new PipelineFields(s, c);
  }

  (0, _createClass3.default)(Pipelines, [{
    key: 'getAll',
    value: function getAll() {
      return this._c.get('pipelines');
    }
  }, {
    key: 'getOne',
    value: function getOne(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject, key));
    }
  }, {
    key: 'getBoxes',
    value: function getBoxes(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject2, key));
    }
  }, {
    key: 'getBoxesInStage',
    value: function getBoxesInStage(key, stageKey) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject3, key, stageKey));
    }
  }, {
    key: 'create',
    value: function create(data) {
      return this._c.put('pipelines', data);
    }
  }, {
    key: 'delete',
    value: function _delete(key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject, key));
    }
  }, {
    key: 'update',
    value: function update(data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject, data.key), data);
    }
  }, {
    key: 'getFeed',
    value: function getFeed(key, detailLevel) {
      var qs = '';
      if (detailLevel) {
        qs += '?' + _querystring2.default.stringify({ detailLevel: detailLevel });
      }
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject4, key) + qs);
    }
  }]);
  return Pipelines;
}();

var PipelineStages = function () {
  function PipelineStages(s, c) {
    (0, _classCallCheck3.default)(this, PipelineStages);

    this._s = s;
    this._c = c;
  }

  (0, _createClass3.default)(PipelineStages, [{
    key: 'getAll',
    value: function getAll(pipeKey) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject5, pipeKey));
    }
  }, {
    key: 'getOne',
    value: function getOne(pipeKey, key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject6, pipeKey, key));
    }
  }, {
    key: 'create',
    value: function create(pipeKey, data) {
      return this._c.put((0, _autoEncodeUri2.default)(_templateObject5, pipeKey), data);
    }
  }, {
    key: 'delete',
    value: function _delete(pipeKey, key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject6, pipeKey, key));
    }
  }, {
    key: 'update',
    value: function update(pipeKey, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject6, pipeKey, data.key), data);
    }
  }]);
  return PipelineStages;
}();

var PipelineFields = function () {
  function PipelineFields(s, c) {
    (0, _classCallCheck3.default)(this, PipelineFields);

    this._s = s;
    this._c = c;
  }

  (0, _createClass3.default)(PipelineFields, [{
    key: 'getAll',
    value: function getAll(pipeKey) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject7, pipeKey));
    }
  }, {
    key: 'getOne',
    value: function getOne(pipeKey, key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject8, pipeKey, key));
    }
  }, {
    key: 'create',
    value: function create(pipeKey, data) {
      return this._c.put((0, _autoEncodeUri2.default)(_templateObject7, pipeKey), data);
    }
  }, {
    key: 'delete',
    value: function _delete(pipeKey, key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject8, pipeKey, key));
    }
  }, {
    key: 'update',
    value: function update(pipeKey, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject8, pipeKey, data.key), data);
    }
  }]);
  return PipelineFields;
}();

var Boxes = function () {
  function Boxes(s, c) {
    (0, _classCallCheck3.default)(this, Boxes);

    this._s = s;
    this._c = c;
    this.Fields = new BoxFields(s, c);
  }

  (0, _createClass3.default)(Boxes, [{
    key: 'getAll',
    value: function getAll() {
      return this._c.get('boxes');
    }
  }, {
    key: 'getForPipeline',
    value: function getForPipeline(key) {
      return this._s.Pipelines.getBoxes(key);
    }
  }, {
    key: 'getOne',
    value: function getOne(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject9, key));
    }
  }, {
    key: 'create',
    value: function create(pipeKey, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject2, pipeKey), data);
    }
  }, {
    key: 'delete',
    value: function _delete(key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject9, key));
    }
  }, {
    key: 'update',
    value: function update(data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject9, data.key), data);
    }
  }, {
    key: 'getFields',
    value: function getFields(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject10, key));
    }
  }, {
    key: 'getReminders',
    value: function getReminders(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject11, key));
    }
  }, {
    key: 'getComments',
    value: function getComments(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject12, key));
    }

    // deprecated method

  }, {
    key: 'createComment',
    value: function createComment(key, data) {
      return this._c.put((0, _autoEncodeUri2.default)(_templateObject12, key), data);
    }
  }, {
    key: 'postComment',
    value: function postComment(key, message) {
      return this._c.put((0, _autoEncodeUri2.default)(_templateObject12, key), { message: message });
    }
  }, {
    key: 'getFiles',
    value: function getFiles(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject13, key));
    }
  }, {
    key: 'getThreads',
    value: function getThreads(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject14, key));
    }
  }, {
    key: 'getFeed',
    value: function getFeed(key, detailLevel) {
      var qs = '';
      if (detailLevel) {
        qs += '?' + _querystring2.default.stringify({ detailLevel: detailLevel });
      }
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject15, key) + qs);
    }
  }, {
    key: 'getTasks',
    value: function getTasks(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject16, key));
    }
  }]);
  return Boxes;
}();

var BoxFields = function () {
  function BoxFields(s, c) {
    (0, _classCallCheck3.default)(this, BoxFields);

    this._s = s;
    this._c = c;
  }

  (0, _createClass3.default)(BoxFields, [{
    key: 'getForBox',
    value: function getForBox(key) {
      return this._s.Boxes.getFields(key);
    }
  }, {
    key: 'getOne',
    value: function getOne(boxKey, key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject17, boxKey, key));
    }
  }, {
    key: 'update',
    value: function update(boxKey, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject17, boxKey, data.key), data);
    }
  }]);
  return BoxFields;
}();

var Files = function () {
  function Files(s, c) {
    (0, _classCallCheck3.default)(this, Files);

    this._s = s;
    this._c = c;
  }

  (0, _createClass3.default)(Files, [{
    key: 'getForBox',
    value: function getForBox(key) {
      return this._s.Boxes.getFiles(key);
    }
  }, {
    key: 'getOne',
    value: function getOne(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject18, key));
    }
  }, {
    key: 'getContents',
    value: function getContents(key) {
      return this._c.getNoParse((0, _autoEncodeUri2.default)(_templateObject19, key));
    }
  }]);
  return Files;
}();

var Threads = function () {
  function Threads(s, c) {
    (0, _classCallCheck3.default)(this, Threads);

    this._s = s;
    this._c = c;
  }

  (0, _createClass3.default)(Threads, [{
    key: 'getForBox',
    value: function getForBox(boxKey) {
      return this._s.Boxes.getThreads(boxKey);
    }
  }, {
    key: 'getOne',
    value: function getOne(threadKey) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject20, threadKey));
    }
  }]);
  return Threads;
}();

var Tasks = function () {
  function Tasks(s, c) {
    (0, _classCallCheck3.default)(this, Tasks);

    this._s = s;
    this._c = c;
  }

  (0, _createClass3.default)(Tasks, [{
    key: 'getForBox',
    value: function getForBox(boxKey) {
      return this._s.Boxes.getTasks(boxKey);
    }
  }, {
    key: 'getOne',
    value: function getOne(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject21, key));
    }
  }, {
    key: 'create',
    value: function create(boxKey, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject16, boxKey), data);
    }
  }, {
    key: 'update',
    value: function update(key, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject21, key), data);
    }
  }, {
    key: 'delete',
    value: function _delete(key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject21, key));
    }
  }]);
  return Tasks;
}();

var Webhooks = function () {
  function Webhooks(s, c) {
    (0, _classCallCheck3.default)(this, Webhooks);

    this._s = s;
    this._c = c;
  }

  /**
   * Get all webhooks for a pipeline
   *
   * @param key Pipeline key
   * @return {Promise.<Object>}
   */


  (0, _createClass3.default)(Webhooks, [{
    key: 'getForPipeline',
    value: function getForPipeline(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject22, key));
    }

    /**
     * Get a specific webhook
     *
     * @param key Webhook key
     * @return {Promise.<Object>}
     */

  }, {
    key: 'getOne',
    value: function getOne(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject23, key));
    }

    /**
     * Create a new webhook for pipeline
     *
     * @param key Pipeline key
     * @param data
     * @return {Promise.<Object>}
     */

  }, {
    key: 'create',
    value: function create(key, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject22, key), data);
    }

    /**
     * Delete a webhook
     *
     * @param key Webhook key
     * @return {Promise.<Object>}
     */

  }, {
    key: 'delete',
    value: function _delete(key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject23, key));
    }

    /**
     * Edit a webhook
     *
     * @param key Webhook key
     * @param data
     * @return {Promise.<Object>}
     */

  }, {
    key: 'update',
    value: function update(key, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject23, key), data);
    }
  }]);
  return Webhooks;
}();

var Streak = exports.Streak = function () {
  function Streak(authKey) {
    (0, _classCallCheck3.default)(this, Streak);

    this._c = new ConnHelper(authKey);
    this.Me = new Me(this, this._c);
    this.Pipelines = new Pipelines(this, this._c);
    this.Boxes = new Boxes(this, this._c);
    this.Files = new Files(this, this._c);
    this.Threads = new Threads(this, this._c);
    this.Tasks = new Tasks(this, this._c);
    this.Webhooks = new Webhooks(this, this._c);

    // constants for webhook event types
    this.Webhooks.boxCreate = 'BOX_CREATE';
    this.Webhooks.boxDelete = 'BOX_DELETE';
    this.Webhooks.stageCreate = 'STAGE_CREATE';
    this.Webhooks.boxNewEmailAddress = 'BOX_NEW_EMAIL_ADDRESS';
    this.Webhooks.boxEdit = 'BOX_EDIT';
    this.Webhooks.boxChangeState = 'BOX_CHANGE_STAGE';
    this.Webhooks.boxChangePipeline = 'BOX_CHANGE_PIPELINE';
    this.Webhooks.commentCreate = 'COMMENT_CREATE';
    this.Webhooks.taskCreate = 'TASK_CREATE';
    this.Webhooks.taskComplete = 'TASK_COMPLETE';
    this.Webhooks.taskDue = 'TASK_DUE';
  }

  (0, _createClass3.default)(Streak, [{
    key: 'search',
    value: function search(query) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject24, query));
    }
  }]);
  return Streak;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJDb25uSGVscGVyIiwiYXV0aEtleSIsIl9hdXRoS2V5IiwibWV0aG9kIiwicGF0aCIsImhlYWRlcnMiLCJlbmNvZGluZyIsInByZWZpeCIsImluZGV4T2YiLCJ2MnByZWZpeCIsInRvTG93ZXJDYXNlIiwiaG9zdCIsImF1dGgiLCJyZXNwb25zZSIsInJlc29sdmUiLCJyZWplY3QiLCJzdHJzIiwib24iLCJjaHVuayIsInB1c2giLCJzdHIiLCJqb2luIiwic3RhdHVzQ29kZSIsIkpTT04iLCJwYXJzZSIsImpzb24iLCJlcnJvck1lc3NhZ2UiLCJlcnJvciIsImVyciIsIkVycm9yIiwiY2h1bmtzIiwiYnVmIiwiQnVmZmVyIiwiY29uY2F0Iiwib3B0cyIsIl9nZXRSZXF1ZXN0T3B0aW9ucyIsInJlcXVlc3QiLCJfcGFyc2VSZXNwb25zZSIsInJlcyIsImVuZCIsInVuZGVmaW5lZCIsIl9wbGFpblJlc3BvbnNlIiwiZGF0YSIsImRzdHIiLCJzdHJpbmdpZnkiLCJzZW5kIiwibGVuZ3RoIiwid3JpdGUiLCJNZSIsInMiLCJjIiwiX3MiLCJfYyIsImdldCIsIlBpcGVsaW5lcyIsIlN0YWdlcyIsIlBpcGVsaW5lU3RhZ2VzIiwiRmllbGRzIiwiUGlwZWxpbmVGaWVsZHMiLCJrZXkiLCJzdGFnZUtleSIsInB1dCIsImRlbGV0ZSIsInBvc3QiLCJkZXRhaWxMZXZlbCIsInFzIiwicGlwZUtleSIsIkJveGVzIiwiQm94RmllbGRzIiwiZ2V0Qm94ZXMiLCJtZXNzYWdlIiwiZ2V0RmllbGRzIiwiYm94S2V5IiwiRmlsZXMiLCJnZXRGaWxlcyIsImdldE5vUGFyc2UiLCJUaHJlYWRzIiwiZ2V0VGhyZWFkcyIsInRocmVhZEtleSIsIlRhc2tzIiwiZ2V0VGFza3MiLCJXZWJob29rcyIsIlN0cmVhayIsImJveENyZWF0ZSIsImJveERlbGV0ZSIsInN0YWdlQ3JlYXRlIiwiYm94TmV3RW1haWxBZGRyZXNzIiwiYm94RWRpdCIsImJveENoYW5nZVN0YXRlIiwiYm94Q2hhbmdlUGlwZWxpbmUiLCJjb21tZW50Q3JlYXRlIiwidGFza0NyZWF0ZSIsInRhc2tDb21wbGV0ZSIsInRhc2tEdWUiLCJxdWVyeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztJQUVNQSxVO0FBR0osc0JBQWFDLE9BQWIsRUFBOEI7QUFBQTs7QUFDNUIsU0FBS0MsUUFBTCxHQUFnQkQsT0FBaEI7QUFDRDs7Ozt1Q0FFbUJFLE0sRUFBZ0JDLEksRUFBd0U7QUFBQSxVQUExREMsT0FBMEQsdUVBQXhDLEVBQXdDO0FBQUEsVUFBcENDLFFBQW9DLHVFQUFoQixNQUFnQjs7QUFDMUc7QUFDQSxVQUFJQyxTQUFTLFVBQWI7O0FBRUE7QUFDQSxVQUFJSCxLQUFLSSxPQUFMLENBQWEsT0FBYixJQUF3QixDQUFDLENBQTdCLEVBQWdDRCxTQUFTLFVBQVQ7QUFDaEMsVUFBSUgsS0FBS0ksT0FBTCxDQUFhLFVBQWIsSUFBMkIsQ0FBQyxDQUFoQyxFQUFtQ0QsU0FBUyxVQUFUOztBQUVuQztBQUNBLFVBQU1FLFdBQVcsVUFBakI7QUFDQSxVQUFJTCxLQUFLSSxPQUFMLENBQWEsT0FBYixJQUF3QixDQUFDLENBQTdCLEVBQWdDRCxTQUFTRSxRQUFUO0FBQ2hDLFVBQUlMLEtBQUtJLE9BQUwsQ0FBYSxVQUFiLElBQTJCLENBQUMsQ0FBaEMsRUFBbUNELFNBQVNFLFFBQVQ7QUFDbkMsVUFBSUwsS0FBS0ksT0FBTCxDQUFhLE9BQWIsSUFBd0IsQ0FBQyxDQUF6QixJQUE4QkwsT0FBT08sV0FBUCxPQUF5QixNQUEzRCxFQUFtRUgsU0FBU0UsUUFBVDs7QUFFbkUsYUFBTztBQUNMTixzQkFESyxFQUNHRSxnQkFESCxFQUNZQyxrQkFEWjtBQUVMSyxjQUFNLGdCQUZEO0FBR0xQLGNBQU1HLFNBQVNILElBSFY7QUFJTFEsY0FBTSxLQUFLVjtBQUpOLE9BQVA7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TCxHQUFhLElBQUlBLEtBQUosQ0FBVSxJQUFWLEVBQWdCLEtBQUszQixFQUFyQixDQUFiO0FBQ0EsU0FBSzZCLFFBQUwsR0FBZ0IsSUFBSUEsUUFBSixDQUFhLElBQWIsRUFBbUIsS0FBSzdCLEVBQXhCLENBQWhCOztBQUVBO0FBQ0EsU0FBSzZCLFFBQUwsQ0FBY0UsU0FBZCxHQUEwQixZQUExQjtBQUNBLFNBQUtGLFFBQUwsQ0FBY0csU0FBZCxHQUEwQixZQUExQjtBQUNBLFNBQUtILFFBQUwsQ0FBY0ksV0FBZCxHQUE0QixjQUE1QjtBQUNBLFNBQUtKLFFBQUwsQ0FBY0ssa0JBQWQsR0FBbUMsdUJBQW5DO0FBQ0EsU0FBS0wsUUFBTCxDQUFjTSxPQUFkLEdBQXdCLFVBQXhCO0FBQ0EsU0FBS04sUUFBTCxDQUFjTyxjQUFkLEdBQStCLGtCQUEvQjtBQUNBLFNBQUtQLFFBQUwsQ0FBY1EsaUJBQWQsR0FBa0MscUJBQWxDO0FBQ0EsU0FBS1IsUUFBTCxDQUFjUyxhQUFkLEdBQThCLGdCQUE5QjtBQUNBLFNBQUtULFFBQUwsQ0FBY1UsVUFBZCxHQUEyQixhQUEzQjtBQUNBLFNBQUtWLFFBQUwsQ0FBY1csWUFBZCxHQUE2QixlQUE3QjtBQUNBLFNBQUtYLFFBQUwsQ0FBY1ksT0FBZCxHQUF3QixVQUF4QjtBQUNEOzs7OzJCQUVPQyxLLEVBQWdDO0FBQ3RDLGFBQU8sS0FBSzFDLEVBQUwsQ0FBUUMsR0FBUixpREFBK0J5QyxLQUEvQixFQUFQO0FBQ0QiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgaHR0cHMgZnJvbSAnaHR0cHMnO1xuaW1wb3J0IHF1ZXJ5c3RyaW5nIGZyb20gJ3F1ZXJ5c3RyaW5nJztcblxuaW1wb3J0IGFldSBmcm9tICcuL2F1dG8tZW5jb2RlLXVyaSc7XG5cbmNsYXNzIENvbm5IZWxwZXIge1xuICBfYXV0aEtleTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yIChhdXRoS2V5OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hdXRoS2V5ID0gYXV0aEtleTtcbiAgfVxuXG4gIF9nZXRSZXF1ZXN0T3B0aW9ucyAobWV0aG9kOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgaGVhZGVyczogT2JqZWN0ID0ge30sIGVuY29kaW5nOiA/c3RyaW5nID0gJ3V0ZjgnKTogT2JqZWN0IHtcbiAgICAvLyBCeSBkZWZhdWx0IHdlIHJlcXVlc3QgdGhlIFYxIG9mIHRoZSBBUElcbiAgICBsZXQgcHJlZml4ID0gJy9hcGkvdjEvJztcblxuICAgIC8vIElmIHRoZSByZXF1ZXN0ZWQgcmVzb3VyY2UgaXMgYSBUYXNrLCB0aGVuIHVzZSB0aGUgVjIgb2YgdGhlIEFQSVxuICAgIGlmIChwYXRoLmluZGV4T2YoJ3Rhc2tzJykgPiAtMSkgcHJlZml4ID0gJy9hcGkvdjIvJztcbiAgICBpZiAocGF0aC5pbmRleE9mKCd3ZWJob29rcycpID4gLTEpIHByZWZpeCA9ICcvYXBpL3YyLyc7XG5cbiAgICAvLyBJZiB0aGUgcmVxdWVzdGVkIHJlc291cmNlIGlzIGEgVGFzaywgdGhlbiB1c2UgdGhlIFYyIG9mIHRoZSBBUElcbiAgICBjb25zdCB2MnByZWZpeCA9ICcvYXBpL3YyLyc7XG4gICAgaWYgKHBhdGguaW5kZXhPZigndGFza3MnKSA+IC0xKSBwcmVmaXggPSB2MnByZWZpeDtcbiAgICBpZiAocGF0aC5pbmRleE9mKCd3ZWJob29rcycpID4gLTEpIHByZWZpeCA9IHYycHJlZml4O1xuICAgIGlmIChwYXRoLmluZGV4T2YoJ2JveGVzJykgPiAtMSAmJiBtZXRob2QudG9Mb3dlckNhc2UoKSA9PT0gJ3Bvc3QnKSBwcmVmaXggPSB2MnByZWZpeDtcblxuICAgIHJldHVybiB7XG4gICAgICBtZXRob2QsIGhlYWRlcnMsIGVuY29kaW5nLFxuICAgICAgaG9zdDogJ3d3dy5zdHJlYWsuY29tJyxcbiAgICAgIHBhdGg6IHByZWZpeCArIHBhdGgsXG4gICAgICBhdXRoOiB0aGlzLl9hdXRoS2V5XG4gICAgfTtcbiAgfVxuXG4gIF9wYXJzZVJlc3BvbnNlIChyZXNwb25zZTogaHR0cHMuSW5jb21pbmdNZXNzYWdlKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgc3Ryczogc3RyaW5nW10gPSBbXTtcbiAgICAgIHJlc3BvbnNlLm9uKCdkYXRhJywgKGNodW5rOiBzdHJpbmcpID0+IHtcbiAgICAgICAgc3Rycy5wdXNoKGNodW5rKTtcbiAgICAgIH0pO1xuICAgICAgcmVzcG9uc2Uub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBzdHIgPSBzdHJzLmpvaW4oJycpO1xuICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShzdHIpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGpzb247XG4gICAgICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gYFJlc3BvbnNlIGNvZGUgJHtyZXNwb25zZS5zdGF0dXNDb2RlfWA7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBqc29uID0gSlNPTi5wYXJzZShzdHIpO1xuICAgICAgICAgICAgICBpZiAoanNvbiAmJiBqc29uLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0ganNvbi5lcnJvcjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgIC8vIElnbm9yZSBwYXJzZSBlcnJvclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVqZWN0KE9iamVjdC5hc3NpZ24oKG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpOiBPYmplY3QpLCB7XG4gICAgICAgICAgICAgIHN0ciwganNvbixcbiAgICAgICAgICAgICAgc3RhdHVzQ29kZTogcmVzcG9uc2Uuc3RhdHVzQ29kZSxcbiAgICAgICAgICAgICAgaGVhZGVyczogcmVzcG9uc2UuaGVhZGVyc1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmVzcG9uc2Uub24oJ2Vycm9yJywgcmVqZWN0KTtcbiAgICB9KTtcbiAgfVxuXG4gIF9wbGFpblJlc3BvbnNlIChyZXNwb25zZTogaHR0cHMuSW5jb21pbmdNZXNzYWdlKTogUHJvbWlzZTxCdWZmZXI+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY2h1bmtzOiBCdWZmZXJbXSA9IFtdO1xuICAgICAgcmVzcG9uc2Uub24oJ2RhdGEnLCAoY2h1bms6IEJ1ZmZlcikgPT4ge1xuICAgICAgICBjaHVua3MucHVzaChjaHVuayk7XG4gICAgICB9KTtcbiAgICAgIHJlc3BvbnNlLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgYnVmID0gQnVmZmVyLmNvbmNhdChjaHVua3MpO1xuICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICAgIHJlc29sdmUoYnVmKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYFJlc3BvbnNlIGNvZGUgJHtyZXNwb25zZS5zdGF0dXNDb2RlfWA7XG4gICAgICAgICAgICByZWplY3QoT2JqZWN0LmFzc2lnbigobmV3IEVycm9yKGVycm9yTWVzc2FnZSk6IE9iamVjdCksIHtcbiAgICAgICAgICAgICAgYnVmLFxuICAgICAgICAgICAgICBzdGF0dXNDb2RlOiByZXNwb25zZS5zdGF0dXNDb2RlLFxuICAgICAgICAgICAgICBoZWFkZXJzOiByZXNwb25zZS5oZWFkZXJzXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXNwb25zZS5vbignZXJyb3InLCByZWplY3QpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPE9iamVjdD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBvcHRzID0gdGhpcy5fZ2V0UmVxdWVzdE9wdGlvbnMoJ0dFVCcsIHBhdGgpO1xuICAgICAgY29uc3QgcmVxdWVzdCA9IGh0dHBzLnJlcXVlc3Qob3B0cywgcmVzID0+IHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLl9wYXJzZVJlc3BvbnNlKHJlcykpO1xuICAgICAgfSk7XG4gICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIHJlamVjdCk7XG4gICAgICByZXF1ZXN0LmVuZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Tm9QYXJzZSAocGF0aDogc3RyaW5nKTogUHJvbWlzZTxCdWZmZXI+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgb3B0cyA9IHRoaXMuX2dldFJlcXVlc3RPcHRpb25zKCdHRVQnLCBwYXRoLCB1bmRlZmluZWQsIG51bGwpO1xuICAgICAgY29uc3QgcmVxdWVzdCA9IGh0dHBzLnJlcXVlc3Qob3B0cywgcmVzID0+IHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLl9wbGFpblJlc3BvbnNlKHJlcykpO1xuICAgICAgfSk7XG4gICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIHJlamVjdCk7XG4gICAgICByZXF1ZXN0LmVuZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHV0IChwYXRoOiBzdHJpbmcsIGRhdGE6IE9iamVjdCk6IFByb21pc2U8T2JqZWN0PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGRzdHIgPSBxdWVyeXN0cmluZy5zdHJpbmdpZnkoZGF0YSk7XG4gICAgICBjb25zdCBvcHRzID0gdGhpcy5fZ2V0UmVxdWVzdE9wdGlvbnMoJ1BVVCcsIHBhdGggKyAnPycgKyBkc3RyKTtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBodHRwcy5yZXF1ZXN0KG9wdHMsIHJlcyA9PiB7XG4gICAgICAgIHJlc29sdmUodGhpcy5fcGFyc2VSZXNwb25zZShyZXMpKTtcbiAgICAgIH0pO1xuICAgICAgcmVxdWVzdC5vbignZXJyb3InLCByZWplY3QpO1xuICAgICAgcmVxdWVzdC5lbmQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZSAocGF0aDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgb3B0cyA9IHRoaXMuX2dldFJlcXVlc3RPcHRpb25zKCdERUxFVEUnLCBwYXRoKTtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBodHRwcy5yZXF1ZXN0KG9wdHMsIHJlcyA9PiB7XG4gICAgICAgIHJlc29sdmUodGhpcy5fcGFyc2VSZXNwb25zZShyZXMpKTtcbiAgICAgIH0pO1xuICAgICAgcmVxdWVzdC5vbignZXJyb3InLCByZWplY3QpO1xuICAgICAgcmVxdWVzdC5lbmQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBvc3QgKHBhdGg6IHN0cmluZywgZGF0YTogYW55KTogUHJvbWlzZTxPYmplY3Q+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgc2VuZCA9IHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeSh7IGpzb246IEpTT04uc3RyaW5naWZ5KGRhdGEpIH0pO1xuICAgICAgY29uc3Qgb3B0cyA9IHRoaXMuX2dldFJlcXVlc3RPcHRpb25zKCdQT1NUJywgcGF0aCwge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgICAgICdDb250ZW50LUxlbmd0aCc6IHNlbmQubGVuZ3RoXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBodHRwcy5yZXF1ZXN0KG9wdHMsIHJlcyA9PiB7XG4gICAgICAgIHJlc29sdmUodGhpcy5fcGFyc2VSZXNwb25zZShyZXMpKTtcbiAgICAgIH0pO1xuICAgICAgcmVxdWVzdC53cml0ZShzZW5kKTtcbiAgICAgIHJlcXVlc3Qub24oJ2Vycm9yJywgcmVqZWN0KTtcbiAgICAgIHJlcXVlc3QuZW5kKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuY2xhc3MgTWUge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcblxuICBjb25zdHJ1Y3RvciAoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gIH1cblxuICBnZXQgKCkge1xuICAgIHJldHVybiB0aGlzLl9jLmdldCgndXNlcnMvbWUnKTtcbiAgfVxufVxuXG5jbGFzcyBQaXBlbGluZXMge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcbiAgU3RhZ2VzOiBQaXBlbGluZVN0YWdlcztcbiAgRmllbGRzOiBQaXBlbGluZUZpZWxkcztcblxuICBjb25zdHJ1Y3RvciAoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gICAgdGhpcy5TdGFnZXMgPSBuZXcgUGlwZWxpbmVTdGFnZXMocywgYyk7XG4gICAgdGhpcy5GaWVsZHMgPSBuZXcgUGlwZWxpbmVGaWVsZHMocywgYyk7XG4gIH1cblxuICBnZXRBbGwgKCkge1xuICAgIHJldHVybiB0aGlzLl9jLmdldCgncGlwZWxpbmVzJyk7XG4gIH1cblxuICBnZXRPbmUgKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldWBwaXBlbGluZXMvJHtrZXl9YCk7XG4gIH1cblxuICBnZXRCb3hlcyAoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YHBpcGVsaW5lcy8ke2tleX0vYm94ZXNgKTtcbiAgfVxuXG4gIGdldEJveGVzSW5TdGFnZSAoa2V5OiBzdHJpbmcsIHN0YWdlS2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YHBpcGVsaW5lcy8ke2tleX0vYm94ZXM/c3RhZ2VLZXk9JHtzdGFnZUtleX1gKTtcbiAgfVxuXG4gIGNyZWF0ZSAoZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucHV0KCdwaXBlbGluZXMnLCBkYXRhKTtcbiAgfVxuXG4gIGRlbGV0ZSAoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5kZWxldGUoYWV1YHBpcGVsaW5lcy8ke2tleX1gKTtcbiAgfVxuXG4gIHVwZGF0ZSAoZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXVgcGlwZWxpbmVzLyR7ZGF0YS5rZXl9YCwgZGF0YSk7XG4gIH1cblxuICBnZXRGZWVkIChrZXk6IHN0cmluZywgZGV0YWlsTGV2ZWw6ID9zdHJpbmcpIHtcbiAgICBsZXQgcXMgPSAnJztcbiAgICBpZiAoZGV0YWlsTGV2ZWwpIHtcbiAgICAgIHFzICs9ICc/JyArIHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeSh7IGRldGFpbExldmVsIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YHBpcGVsaW5lcy8ke2tleX0vbmV3c2ZlZWRgICsgcXMpO1xuICB9XG59XG5cbmNsYXNzIFBpcGVsaW5lU3RhZ2VzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG5cbiAgY29uc3RydWN0b3IgKHM6IFN0cmVhaywgYzogQ29ubkhlbHBlcikge1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xuICB9XG5cbiAgZ2V0QWxsIChwaXBlS2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YHBpcGVsaW5lcy8ke3BpcGVLZXl9L3N0YWdlc2ApO1xuICB9XG5cbiAgZ2V0T25lIChwaXBlS2V5OiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldWBwaXBlbGluZXMvJHtwaXBlS2V5fS9zdGFnZXMvJHtrZXl9YCk7XG4gIH1cblxuICBjcmVhdGUgKHBpcGVLZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucHV0KGFldWBwaXBlbGluZXMvJHtwaXBlS2V5fS9zdGFnZXNgLCBkYXRhKTtcbiAgfVxuXG4gIGRlbGV0ZSAocGlwZUtleTogc3RyaW5nLCBrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmRlbGV0ZShhZXVgcGlwZWxpbmVzLyR7cGlwZUtleX0vc3RhZ2VzLyR7a2V5fWApO1xuICB9XG5cbiAgdXBkYXRlIChwaXBlS2V5OiBzdHJpbmcsIGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnBvc3QoYWV1YHBpcGVsaW5lcy8ke3BpcGVLZXl9L3N0YWdlcy8ke2RhdGEua2V5fWAsIGRhdGEpO1xuICB9XG59XG5cbmNsYXNzIFBpcGVsaW5lRmllbGRzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG5cbiAgY29uc3RydWN0b3IgKHM6IFN0cmVhaywgYzogQ29ubkhlbHBlcikge1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xuICB9XG5cbiAgZ2V0QWxsIChwaXBlS2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YHBpcGVsaW5lcy8ke3BpcGVLZXl9L2ZpZWxkc2ApO1xuICB9XG5cbiAgZ2V0T25lIChwaXBlS2V5OiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldWBwaXBlbGluZXMvJHtwaXBlS2V5fS9maWVsZHMvJHtrZXl9YCk7XG4gIH1cblxuICBjcmVhdGUgKHBpcGVLZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucHV0KGFldWBwaXBlbGluZXMvJHtwaXBlS2V5fS9maWVsZHNgLCBkYXRhKTtcbiAgfVxuXG4gIGRlbGV0ZSAocGlwZUtleTogc3RyaW5nLCBrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmRlbGV0ZShhZXVgcGlwZWxpbmVzLyR7cGlwZUtleX0vZmllbGRzLyR7a2V5fWApO1xuICB9XG5cbiAgdXBkYXRlIChwaXBlS2V5OiBzdHJpbmcsIGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnBvc3QoYWV1YHBpcGVsaW5lcy8ke3BpcGVLZXl9L2ZpZWxkcy8ke2RhdGEua2V5fWAsIGRhdGEpO1xuICB9XG59XG5cbmNsYXNzIEJveGVzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG4gIEZpZWxkczogQm94RmllbGRzO1xuXG4gIGNvbnN0cnVjdG9yIChzOiBTdHJlYWssIGM6IENvbm5IZWxwZXIpIHtcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gYztcbiAgICB0aGlzLkZpZWxkcyA9IG5ldyBCb3hGaWVsZHMocywgYyk7XG4gIH1cblxuICBnZXRBbGwgKCkge1xuICAgIHJldHVybiB0aGlzLl9jLmdldCgnYm94ZXMnKTtcbiAgfVxuXG4gIGdldEZvclBpcGVsaW5lIChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9zLlBpcGVsaW5lcy5nZXRCb3hlcyhrZXkpO1xuICB9XG5cbiAgZ2V0T25lIChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXVgYm94ZXMvJHtrZXl9YCk7XG4gIH1cblxuICBjcmVhdGUgKHBpcGVLZXksIGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wb3N0KGFldWBwaXBlbGluZXMvJHtwaXBlS2V5fS9ib3hlc2AsIGRhdGEpO1xuICB9XG5cbiAgZGVsZXRlIChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmRlbGV0ZShhZXVgYm94ZXMvJHtrZXl9YCk7XG4gIH1cblxuICB1cGRhdGUgKGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnBvc3QoYWV1YGJveGVzLyR7ZGF0YS5rZXl9YCwgZGF0YSk7XG4gIH1cblxuICBnZXRGaWVsZHMgKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldWBib3hlcy8ke2tleX0vZmllbGRzYCk7XG4gIH1cblxuICBnZXRSZW1pbmRlcnMgKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldWBib3hlcy8ke2tleX0vcmVtaW5kZXJzYCk7XG4gIH1cblxuICBnZXRDb21tZW50cyAoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YGJveGVzLyR7a2V5fS9jb21tZW50c2ApO1xuICB9XG5cbiAgLy8gZGVwcmVjYXRlZCBtZXRob2RcbiAgY3JlYXRlQ29tbWVudCAoa2V5OiBzdHJpbmcsIGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wdXQoYWV1YGJveGVzLyR7a2V5fS9jb21tZW50c2AsIGRhdGEpO1xuICB9XG5cbiAgcG9zdENvbW1lbnQgKGtleTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wdXQoYWV1YGJveGVzLyR7a2V5fS9jb21tZW50c2AsIHsgbWVzc2FnZSB9KTtcbiAgfVxuXG4gIGdldEZpbGVzIChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXVgYm94ZXMvJHtrZXl9L2ZpbGVzYCk7XG4gIH1cblxuICBnZXRUaHJlYWRzIChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXVgYm94ZXMvJHtrZXl9L3RocmVhZHNgKTtcbiAgfVxuXG4gIGdldEZlZWQgKGtleTogc3RyaW5nLCBkZXRhaWxMZXZlbDogP3N0cmluZykge1xuICAgIGxldCBxcyA9ICcnO1xuICAgIGlmIChkZXRhaWxMZXZlbCkge1xuICAgICAgcXMgKz0gJz8nICsgcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHsgZGV0YWlsTGV2ZWwgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXVgYm94ZXMvJHtrZXl9L25ld3NmZWVkYCArIHFzKTtcbiAgfVxuXG4gIGdldFRhc2tzIChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXVgYm94ZXMvJHtrZXl9L3Rhc2tzYCk7XG4gIH1cbn1cblxuY2xhc3MgQm94RmllbGRzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG5cbiAgY29uc3RydWN0b3IgKHM6IFN0cmVhaywgYzogQ29ubkhlbHBlcikge1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xuICB9XG5cbiAgZ2V0Rm9yQm94IChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9zLkJveGVzLmdldEZpZWxkcyhrZXkpO1xuICB9XG5cbiAgZ2V0T25lIChib3hLZXk6IHN0cmluZywga2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YGJveGVzLyR7Ym94S2V5fS9maWVsZHMvJHtrZXl9YCk7XG4gIH1cblxuICB1cGRhdGUgKGJveEtleTogc3RyaW5nLCBkYXRhOiBPYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wb3N0KGFldWBib3hlcy8ke2JveEtleX0vZmllbGRzLyR7ZGF0YS5rZXl9YCwgZGF0YSk7XG4gIH1cbn1cblxuY2xhc3MgRmlsZXMge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcblxuICBjb25zdHJ1Y3RvciAoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gIH1cblxuICBnZXRGb3JCb3ggKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3MuQm94ZXMuZ2V0RmlsZXMoa2V5KTtcbiAgfVxuXG4gIGdldE9uZSAoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YGZpbGVzLyR7a2V5fWApO1xuICB9XG5cbiAgZ2V0Q29udGVudHMgKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0Tm9QYXJzZShhZXVgZmlsZXMvJHtrZXl9L2NvbnRlbnRzYCk7XG4gIH1cbn1cblxuY2xhc3MgVGhyZWFkcyB7XG4gIF9zOiBTdHJlYWs7XG4gIF9jOiBDb25uSGVscGVyO1xuXG4gIGNvbnN0cnVjdG9yIChzOiBTdHJlYWssIGM6IENvbm5IZWxwZXIpIHtcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gYztcbiAgfVxuXG4gIGdldEZvckJveCAoYm94S2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcy5Cb3hlcy5nZXRUaHJlYWRzKGJveEtleSk7XG4gIH1cblxuICBnZXRPbmUgKHRocmVhZEtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldWB0aHJlYWRzLyR7dGhyZWFkS2V5fWApO1xuICB9XG59XG5cbmNsYXNzIFRhc2tzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG5cbiAgY29uc3RydWN0b3IgKHM6IFN0cmVhaywgYzogQ29ubkhlbHBlcikge1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xuICB9XG5cbiAgZ2V0Rm9yQm94IChib3hLZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9zLkJveGVzLmdldFRhc2tzKGJveEtleSk7XG4gIH1cblxuICBnZXRPbmUgKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldWB0YXNrcy8ke2tleX1gKTtcbiAgfVxuXG4gIGNyZWF0ZSAoYm94S2V5OiBzdHJpbmcsIGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnBvc3QoYWV1YGJveGVzLyR7Ym94S2V5fS90YXNrc2AsIGRhdGEpO1xuICB9XG5cbiAgdXBkYXRlIChrZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXVgdGFza3MvJHtrZXl9YCwgZGF0YSk7XG4gIH1cblxuICBkZWxldGUgKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZGVsZXRlKGFldWB0YXNrcy8ke2tleX1gKTtcbiAgfVxufVxuXG5jbGFzcyBXZWJob29rcyB7XG4gIF9zOiBTdHJlYWs7XG4gIF9jOiBDb25uSGVscGVyO1xuXG4gIGNvbnN0cnVjdG9yIChzOiBTdHJlYWssIGM6IENvbm5IZWxwZXIpIHtcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gYztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIHdlYmhvb2tzIGZvciBhIHBpcGVsaW5lXG4gICAqXG4gICAqIEBwYXJhbSBrZXkgUGlwZWxpbmUga2V5XG4gICAqIEByZXR1cm4ge1Byb21pc2UuPE9iamVjdD59XG4gICAqL1xuICBnZXRGb3JQaXBlbGluZSAoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YHBpcGVsaW5lcy8ke2tleX0vd2ViaG9va3NgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBzcGVjaWZpYyB3ZWJob29rXG4gICAqXG4gICAqIEBwYXJhbSBrZXkgV2ViaG9vayBrZXlcbiAgICogQHJldHVybiB7UHJvbWlzZS48T2JqZWN0Pn1cbiAgICovXG4gIGdldE9uZSAoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YHdlYmhvb2tzLyR7a2V5fWApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB3ZWJob29rIGZvciBwaXBlbGluZVxuICAgKlxuICAgKiBAcGFyYW0ga2V5IFBpcGVsaW5lIGtleVxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxPYmplY3Q+fVxuICAgKi9cbiAgY3JlYXRlIChrZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXVgcGlwZWxpbmVzLyR7a2V5fS93ZWJob29rc2AsIGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIHdlYmhvb2tcbiAgICpcbiAgICogQHBhcmFtIGtleSBXZWJob29rIGtleVxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxPYmplY3Q+fVxuICAgKi9cbiAgZGVsZXRlIChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmRlbGV0ZShhZXVgd2ViaG9va3MvJHtrZXl9YCk7XG4gIH1cblxuICAvKipcbiAgICogRWRpdCBhIHdlYmhvb2tcbiAgICpcbiAgICogQHBhcmFtIGtleSBXZWJob29rIGtleVxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxPYmplY3Q+fVxuICAgKi9cbiAgdXBkYXRlIChrZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXVgd2ViaG9va3MvJHtrZXl9YCwgZGF0YSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFN0cmVhayB7XG4gIF9jOiBDb25uSGVscGVyO1xuICBNZTogTWU7XG4gIFBpcGVsaW5lczogUGlwZWxpbmVzO1xuICBCb3hlczogQm94ZXM7XG4gIEZpbGVzOiBGaWxlcztcbiAgVGhyZWFkczogVGhyZWFkcztcbiAgVGFza3M6IFRhc2tzO1xuICBXZWJob29rczogV2ViaG9va3M7XG5cbiAgY29uc3RydWN0b3IgKGF1dGhLZXk6IHN0cmluZykge1xuICAgIHRoaXMuX2MgPSBuZXcgQ29ubkhlbHBlcihhdXRoS2V5KTtcbiAgICB0aGlzLk1lID0gbmV3IE1lKHRoaXMsIHRoaXMuX2MpO1xuICAgIHRoaXMuUGlwZWxpbmVzID0gbmV3IFBpcGVsaW5lcyh0aGlzLCB0aGlzLl9jKTtcbiAgICB0aGlzLkJveGVzID0gbmV3IEJveGVzKHRoaXMsIHRoaXMuX2MpO1xuICAgIHRoaXMuRmlsZXMgPSBuZXcgRmlsZXModGhpcywgdGhpcy5fYyk7XG4gICAgdGhpcy5UaHJlYWRzID0gbmV3IFRocmVhZHModGhpcywgdGhpcy5fYyk7XG4gICAgdGhpcy5UYXNrcyA9IG5ldyBUYXNrcyh0aGlzLCB0aGlzLl9jKTtcbiAgICB0aGlzLldlYmhvb2tzID0gbmV3IFdlYmhvb2tzKHRoaXMsIHRoaXMuX2MpO1xuXG4gICAgLy8gY29uc3RhbnRzIGZvciB3ZWJob29rIGV2ZW50IHR5cGVzXG4gICAgdGhpcy5XZWJob29rcy5ib3hDcmVhdGUgPSAnQk9YX0NSRUFURSc7XG4gICAgdGhpcy5XZWJob29rcy5ib3hEZWxldGUgPSAnQk9YX0RFTEVURSc7XG4gICAgdGhpcy5XZWJob29rcy5zdGFnZUNyZWF0ZSA9ICdTVEFHRV9DUkVBVEUnO1xuICAgIHRoaXMuV2ViaG9va3MuYm94TmV3RW1haWxBZGRyZXNzID0gJ0JPWF9ORVdfRU1BSUxfQUREUkVTUyc7XG4gICAgdGhpcy5XZWJob29rcy5ib3hFZGl0ID0gJ0JPWF9FRElUJztcbiAgICB0aGlzLldlYmhvb2tzLmJveENoYW5nZVN0YXRlID0gJ0JPWF9DSEFOR0VfU1RBR0UnO1xuICAgIHRoaXMuV2ViaG9va3MuYm94Q2hhbmdlUGlwZWxpbmUgPSAnQk9YX0NIQU5HRV9QSVBFTElORSc7XG4gICAgdGhpcy5XZWJob29rcy5jb21tZW50Q3JlYXRlID0gJ0NPTU1FTlRfQ1JFQVRFJztcbiAgICB0aGlzLldlYmhvb2tzLnRhc2tDcmVhdGUgPSAnVEFTS19DUkVBVEUnO1xuICAgIHRoaXMuV2ViaG9va3MudGFza0NvbXBsZXRlID0gJ1RBU0tfQ09NUExFVEUnO1xuICAgIHRoaXMuV2ViaG9va3MudGFza0R1ZSA9ICdUQVNLX0RVRSc7XG4gIH1cblxuICBzZWFyY2ggKHF1ZXJ5OiBzdHJpbmcpOiBQcm9taXNlPE9iamVjdD4ge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXVgc2VhcmNoP3F1ZXJ5PSR7cXVlcnl9YCk7XG4gIH1cbn1cbiJdfQ==