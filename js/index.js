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

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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
    _templateObject24 = (0, _taggedTemplateLiteral3.default)(['users/me/teams'], ['users/me/teams']),
    _templateObject25 = (0, _taggedTemplateLiteral3.default)(['teams/', ''], ['teams/', '']),
    _templateObject26 = (0, _taggedTemplateLiteral3.default)(['contacts/', ''], ['contacts/', '']),
    _templateObject27 = (0, _taggedTemplateLiteral3.default)(['teams/', '/contacts'], ['teams/', '/contacts']),
    _templateObject28 = (0, _taggedTemplateLiteral3.default)(['search?query=', ''], ['search?query=', '']);

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
      var v2prefix = '/api/v2/';
      var v2paths = ['tasks', 'webhooks', 'boxes', 'teams', 'contacts'];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(v2paths), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var v2p = _step.value;

          if (path.indexOf(v2p) > -1) prefix = v2prefix;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

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

var Teams = function () {
  function Teams(s, c) {
    (0, _classCallCheck3.default)(this, Teams);

    this._s = s;
    this._c = c;
  }

  /**
   * Get list of my teams
   * @return {Promise<Object>}
   */


  (0, _createClass3.default)(Teams, [{
    key: 'getAll',
    value: function getAll() {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject24));
    }

    /**
     * Get a team
     *
     * @param key Team key
     * @return {Promise<Object>}
     */

  }, {
    key: 'getOne',
    value: function getOne(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject25, key));
    }
  }]);
  return Teams;
}();

