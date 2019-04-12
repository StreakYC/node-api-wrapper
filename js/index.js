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
      var v2prefix = '/api/v2/'
      if (path.indexOf('tasks') > -1) prefix = v2prefix;
      if (path.indexOf('webhooks') > -1) prefix = v2prefix;
      if (path.indexOf('boxes') > -1 && method === 'post') prefix = v2prefix;

      return {
        method: method, headers: headers, encoding: encoding,
        host: 'mailfoogae.appspot.com',
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
      return this._c.put((0, _autoEncodeUri2.default)(_templateObject2, pipeKey), data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJDb25uSGVscGVyIiwiYXV0aEtleSIsIl9hdXRoS2V5IiwibWV0aG9kIiwicGF0aCIsImhlYWRlcnMiLCJlbmNvZGluZyIsInByZWZpeCIsImluZGV4T2YiLCJob3N0IiwiYXV0aCIsInJlc3BvbnNlIiwicmVzb2x2ZSIsInJlamVjdCIsInN0cnMiLCJvbiIsImNodW5rIiwicHVzaCIsInN0ciIsImpvaW4iLCJzdGF0dXNDb2RlIiwiSlNPTiIsInBhcnNlIiwianNvbiIsImVycm9yTWVzc2FnZSIsImVycm9yIiwiZXJyIiwiRXJyb3IiLCJjaHVua3MiLCJidWYiLCJCdWZmZXIiLCJjb25jYXQiLCJvcHRzIiwiX2dldFJlcXVlc3RPcHRpb25zIiwicmVxdWVzdCIsIl9wYXJzZVJlc3BvbnNlIiwicmVzIiwiZW5kIiwidW5kZWZpbmVkIiwiX3BsYWluUmVzcG9uc2UiLCJkYXRhIiwiZHN0ciIsInN0cmluZ2lmeSIsInNlbmQiLCJsZW5ndGgiLCJ3cml0ZSIsIk1lIiwicyIsImMiLCJfcyIsIl9jIiwiZ2V0IiwiUGlwZWxpbmVzIiwiU3RhZ2VzIiwiUGlwZWxpbmVTdGFnZXMiLCJGaWVsZHMiLCJQaXBlbGluZUZpZWxkcyIsImtleSIsInN0YWdlS2V5IiwicHV0IiwiZGVsZXRlIiwicG9zdCIsImRldGFpbExldmVsIiwicXMiLCJwaXBlS2V5IiwiQm94ZXMiLCJCb3hGaWVsZHMiLCJnZXRCb3hlcyIsIm1lc3NhZ2UiLCJnZXRGaWVsZHMiLCJib3hLZXkiLCJGaWxlcyIsImdldEZpbGVzIiwiZ2V0Tm9QYXJzZSIsIlRocmVhZHMiLCJnZXRUaHJlYWRzIiwidGhyZWFkS2V5IiwiVGFza3MiLCJnZXRUYXNrcyIsIldlYmhvb2tzIiwiU3RyZWFrIiwiYm94Q3JlYXRlIiwiYm94RGVsZXRlIiwic3RhZ2VDcmVhdGUiLCJib3hOZXdFbWFpbEFkZHJlc3MiLCJib3hFZGl0IiwiYm94Q2hhbmdlU3RhdGUiLCJib3hDaGFuZ2VQaXBlbGluZSIsImNvbW1lbnRDcmVhdGUiLCJ0YXNrQ3JlYXRlIiwidGFza0NvbXBsZXRlIiwidGFza0R1ZSIsInF1ZXJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0lBRU1BLFU7QUFHSixzQkFBWUMsT0FBWixFQUE2QjtBQUFBOztBQUMzQixTQUFLQyxRQUFMLEdBQWdCRCxPQUFoQjtBQUNEOzs7O3VDQUVrQkUsTSxFQUFnQkMsSSxFQUFvRTtBQUFBLFVBQXREQyxPQUFzRCx1RUFBdEMsRUFBc0M7QUFBQSxVQUFsQ0MsUUFBa0MsdUVBQWhCLE1BQWdCOztBQUNyRztBQUNBLFVBQUlDLFNBQVMsVUFBYjs7QUFFQTtBQUNBLFVBQUlILEtBQUtJLE9BQUwsQ0FBYSxPQUFiLElBQXdCLENBQUMsQ0FBN0IsRUFBZ0NELFNBQVMsVUFBVDtBQUNoQyxVQUFJSCxLQUFLSSxPQUFMLENBQWEsVUFBYixJQUEyQixDQUFDLENBQWhDLEVBQW1DRCxTQUFTLFVBQVQ7O0FBRW5DLGFBQU87QUFDTEosc0JBREssRUFDR0UsZ0JBREgsRUFDWUMsa0JBRFo7QUFFTEcsY0FBTSx3QkFGRDtBQUdMTCxjQUFNRyxTQUFTSCxJQUhWO0FBSUxNLGNBQU0sS0FBS1I7QUFKTixPQUFQO0FBTUQ7OzttQ0FFY1MsUSxFQUErQztBQUM1RCxhQUFPLHNCQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QyxZQUFNQyxPQUFpQixFQUF2QjtBQUNBSCxpQkFBU0ksRUFBVCxDQUFZLE1BQVosRUFBb0IsVUFBQ0MsS0FBRCxFQUFtQjtBQUNyQ0YsZUFBS0csSUFBTCxDQUFVRCxLQUFWO0FBQ0QsU0FGRDtBQUdBTCxpQkFBU0ksRUFBVCxDQUFZLEtBQVosRUFBbUIsWUFBTTtBQUN2QixjQUFJO0FBQ0YsZ0JBQU1HLE1BQU1KLEtBQUtLLElBQUwsQ0FBVSxFQUFWLENBQVo7QUFDQSxnQkFBSVIsU0FBU1MsVUFBVCxLQUF3QixHQUE1QixFQUFpQztBQUMvQlIsc0JBQVFTLEtBQUtDLEtBQUwsQ0FBV0osR0FBWCxDQUFSO0FBQ0QsYUFGRCxNQUVPO0FBQ0wsa0JBQUlLLGFBQUo7QUFDQSxrQkFBSUMsa0NBQWdDYixTQUFTUyxVQUE3QztBQUNBLGtCQUFJO0FBQ0ZHLHVCQUFPRixLQUFLQyxLQUFMLENBQVdKLEdBQVgsQ0FBUDtBQUNBLG9CQUFJSyxRQUFRQSxLQUFLRSxLQUFqQixFQUF3QjtBQUN0QkQsaUNBQWVELEtBQUtFLEtBQXBCO0FBQ0Q7QUFDRixlQUxELENBS0UsT0FBT0MsR0FBUCxFQUFZO0FBQ1o7QUFDRDtBQUNEYixxQkFBTyxzQkFBZSxJQUFJYyxLQUFKLENBQVVILFlBQVYsQ0FBZixFQUFpRDtBQUN0RE4sd0JBRHNELEVBQ2pESyxVQURpRDtBQUV0REgsNEJBQVlULFNBQVNTLFVBRmlDO0FBR3REZix5QkFBU00sU0FBU047QUFIb0MsZUFBakQsQ0FBUDtBQUtEO0FBQ0YsV0FyQkQsQ0FxQkUsT0FBT3FCLEdBQVAsRUFBWTtBQUNaYixtQkFBT2EsR0FBUDtBQUNEO0FBQ0YsU0F6QkQ7QUEwQkFmLGlCQUFTSSxFQUFULENBQVksT0FBWixFQUFxQkYsTUFBckI7QUFDRCxPQWhDTSxDQUFQO0FBaUNEOzs7bUNBRWNGLFEsRUFBa0Q7QUFDL0QsYUFBTyxzQkFBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEMsWUFBTWUsU0FBbUIsRUFBekI7QUFDQWpCLGlCQUFTSSxFQUFULENBQVksTUFBWixFQUFvQixVQUFDQyxLQUFELEVBQW1CO0FBQ3JDWSxpQkFBT1gsSUFBUCxDQUFZRCxLQUFaO0FBQ0QsU0FGRDtBQUdBTCxpQkFBU0ksRUFBVCxDQUFZLEtBQVosRUFBbUIsWUFBTTtBQUN2QixjQUFJO0FBQ0YsZ0JBQU1jLE1BQU1DLE9BQU9DLE1BQVAsQ0FBY0gsTUFBZCxDQUFaO0FBQ0EsZ0JBQUlqQixTQUFTUyxVQUFULEtBQXdCLEdBQTVCLEVBQWlDO0FBQy9CUixzQkFBUWlCLEdBQVI7QUFDRCxhQUZELE1BRU87QUFDTCxrQkFBTUwsa0NBQWdDYixTQUFTUyxVQUEvQztBQUNBUCxxQkFBTyxzQkFBZSxJQUFJYyxLQUFKLENBQVVILFlBQVYsQ0FBZixFQUFpRDtBQUN0REssd0JBRHNEO0FBRXREVCw0QkFBWVQsU0FBU1MsVUFGaUM7QUFHdERmLHlCQUFTTSxTQUFTTjtBQUhvQyxlQUFqRCxDQUFQO0FBS0Q7QUFDRixXQVpELENBWUUsT0FBT3FCLEdBQVAsRUFBWTtBQUNaYixtQkFBT2EsR0FBUDtBQUNEO0FBQ0YsU0FoQkQ7QUFpQkFmLGlCQUFTSSxFQUFULENBQVksT0FBWixFQUFxQkYsTUFBckI7QUFDRCxPQXZCTSxDQUFQO0FBd0JEOzs7d0JBRUdULEksRUFBK0I7QUFBQTs7QUFDakMsYUFBTyxzQkFBWSxVQUFDUSxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEMsWUFBTW1CLE9BQU8sTUFBS0Msa0JBQUwsQ0FBd0IsS0FBeEIsRUFBK0I3QixJQUEvQixDQUFiO0FBQ0EsWUFBTThCLFVBQVUsZ0JBQU1BLE9BQU4sQ0FBY0YsSUFBZCxFQUFvQixlQUFPO0FBQ3pDcEIsa0JBQVEsTUFBS3VCLGNBQUwsQ0FBb0JDLEdBQXBCLENBQVI7QUFDRCxTQUZlLENBQWhCO0FBR0FGLGdCQUFRbkIsRUFBUixDQUFXLE9BQVgsRUFBb0JGLE1BQXBCO0FBQ0FxQixnQkFBUUcsR0FBUjtBQUNELE9BUE0sQ0FBUDtBQVFEOzs7K0JBRVVqQyxJLEVBQStCO0FBQUE7O0FBQ3hDLGFBQU8sc0JBQVksVUFBQ1EsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLFlBQU1tQixPQUFPLE9BQUtDLGtCQUFMLENBQXdCLEtBQXhCLEVBQStCN0IsSUFBL0IsRUFBcUNrQyxTQUFyQyxFQUFnRCxJQUFoRCxDQUFiO0FBQ0EsWUFBTUosVUFBVSxnQkFBTUEsT0FBTixDQUFjRixJQUFkLEVBQW9CLGVBQU87QUFDekNwQixrQkFBUSxPQUFLMkIsY0FBTCxDQUFvQkgsR0FBcEIsQ0FBUjtBQUNELFNBRmUsQ0FBaEI7QUFHQUYsZ0JBQVFuQixFQUFSLENBQVcsT0FBWCxFQUFvQkYsTUFBcEI7QUFDQXFCLGdCQUFRRyxHQUFSO0FBQ0QsT0FQTSxDQUFQO0FBUUQ7Ozt3QkFFR2pDLEksRUFBY29DLEksRUFBK0I7QUFBQTs7QUFDL0MsYUFBTyxzQkFBWSxVQUFDNUIsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLFlBQU00QixPQUFPLHNCQUFZQyxTQUFaLENBQXNCRixJQUF0QixDQUFiO0FBQ0EsWUFBTVIsT0FBTyxPQUFLQyxrQkFBTCxDQUF3QixLQUF4QixFQUErQjdCLE9BQU8sR0FBUCxHQUFhcUMsSUFBNUMsQ0FBYjtBQUNBLFlBQU1QLFVBQVUsZ0JBQU1BLE9BQU4sQ0FBY0YsSUFBZCxFQUFvQixlQUFPO0FBQ3pDcEIsa0JBQVEsT0FBS3VCLGNBQUwsQ0FBb0JDLEdBQXBCLENBQVI7QUFDRCxTQUZlLENBQWhCO0FBR0FGLGdCQUFRbkIsRUFBUixDQUFXLE9BQVgsRUFBb0JGLE1BQXBCO0FBQ0FxQixnQkFBUUcsR0FBUjtBQUNELE9BUk0sQ0FBUDtBQVNEOzs7NEJBRU1qQyxJLEVBQTRCO0FBQUE7O0FBQ2pDLGFBQU8sc0JBQVksVUFBQ1EsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLFlBQU1tQixPQUFPLE9BQUtDLGtCQUFMLENBQXdCLFFBQXhCLEVBQWtDN0IsSUFBbEMsQ0FBYjtBQUNBLFlBQU04QixVQUFVLGdCQUFNQSxPQUFOLENBQWNGLElBQWQsRUFBb0IsZUFBTztBQUN6Q3BCLGtCQUFRLE9BQUt1QixjQUFMLENBQW9CQyxHQUFwQixDQUFSO0FBQ0QsU0FGZSxDQUFoQjtBQUdBRixnQkFBUW5CLEVBQVIsQ0FBVyxPQUFYLEVBQW9CRixNQUFwQjtBQUNBcUIsZ0JBQVFHLEdBQVI7QUFDRCxPQVBNLENBQVA7QUFRRDs7O3lCQUVJakMsSSxFQUFjb0MsSSxFQUE0QjtBQUFBOztBQUM3QyxhQUFPLHNCQUFZLFVBQUM1QixPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEMsWUFBTThCLE9BQU8sc0JBQVlELFNBQVosQ0FBc0IsRUFBQ25CLE1BQUsseUJBQWVpQixJQUFmLENBQU4sRUFBdEIsQ0FBYjtBQUNBLFlBQU1SLE9BQU8sT0FBS0Msa0JBQUwsQ0FBd0IsTUFBeEIsRUFBZ0M3QixJQUFoQyxFQUFzQztBQUNqRCwwQkFBZ0IsbUNBRGlDO0FBRWpELDRCQUFrQnVDLEtBQUtDO0FBRjBCLFNBQXRDLENBQWI7QUFJQSxZQUFNVixVQUFVLGdCQUFNQSxPQUFOLENBQWNGLElBQWQsRUFBb0IsZUFBTztBQUN6Q3BCLGtCQUFRLE9BQUt1QixjQUFMLENBQW9CQyxHQUFwQixDQUFSO0FBQ0QsU0FGZSxDQUFoQjtBQUdBRixnQkFBUVcsS0FBUixDQUFjRixJQUFkO0FBQ0FULGdCQUFRbkIsRUFBUixDQUFXLE9BQVgsRUFBb0JGLE1BQXBCO0FBQ0FxQixnQkFBUUcsR0FBUjtBQUNELE9BWk0sQ0FBUDtBQWFEOzs7OztJQUdHUyxFO0FBR0osY0FBWUMsQ0FBWixFQUF1QkMsQ0FBdkIsRUFBc0M7QUFBQTs7QUFDcEMsU0FBS0MsRUFBTCxHQUFVRixDQUFWO0FBQ0EsU0FBS0csRUFBTCxHQUFVRixDQUFWO0FBQ0Q7Ozs7MEJBQ0s7QUFDSixhQUFPLEtBQUtFLEVBQUwsQ0FBUUMsR0FBUixDQUFZLFVBQVosQ0FBUDtBQUNEOzs7OztJQUdHQyxTO0FBS0oscUJBQVlMLENBQVosRUFBdUJDLENBQXZCLEVBQXNDO0FBQUE7O0FBQ3BDLFNBQUtDLEVBQUwsR0FBVUYsQ0FBVjtBQUNBLFNBQUtHLEVBQUwsR0FBVUYsQ0FBVjtBQUNBLFNBQUtLLE1BQUwsR0FBYyxJQUFJQyxjQUFKLENBQW1CUCxDQUFuQixFQUFzQkMsQ0FBdEIsQ0FBZDtBQUNBLFNBQUtPLE1BQUwsR0FBYyxJQUFJQyxjQUFKLENBQW1CVCxDQUFuQixFQUFzQkMsQ0FBdEIsQ0FBZDtBQUNEOzs7OzZCQUNRO0FBQ1AsYUFBTyxLQUFLRSxFQUFMLENBQVFDLEdBQVIsQ0FBWSxXQUFaLENBQVA7QUFDRDs7OzJCQUNNTSxHLEVBQWE7QUFDbEIsYUFBTyxLQUFLUCxFQUFMLENBQVFDLEdBQVIsK0NBQTZCTSxHQUE3QixFQUFQO0FBQ0Q7Ozs2QkFDUUEsRyxFQUFhO0FBQ3BCLGFBQU8sS0FBS1AsRUFBTCxDQUFRQyxHQUFSLGdEQUE2Qk0sR0FBN0IsRUFBUDtBQUNEOzs7b0NBQ2dCQSxHLEVBQWFDLFEsRUFBa0I7QUFDOUMsYUFBTyxLQUFLUixFQUFMLENBQVFDLEdBQVIsZ0RBQTZCTSxHQUE3QixFQUFtREMsUUFBbkQsRUFBUDtBQUNEOzs7MkJBQ01sQixJLEVBQWM7QUFDbkIsYUFBTyxLQUFLVSxFQUFMLENBQVFTLEdBQVIsQ0FBWSxXQUFaLEVBQXlCbkIsSUFBekIsQ0FBUDtBQUNEOzs7NEJBQ01pQixHLEVBQWE7QUFDbEIsYUFBTyxLQUFLUCxFQUFMLENBQVFVLE1BQVIsK0NBQWdDSCxHQUFoQyxFQUFQO0FBQ0Q7OzsyQkFDTWpCLEksRUFBYztBQUNuQixhQUFPLEtBQUtVLEVBQUwsQ0FBUVcsSUFBUiwrQ0FBOEJyQixLQUFLaUIsR0FBbkMsR0FBMENqQixJQUExQyxDQUFQO0FBQ0Q7Ozs0QkFDT2lCLEcsRUFBYUssVyxFQUFzQjtBQUN6QyxVQUFJQyxLQUFLLEVBQVQ7QUFDQSxVQUFJRCxXQUFKLEVBQWlCO0FBQ2ZDLGNBQU0sTUFBTSxzQkFBWXJCLFNBQVosQ0FBc0IsRUFBQ29CLHdCQUFELEVBQXRCLENBQVo7QUFDRDtBQUNELGFBQU8sS0FBS1osRUFBTCxDQUFRQyxHQUFSLENBQVksK0NBQWlCTSxHQUFqQixJQUFrQ00sRUFBOUMsQ0FBUDtBQUNEOzs7OztJQUdHVCxjO0FBR0osMEJBQVlQLENBQVosRUFBdUJDLENBQXZCLEVBQXNDO0FBQUE7O0FBQ3BDLFNBQUtDLEVBQUwsR0FBVUYsQ0FBVjtBQUNBLFNBQUtHLEVBQUwsR0FBVUYsQ0FBVjtBQUNEOzs7OzJCQUNNZ0IsTyxFQUFpQjtBQUN0QixhQUFPLEtBQUtkLEVBQUwsQ0FBUUMsR0FBUixnREFBNkJhLE9BQTdCLEVBQVA7QUFDRDs7OzJCQUNNQSxPLEVBQWlCUCxHLEVBQWE7QUFDbkMsYUFBTyxLQUFLUCxFQUFMLENBQVFDLEdBQVIsZ0RBQTZCYSxPQUE3QixFQUErQ1AsR0FBL0MsRUFBUDtBQUNEOzs7MkJBQ01PLE8sRUFBaUJ4QixJLEVBQWM7QUFDcEMsYUFBTyxLQUFLVSxFQUFMLENBQVFTLEdBQVIsZ0RBQTZCSyxPQUE3QixHQUErQ3hCLElBQS9DLENBQVA7QUFDRDs7OzRCQUNNd0IsTyxFQUFpQlAsRyxFQUFhO0FBQ25DLGFBQU8sS0FBS1AsRUFBTCxDQUFRVSxNQUFSLGdEQUFnQ0ksT0FBaEMsRUFBa0RQLEdBQWxELEVBQVA7QUFDRDs7OzJCQUNNTyxPLEVBQWlCeEIsSSxFQUFjO0FBQ3BDLGFBQU8sS0FBS1UsRUFBTCxDQUFRVyxJQUFSLGdEQUE4QkcsT0FBOUIsRUFBZ0R4QixLQUFLaUIsR0FBckQsR0FBNERqQixJQUE1RCxDQUFQO0FBQ0Q7Ozs7O0lBR0dnQixjO0FBR0osMEJBQVlULENBQVosRUFBdUJDLENBQXZCLEVBQXNDO0FBQUE7O0FBQ3BDLFNBQUtDLEVBQUwsR0FBVUYsQ0FBVjtBQUNBLFNBQUtHLEVBQUwsR0FBVUYsQ0FBVjtBQUNEOzs7OzJCQUNNZ0IsTyxFQUFpQjtBQUN0QixhQUFPLEtBQUtkLEVBQUwsQ0FBUUMsR0FBUixnREFBNkJhLE9BQTdCLEVBQVA7QUFDRDs7OzJCQUNNQSxPLEVBQWlCUCxHLEVBQWE7QUFDbkMsYUFBTyxLQUFLUCxFQUFMLENBQVFDLEdBQVIsZ0RBQTZCYSxPQUE3QixFQUErQ1AsR0FBL0MsRUFBUDtBQUNEOzs7MkJBQ01PLE8sRUFBaUJ4QixJLEVBQWM7QUFDcEMsYUFBTyxLQUFLVSxFQUFMLENBQVFTLEdBQVIsZ0RBQTZCSyxPQUE3QixHQUErQ3hCLElBQS9DLENBQVA7QUFDRDs7OzRCQUNNd0IsTyxFQUFpQlAsRyxFQUFhO0FBQ25DLGFBQU8sS0FBS1AsRUFBTCxDQUFRVSxNQUFSLGdEQUFnQ0ksT0FBaEMsRUFBa0RQLEdBQWxELEVBQVA7QUFDRDs7OzJCQUNNTyxPLEVBQWlCeEIsSSxFQUFjO0FBQ3BDLGFBQU8sS0FBS1UsRUFBTCxDQUFRVyxJQUFSLGdEQUE4QkcsT0FBOUIsRUFBZ0R4QixLQUFLaUIsR0FBckQsR0FBNERqQixJQUE1RCxDQUFQO0FBQ0Q7Ozs7O0lBR0d5QixLO0FBSUosaUJBQVlsQixDQUFaLEVBQXVCQyxDQUF2QixFQUFzQztBQUFBOztBQUNwQyxTQUFLQyxFQUFMLEdBQVVGLENBQVY7QUFDQSxTQUFLRyxFQUFMLEdBQVVGLENBQVY7QUFDQSxTQUFLTyxNQUFMLEdBQWMsSUFBSVcsU0FBSixDQUFjbkIsQ0FBZCxFQUFpQkMsQ0FBakIsQ0FBZDtBQUNEOzs7OzZCQUNRO0FBQ1AsYUFBTyxLQUFLRSxFQUFMLENBQVFDLEdBQVIsQ0FBWSxPQUFaLENBQVA7QUFDRDs7O21DQUNjTSxHLEVBQWE7QUFDMUIsYUFBTyxLQUFLUixFQUFMLENBQVFHLFNBQVIsQ0FBa0JlLFFBQWxCLENBQTJCVixHQUEzQixDQUFQO0FBQ0Q7OzsyQkFDTUEsRyxFQUFhO0FBQ2xCLGFBQU8sS0FBS1AsRUFBTCxDQUFRQyxHQUFSLGdEQUF5Qk0sR0FBekIsRUFBUDtBQUNEOzs7MkJBQ01PLE8sRUFBU3hCLEksRUFBTTtBQUNwQixhQUFPLEtBQUtVLEVBQUwsQ0FBUVMsR0FBUixnREFBNkJLLE9BQTdCLEdBQThDeEIsSUFBOUMsQ0FBUDtBQUNEOzs7NEJBQ01pQixHLEVBQWE7QUFDbEIsYUFBTyxLQUFLUCxFQUFMLENBQVFVLE1BQVIsZ0RBQTRCSCxHQUE1QixFQUFQO0FBQ0Q7OzsyQkFDTWpCLEksRUFBYztBQUNuQixhQUFPLEtBQUtVLEVBQUwsQ0FBUVcsSUFBUixnREFBMEJyQixLQUFLaUIsR0FBL0IsR0FBc0NqQixJQUF0QyxDQUFQO0FBQ0Q7Ozs4QkFDU2lCLEcsRUFBYTtBQUNyQixhQUFPLEtBQUtQLEVBQUwsQ0FBUUMsR0FBUixpREFBeUJNLEdBQXpCLEVBQVA7QUFDRDs7O2lDQUNZQSxHLEVBQWE7QUFDeEIsYUFBTyxLQUFLUCxFQUFMLENBQVFDLEdBQVIsaURBQXlCTSxHQUF6QixFQUFQO0FBQ0Q7OztnQ0FDV0EsRyxFQUFhO0FBQ3ZCLGFBQU8sS0FBS1AsRUFBTCxDQUFRQyxHQUFSLGlEQUF5Qk0sR0FBekIsRUFBUDtBQUNEO0FBQ0Q7Ozs7a0NBQ2NBLEcsRUFBYWpCLEksRUFBTTtBQUMvQixhQUFPLEtBQUtVLEVBQUwsQ0FBUVMsR0FBUixpREFBeUJGLEdBQXpCLEdBQXlDakIsSUFBekMsQ0FBUDtBQUNEOzs7Z0NBQ1dpQixHLEVBQWFXLE8sRUFBaUI7QUFDeEMsYUFBTyxLQUFLbEIsRUFBTCxDQUFRUyxHQUFSLGlEQUF5QkYsR0FBekIsR0FBeUMsRUFBQ1csZ0JBQUQsRUFBekMsQ0FBUDtBQUNEOzs7NkJBQ1FYLEcsRUFBYTtBQUNwQixhQUFPLEtBQUtQLEVBQUwsQ0FBUUMsR0FBUixpREFBeUJNLEdBQXpCLEVBQVA7QUFDRDs7OytCQUNVQSxHLEVBQWE7QUFDdEIsYUFBTyxLQUFLUCxFQUFMLENBQVFDLEdBQVIsaURBQXlCTSxHQUF6QixFQUFQO0FBQ0Q7Ozs0QkFDT0EsRyxFQUFhSyxXLEVBQXNCO0FBQ3pDLFVBQUlDLEtBQUssRUFBVDtBQUNBLFVBQUlELFdBQUosRUFBaUI7QUFDZkMsY0FBTSxNQUFNLHNCQUFZckIsU0FBWixDQUFzQixFQUFDb0Isd0JBQUQsRUFBdEIsQ0FBWjtBQUNEO0FBQ0QsYUFBTyxLQUFLWixFQUFMLENBQVFDLEdBQVIsQ0FBWSxnREFBYU0sR0FBYixJQUE4Qk0sRUFBMUMsQ0FBUDtBQUNEOzs7NkJBQ1FOLEcsRUFBYTtBQUNwQixhQUFPLEtBQUtQLEVBQUwsQ0FBUUMsR0FBUixpREFBeUJNLEdBQXpCLEVBQVA7QUFDRDs7Ozs7SUFHR1MsUztBQUdKLHFCQUFZbkIsQ0FBWixFQUF1QkMsQ0FBdkIsRUFBc0M7QUFBQTs7QUFDcEMsU0FBS0MsRUFBTCxHQUFVRixDQUFWO0FBQ0EsU0FBS0csRUFBTCxHQUFVRixDQUFWO0FBQ0Q7Ozs7OEJBQ1NTLEcsRUFBYTtBQUNyQixhQUFPLEtBQUtSLEVBQUwsQ0FBUWdCLEtBQVIsQ0FBY0ksU0FBZCxDQUF3QlosR0FBeEIsQ0FBUDtBQUNEOzs7MkJBQ01hLE0sRUFBZ0JiLEcsRUFBYTtBQUNsQyxhQUFPLEtBQUtQLEVBQUwsQ0FBUUMsR0FBUixpREFBeUJtQixNQUF6QixFQUEwQ2IsR0FBMUMsRUFBUDtBQUNEOzs7MkJBQ01hLE0sRUFBZ0I5QixJLEVBQWM7QUFDbkMsYUFBTyxLQUFLVSxFQUFMLENBQVFXLElBQVIsaURBQTBCUyxNQUExQixFQUEyQzlCLEtBQUtpQixHQUFoRCxHQUF1RGpCLElBQXZELENBQVA7QUFDRDs7Ozs7SUFHRytCLEs7QUFHSixpQkFBWXhCLENBQVosRUFBdUJDLENBQXZCLEVBQXNDO0FBQUE7O0FBQ3BDLFNBQUtDLEVBQUwsR0FBVUYsQ0FBVjtBQUNBLFNBQUtHLEVBQUwsR0FBVUYsQ0FBVjtBQUNEOzs7OzhCQUNTUyxHLEVBQWE7QUFDckIsYUFBTyxLQUFLUixFQUFMLENBQVFnQixLQUFSLENBQWNPLFFBQWQsQ0FBdUJmLEdBQXZCLENBQVA7QUFDRDs7OzJCQUNNQSxHLEVBQWE7QUFDbEIsYUFBTyxLQUFLUCxFQUFMLENBQVFDLEdBQVIsaURBQXlCTSxHQUF6QixFQUFQO0FBQ0Q7OztnQ0FDV0EsRyxFQUFhO0FBQ3ZCLGFBQU8sS0FBS1AsRUFBTCxDQUFRdUIsVUFBUixpREFBZ0NoQixHQUFoQyxFQUFQO0FBQ0Q7Ozs7O0lBR0dpQixPO0FBR0osbUJBQVkzQixDQUFaLEVBQXVCQyxDQUF2QixFQUFzQztBQUFBOztBQUNwQyxTQUFLQyxFQUFMLEdBQVVGLENBQVY7QUFDQSxTQUFLRyxFQUFMLEdBQVVGLENBQVY7QUFDRDs7Ozs4QkFDU3NCLE0sRUFBZ0I7QUFDeEIsYUFBTyxLQUFLckIsRUFBTCxDQUFRZ0IsS0FBUixDQUFjVSxVQUFkLENBQXlCTCxNQUF6QixDQUFQO0FBQ0Q7OzsyQkFDTU0sUyxFQUFtQjtBQUN4QixhQUFPLEtBQUsxQixFQUFMLENBQVFDLEdBQVIsaURBQTJCeUIsU0FBM0IsRUFBUDtBQUNEOzs7OztJQUdHQyxLO0FBR0osaUJBQVk5QixDQUFaLEVBQXVCQyxDQUF2QixFQUFzQztBQUFBOztBQUNwQyxTQUFLQyxFQUFMLEdBQVVGLENBQVY7QUFDQSxTQUFLRyxFQUFMLEdBQVVGLENBQVY7QUFDRDs7Ozs4QkFDU3NCLE0sRUFBZ0I7QUFDeEIsYUFBTyxLQUFLckIsRUFBTCxDQUFRZ0IsS0FBUixDQUFjYSxRQUFkLENBQXVCUixNQUF2QixDQUFQO0FBQ0Q7OzsyQkFDTWIsRyxFQUFhO0FBQ2xCLGFBQU8sS0FBS1AsRUFBTCxDQUFRQyxHQUFSLGlEQUF5Qk0sR0FBekIsRUFBUDtBQUNEOzs7MkJBQ01hLE0sRUFBZ0I5QixJLEVBQWM7QUFDbkMsYUFBTyxLQUFLVSxFQUFMLENBQVFXLElBQVIsaURBQTBCUyxNQUExQixHQUEwQzlCLElBQTFDLENBQVA7QUFDRDs7OzJCQUNNaUIsRyxFQUFhakIsSSxFQUFjO0FBQ2hDLGFBQU8sS0FBS1UsRUFBTCxDQUFRVyxJQUFSLGlEQUEwQkosR0FBMUIsR0FBaUNqQixJQUFqQyxDQUFQO0FBQ0Q7Ozs0QkFDTWlCLEcsRUFBYTtBQUNsQixhQUFPLEtBQUtQLEVBQUwsQ0FBUVUsTUFBUixpREFBNEJILEdBQTVCLEVBQVA7QUFDRDs7Ozs7SUFHR3NCLFE7QUFHSixvQkFBWWhDLENBQVosRUFBdUJDLENBQXZCLEVBQXNDO0FBQUE7O0FBQ3BDLFNBQUtDLEVBQUwsR0FBVUYsQ0FBVjtBQUNBLFNBQUtHLEVBQUwsR0FBVUYsQ0FBVjtBQUNEOztBQUVEOzs7Ozs7Ozs7O21DQU1lUyxHLEVBQWE7QUFDMUIsYUFBTyxLQUFLUCxFQUFMLENBQVFDLEdBQVIsaURBQTZCTSxHQUE3QixFQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7OzsyQkFNT0EsRyxFQUFhO0FBQ2xCLGFBQU8sS0FBS1AsRUFBTCxDQUFRQyxHQUFSLGlEQUE0Qk0sR0FBNUIsRUFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7OzJCQU9PQSxHLEVBQWFqQixJLEVBQWM7QUFDaEMsYUFBTyxLQUFLVSxFQUFMLENBQVFXLElBQVIsaURBQThCSixHQUE5QixHQUE4Q2pCLElBQTlDLENBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7OzRCQU1PaUIsRyxFQUFhO0FBQ2xCLGFBQU8sS0FBS1AsRUFBTCxDQUFRVSxNQUFSLGlEQUErQkgsR0FBL0IsRUFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7OzJCQU9PQSxHLEVBQWFqQixJLEVBQWM7QUFDaEMsYUFBTyxLQUFLVSxFQUFMLENBQVFXLElBQVIsaURBQTZCSixHQUE3QixHQUFvQ2pCLElBQXBDLENBQVA7QUFDRDs7Ozs7SUFHVXdDLE0sV0FBQUEsTTtBQVVYLGtCQUFZL0UsT0FBWixFQUE2QjtBQUFBOztBQUMzQixTQUFLaUQsRUFBTCxHQUFVLElBQUlsRCxVQUFKLENBQWVDLE9BQWYsQ0FBVjtBQUNBLFNBQUs2QyxFQUFMLEdBQVUsSUFBSUEsRUFBSixDQUFPLElBQVAsRUFBYSxLQUFLSSxFQUFsQixDQUFWO0FBQ0EsU0FBS0UsU0FBTCxHQUFpQixJQUFJQSxTQUFKLENBQWMsSUFBZCxFQUFvQixLQUFLRixFQUF6QixDQUFqQjtBQUNBLFNBQUtlLEtBQUwsR0FBYSxJQUFJQSxLQUFKLENBQVUsSUFBVixFQUFnQixLQUFLZixFQUFyQixDQUFiO0FBQ0EsU0FBS3FCLEtBQUwsR0FBYSxJQUFJQSxLQUFKLENBQVUsSUFBVixFQUFnQixLQUFLckIsRUFBckIsQ0FBYjtBQUNBLFNBQUt3QixPQUFMLEdBQWUsSUFBSUEsT0FBSixDQUFZLElBQVosRUFBa0IsS0FBS3hCLEVBQXZCLENBQWY7QUFDQSxTQUFLMkIsS0FBTCxHQUFhLElBQUlBLEtBQUosQ0FBVSxJQUFWLEVBQWdCLEtBQUszQixFQUFyQixDQUFiO0FBQ0EsU0FBSzZCLFFBQUwsR0FBZ0IsSUFBSUEsUUFBSixDQUFhLElBQWIsRUFBbUIsS0FBSzdCLEVBQXhCLENBQWhCOztBQUVBO0FBQ0EsU0FBSzZCLFFBQUwsQ0FBY0UsU0FBZCxHQUEwQixZQUExQjtBQUNBLFNBQUtGLFFBQUwsQ0FBY0csU0FBZCxHQUEwQixZQUExQjtBQUNBLFNBQUtILFFBQUwsQ0FBY0ksV0FBZCxHQUE0QixjQUE1QjtBQUNBLFNBQUtKLFFBQUwsQ0FBY0ssa0JBQWQsR0FBbUMsdUJBQW5DO0FBQ0EsU0FBS0wsUUFBTCxDQUFjTSxPQUFkLEdBQXdCLFVBQXhCO0FBQ0EsU0FBS04sUUFBTCxDQUFjTyxjQUFkLEdBQStCLGtCQUEvQjtBQUNBLFNBQUtQLFFBQUwsQ0FBY1EsaUJBQWQsR0FBa0MscUJBQWxDO0FBQ0EsU0FBS1IsUUFBTCxDQUFjUyxhQUFkLEdBQThCLGdCQUE5QjtBQUNBLFNBQUtULFFBQUwsQ0FBY1UsVUFBZCxHQUEyQixhQUEzQjtBQUNBLFNBQUtWLFFBQUwsQ0FBY1csWUFBZCxHQUE2QixlQUE3QjtBQUNBLFNBQUtYLFFBQUwsQ0FBY1ksT0FBZCxHQUF3QixVQUF4QjtBQUNEOzs7OzJCQUVNQyxLLEVBQWdDO0FBQ3JDLGFBQU8sS0FBSzFDLEVBQUwsQ0FBUUMsR0FBUixpREFBZ0N5QyxLQUFoQyxFQUFQO0FBQ0QiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgaHR0cHMgZnJvbSAnaHR0cHMnO1xuaW1wb3J0IHF1ZXJ5c3RyaW5nIGZyb20gJ3F1ZXJ5c3RyaW5nJztcblxuaW1wb3J0IGFldSBmcm9tICcuL2F1dG8tZW5jb2RlLXVyaSc7XG5cbmNsYXNzIENvbm5IZWxwZXIge1xuICBfYXV0aEtleTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGF1dGhLZXk6IHN0cmluZykge1xuICAgIHRoaXMuX2F1dGhLZXkgPSBhdXRoS2V5O1xuICB9XG5cbiAgX2dldFJlcXVlc3RPcHRpb25zKG1ldGhvZDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIGhlYWRlcnM6IE9iamVjdD17fSwgZW5jb2Rpbmc6ID9zdHJpbmc9J3V0ZjgnKTogT2JqZWN0IHtcbiAgICAvLyBCeSBkZWZhdWx0IHdlIHJlcXVlc3QgdGhlIFYxIG9mIHRoZSBBUElcbiAgICBsZXQgcHJlZml4ID0gJy9hcGkvdjEvJztcblxuICAgIC8vIElmIHRoZSByZXF1ZXN0ZWQgcmVzb3VyY2UgaXMgYSBUYXNrLCB0aGVuIHVzZSB0aGUgVjIgb2YgdGhlIEFQSVxuICAgIGlmIChwYXRoLmluZGV4T2YoJ3Rhc2tzJykgPiAtMSkgcHJlZml4ID0gJy9hcGkvdjIvJztcbiAgICBpZiAocGF0aC5pbmRleE9mKCd3ZWJob29rcycpID4gLTEpIHByZWZpeCA9ICcvYXBpL3YyLyc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbWV0aG9kLCBoZWFkZXJzLCBlbmNvZGluZyxcbiAgICAgIGhvc3Q6ICdtYWlsZm9vZ2FlLmFwcHNwb3QuY29tJyxcbiAgICAgIHBhdGg6IHByZWZpeCArIHBhdGgsXG4gICAgICBhdXRoOiB0aGlzLl9hdXRoS2V5XG4gICAgfTtcbiAgfVxuXG4gIF9wYXJzZVJlc3BvbnNlKHJlc3BvbnNlOiBodHRwcy5JbmNvbWluZ01lc3NhZ2UpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBzdHJzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgcmVzcG9uc2Uub24oJ2RhdGEnLCAoY2h1bms6IHN0cmluZykgPT4ge1xuICAgICAgICBzdHJzLnB1c2goY2h1bmspO1xuICAgICAgfSk7XG4gICAgICByZXNwb25zZS5vbignZW5kJywgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHN0ciA9IHN0cnMuam9pbignJyk7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHN0cikpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQganNvbjtcbiAgICAgICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSBgUmVzcG9uc2UgY29kZSAke3Jlc3BvbnNlLnN0YXR1c0NvZGV9YDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGpzb24gPSBKU09OLnBhcnNlKHN0cik7XG4gICAgICAgICAgICAgIGlmIChqc29uICYmIGpzb24uZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBqc29uLmVycm9yO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgLy8gSWdub3JlIHBhcnNlIGVycm9yXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWplY3QoT2JqZWN0LmFzc2lnbigobmV3IEVycm9yKGVycm9yTWVzc2FnZSk6IE9iamVjdCksIHtcbiAgICAgICAgICAgICAgc3RyLCBqc29uLFxuICAgICAgICAgICAgICBzdGF0dXNDb2RlOiByZXNwb25zZS5zdGF0dXNDb2RlLFxuICAgICAgICAgICAgICBoZWFkZXJzOiByZXNwb25zZS5oZWFkZXJzXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXNwb25zZS5vbignZXJyb3InLCByZWplY3QpO1xuICAgIH0pO1xuICB9XG5cbiAgX3BsYWluUmVzcG9uc2UocmVzcG9uc2U6IGh0dHBzLkluY29taW5nTWVzc2FnZSk6IFByb21pc2U8QnVmZmVyPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGNodW5rczogQnVmZmVyW10gPSBbXTtcbiAgICAgIHJlc3BvbnNlLm9uKCdkYXRhJywgKGNodW5rOiBCdWZmZXIpID0+IHtcbiAgICAgICAgY2h1bmtzLnB1c2goY2h1bmspO1xuICAgICAgfSk7XG4gICAgICByZXNwb25zZS5vbignZW5kJywgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGJ1ZiA9IEJ1ZmZlci5jb25jYXQoY2h1bmtzKTtcbiAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgICByZXNvbHZlKGJ1Zik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGBSZXNwb25zZSBjb2RlICR7cmVzcG9uc2Uuc3RhdHVzQ29kZX1gO1xuICAgICAgICAgICAgcmVqZWN0KE9iamVjdC5hc3NpZ24oKG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpOiBPYmplY3QpLCB7XG4gICAgICAgICAgICAgIGJ1ZixcbiAgICAgICAgICAgICAgc3RhdHVzQ29kZTogcmVzcG9uc2Uuc3RhdHVzQ29kZSxcbiAgICAgICAgICAgICAgaGVhZGVyczogcmVzcG9uc2UuaGVhZGVyc1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmVzcG9uc2Uub24oJ2Vycm9yJywgcmVqZWN0KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPE9iamVjdD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBvcHRzID0gdGhpcy5fZ2V0UmVxdWVzdE9wdGlvbnMoJ0dFVCcsIHBhdGgpO1xuICAgICAgY29uc3QgcmVxdWVzdCA9IGh0dHBzLnJlcXVlc3Qob3B0cywgcmVzID0+IHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLl9wYXJzZVJlc3BvbnNlKHJlcykpO1xuICAgICAgfSk7XG4gICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIHJlamVjdCk7XG4gICAgICByZXF1ZXN0LmVuZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Tm9QYXJzZShwYXRoOiBzdHJpbmcpOiBQcm9taXNlPEJ1ZmZlcj4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBvcHRzID0gdGhpcy5fZ2V0UmVxdWVzdE9wdGlvbnMoJ0dFVCcsIHBhdGgsIHVuZGVmaW5lZCwgbnVsbCk7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gaHR0cHMucmVxdWVzdChvcHRzLCByZXMgPT4ge1xuICAgICAgICByZXNvbHZlKHRoaXMuX3BsYWluUmVzcG9uc2UocmVzKSk7XG4gICAgICB9KTtcbiAgICAgIHJlcXVlc3Qub24oJ2Vycm9yJywgcmVqZWN0KTtcbiAgICAgIHJlcXVlc3QuZW5kKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdXQocGF0aDogc3RyaW5nLCBkYXRhOiBPYmplY3QpOiBQcm9taXNlPE9iamVjdD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBkc3RyID0gcXVlcnlzdHJpbmcuc3RyaW5naWZ5KGRhdGEpO1xuICAgICAgY29uc3Qgb3B0cyA9IHRoaXMuX2dldFJlcXVlc3RPcHRpb25zKCdQVVQnLCBwYXRoICsgJz8nICsgZHN0cik7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gaHR0cHMucmVxdWVzdChvcHRzLCByZXMgPT4ge1xuICAgICAgICByZXNvbHZlKHRoaXMuX3BhcnNlUmVzcG9uc2UocmVzKSk7XG4gICAgICB9KTtcbiAgICAgIHJlcXVlc3Qub24oJ2Vycm9yJywgcmVqZWN0KTtcbiAgICAgIHJlcXVlc3QuZW5kKCk7XG4gICAgfSk7XG4gIH1cblxuICBkZWxldGUocGF0aDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgb3B0cyA9IHRoaXMuX2dldFJlcXVlc3RPcHRpb25zKCdERUxFVEUnLCBwYXRoKTtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBodHRwcy5yZXF1ZXN0KG9wdHMsIHJlcyA9PiB7XG4gICAgICAgIHJlc29sdmUodGhpcy5fcGFyc2VSZXNwb25zZShyZXMpKTtcbiAgICAgIH0pO1xuICAgICAgcmVxdWVzdC5vbignZXJyb3InLCByZWplY3QpO1xuICAgICAgcmVxdWVzdC5lbmQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBvc3QocGF0aDogc3RyaW5nLCBkYXRhOiBhbnkpOiBQcm9taXNlPE9iamVjdD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBzZW5kID0gcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHtqc29uOkpTT04uc3RyaW5naWZ5KGRhdGEpfSk7XG4gICAgICBjb25zdCBvcHRzID0gdGhpcy5fZ2V0UmVxdWVzdE9wdGlvbnMoJ1BPU1QnLCBwYXRoLCB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgICAgICAgJ0NvbnRlbnQtTGVuZ3RoJzogc2VuZC5sZW5ndGhcbiAgICAgIH0pO1xuICAgICAgY29uc3QgcmVxdWVzdCA9IGh0dHBzLnJlcXVlc3Qob3B0cywgcmVzID0+IHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLl9wYXJzZVJlc3BvbnNlKHJlcykpO1xuICAgICAgfSk7XG4gICAgICByZXF1ZXN0LndyaXRlKHNlbmQpO1xuICAgICAgcmVxdWVzdC5vbignZXJyb3InLCByZWplY3QpO1xuICAgICAgcmVxdWVzdC5lbmQoKTtcbiAgICB9KTtcbiAgfVxufVxuXG5jbGFzcyBNZSB7XG4gIF9zOiBTdHJlYWs7XG4gIF9jOiBDb25uSGVscGVyO1xuICBjb25zdHJ1Y3RvcihzOiBTdHJlYWssIGM6IENvbm5IZWxwZXIpIHtcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gYztcbiAgfVxuICBnZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KCd1c2Vycy9tZScpO1xuICB9XG59XG5cbmNsYXNzIFBpcGVsaW5lcyB7XG4gIF9zOiBTdHJlYWs7XG4gIF9jOiBDb25uSGVscGVyO1xuICBTdGFnZXM6IFBpcGVsaW5lU3RhZ2VzO1xuICBGaWVsZHM6IFBpcGVsaW5lRmllbGRzO1xuICBjb25zdHJ1Y3RvcihzOiBTdHJlYWssIGM6IENvbm5IZWxwZXIpIHtcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gYztcbiAgICB0aGlzLlN0YWdlcyA9IG5ldyBQaXBlbGluZVN0YWdlcyhzLCBjKTtcbiAgICB0aGlzLkZpZWxkcyA9IG5ldyBQaXBlbGluZUZpZWxkcyhzLCBjKTtcbiAgfVxuICBnZXRBbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KCdwaXBlbGluZXMnKTtcbiAgfVxuICBnZXRPbmUoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBwaXBlbGluZXMvJHtrZXl9YCk7XG4gIH1cbiAgZ2V0Qm94ZXMoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBwaXBlbGluZXMvJHtrZXl9L2JveGVzYCk7XG4gIH1cbiAgZ2V0Qm94ZXNJblN0YWdlIChrZXk6IHN0cmluZywgc3RhZ2VLZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYHBpcGVsaW5lcy8ke2tleX0vYm94ZXM/c3RhZ2VLZXk9JHtzdGFnZUtleX1gKTtcbiAgfVxuICBjcmVhdGUoZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucHV0KCdwaXBlbGluZXMnLCBkYXRhKTtcbiAgfVxuICBkZWxldGUoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5kZWxldGUoYWV1IGBwaXBlbGluZXMvJHtrZXl9YCk7XG4gIH1cbiAgdXBkYXRlKGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnBvc3QoYWV1IGBwaXBlbGluZXMvJHtkYXRhLmtleX1gLCBkYXRhKTtcbiAgfVxuICBnZXRGZWVkKGtleTogc3RyaW5nLCBkZXRhaWxMZXZlbDogP3N0cmluZykge1xuICAgIGxldCBxcyA9ICcnO1xuICAgIGlmIChkZXRhaWxMZXZlbCkge1xuICAgICAgcXMgKz0gJz8nICsgcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHtkZXRhaWxMZXZlbH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBwaXBlbGluZXMvJHtrZXl9L25ld3NmZWVkYCArIHFzKTtcbiAgfVxufVxuXG5jbGFzcyBQaXBlbGluZVN0YWdlcyB7XG4gIF9zOiBTdHJlYWs7XG4gIF9jOiBDb25uSGVscGVyO1xuICBjb25zdHJ1Y3RvcihzOiBTdHJlYWssIGM6IENvbm5IZWxwZXIpIHtcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gYztcbiAgfVxuICBnZXRBbGwocGlwZUtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgcGlwZWxpbmVzLyR7cGlwZUtleX0vc3RhZ2VzYCk7XG4gIH1cbiAgZ2V0T25lKHBpcGVLZXk6IHN0cmluZywga2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBwaXBlbGluZXMvJHtwaXBlS2V5fS9zdGFnZXMvJHtrZXl9YCk7XG4gIH1cbiAgY3JlYXRlKHBpcGVLZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucHV0KGFldSBgcGlwZWxpbmVzLyR7cGlwZUtleX0vc3RhZ2VzYCwgZGF0YSk7XG4gIH1cbiAgZGVsZXRlKHBpcGVLZXk6IHN0cmluZywga2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5kZWxldGUoYWV1IGBwaXBlbGluZXMvJHtwaXBlS2V5fS9zdGFnZXMvJHtrZXl9YCk7XG4gIH1cbiAgdXBkYXRlKHBpcGVLZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXUgYHBpcGVsaW5lcy8ke3BpcGVLZXl9L3N0YWdlcy8ke2RhdGEua2V5fWAsIGRhdGEpO1xuICB9XG59XG5cbmNsYXNzIFBpcGVsaW5lRmllbGRzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG4gIGNvbnN0cnVjdG9yKHM6IFN0cmVhaywgYzogQ29ubkhlbHBlcikge1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xuICB9XG4gIGdldEFsbChwaXBlS2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBwaXBlbGluZXMvJHtwaXBlS2V5fS9maWVsZHNgKTtcbiAgfVxuICBnZXRPbmUocGlwZUtleTogc3RyaW5nLCBrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYHBpcGVsaW5lcy8ke3BpcGVLZXl9L2ZpZWxkcy8ke2tleX1gKTtcbiAgfVxuICBjcmVhdGUocGlwZUtleTogc3RyaW5nLCBkYXRhOiBPYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wdXQoYWV1IGBwaXBlbGluZXMvJHtwaXBlS2V5fS9maWVsZHNgLCBkYXRhKTtcbiAgfVxuICBkZWxldGUocGlwZUtleTogc3RyaW5nLCBrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmRlbGV0ZShhZXUgYHBpcGVsaW5lcy8ke3BpcGVLZXl9L2ZpZWxkcy8ke2tleX1gKTtcbiAgfVxuICB1cGRhdGUocGlwZUtleTogc3RyaW5nLCBkYXRhOiBPYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wb3N0KGFldSBgcGlwZWxpbmVzLyR7cGlwZUtleX0vZmllbGRzLyR7ZGF0YS5rZXl9YCwgZGF0YSk7XG4gIH1cbn1cblxuY2xhc3MgQm94ZXMge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcbiAgRmllbGRzOiBCb3hGaWVsZHM7XG4gIGNvbnN0cnVjdG9yKHM6IFN0cmVhaywgYzogQ29ubkhlbHBlcikge1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xuICAgIHRoaXMuRmllbGRzID0gbmV3IEJveEZpZWxkcyhzLCBjKTtcbiAgfVxuICBnZXRBbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KCdib3hlcycpO1xuICB9XG4gIGdldEZvclBpcGVsaW5lKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3MuUGlwZWxpbmVzLmdldEJveGVzKGtleSk7XG4gIH1cbiAgZ2V0T25lKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgYm94ZXMvJHtrZXl9YCk7XG4gIH1cbiAgY3JlYXRlKHBpcGVLZXksIGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wdXQoYWV1IGBwaXBlbGluZXMvJHtwaXBlS2V5fS9ib3hlc2AsIGRhdGEpO1xuICB9XG4gIGRlbGV0ZShrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmRlbGV0ZShhZXUgYGJveGVzLyR7a2V5fWApO1xuICB9XG4gIHVwZGF0ZShkYXRhOiBPYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wb3N0KGFldSBgYm94ZXMvJHtkYXRhLmtleX1gLCBkYXRhKTtcbiAgfVxuICBnZXRGaWVsZHMoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBib3hlcy8ke2tleX0vZmllbGRzYCk7XG4gIH1cbiAgZ2V0UmVtaW5kZXJzKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgYm94ZXMvJHtrZXl9L3JlbWluZGVyc2ApO1xuICB9XG4gIGdldENvbW1lbnRzKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgYm94ZXMvJHtrZXl9L2NvbW1lbnRzYCk7XG4gIH1cbiAgLy8gZGVwcmVjYXRlZCBtZXRob2RcbiAgY3JlYXRlQ29tbWVudChrZXk6IHN0cmluZywgZGF0YSkge1xuICAgIHJldHVybiB0aGlzLl9jLnB1dChhZXUgYGJveGVzLyR7a2V5fS9jb21tZW50c2AsIGRhdGEpO1xuICB9XG4gIHBvc3RDb21tZW50KGtleTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wdXQoYWV1IGBib3hlcy8ke2tleX0vY29tbWVudHNgLCB7bWVzc2FnZX0pO1xuICB9XG4gIGdldEZpbGVzKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgYm94ZXMvJHtrZXl9L2ZpbGVzYCk7XG4gIH1cbiAgZ2V0VGhyZWFkcyhrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYGJveGVzLyR7a2V5fS90aHJlYWRzYCk7XG4gIH1cbiAgZ2V0RmVlZChrZXk6IHN0cmluZywgZGV0YWlsTGV2ZWw6ID9zdHJpbmcpIHtcbiAgICBsZXQgcXMgPSAnJztcbiAgICBpZiAoZGV0YWlsTGV2ZWwpIHtcbiAgICAgIHFzICs9ICc/JyArIHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeSh7ZGV0YWlsTGV2ZWx9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgYm94ZXMvJHtrZXl9L25ld3NmZWVkYCArIHFzKTtcbiAgfVxuICBnZXRUYXNrcyhrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYGJveGVzLyR7a2V5fS90YXNrc2ApO1xuICB9XG59XG5cbmNsYXNzIEJveEZpZWxkcyB7XG4gIF9zOiBTdHJlYWs7XG4gIF9jOiBDb25uSGVscGVyO1xuICBjb25zdHJ1Y3RvcihzOiBTdHJlYWssIGM6IENvbm5IZWxwZXIpIHtcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gYztcbiAgfVxuICBnZXRGb3JCb3goa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcy5Cb3hlcy5nZXRGaWVsZHMoa2V5KTtcbiAgfVxuICBnZXRPbmUoYm94S2V5OiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgYm94ZXMvJHtib3hLZXl9L2ZpZWxkcy8ke2tleX1gKTtcbiAgfVxuICB1cGRhdGUoYm94S2V5OiBzdHJpbmcsIGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnBvc3QoYWV1IGBib3hlcy8ke2JveEtleX0vZmllbGRzLyR7ZGF0YS5rZXl9YCwgZGF0YSk7XG4gIH1cbn1cblxuY2xhc3MgRmlsZXMge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcbiAgY29uc3RydWN0b3IoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gIH1cbiAgZ2V0Rm9yQm94KGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3MuQm94ZXMuZ2V0RmlsZXMoa2V5KTtcbiAgfVxuICBnZXRPbmUoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBmaWxlcy8ke2tleX1gKTtcbiAgfVxuICBnZXRDb250ZW50cyhrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldE5vUGFyc2UoYWV1IGBmaWxlcy8ke2tleX0vY29udGVudHNgKTtcbiAgfVxufVxuXG5jbGFzcyBUaHJlYWRzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG4gIGNvbnN0cnVjdG9yKHM6IFN0cmVhaywgYzogQ29ubkhlbHBlcikge1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xuICB9XG4gIGdldEZvckJveChib3hLZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9zLkJveGVzLmdldFRocmVhZHMoYm94S2V5KTtcbiAgfVxuICBnZXRPbmUodGhyZWFkS2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGB0aHJlYWRzLyR7dGhyZWFkS2V5fWApO1xuICB9XG59XG5cbmNsYXNzIFRhc2tzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG4gIGNvbnN0cnVjdG9yKHM6IFN0cmVhaywgYzogQ29ubkhlbHBlcikge1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xuICB9XG4gIGdldEZvckJveChib3hLZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9zLkJveGVzLmdldFRhc2tzKGJveEtleSk7XG4gIH1cbiAgZ2V0T25lKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgdGFza3MvJHtrZXl9YCk7XG4gIH1cbiAgY3JlYXRlKGJveEtleTogc3RyaW5nLCBkYXRhOiBPYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wb3N0KGFldSBgYm94ZXMvJHtib3hLZXl9L3Rhc2tzYCwgZGF0YSk7XG4gIH1cbiAgdXBkYXRlKGtleTogc3RyaW5nLCBkYXRhOiBPYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wb3N0KGFldSBgdGFza3MvJHtrZXl9YCwgZGF0YSk7XG4gIH1cbiAgZGVsZXRlKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZGVsZXRlKGFldSBgdGFza3MvJHtrZXl9YCk7XG4gIH1cbn1cblxuY2xhc3MgV2ViaG9va3Mge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcbiAgY29uc3RydWN0b3IoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFsbCB3ZWJob29rcyBmb3IgYSBwaXBlbGluZVxuICAgKlxuICAgKiBAcGFyYW0ga2V5IFBpcGVsaW5lIGtleVxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxPYmplY3Q+fVxuICAgKi9cbiAgZ2V0Rm9yUGlwZWxpbmUoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBwaXBlbGluZXMvJHtrZXl9L3dlYmhvb2tzYCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgc3BlY2lmaWMgd2ViaG9va1xuICAgKlxuICAgKiBAcGFyYW0ga2V5IFdlYmhvb2sga2V5XG4gICAqIEByZXR1cm4ge1Byb21pc2UuPE9iamVjdD59XG4gICAqL1xuICBnZXRPbmUoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGB3ZWJob29rcy8ke2tleX1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgd2ViaG9vayBmb3IgcGlwZWxpbmVcbiAgICpcbiAgICogQHBhcmFtIGtleSBQaXBlbGluZSBrZXlcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQHJldHVybiB7UHJvbWlzZS48T2JqZWN0Pn1cbiAgICovXG4gIGNyZWF0ZShrZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXUgYHBpcGVsaW5lcy8ke2tleX0vd2ViaG9va3NgLCBkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYSB3ZWJob29rXG4gICAqXG4gICAqIEBwYXJhbSBrZXkgV2ViaG9vayBrZXlcbiAgICogQHJldHVybiB7UHJvbWlzZS48T2JqZWN0Pn1cbiAgICovXG4gIGRlbGV0ZShrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmRlbGV0ZShhZXUgYHdlYmhvb2tzLyR7a2V5fWApO1xuICB9XG5cbiAgLyoqXG4gICAqIEVkaXQgYSB3ZWJob29rXG4gICAqXG4gICAqIEBwYXJhbSBrZXkgV2ViaG9vayBrZXlcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQHJldHVybiB7UHJvbWlzZS48T2JqZWN0Pn1cbiAgICovXG4gIHVwZGF0ZShrZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXUgYHdlYmhvb2tzLyR7a2V5fWAsIGRhdGEpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTdHJlYWsge1xuICBfYzogQ29ubkhlbHBlcjtcbiAgTWU6IE1lO1xuICBQaXBlbGluZXM6IFBpcGVsaW5lcztcbiAgQm94ZXM6IEJveGVzO1xuICBGaWxlczogRmlsZXM7XG4gIFRocmVhZHM6IFRocmVhZHM7XG4gIFRhc2tzOiBUYXNrcztcbiAgV2ViaG9va3M6IFdlYmhvb2tzO1xuXG4gIGNvbnN0cnVjdG9yKGF1dGhLZXk6IHN0cmluZykge1xuICAgIHRoaXMuX2MgPSBuZXcgQ29ubkhlbHBlcihhdXRoS2V5KTtcbiAgICB0aGlzLk1lID0gbmV3IE1lKHRoaXMsIHRoaXMuX2MpO1xuICAgIHRoaXMuUGlwZWxpbmVzID0gbmV3IFBpcGVsaW5lcyh0aGlzLCB0aGlzLl9jKTtcbiAgICB0aGlzLkJveGVzID0gbmV3IEJveGVzKHRoaXMsIHRoaXMuX2MpO1xuICAgIHRoaXMuRmlsZXMgPSBuZXcgRmlsZXModGhpcywgdGhpcy5fYyk7XG4gICAgdGhpcy5UaHJlYWRzID0gbmV3IFRocmVhZHModGhpcywgdGhpcy5fYyk7XG4gICAgdGhpcy5UYXNrcyA9IG5ldyBUYXNrcyh0aGlzLCB0aGlzLl9jKTtcbiAgICB0aGlzLldlYmhvb2tzID0gbmV3IFdlYmhvb2tzKHRoaXMsIHRoaXMuX2MpO1xuXG4gICAgLy8gY29uc3RhbnRzIGZvciB3ZWJob29rIGV2ZW50IHR5cGVzXG4gICAgdGhpcy5XZWJob29rcy5ib3hDcmVhdGUgPSAnQk9YX0NSRUFURSc7XG4gICAgdGhpcy5XZWJob29rcy5ib3hEZWxldGUgPSAnQk9YX0RFTEVURSc7XG4gICAgdGhpcy5XZWJob29rcy5zdGFnZUNyZWF0ZSA9ICdTVEFHRV9DUkVBVEUnO1xuICAgIHRoaXMuV2ViaG9va3MuYm94TmV3RW1haWxBZGRyZXNzID0gJ0JPWF9ORVdfRU1BSUxfQUREUkVTUyc7XG4gICAgdGhpcy5XZWJob29rcy5ib3hFZGl0ID0gJ0JPWF9FRElUJztcbiAgICB0aGlzLldlYmhvb2tzLmJveENoYW5nZVN0YXRlID0gJ0JPWF9DSEFOR0VfU1RBR0UnO1xuICAgIHRoaXMuV2ViaG9va3MuYm94Q2hhbmdlUGlwZWxpbmUgPSAnQk9YX0NIQU5HRV9QSVBFTElORSc7XG4gICAgdGhpcy5XZWJob29rcy5jb21tZW50Q3JlYXRlID0gJ0NPTU1FTlRfQ1JFQVRFJztcbiAgICB0aGlzLldlYmhvb2tzLnRhc2tDcmVhdGUgPSAnVEFTS19DUkVBVEUnO1xuICAgIHRoaXMuV2ViaG9va3MudGFza0NvbXBsZXRlID0gJ1RBU0tfQ09NUExFVEUnO1xuICAgIHRoaXMuV2ViaG9va3MudGFza0R1ZSA9ICdUQVNLX0RVRSc7XG4gIH1cblxuICBzZWFyY2gocXVlcnk6IHN0cmluZyk6IFByb21pc2U8T2JqZWN0PiB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgc2VhcmNoP3F1ZXJ5PSR7cXVlcnl9YCk7XG4gIH1cbn1cbiJdfQ==