var Contacts = function () {
  function Contacts(s, c) {
    (0, _classCallCheck3.default)(this, Contacts);

    this._s = s;
    this._c = c;
  }

  /**
   * Get a contact
   *
   * @param key
   * @return {Promise<Object>}
   */


  (0, _createClass3.default)(Contacts, [{
    key: 'getOne',
    value: function getOne(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject26, key));
    }

    /**
     * Create a new contact
     *
     * @param key Team key
     * @param data
     * @return {Promise.<Object>}
     */

  }, {
    key: 'create',
    value: function create(key, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject27, key), data);
    }

    /**
     * Delete a contact
     *
     * @param key Contact key
     * @return {Promise.<Object>}
     */

  }, {
    key: 'delete',
    value: function _delete(key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject26, key));
    }

    /**
     * Edit a contact
     *
     * @param key Contact key
     * @param data
     * @return {Promise.<Object>}
     */

  }, {
    key: 'update',
    value: function update(key, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject26, key), data);
    }

    /**
     * Add contacts to box
     * @param key Box key to add contacts to
     * @param data Array with contacts. E.g {contacts:[{<a contact>}]}
     *
     * @return {Promise<Object>}
     */

  }, {
    key: 'addToBox',
    value: function addToBox(key, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject9, key), data);
    }
  }]);
  return Contacts;
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
    this.Teams = new Teams(this, this._c);
    this.Contacts = new Contacts(this, this._c);

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
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject28, query));
    }
  }]);
  return Streak;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJDb25uSGVscGVyIiwiYXV0aEtleSIsIl9hdXRoS2V5IiwibWV0aG9kIiwicGF0aCIsImhlYWRlcnMiLCJlbmNvZGluZyIsInByZWZpeCIsInYycHJlZml4IiwidjJwYXRocyIsInYycCIsImluZGV4T2YiLCJob3N0IiwiYXV0aCIsInJlc3BvbnNlIiwicmVzb2x2ZSIsInJlamVjdCIsInN0cnMiLCJvbiIsImNodW5rIiwicHVzaCIsInN0ciIsImpvaW4iLCJzdGF0dXNDb2RlIiwiSlNPTiIsInBhcnNlIiwianNvbiIsImVycm9yTWVzc2FnZSIsImVycm9yIiwiZXJyIiwiRXJyb3IiLCJjaHVua3MiLCJidWYiLCJCdWZmZXIiLCJjb25jYXQiLCJvcHRzIiwiX2dldFJlcXVlc3RPcHRpb25zIiwicmVxdWVzdCIsIl9wYXJzZVJlc3BvbnNlIiwicmVzIiwiZW5kIiwidW5kZWZpbmVkIiwiX3BsYWluUmVzcG9uc2UiLCJkYXRhIiwiZHN0ciIsInN0cmluZ2lmeSIsInNlbmQiLCJsZW5ndGgiLCJ3cml0ZSIsIk1lIiwicyIsImMiLCJfcyIsIl9jIiwiZ2V0IiwiUGlwZWxpbmVzIiwiU3RhZ2VzIiwiUGlwZWxpbmVTdGFnZXMiLCJGaWVsZHMiLCJQaXBlbGluZUZpZWxkcyIsImtleSIsInN0YWdlS2V5IiwicHV0IiwiZGVsZXRlIiwicG9zdCIsImRldGFpbExldmVsIiwicXMiLCJwaXBlS2V5IiwiQm94ZXMiLCJCb3hGaWVsZHMiLCJnZXRCb3hlcyIsIm1lc3NhZ2UiLCJnZXRGaWVsZHMiLCJib3hLZXkiLCJGaWxlcyIsImdldEZpbGVzIiwiZ2V0Tm9QYXJzZSIsIlRocmVhZHMiLCJnZXRUaHJlYWRzIiwidGhyZWFkS2V5IiwiVGFza3MiLCJnZXRUYXNrcyIsIldlYmhvb2tzIiwiVGVhbXMiLCJDb250YWN0cyIsIlN0cmVhayIsImJveENyZWF0ZSIsImJveERlbGV0ZSIsInN0YWdlQ3JlYXRlIiwiYm94TmV3RW1haWxBZGRyZXNzIiwiYm94RWRpdCIsImJveENoYW5nZVN0YXRlIiwiYm94Q2hhbmdlUGlwZWxpbmUiLCJjb21tZW50Q3JlYXRlIiwidGFza0NyZWF0ZSIsInRhc2tDb21wbGV0ZSIsInRhc2tEdWUiLCJxdWVyeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0lBRU1BLFU7QUFHSixzQkFBYUMsT0FBYixFQUE4QjtBQUFBOztBQUM1QixTQUFLQyxRQUFMLEdBQWdCRCxPQUFoQjtBQUNEOzs7O3VDQUVtQkUsTSxFQUFnQkMsSSxFQUF3RTtBQUFBLFVBQTFEQyxPQUEwRCx1RUFBeEMsRUFBd0M7QUFBQSxVQUFwQ0MsUUFBb0MsdUVBQWhCLE1BQWdCOztBQUMxRztBQUNBLFVBQUlDLFNBQVMsVUFBYjtBQUNBO0FBQ0EsVUFBTUMsV0FBVyxVQUFqQjtBQUNBLFVBQU1DLFVBQVUsQ0FDZCxPQURjLEVBRWQsVUFGYyxFQUdkLE9BSGMsRUFJZCxPQUpjLEVBS2QsVUFMYyxDQUFoQjtBQUwwRztBQUFBO0FBQUE7O0FBQUE7QUFZMUcsd0RBQWdCQSxPQUFoQiw0R0FBeUI7QUFBQSxjQUFoQkMsR0FBZ0I7O0FBQ3ZCLGNBQUlOLEtBQUtPLE9BQUwsQ0FBYUQsR0FBYixJQUFvQixDQUFDLENBQXpCLEVBQTRCSCxTQUFTQyxRQUFUO0FBQzdCO0FBZHlHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBZ0IxRyxhQUFPO0FBQ0xMLHNCQURLLEVBQ0dFLGdCQURILEVBQ1lDLGtCQURaO0FBRUxNLGNBQU0sZ0JBRkQ7QUFHTFIsY0FBTUcsU0FBU0gsSUFIVjtBQUlMUyxjQUFNLEtBQUtYO0FBSk4sT0FBUDtBQU1EOzs7bUNBRWVZLFEsRUFBK0M7QUFDN0QsYUFBTyxzQkFBWSxVQUFDQyxPQUFELEVBQVVDLE1B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QSxRQUFKLENBQWEsSUFBYixFQUFtQixLQUFLN0IsRUFBeEIsQ0FBaEI7QUFDQSxTQUFLOEIsS0FBTCxHQUFhLElBQUlBLEtBQUosQ0FBVSxJQUFWLEVBQWdCLEtBQUs5QixFQUFyQixDQUFiO0FBQ0EsU0FBSytCLFFBQUwsR0FBZ0IsSUFBSUEsUUFBSixDQUFhLElBQWIsRUFBbUIsS0FBSy9CLEVBQXhCLENBQWhCOztBQUVBO0FBQ0EsU0FBSzZCLFFBQUwsQ0FBY0ksU0FBZCxHQUEwQixZQUExQjtBQUNBLFNBQUtKLFFBQUwsQ0FBY0ssU0FBZCxHQUEwQixZQUExQjtBQUNBLFNBQUtMLFFBQUwsQ0FBY00sV0FBZCxHQUE0QixjQUE1QjtBQUNBLFNBQUtOLFFBQUwsQ0FBY08sa0JBQWQsR0FBbUMsdUJBQW5DO0FBQ0EsU0FBS1AsUUFBTCxDQUFjUSxPQUFkLEdBQXdCLFVBQXhCO0FBQ0EsU0FBS1IsUUFBTCxDQUFjUyxjQUFkLEdBQStCLGtCQUEvQjtBQUNBLFNBQUtULFFBQUwsQ0FBY1UsaUJBQWQsR0FBa0MscUJBQWxDO0FBQ0EsU0FBS1YsUUFBTCxDQUFjVyxhQUFkLEdBQThCLGdCQUE5QjtBQUNBLFNBQUtYLFFBQUwsQ0FBY1ksVUFBZCxHQUEyQixhQUEzQjtBQUNBLFNBQUtaLFFBQUwsQ0FBY2EsWUFBZCxHQUE2QixlQUE3QjtBQUNBLFNBQUtiLFFBQUwsQ0FBY2MsT0FBZCxHQUF3QixVQUF4QjtBQUNEOzs7OzJCQUVPQyxLLEVBQWdDO0FBQ3RDLGFBQU8sS0FBSzVDLEVBQUwsQ0FBUUMsR0FBUixpREFBK0IyQyxLQUEvQixFQUFQO0FBQ0QiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgaHR0cHMgZnJvbSAnaHR0cHMnO1xuaW1wb3J0IHF1ZXJ5c3RyaW5nIGZyb20gJ3F1ZXJ5c3RyaW5nJztcblxuaW1wb3J0IGFldSBmcm9tICcuL2F1dG8tZW5jb2RlLXVyaSc7XG5cbmNsYXNzIENvbm5IZWxwZXIge1xuICBfYXV0aEtleTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yIChhdXRoS2V5OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hdXRoS2V5ID0gYXV0aEtleTtcbiAgfVxuXG4gIF9nZXRSZXF1ZXN0T3B0aW9ucyAobWV0aG9kOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgaGVhZGVyczogT2JqZWN0ID0ge30sIGVuY29kaW5nOiA/c3RyaW5nID0gJ3V0ZjgnKTogT2JqZWN0IHtcbiAgICAvLyBCeSBkZWZhdWx0IHdlIHJlcXVlc3QgdGhlIFYxIG9mIHRoZSBBUElcbiAgICBsZXQgcHJlZml4ID0gJy9hcGkvdjEvJztcbiAgICAvLyBJZiB0aGUgcmVxdWVzdGVkIHJlc291cmNlIGlzIGEgVGFzaywgdGhlbiB1c2UgdGhlIFYyIG9mIHRoZSBBUElcbiAgICBjb25zdCB2MnByZWZpeCA9ICcvYXBpL3YyLyc7XG4gICAgY29uc3QgdjJwYXRocyA9IFtcbiAgICAgICd0YXNrcycsXG4gICAgICAnd2ViaG9va3MnLFxuICAgICAgJ2JveGVzJyxcbiAgICAgICd0ZWFtcycsXG4gICAgICAnY29udGFjdHMnXG4gICAgXTtcbiAgICBmb3IgKGxldCB2MnAgb2YgdjJwYXRocykge1xuICAgICAgaWYgKHBhdGguaW5kZXhPZih2MnApID4gLTEpIHByZWZpeCA9IHYycHJlZml4O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBtZXRob2QsIGhlYWRlcnMsIGVuY29kaW5nLFxuICAgICAgaG9zdDogJ3d3dy5zdHJlYWsuY29tJyxcbiAgICAgIHBhdGg6IHByZWZpeCArIHBhdGgsXG4gICAgICBhdXRoOiB0aGlzLl9hdXRoS2V5XG4gICAgfTtcbiAgfVxuXG4gIF9wYXJzZVJlc3BvbnNlIChyZXNwb25zZTogaHR0cHMuSW5jb21pbmdNZXNzYWdlKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgc3Ryczogc3RyaW5nW10gPSBbXTtcbiAgICAgIHJlc3BvbnNlLm9uKCdkYXRhJywgKGNodW5rOiBzdHJpbmcpID0+IHtcbiAgICAgICAgc3Rycy5wdXNoKGNodW5rKTtcbiAgICAgIH0pO1xuICAgICAgcmVzcG9uc2Uub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBzdHIgPSBzdHJzLmpvaW4oJycpO1xuICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShzdHIpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGpzb247XG4gICAgICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gYFJlc3BvbnNlIGNvZGUgJHtyZXNwb25zZS5zdGF0dXNDb2RlfWA7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBqc29uID0gSlNPTi5wYXJzZShzdHIpO1xuICAgICAgICAgICAgICBpZiAoanNvbiAmJiBqc29uLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0ganNvbi5lcnJvcjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgIC8vIElnbm9yZSBwYXJzZSBlcnJvclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVqZWN0KE9iamVjdC5hc3NpZ24oKG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpOiBPYmplY3QpLCB7XG4gICAgICAgICAgICAgIHN0ciwganNvbixcbiAgICAgICAgICAgICAgc3RhdHVzQ29kZTogcmVzcG9uc2Uuc3RhdHVzQ29kZSxcbiAgICAgICAgICAgICAgaGVhZGVyczogcmVzcG9uc2UuaGVhZGVyc1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmVzcG9uc2Uub24oJ2Vycm9yJywgcmVqZWN0KTtcbiAgICB9KTtcbiAgfVxuXG4gIF9wbGFpblJlc3BvbnNlIChyZXNwb25zZTogaHR0cHMuSW5jb21pbmdNZXNzYWdlKTogUHJvbWlzZTxCdWZmZXI+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY2h1bmtzOiBCdWZmZXJbXSA9IFtdO1xuICAgICAgcmVzcG9uc2Uub24oJ2RhdGEnLCAoY2h1bms6IEJ1ZmZlcikgPT4ge1xuICAgICAgICBjaHVua3MucHVzaChjaHVuayk7XG4gICAgICB9KTtcbiAgICAgIHJlc3BvbnNlLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgYnVmID0gQnVmZmVyLmNvbmNhdChjaHVua3MpO1xuICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICAgIHJlc29sdmUoYnVmKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYFJlc3BvbnNlIGNvZGUgJHtyZXNwb25zZS5zdGF0dXNDb2RlfWA7XG4gICAgICAgICAgICByZWplY3QoT2JqZWN0LmFzc2lnbigobmV3IEVycm9yKGVycm9yTWVzc2FnZSk6IE9iamVjdCksIHtcbiAgICAgICAgICAgICAgYnVmLFxuICAgICAgICAgICAgICBzdGF0dXNDb2RlOiByZXNwb25zZS5zdGF0dXNDb2RlLFxuICAgICAgICAgICAgICBoZWFkZXJzOiByZXNwb25zZS5oZWFkZXJzXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXNwb25zZS5vbignZXJyb3InLCByZWplY3QpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPE9iamVjdD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBvcHRzID0gdGhpcy5fZ2V0UmVxdWVzdE9wdGlvbnMoJ0dFVCcsIHBhdGgpO1xuICAgICAgY29uc3QgcmVxdWVzdCA9IGh0dHBzLnJlcXVlc3Qob3B0cywgcmVzID0+IHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLl9wYXJzZVJlc3BvbnNlKHJlcykpO1xuICAgICAgfSk7XG4gICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIHJlamVjdCk7XG4gICAgICByZXF1ZXN0LmVuZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Tm9QYXJzZSAocGF0aDogc3RyaW5nKTogUHJvbWlzZTxCdWZmZXI+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgb3B0cyA9IHRoaXMuX2dldFJlcXVlc3RPcHRpb25zKCdHRVQnLCBwYXRoLCB1bmRlZmluZWQsIG51bGwpO1xuICAgICAgY29uc3QgcmVxdWVzdCA9IGh0dHBzLnJlcXVlc3Qob3B0cywgcmVzID0+IHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLl9wbGFpblJlc3BvbnNlKHJlcykpO1xuICAgICAgfSk7XG4gICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIHJlamVjdCk7XG4gICAgICByZXF1ZXN0LmVuZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHV0IChwYXRoOiBzdHJpbmcsIGRhdGE6IE9iamVjdCk6IFByb21pc2U8T2JqZWN0PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGRzdHIgPSBxdWVyeXN0cmluZy5zdHJpbmdpZnkoZGF0YSk7XG4gICAgICBjb25zdCBvcHRzID0gdGhpcy5fZ2V0UmVxdWVzdE9wdGlvbnMoJ1BVVCcsIHBhdGggKyAnPycgKyBkc3RyKTtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBodHRwcy5yZXF1ZXN0KG9wdHMsIHJlcyA9PiB7XG4gICAgICAgIHJlc29sdmUodGhpcy5fcGFyc2VSZXNwb25zZShyZXMpKTtcbiAgICAgIH0pO1xuICAgICAgcmVxdWVzdC5vbignZXJyb3InLCByZWplY3QpO1xuICAgICAgcmVxdWVzdC5lbmQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZSAocGF0aDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgb3B0cyA9IHRoaXMuX2dldFJlcXVlc3RPcHRpb25zKCdERUxFVEUnLCBwYXRoKTtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBodHRwcy5yZXF1ZXN0KG9wdHMsIHJlcyA9PiB7XG4gICAgICAgIHJlc29sdmUodGhpcy5fcGFyc2VSZXNwb25zZShyZXMpKTtcbiAgICAgIH0pO1xuICAgICAgcmVxdWVzdC5vbignZXJyb3InLCByZWplY3QpO1xuICAgICAgcmVxdWVzdC5lbmQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBvc3QgKHBhdGg6IHN0cmluZywgZGF0YTogYW55KTogUHJvbWlzZTxPYmplY3Q+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgc2VuZCA9IHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeSh7IGpzb246IEpTT04uc3RyaW5naWZ5KGRhdGEpIH0pO1xuICAgICAgY29uc3Qgb3B0cyA9IHRoaXMuX2dldFJlcXVlc3RPcHRpb25zKCdQT1NUJywgcGF0aCwge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgICAgICdDb250ZW50LUxlbmd0aCc6IHNlbmQubGVuZ3RoXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBodHRwcy5yZXF1ZXN0KG9wdHMsIHJlcyA9PiB7XG4gICAgICAgIHJlc29sdmUodGhpcy5fcGFyc2VSZXNwb25zZShyZXMpKTtcbiAgICAgIH0pO1xuICAgICAgcmVxdWVzdC53cml0ZShzZW5kKTtcbiAgICAgIHJlcXVlc3Qub24oJ2Vycm9yJywgcmVqZWN0KTtcbiAgICAgIHJlcXVlc3QuZW5kKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuY2xhc3MgTWUge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcblxuICBjb25zdHJ1Y3RvciAoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gIH1cblxuICBnZXQgKCkge1xuICAgIHJldHVybiB0aGlzLl9jLmdldCgndXNlcnMvbWUnKTtcbiAgfVxufVxuXG5jbGFzcyBQaXBlbGluZXMge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcbiAgU3RhZ2VzOiBQaXBlbGluZVN0YWdlcztcbiAgRmllbGRzOiBQaXBlbGluZUZpZWxkcztcblxuICBjb25zdHJ1Y3RvciAoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gICAgdGhpcy5TdGFnZXMgPSBuZXcgUGlwZWxpbmVTdGFnZXMocywgYyk7XG4gICAgdGhpcy5GaWVsZHMgPSBuZXcgUGlwZWxpbmVGaWVsZHMocywgYyk7XG4gIH1cblxuICBnZXRBbGwgKCkge1xuICAgIHJldHVybiB0aGlzLl9jLmdldCgncGlwZWxpbmVzJyk7XG4gIH1cblxuICBnZXRPbmUgKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldWBwaXBlbGluZXMvJHtrZXl9YCk7XG4gIH1cblxuICBnZXRCb3hlcyAoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YHBpcGVsaW5lcy8ke2tleX0vYm94ZXNgKTtcbiAgfVxuXG4gIGdldEJveGVzSW5TdGFnZSAoa2V5OiBzdHJpbmcsIHN0YWdlS2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YHBpcGVsaW5lcy8ke2tleX0vYm94ZXM/c3RhZ2VLZXk9JHtzdGFnZUtleX1gKTtcbiAgfVxuXG4gIGNyZWF0ZSAoZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucHV0KCdwaXBlbGluZXMnLCBkYXRhKTtcbiAgfVxuXG4gIGRlbGV0ZSAoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5kZWxldGUoYWV1YHBpcGVsaW5lcy8ke2tleX1gKTtcbiAgfVxuXG4gIHVwZGF0ZSAoZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXVgcGlwZWxpbmVzLyR7ZGF0YS5rZXl9YCwgZGF0YSk7XG4gIH1cblxuICBnZXRGZWVkIChrZXk6IHN0cmluZywgZGV0YWlsTGV2ZWw6ID9zdHJpbmcpIHtcbiAgICBsZXQgcXMgPSAnJztcbiAgICBpZiAoZGV0YWlsTGV2ZWwpIHtcbiAgICAgIHFzICs9ICc/JyArIHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeSh7IGRldGFpbExldmVsIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YHBpcGVsaW5lcy8ke2tleX0vbmV3c2ZlZWRgICsgcXMpO1xuICB9XG59XG5cbmNsYXNzIFBpcGVsaW5lU3RhZ2VzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG5cbiAgY29uc3RydWN0b3IgKHM6IFN0cmVhaywgYzogQ29ubkhlbHBlcikge1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xuICB9XG5cbiAgZ2V0QWxsIChwaXBlS2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YHBpcGVsaW5lcy8ke3BpcGVLZXl9L3N0YWdlc2ApO1xuICB9XG5cbiAgZ2V0T25lIChwaXBlS2V5OiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldWBwaXBlbGluZXMvJHtwaXBlS2V5fS9zdGFnZXMvJHtrZXl9YCk7XG4gIH1cblxuICBjcmVhdGUgKHBpcGVLZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucHV0KGFldWBwaXBlbGluZXMvJHtwaXBlS2V5fS9zdGFnZXNgLCBkYXRhKTtcbiAgfVxuXG4gIGRlbGV0ZSAocGlwZUtleTogc3RyaW5nLCBrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmRlbGV0ZShhZXVgcGlwZWxpbmVzLyR7cGlwZUtleX0vc3RhZ2VzLyR7a2V5fWApO1xuICB9XG5cbiAgdXBkYXRlIChwaXBlS2V5OiBzdHJpbmcsIGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnBvc3QoYWV1YHBpcGVsaW5lcy8ke3BpcGVLZXl9L3N0YWdlcy8ke2RhdGEua2V5fWAsIGRhdGEpO1xuICB9XG59XG5cbmNsYXNzIFBpcGVsaW5lRmllbGRzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG5cbiAgY29uc3RydWN0b3IgKHM6IFN0cmVhaywgYzogQ29ubkhlbHBlcikge1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xuICB9XG5cbiAgZ2V0QWxsIChwaXBlS2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YHBpcGVsaW5lcy8ke3BpcGVLZXl9L2ZpZWxkc2ApO1xuICB9XG5cbiAgZ2V0T25lIChwaXBlS2V5OiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldWBwaXBlbGluZXMvJHtwaXBlS2V5fS9maWVsZHMvJHtrZXl9YCk7XG4gIH1cblxuICBjcmVhdGUgKHBpcGVLZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucHV0KGFldWBwaXBlbGluZXMvJHtwaXBlS2V5fS9maWVsZHNgLCBkYXRhKTtcbiAgfVxuXG4gIGRlbGV0ZSAocGlwZUtleTogc3RyaW5nLCBrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmRlbGV0ZShhZXVgcGlwZWxpbmVzLyR7cGlwZUtleX0vZmllbGRzLyR7a2V5fWApO1xuICB9XG5cbiAgdXBkYXRlIChwaXBlS2V5OiBzdHJpbmcsIGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnBvc3QoYWV1YHBpcGVsaW5lcy8ke3BpcGVLZXl9L2ZpZWxkcy8ke2RhdGEua2V5fWAsIGRhdGEpO1xuICB9XG59XG5cbmNsYXNzIEJveGVzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG4gIEZpZWxkczogQm94RmllbGRzO1xuXG4gIGNvbnN0cnVjdG9yIChzOiBTdHJlYWssIGM6IENvbm5IZWxwZXIpIHtcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gYztcbiAgICB0aGlzLkZpZWxkcyA9IG5ldyBCb3hGaWVsZHMocywgYyk7XG4gIH1cblxuICBnZXRBbGwgKCkge1xuICAgIHJldHVybiB0aGlzLl9jLmdldCgnYm94ZXMnKTtcbiAgfVxuXG4gIGdldEZvclBpcGVsaW5lIChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9zLlBpcGVsaW5lcy5nZXRCb3hlcyhrZXkpO1xuICB9XG5cbiAgZ2V0T25lIChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXVgYm94ZXMvJHtrZXl9YCk7XG4gIH1cblxuICBjcmVhdGUgKHBpcGVLZXksIGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wb3N0KGFldWBwaXBlbGluZXMvJHtwaXBlS2V5fS9ib3hlc2AsIGRhdGEpO1xuICB9XG5cbiAgZGVsZXRlIChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmRlbGV0ZShhZXVgYm94ZXMvJHtrZXl9YCk7XG4gIH1cblxuICB1cGRhdGUgKGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnBvc3QoYWV1YGJveGVzLyR7ZGF0YS5rZXl9YCwgZGF0YSk7XG4gIH1cblxuICBnZXRGaWVsZHMgKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldWBib3hlcy8ke2tleX0vZmllbGRzYCk7XG4gIH1cblxuICBnZXRSZW1pbmRlcnMgKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldWBib3hlcy8ke2tleX0vcmVtaW5kZXJzYCk7XG4gIH1cblxuICBnZXRDb21tZW50cyAoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YGJveGVzLyR7a2V5fS9jb21tZW50c2ApO1xuICB9XG5cbiAgLy8gZGVwcmVjYXRlZCBtZXRob2RcbiAgY3JlYXRlQ29tbWVudCAoa2V5OiBzdHJpbmcsIGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wdXQoYWV1YGJveGVzLyR7a2V5fS9jb21tZW50c2AsIGRhdGEpO1xuICB9XG5cbiAgcG9zdENvbW1lbnQgKGtleTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wdXQoYWV1YGJveGVzLyR7a2V5fS9jb21tZW50c2AsIHsgbWVzc2FnZSB9KTtcbiAgfVxuXG4gIGdldEZpbGVzIChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXVgYm94ZXMvJHtrZXl9L2ZpbGVzYCk7XG4gIH1cblxuICBnZXRUaHJlYWRzIChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXVgYm94ZXMvJHtrZXl9L3RocmVhZHNgKTtcbiAgfVxuXG4gIGdldEZlZWQgKGtleTogc3RyaW5nLCBkZXRhaWxMZXZlbDogP3N0cmluZykge1xuICAgIGxldCBxcyA9ICcnO1xuICAgIGlmIChkZXRhaWxMZXZlbCkge1xuICAgICAgcXMgKz0gJz8nICsgcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHsgZGV0YWlsTGV2ZWwgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXVgYm94ZXMvJHtrZXl9L25ld3NmZWVkYCArIHFzKTtcbiAgfVxuXG4gIGdldFRhc2tzIChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXVgYm94ZXMvJHtrZXl9L3Rhc2tzYCk7XG4gIH1cbn1cblxuY2xhc3MgQm94RmllbGRzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG5cbiAgY29uc3RydWN0b3IgKHM6IFN0cmVhaywgYzogQ29ubkhlbHBlcikge1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xuICB9XG5cbiAgZ2V0Rm9yQm94IChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9zLkJveGVzLmdldEZpZWxkcyhrZXkpO1xuICB9XG5cbiAgZ2V0T25lIChib3hLZXk6IHN0cmluZywga2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YGJveGVzLyR7Ym94S2V5fS9maWVsZHMvJHtrZXl9YCk7XG4gIH1cblxuICB1cGRhdGUgKGJveEtleTogc3RyaW5nLCBkYXRhOiBPYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wb3N0KGFldWBib3hlcy8ke2JveEtleX0vZmllbGRzLyR7ZGF0YS5rZXl9YCwgZGF0YSk7XG4gIH1cbn1cblxuY2xhc3MgRmlsZXMge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcblxuICBjb25zdHJ1Y3RvciAoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gIH1cblxuICBnZXRGb3JCb3ggKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3MuQm94ZXMuZ2V0RmlsZXMoa2V5KTtcbiAgfVxuXG4gIGdldE9uZSAoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YGZpbGVzLyR7a2V5fWApO1xuICB9XG5cbiAgZ2V0Q29udGVudHMgKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0Tm9QYXJzZShhZXVgZmlsZXMvJHtrZXl9L2NvbnRlbnRzYCk7XG4gIH1cbn1cblxuY2xhc3MgVGhyZWFkcyB7XG4gIF9zOiBTdHJlYWs7XG4gIF9jOiBDb25uSGVscGVyO1xuXG4gIGNvbnN0cnVjdG9yIChzOiBTdHJlYWssIGM6IENvbm5IZWxwZXIpIHtcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gYztcbiAgfVxuXG4gIGdldEZvckJveCAoYm94S2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcy5Cb3hlcy5nZXRUaHJlYWRzKGJveEtleSk7XG4gIH1cblxuICBnZXRPbmUgKHRocmVhZEtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldWB0aHJlYWRzLyR7dGhyZWFkS2V5fWApO1xuICB9XG59XG5cbmNsYXNzIFRhc2tzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG5cbiAgY29uc3RydWN0b3IgKHM6IFN0cmVhaywgYzogQ29ubkhlbHBlcikge1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xuICB9XG5cbiAgZ2V0Rm9yQm94IChib3hLZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9zLkJveGVzLmdldFRhc2tzKGJveEtleSk7XG4gIH1cblxuICBnZXRPbmUgKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldWB0YXNrcy8ke2tleX1gKTtcbiAgfVxuXG4gIGNyZWF0ZSAoYm94S2V5OiBzdHJpbmcsIGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnBvc3QoYWV1YGJveGVzLyR7Ym94S2V5fS90YXNrc2AsIGRhdGEpO1xuICB9XG5cbiAgdXBkYXRlIChrZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXVgdGFza3MvJHtrZXl9YCwgZGF0YSk7XG4gIH1cblxuICBkZWxldGUgKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZGVsZXRlKGFldWB0YXNrcy8ke2tleX1gKTtcbiAgfVxufVxuXG5jbGFzcyBXZWJob29rcyB7XG4gIF9zOiBTdHJlYWs7XG4gIF9jOiBDb25uSGVscGVyO1xuXG4gIGNvbnN0cnVjdG9yIChzOiBTdHJlYWssIGM6IENvbm5IZWxwZXIpIHtcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gYztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIHdlYmhvb2tzIGZvciBhIHBpcGVsaW5lXG4gICAqXG4gICAqIEBwYXJhbSBrZXkgUGlwZWxpbmUga2V5XG4gICAqIEByZXR1cm4ge1Byb21pc2UuPE9iamVjdD59XG4gICAqL1xuICBnZXRGb3JQaXBlbGluZSAoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YHBpcGVsaW5lcy8ke2tleX0vd2ViaG9va3NgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBzcGVjaWZpYyB3ZWJob29rXG4gICAqXG4gICAqIEBwYXJhbSBrZXkgV2ViaG9vayBrZXlcbiAgICogQHJldHVybiB7UHJvbWlzZS48T2JqZWN0Pn1cbiAgICovXG4gIGdldE9uZSAoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YHdlYmhvb2tzLyR7a2V5fWApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB3ZWJob29rIGZvciBwaXBlbGluZVxuICAgKlxuICAgKiBAcGFyYW0ga2V5IFBpcGVsaW5lIGtleVxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxPYmplY3Q+fVxuICAgKi9cbiAgY3JlYXRlIChrZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXVgcGlwZWxpbmVzLyR7a2V5fS93ZWJob29rc2AsIGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIHdlYmhvb2tcbiAgICpcbiAgICogQHBhcmFtIGtleSBXZWJob29rIGtleVxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxPYmplY3Q+fVxuICAgKi9cbiAgZGVsZXRlIChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmRlbGV0ZShhZXVgd2ViaG9va3MvJHtrZXl9YCk7XG4gIH1cblxuICAvKipcbiAgICogRWRpdCBhIHdlYmhvb2tcbiAgICpcbiAgICogQHBhcmFtIGtleSBXZWJob29rIGtleVxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxPYmplY3Q+fVxuICAgKi9cbiAgdXBkYXRlIChrZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXVgd2ViaG9va3MvJHtrZXl9YCwgZGF0YSk7XG4gIH1cbn1cblxuY2xhc3MgVGVhbXMge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcblxuICBjb25zdHJ1Y3RvciAoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGxpc3Qgb2YgbXkgdGVhbXNcbiAgICogQHJldHVybiB7UHJvbWlzZTxPYmplY3Q+fVxuICAgKi9cbiAgZ2V0QWxsICgpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YHVzZXJzL21lL3RlYW1zYCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgdGVhbVxuICAgKlxuICAgKiBAcGFyYW0ga2V5IFRlYW0ga2V5XG4gICAqIEByZXR1cm4ge1Byb21pc2U8T2JqZWN0Pn1cbiAgICovXG4gIGdldE9uZSAoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YHRlYW1zLyR7a2V5fWApO1xuXG4gIH1cbn1cblxuY2xhc3MgQ29udGFjdHMge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcblxuICBjb25zdHJ1Y3RvciAoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgY29udGFjdFxuICAgKlxuICAgKiBAcGFyYW0ga2V5XG4gICAqIEByZXR1cm4ge1Byb21pc2U8T2JqZWN0Pn1cbiAgICovXG4gIGdldE9uZSAoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YGNvbnRhY3RzLyR7a2V5fWApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBjb250YWN0XG4gICAqXG4gICAqIEBwYXJhbSBrZXkgVGVhbSBrZXlcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQHJldHVybiB7UHJvbWlzZS48T2JqZWN0Pn1cbiAgICovXG4gIGNyZWF0ZSAoa2V5OiBzdHJpbmcsIGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnBvc3QoYWV1YHRlYW1zLyR7a2V5fS9jb250YWN0c2AsIGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIGNvbnRhY3RcbiAgICpcbiAgICogQHBhcmFtIGtleSBDb250YWN0IGtleVxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxPYmplY3Q+fVxuICAgKi9cbiAgZGVsZXRlIChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmRlbGV0ZShhZXVgY29udGFjdHMvJHtrZXl9YCk7XG4gIH1cblxuICAvKipcbiAgICogRWRpdCBhIGNvbnRhY3RcbiAgICpcbiAgICogQHBhcmFtIGtleSBDb250YWN0IGtleVxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxPYmplY3Q+fVxuICAgKi9cbiAgdXBkYXRlIChrZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXVgY29udGFjdHMvJHtrZXl9YCwgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGNvbnRhY3RzIHRvIGJveFxuICAgKiBAcGFyYW0ga2V5IEJveCBrZXkgdG8gYWRkIGNvbnRhY3RzIHRvXG4gICAqIEBwYXJhbSBkYXRhIEFycmF5IHdpdGggY29udGFjdHMuIEUuZyB7Y29udGFjdHM6W3s8YSBjb250YWN0Pn1dfVxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPE9iamVjdD59XG4gICAqL1xuICBhZGRUb0JveCAoa2V5OiBzdHJpbmcsIGRhdGE6IEFycmF5KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXVgYm94ZXMvJHtrZXl9YCwgZGF0YSk7XG4gIH1cblxufVxuXG5leHBvcnQgY2xhc3MgU3RyZWFrIHtcbiAgX2M6IENvbm5IZWxwZXI7XG4gIE1lOiBNZTtcbiAgUGlwZWxpbmVzOiBQaXBlbGluZXM7XG4gIEJveGVzOiBCb3hlcztcbiAgRmlsZXM6IEZpbGVzO1xuICBUaHJlYWRzOiBUaHJlYWRzO1xuICBUYXNrczogVGFza3M7XG4gIFdlYmhvb2tzOiBXZWJob29rcztcbiAgVGVhbXM6IFRlYW1zO1xuICBDb250YWN0czogQ29udGFjdHM7XG5cbiAgY29uc3RydWN0b3IgKGF1dGhLZXk6IHN0cmluZykge1xuICAgIHRoaXMuX2MgPSBuZXcgQ29ubkhlbHBlcihhdXRoS2V5KTtcbiAgICB0aGlzLk1lID0gbmV3IE1lKHRoaXMsIHRoaXMuX2MpO1xuICAgIHRoaXMuUGlwZWxpbmVzID0gbmV3IFBpcGVsaW5lcyh0aGlzLCB0aGlzLl9jKTtcbiAgICB0aGlzLkJveGVzID0gbmV3IEJveGVzKHRoaXMsIHRoaXMuX2MpO1xuICAgIHRoaXMuRmlsZXMgPSBuZXcgRmlsZXModGhpcywgdGhpcy5fYyk7XG4gICAgdGhpcy5UaHJlYWRzID0gbmV3IFRocmVhZHModGhpcywgdGhpcy5fYyk7XG4gICAgdGhpcy5UYXNrcyA9IG5ldyBUYXNrcyh0aGlzLCB0aGlzLl9jKTtcbiAgICB0aGlzLldlYmhvb2tzID0gbmV3IFdlYmhvb2tzKHRoaXMsIHRoaXMuX2MpO1xuICAgIHRoaXMuVGVhbXMgPSBuZXcgVGVhbXModGhpcywgdGhpcy5fYyk7XG4gICAgdGhpcy5Db250YWN0cyA9IG5ldyBDb250YWN0cyh0aGlzLCB0aGlzLl9jKTtcblxuICAgIC8vIGNvbnN0YW50cyBmb3Igd2ViaG9vayBldmVudCB0eXBlc1xuICAgIHRoaXMuV2ViaG9va3MuYm94Q3JlYXRlID0gJ0JPWF9DUkVBVEUnO1xuICAgIHRoaXMuV2ViaG9va3MuYm94RGVsZXRlID0gJ0JPWF9ERUxFVEUnO1xuICAgIHRoaXMuV2ViaG9va3Muc3RhZ2VDcmVhdGUgPSAnU1RBR0VfQ1JFQVRFJztcbiAgICB0aGlzLldlYmhvb2tzLmJveE5ld0VtYWlsQWRkcmVzcyA9ICdCT1hfTkVXX0VNQUlMX0FERFJFU1MnO1xuICAgIHRoaXMuV2ViaG9va3MuYm94RWRpdCA9ICdCT1hfRURJVCc7XG4gICAgdGhpcy5XZWJob29rcy5ib3hDaGFuZ2VTdGF0ZSA9ICdCT1hfQ0hBTkdFX1NUQUdFJztcbiAgICB0aGlzLldlYmhvb2tzLmJveENoYW5nZVBpcGVsaW5lID0gJ0JPWF9DSEFOR0VfUElQRUxJTkUnO1xuICAgIHRoaXMuV2ViaG9va3MuY29tbWVudENyZWF0ZSA9ICdDT01NRU5UX0NSRUFURSc7XG4gICAgdGhpcy5XZWJob29rcy50YXNrQ3JlYXRlID0gJ1RBU0tfQ1JFQVRFJztcbiAgICB0aGlzLldlYmhvb2tzLnRhc2tDb21wbGV0ZSA9ICdUQVNLX0NPTVBMRVRFJztcbiAgICB0aGlzLldlYmhvb2tzLnRhc2tEdWUgPSAnVEFTS19EVUUnO1xuICB9XG5cbiAgc2VhcmNoIChxdWVyeTogc3RyaW5nKTogUHJvbWlzZTxPYmplY3Q+IHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YHNlYXJjaD9xdWVyeT0ke3F1ZXJ5fWApO1xuICB9XG59XG4iXX0=