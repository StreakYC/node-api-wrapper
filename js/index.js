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

var _templateObject = (0, _taggedTemplateLiteral3.default)(['/v1/pipelines/', ''], ['/v1/pipelines/', '']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['/v1/pipelines/', '/boxes'], ['/v1/pipelines/', '/boxes']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['/v1/pipelines/', '/boxes?stageKey=', ''], ['/v1/pipelines/', '/boxes?stageKey=', '']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['/v1/pipelines/', '/newsfeed'], ['/v1/pipelines/', '/newsfeed']),
    _templateObject5 = (0, _taggedTemplateLiteral3.default)(['/v1/pipelines/', '/stages'], ['/v1/pipelines/', '/stages']),
    _templateObject6 = (0, _taggedTemplateLiteral3.default)(['/v1/pipelines/', '/stages/', ''], ['/v1/pipelines/', '/stages/', '']),
    _templateObject7 = (0, _taggedTemplateLiteral3.default)(['/v1/pipelines/', '/fields'], ['/v1/pipelines/', '/fields']),
    _templateObject8 = (0, _taggedTemplateLiteral3.default)(['/v1/pipelines/', '/fields/', ''], ['/v1/pipelines/', '/fields/', '']),
    _templateObject9 = (0, _taggedTemplateLiteral3.default)(['/v1/boxes/', ''], ['/v1/boxes/', '']),
    _templateObject10 = (0, _taggedTemplateLiteral3.default)(['/v2/pipelines/', '/boxes'], ['/v2/pipelines/', '/boxes']),
    _templateObject11 = (0, _taggedTemplateLiteral3.default)(['/v1/boxes/', '/fields'], ['/v1/boxes/', '/fields']),
    _templateObject12 = (0, _taggedTemplateLiteral3.default)(['/v1/boxes/', '/reminders'], ['/v1/boxes/', '/reminders']),
    _templateObject13 = (0, _taggedTemplateLiteral3.default)(['/v1/boxes/', '/comments'], ['/v1/boxes/', '/comments']),
    _templateObject14 = (0, _taggedTemplateLiteral3.default)(['/v1/boxes/', '/files'], ['/v1/boxes/', '/files']),
    _templateObject15 = (0, _taggedTemplateLiteral3.default)(['/v1/boxes/', '/threads'], ['/v1/boxes/', '/threads']),
    _templateObject16 = (0, _taggedTemplateLiteral3.default)(['/v1/boxes/', '/newsfeed'], ['/v1/boxes/', '/newsfeed']),
    _templateObject17 = (0, _taggedTemplateLiteral3.default)(['/v2/boxes/', '/tasks'], ['/v2/boxes/', '/tasks']),
    _templateObject18 = (0, _taggedTemplateLiteral3.default)(['/v1/boxes/', '/fields/', ''], ['/v1/boxes/', '/fields/', '']),
    _templateObject19 = (0, _taggedTemplateLiteral3.default)(['/v1/files/', ''], ['/v1/files/', '']),
    _templateObject20 = (0, _taggedTemplateLiteral3.default)(['/v1/files/', '/contents'], ['/v1/files/', '/contents']),
    _templateObject21 = (0, _taggedTemplateLiteral3.default)(['/v1/threads/', ''], ['/v1/threads/', '']),
    _templateObject22 = (0, _taggedTemplateLiteral3.default)(['/v2/tasks/', ''], ['/v2/tasks/', '']),
    _templateObject23 = (0, _taggedTemplateLiteral3.default)(['/v2/pipelines/', '/webhooks'], ['/v2/pipelines/', '/webhooks']),
    _templateObject24 = (0, _taggedTemplateLiteral3.default)(['/v2/webhooks/', ''], ['/v2/webhooks/', '']),
    _templateObject25 = (0, _taggedTemplateLiteral3.default)(['/v2/users/me/teams'], ['/v2/users/me/teams']),
    _templateObject26 = (0, _taggedTemplateLiteral3.default)(['/v2/teams/', ''], ['/v2/teams/', '']),
    _templateObject27 = (0, _taggedTemplateLiteral3.default)(['/v2/contacts/', ''], ['/v2/contacts/', '']),
    _templateObject28 = (0, _taggedTemplateLiteral3.default)(['/v2/teams/', '/contacts'], ['/v2/teams/', '/contacts']),
    _templateObject29 = (0, _taggedTemplateLiteral3.default)(['/v1/search?query=', ''], ['/v1/search?query=', '']);

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

      var prefix = '/api';
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
      return this._c.get('/v1/users/me');
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
      return this._c.get('/v1/pipelines');
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
      return this._c.put('/v1/pipelines', data);
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
      return this._c.get('/v1/boxes');
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
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject10, pipeKey), data);
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
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject11, key));
    }
  }, {
    key: 'getReminders',
    value: function getReminders(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject12, key));
    }
  }, {
    key: 'getComments',
    value: function getComments(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject13, key));
    }

    // deprecated method

  }, {
    key: 'createComment',
    value: function createComment(key, data) {
      return this._c.put((0, _autoEncodeUri2.default)(_templateObject13, key), data);
    }
  }, {
    key: 'postComment',
    value: function postComment(key, message) {
      return this._c.put((0, _autoEncodeUri2.default)(_templateObject13, key), { message: message });
    }
  }, {
    key: 'getFiles',
    value: function getFiles(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject14, key));
    }
  }, {
    key: 'getThreads',
    value: function getThreads(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject15, key));
    }
  }, {
    key: 'getFeed',
    value: function getFeed(key, detailLevel) {
      var qs = '';
      if (detailLevel) {
        qs += '?' + _querystring2.default.stringify({ detailLevel: detailLevel });
      }
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject16, key) + qs);
    }
  }, {
    key: 'getTasks',
    value: function getTasks(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject17, key));
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
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject18, boxKey, key));
    }
  }, {
    key: 'update',
    value: function update(boxKey, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject18, boxKey, data.key), data);
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
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject19, key));
    }
  }, {
    key: 'getContents',
    value: function getContents(key) {
      return this._c.getNoParse((0, _autoEncodeUri2.default)(_templateObject20, key));
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
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject21, threadKey));
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
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject22, key));
    }
  }, {
    key: 'create',
    value: function create(boxKey, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject17, boxKey), data);
    }
  }, {
    key: 'update',
    value: function update(key, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject22, key), data);
    }
  }, {
    key: 'delete',
    value: function _delete(key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject22, key));
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
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject23, key));
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
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject24, key));
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
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject23, key), data);
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
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject24, key));
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
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject24, key), data);
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
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject25));
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
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject26, key));
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
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject27, key));
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
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject28, key), data);
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
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject27, key));
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
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject29, query));
    }
  }]);
  return Streak;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJDb25uSGVscGVyIiwiYXV0aEtleSIsIl9hdXRoS2V5IiwibWV0aG9kIiwicGF0aCIsImhlYWRlcnMiLCJlbmNvZGluZyIsInByZWZpeCIsImhvc3QiLCJhdXRoIiwicmVzcG9uc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic3RycyIsIm9uIiwiY2h1bmsiLCJwdXNoIiwic3RyIiwiam9pbiIsInN0YXR1c0NvZGUiLCJKU09OIiwicGFyc2UiLCJqc29uIiwiZXJyb3JNZXNzYWdlIiwiZXJyb3IiLCJlcnIiLCJFcnJvciIsImNodW5rcyIsImJ1ZiIsIkJ1ZmZlciIsImNvbmNhdCIsIm9wdHMiLCJfZ2V0UmVxdWVzdE9wdGlvbnMiLCJyZXF1ZXN0IiwiX3BhcnNlUmVzcG9uc2UiLCJyZXMiLCJlbmQiLCJ1bmRlZmluZWQiLCJfcGxhaW5SZXNwb25zZSIsImRhdGEiLCJkc3RyIiwic3RyaW5naWZ5Iiwic2VuZCIsImxlbmd0aCIsIndyaXRlIiwiTWUiLCJzIiwiYyIsIl9zIiwiX2MiLCJnZXQiLCJQaXBlbGluZXMiLCJTdGFnZXMiLCJQaXBlbGluZVN0YWdlcyIsIkZpZWxkcyIsIlBpcGVsaW5lRmllbGRzIiwia2V5Iiwic3RhZ2VLZXkiLCJwdXQiLCJkZWxldGUiLCJwb3N0IiwiZGV0YWlsTGV2ZWwiLCJxcyIsInBpcGVLZXkiLCJCb3hlcyIsIkJveEZpZWxkcyIsImdldEJveGVzIiwibWVzc2FnZSIsImdldEZpZWxkcyIsImJveEtleSIsIkZpbGVzIiwiZ2V0RmlsZXMiLCJnZXROb1BhcnNlIiwiVGhyZWFkcyIsImdldFRocmVhZHMiLCJ0aHJlYWRLZXkiLCJUYXNrcyIsImdldFRhc2tzIiwiV2ViaG9va3MiLCJUZWFtcyIsIkNvbnRhY3RzIiwiU3RyZWFrIiwiYm94Q3JlYXRlIiwiYm94RGVsZXRlIiwic3RhZ2VDcmVhdGUiLCJib3hOZXdFbWFpbEFkZHJlc3MiLCJib3hFZGl0IiwiYm94Q2hhbmdlU3RhdGUiLCJib3hDaGFuZ2VQaXBlbGluZSIsImNvbW1lbnRDcmVhdGUiLCJ0YXNrQ3JlYXRlIiwidGFza0NvbXBsZXRlIiwidGFza0R1ZSIsInF1ZXJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7SUFFTUEsVTtBQUdKLHNCQUFhQyxPQUFiLEVBQThCO0FBQUE7O0FBQzVCLFNBQUtDLFFBQUwsR0FBZ0JELE9BQWhCO0FBQ0Q7Ozs7dUNBRW1CRSxNLEVBQWdCQyxJLEVBQXdFO0FBQUEsVUFBMURDLE9BQTBELHVFQUF4QyxFQUF3QztBQUFBLFVBQXBDQyxRQUFvQyx1RUFBaEIsTUFBZ0I7O0FBQzFHLFVBQUlDLFNBQVMsTUFBYjtBQUNBLGFBQU87QUFDTEosc0JBREssRUFDR0UsZ0JBREgsRUFDWUMsa0JBRFo7QUFFTEUsY0FBTSxnQkFGRDtBQUdMSixjQUFNRyxTQUFTSCxJQUhWO0FBSUxLLGNBQU0sS0FBS1A7QUFKTixPQUFQO0FBTUQ7OzttQ0FFZVEsUSxFQUErQztBQUM3RCxhQUFPLHNCQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QyxZQUFNQyxPQUFpQixFQUF2QjtBQUNBSCxpQkFBU0ksRUFBVCxDQUFZLE1BQVosRUFBb0IsVUFBQ0MsS0FBRCxFQUFtQjtBQUNyQ0YsZUFBS0csSUFBTCxDQUFVRCxLQUFWO0FBQ0QsU0FGRDtBQUdBTCxpQkFBU0ksRUFBVCxDQUFZLEtBQVosRUFBbUIsWUFBTTtBQUN2QixjQUFJO0FBQ0YsZ0JBQU1HLE1BQU1KLEtBQUtLLElBQUwsQ0FBVSxFQUFWLENBQVo7QUFDQSxnQkFBSVIsU0FBU1MsVUFBVCxLQUF3QixHQUE1QixFQUFpQztBQUMvQlIsc0JBQVFTLEtBQUtDLEtBQUwsQ0FBV0osR0FBWCxDQUFSO0FBQ0QsYUFGRCxNQUVPO0FBQ0wsa0JBQUlLLGFBQUo7QUFDQSxrQkFBSUMsa0NBQWdDYixTQUFTUyxVQUE3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QWNRLE9BQWQsR0FBd0IsVUFBeEI7QUFDQSxTQUFLUixRQUFMLENBQWNTLGNBQWQsR0FBK0Isa0JBQS9CO0FBQ0EsU0FBS1QsUUFBTCxDQUFjVSxpQkFBZCxHQUFrQyxxQkFBbEM7QUFDQSxTQUFLVixRQUFMLENBQWNXLGFBQWQsR0FBOEIsZ0JBQTlCO0FBQ0EsU0FBS1gsUUFBTCxDQUFjWSxVQUFkLEdBQTJCLGFBQTNCO0FBQ0EsU0FBS1osUUFBTCxDQUFjYSxZQUFkLEdBQTZCLGVBQTdCO0FBQ0EsU0FBS2IsUUFBTCxDQUFjYyxPQUFkLEdBQXdCLFVBQXhCO0FBQ0Q7Ozs7MkJBRU9DLEssRUFBZ0M7QUFDdEMsYUFBTyxLQUFLNUMsRUFBTCxDQUFRQyxHQUFSLGlEQUFtQzJDLEtBQW5DLEVBQVA7QUFDRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBmbG93ICovXG5cbmltcG9ydCBodHRwcyBmcm9tICdodHRwcyc7XG5pbXBvcnQgcXVlcnlzdHJpbmcgZnJvbSAncXVlcnlzdHJpbmcnO1xuXG5pbXBvcnQgYWV1IGZyb20gJy4vYXV0by1lbmNvZGUtdXJpJztcblxuY2xhc3MgQ29ubkhlbHBlciB7XG4gIF9hdXRoS2V5OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IgKGF1dGhLZXk6IHN0cmluZykge1xuICAgIHRoaXMuX2F1dGhLZXkgPSBhdXRoS2V5O1xuICB9XG5cbiAgX2dldFJlcXVlc3RPcHRpb25zIChtZXRob2Q6IHN0cmluZywgcGF0aDogc3RyaW5nLCBoZWFkZXJzOiBPYmplY3QgPSB7fSwgZW5jb2Rpbmc6ID9zdHJpbmcgPSAndXRmOCcpOiBPYmplY3Qge1xuICAgIGxldCBwcmVmaXggPSAnL2FwaSc7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1ldGhvZCwgaGVhZGVycywgZW5jb2RpbmcsXG4gICAgICBob3N0OiAnd3d3LnN0cmVhay5jb20nLFxuICAgICAgcGF0aDogcHJlZml4ICsgcGF0aCxcbiAgICAgIGF1dGg6IHRoaXMuX2F1dGhLZXlcbiAgICB9O1xuICB9XG5cbiAgX3BhcnNlUmVzcG9uc2UgKHJlc3BvbnNlOiBodHRwcy5JbmNvbWluZ01lc3NhZ2UpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBzdHJzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgcmVzcG9uc2Uub24oJ2RhdGEnLCAoY2h1bms6IHN0cmluZykgPT4ge1xuICAgICAgICBzdHJzLnB1c2goY2h1bmspO1xuICAgICAgfSk7XG4gICAgICByZXNwb25zZS5vbignZW5kJywgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHN0ciA9IHN0cnMuam9pbignJyk7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHN0cikpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQganNvbjtcbiAgICAgICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSBgUmVzcG9uc2UgY29kZSAke3Jlc3BvbnNlLnN0YXR1c0NvZGV9YDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGpzb24gPSBKU09OLnBhcnNlKHN0cik7XG4gICAgICAgICAgICAgIGlmIChqc29uICYmIGpzb24uZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBqc29uLmVycm9yO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgLy8gSWdub3JlIHBhcnNlIGVycm9yXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWplY3QoT2JqZWN0LmFzc2lnbigobmV3IEVycm9yKGVycm9yTWVzc2FnZSk6IE9iamVjdCksIHtcbiAgICAgICAgICAgICAgc3RyLCBqc29uLFxuICAgICAgICAgICAgICBzdGF0dXNDb2RlOiByZXNwb25zZS5zdGF0dXNDb2RlLFxuICAgICAgICAgICAgICBoZWFkZXJzOiByZXNwb25zZS5oZWFkZXJzXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXNwb25zZS5vbignZXJyb3InLCByZWplY3QpO1xuICAgIH0pO1xuICB9XG5cbiAgX3BsYWluUmVzcG9uc2UgKHJlc3BvbnNlOiBodHRwcy5JbmNvbWluZ01lc3NhZ2UpOiBQcm9taXNlPEJ1ZmZlcj4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBjaHVua3M6IEJ1ZmZlcltdID0gW107XG4gICAgICByZXNwb25zZS5vbignZGF0YScsIChjaHVuazogQnVmZmVyKSA9PiB7XG4gICAgICAgIGNodW5rcy5wdXNoKGNodW5rKTtcbiAgICAgIH0pO1xuICAgICAgcmVzcG9uc2Uub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBidWYgPSBCdWZmZXIuY29uY2F0KGNodW5rcyk7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICAgICAgcmVzb2x2ZShidWYpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBgUmVzcG9uc2UgY29kZSAke3Jlc3BvbnNlLnN0YXR1c0NvZGV9YDtcbiAgICAgICAgICAgIHJlamVjdChPYmplY3QuYXNzaWduKChuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTogT2JqZWN0KSwge1xuICAgICAgICAgICAgICBidWYsXG4gICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHJlc3BvbnNlLnN0YXR1c0NvZGUsXG4gICAgICAgICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlLmhlYWRlcnNcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJlc3BvbnNlLm9uKCdlcnJvcicsIHJlamVjdCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgKHBhdGg6IHN0cmluZyk6IFByb21pc2U8T2JqZWN0PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLl9nZXRSZXF1ZXN0T3B0aW9ucygnR0VUJywgcGF0aCk7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gaHR0cHMucmVxdWVzdChvcHRzLCByZXMgPT4ge1xuICAgICAgICByZXNvbHZlKHRoaXMuX3BhcnNlUmVzcG9uc2UocmVzKSk7XG4gICAgICB9KTtcbiAgICAgIHJlcXVlc3Qub24oJ2Vycm9yJywgcmVqZWN0KTtcbiAgICAgIHJlcXVlc3QuZW5kKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXROb1BhcnNlIChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPEJ1ZmZlcj4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBvcHRzID0gdGhpcy5fZ2V0UmVxdWVzdE9wdGlvbnMoJ0dFVCcsIHBhdGgsIHVuZGVmaW5lZCwgbnVsbCk7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gaHR0cHMucmVxdWVzdChvcHRzLCByZXMgPT4ge1xuICAgICAgICByZXNvbHZlKHRoaXMuX3BsYWluUmVzcG9uc2UocmVzKSk7XG4gICAgICB9KTtcbiAgICAgIHJlcXVlc3Qub24oJ2Vycm9yJywgcmVqZWN0KTtcbiAgICAgIHJlcXVlc3QuZW5kKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdXQgKHBhdGg6IHN0cmluZywgZGF0YTogT2JqZWN0KTogUHJvbWlzZTxPYmplY3Q+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgZHN0ciA9IHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeShkYXRhKTtcbiAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLl9nZXRSZXF1ZXN0T3B0aW9ucygnUFVUJywgcGF0aCArICc/JyArIGRzdHIpO1xuICAgICAgY29uc3QgcmVxdWVzdCA9IGh0dHBzLnJlcXVlc3Qob3B0cywgcmVzID0+IHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLl9wYXJzZVJlc3BvbnNlKHJlcykpO1xuICAgICAgfSk7XG4gICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIHJlamVjdCk7XG4gICAgICByZXF1ZXN0LmVuZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlIChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBvcHRzID0gdGhpcy5fZ2V0UmVxdWVzdE9wdGlvbnMoJ0RFTEVURScsIHBhdGgpO1xuICAgICAgY29uc3QgcmVxdWVzdCA9IGh0dHBzLnJlcXVlc3Qob3B0cywgcmVzID0+IHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLl9wYXJzZVJlc3BvbnNlKHJlcykpO1xuICAgICAgfSk7XG4gICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIHJlamVjdCk7XG4gICAgICByZXF1ZXN0LmVuZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcG9zdCAocGF0aDogc3RyaW5nLCBkYXRhOiBhbnkpOiBQcm9taXNlPE9iamVjdD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBzZW5kID0gcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHsganNvbjogSlNPTi5zdHJpbmdpZnkoZGF0YSkgfSk7XG4gICAgICBjb25zdCBvcHRzID0gdGhpcy5fZ2V0UmVxdWVzdE9wdGlvbnMoJ1BPU1QnLCBwYXRoLCB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgICAgICAgJ0NvbnRlbnQtTGVuZ3RoJzogc2VuZC5sZW5ndGhcbiAgICAgIH0pO1xuICAgICAgY29uc3QgcmVxdWVzdCA9IGh0dHBzLnJlcXVlc3Qob3B0cywgcmVzID0+IHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLl9wYXJzZVJlc3BvbnNlKHJlcykpO1xuICAgICAgfSk7XG4gICAgICByZXF1ZXN0LndyaXRlKHNlbmQpO1xuICAgICAgcmVxdWVzdC5vbignZXJyb3InLCByZWplY3QpO1xuICAgICAgcmVxdWVzdC5lbmQoKTtcbiAgICB9KTtcbiAgfVxufVxuXG5jbGFzcyBNZSB7XG4gIF9zOiBTdHJlYWs7XG4gIF9jOiBDb25uSGVscGVyO1xuXG4gIGNvbnN0cnVjdG9yIChzOiBTdHJlYWssIGM6IENvbm5IZWxwZXIpIHtcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gYztcbiAgfVxuXG4gIGdldCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KCcvdjEvdXNlcnMvbWUnKTtcbiAgfVxufVxuXG5jbGFzcyBQaXBlbGluZXMge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcbiAgU3RhZ2VzOiBQaXBlbGluZVN0YWdlcztcbiAgRmllbGRzOiBQaXBlbGluZUZpZWxkcztcblxuICBjb25zdHJ1Y3RvciAoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gICAgdGhpcy5TdGFnZXMgPSBuZXcgUGlwZWxpbmVTdGFnZXMocywgYyk7XG4gICAgdGhpcy5GaWVsZHMgPSBuZXcgUGlwZWxpbmVGaWVsZHMocywgYyk7XG4gIH1cblxuICBnZXRBbGwgKCkge1xuICAgIHJldHVybiB0aGlzLl9jLmdldCgnL3YxL3BpcGVsaW5lcycpO1xuICB9XG5cbiAgZ2V0T25lIChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXVgL3YxL3BpcGVsaW5lcy8ke2tleX1gKTtcbiAgfVxuXG4gIGdldEJveGVzIChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXVgL3YxL3BpcGVsaW5lcy8ke2tleX0vYm94ZXNgKTtcbiAgfVxuXG4gIGdldEJveGVzSW5TdGFnZSAoa2V5OiBzdHJpbmcsIHN0YWdlS2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YC92MS9waXBlbGluZXMvJHtrZXl9L2JveGVzP3N0YWdlS2V5PSR7c3RhZ2VLZXl9YCk7XG4gIH1cblxuICBjcmVhdGUgKGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnB1dCgnL3YxL3BpcGVsaW5lcycsIGRhdGEpO1xuICB9XG5cbiAgZGVsZXRlIChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmRlbGV0ZShhZXVgL3YxL3BpcGVsaW5lcy8ke2tleX1gKTtcbiAgfVxuXG4gIHVwZGF0ZSAoZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXVgL3YxL3BpcGVsaW5lcy8ke2RhdGEua2V5fWAsIGRhdGEpO1xuICB9XG5cbiAgZ2V0RmVlZCAoa2V5OiBzdHJpbmcsIGRldGFpbExldmVsOiA/c3RyaW5nKSB7XG4gICAgbGV0IHFzID0gJyc7XG4gICAgaWYgKGRldGFpbExldmVsKSB7XG4gICAgICBxcyArPSAnPycgKyBxdWVyeXN0cmluZy5zdHJpbmdpZnkoeyBkZXRhaWxMZXZlbCB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldWAvdjEvcGlwZWxpbmVzLyR7a2V5fS9uZXdzZmVlZGAgKyBxcyk7XG4gIH1cbn1cblxuY2xhc3MgUGlwZWxpbmVTdGFnZXMge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcblxuICBjb25zdHJ1Y3RvciAoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gIH1cblxuICBnZXRBbGwgKHBpcGVLZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXVgL3YxL3BpcGVsaW5lcy8ke3BpcGVLZXl9L3N0YWdlc2ApO1xuICB9XG5cbiAgZ2V0T25lIChwaXBlS2V5OiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldWAvdjEvcGlwZWxpbmVzLyR7cGlwZUtleX0vc3RhZ2VzLyR7a2V5fWApO1xuICB9XG5cbiAgY3JlYXRlIChwaXBlS2V5OiBzdHJpbmcsIGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnB1dChhZXVgL3YxL3BpcGVsaW5lcy8ke3BpcGVLZXl9L3N0YWdlc2AsIGRhdGEpO1xuICB9XG5cbiAgZGVsZXRlIChwaXBlS2V5OiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZGVsZXRlKGFldWAvdjEvcGlwZWxpbmVzLyR7cGlwZUtleX0vc3RhZ2VzLyR7a2V5fWApO1xuICB9XG5cbiAgdXBkYXRlIChwaXBlS2V5OiBzdHJpbmcsIGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnBvc3QoYWV1YC92MS9waXBlbGluZXMvJHtwaXBlS2V5fS9zdGFnZXMvJHtkYXRhLmtleX1gLCBkYXRhKTtcbiAgfVxufVxuXG5jbGFzcyBQaXBlbGluZUZpZWxkcyB7XG4gIF9zOiBTdHJlYWs7XG4gIF9jOiBDb25uSGVscGVyO1xuXG4gIGNvbnN0cnVjdG9yIChzOiBTdHJlYWssIGM6IENvbm5IZWxwZXIpIHtcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gYztcbiAgfVxuXG4gIGdldEFsbCAocGlwZUtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldWAvdjEvcGlwZWxpbmVzLyR7cGlwZUtleX0vZmllbGRzYCk7XG4gIH1cblxuICBnZXRPbmUgKHBpcGVLZXk6IHN0cmluZywga2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YC92MS9waXBlbGluZXMvJHtwaXBlS2V5fS9maWVsZHMvJHtrZXl9YCk7XG4gIH1cblxuICBjcmVhdGUgKHBpcGVLZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucHV0KGFldWAvdjEvcGlwZWxpbmVzLyR7cGlwZUtleX0vZmllbGRzYCwgZGF0YSk7XG4gIH1cblxuICBkZWxldGUgKHBpcGVLZXk6IHN0cmluZywga2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5kZWxldGUoYWV1YC92MS9waXBlbGluZXMvJHtwaXBlS2V5fS9maWVsZHMvJHtrZXl9YCk7XG4gIH1cblxuICB1cGRhdGUgKHBpcGVLZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXVgL3YxL3BpcGVsaW5lcy8ke3BpcGVLZXl9L2ZpZWxkcy8ke2RhdGEua2V5fWAsIGRhdGEpO1xuICB9XG59XG5cbmNsYXNzIEJveGVzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG4gIEZpZWxkczogQm94RmllbGRzO1xuXG4gIGNvbnN0cnVjdG9yIChzOiBTdHJlYWssIGM6IENvbm5IZWxwZXIpIHtcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gYztcbiAgICB0aGlzLkZpZWxkcyA9IG5ldyBCb3hGaWVsZHMocywgYyk7XG4gIH1cblxuICBnZXRBbGwgKCkge1xuICAgIHJldHVybiB0aGlzLl9jLmdldCgnL3YxL2JveGVzJyk7XG4gIH1cblxuICBnZXRGb3JQaXBlbGluZSAoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcy5QaXBlbGluZXMuZ2V0Qm94ZXMoa2V5KTtcbiAgfVxuXG4gIGdldE9uZSAoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YC92MS9ib3hlcy8ke2tleX1gKTtcbiAgfVxuXG4gIGNyZWF0ZSAocGlwZUtleSwgZGF0YSkge1xuICAgIHJldHVybiB0aGlzLl9jLnBvc3QoYWV1YC92Mi9waXBlbGluZXMvJHtwaXBlS2V5fS9ib3hlc2AsIGRhdGEpO1xuICB9XG5cbiAgZGVsZXRlIChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmRlbGV0ZShhZXVgL3YxL2JveGVzLyR7a2V5fWApO1xuICB9XG5cbiAgdXBkYXRlIChkYXRhOiBPYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wb3N0KGFldWAvdjEvYm94ZXMvJHtkYXRhLmtleX1gLCBkYXRhKTtcbiAgfVxuXG4gIGdldEZpZWxkcyAoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YC92MS9ib3hlcy8ke2tleX0vZmllbGRzYCk7XG4gIH1cblxuICBnZXRSZW1pbmRlcnMgKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldWAvdjEvYm94ZXMvJHtrZXl9L3JlbWluZGVyc2ApO1xuICB9XG5cbiAgZ2V0Q29tbWVudHMgKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldWAvdjEvYm94ZXMvJHtrZXl9L2NvbW1lbnRzYCk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkIG1ldGhvZFxuICBjcmVhdGVDb21tZW50IChrZXk6IHN0cmluZywgZGF0YSkge1xuICAgIHJldHVybiB0aGlzLl9jLnB1dChhZXVgL3YxL2JveGVzLyR7a2V5fS9jb21tZW50c2AsIGRhdGEpO1xuICB9XG5cbiAgcG9zdENvbW1lbnQgKGtleTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wdXQoYWV1YC92MS9ib3hlcy8ke2tleX0vY29tbWVudHNgLCB7IG1lc3NhZ2UgfSk7XG4gIH1cblxuICBnZXRGaWxlcyAoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YC92MS9ib3hlcy8ke2tleX0vZmlsZXNgKTtcbiAgfVxuXG4gIGdldFRocmVhZHMgKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldWAvdjEvYm94ZXMvJHtrZXl9L3RocmVhZHNgKTtcbiAgfVxuXG4gIGdldEZlZWQgKGtleTogc3RyaW5nLCBkZXRhaWxMZXZlbDogP3N0cmluZykge1xuICAgIGxldCBxcyA9ICcnO1xuICAgIGlmIChkZXRhaWxMZXZlbCkge1xuICAgICAgcXMgKz0gJz8nICsgcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHsgZGV0YWlsTGV2ZWwgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXVgL3YxL2JveGVzLyR7a2V5fS9uZXdzZmVlZGAgKyBxcyk7XG4gIH1cblxuICBnZXRUYXNrcyAoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YC92Mi9ib3hlcy8ke2tleX0vdGFza3NgKTtcbiAgfVxufVxuXG5jbGFzcyBCb3hGaWVsZHMge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcblxuICBjb25zdHJ1Y3RvciAoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gIH1cblxuICBnZXRGb3JCb3ggKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3MuQm94ZXMuZ2V0RmllbGRzKGtleSk7XG4gIH1cblxuICBnZXRPbmUgKGJveEtleTogc3RyaW5nLCBrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXVgL3YxL2JveGVzLyR7Ym94S2V5fS9maWVsZHMvJHtrZXl9YCk7XG4gIH1cblxuICB1cGRhdGUgKGJveEtleTogc3RyaW5nLCBkYXRhOiBPYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wb3N0KGFldWAvdjEvYm94ZXMvJHtib3hLZXl9L2ZpZWxkcy8ke2RhdGEua2V5fWAsIGRhdGEpO1xuICB9XG59XG5cbmNsYXNzIEZpbGVzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG5cbiAgY29uc3RydWN0b3IgKHM6IFN0cmVhaywgYzogQ29ubkhlbHBlcikge1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xuICB9XG5cbiAgZ2V0Rm9yQm94IChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9zLkJveGVzLmdldEZpbGVzKGtleSk7XG4gIH1cblxuICBnZXRPbmUgKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldWAvdjEvZmlsZXMvJHtrZXl9YCk7XG4gIH1cblxuICBnZXRDb250ZW50cyAoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXROb1BhcnNlKGFldWAvdjEvZmlsZXMvJHtrZXl9L2NvbnRlbnRzYCk7XG4gIH1cbn1cblxuY2xhc3MgVGhyZWFkcyB7XG4gIF9zOiBTdHJlYWs7XG4gIF9jOiBDb25uSGVscGVyO1xuXG4gIGNvbnN0cnVjdG9yIChzOiBTdHJlYWssIGM6IENvbm5IZWxwZXIpIHtcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gYztcbiAgfVxuXG4gIGdldEZvckJveCAoYm94S2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcy5Cb3hlcy5nZXRUaHJlYWRzKGJveEtleSk7XG4gIH1cblxuICBnZXRPbmUgKHRocmVhZEtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldWAvdjEvdGhyZWFkcy8ke3RocmVhZEtleX1gKTtcbiAgfVxufVxuXG5jbGFzcyBUYXNrcyB7XG4gIF9zOiBTdHJlYWs7XG4gIF9jOiBDb25uSGVscGVyO1xuXG4gIGNvbnN0cnVjdG9yIChzOiBTdHJlYWssIGM6IENvbm5IZWxwZXIpIHtcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gYztcbiAgfVxuXG4gIGdldEZvckJveCAoYm94S2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcy5Cb3hlcy5nZXRUYXNrcyhib3hLZXkpO1xuICB9XG5cbiAgZ2V0T25lIChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXVgL3YyL3Rhc2tzLyR7a2V5fWApO1xuICB9XG5cbiAgY3JlYXRlIChib3hLZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXVgL3YyL2JveGVzLyR7Ym94S2V5fS90YXNrc2AsIGRhdGEpO1xuICB9XG5cbiAgdXBkYXRlIChrZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXVgL3YyL3Rhc2tzLyR7a2V5fWAsIGRhdGEpO1xuICB9XG5cbiAgZGVsZXRlIChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmRlbGV0ZShhZXVgL3YyL3Rhc2tzLyR7a2V5fWApO1xuICB9XG59XG5cbmNsYXNzIFdlYmhvb2tzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG5cbiAgY29uc3RydWN0b3IgKHM6IFN0cmVhaywgYzogQ29ubkhlbHBlcikge1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbGwgd2ViaG9va3MgZm9yIGEgcGlwZWxpbmVcbiAgICpcbiAgICogQHBhcmFtIGtleSBQaXBlbGluZSBrZXlcbiAgICogQHJldHVybiB7UHJvbWlzZS48T2JqZWN0Pn1cbiAgICovXG4gIGdldEZvclBpcGVsaW5lIChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXVgL3YyL3BpcGVsaW5lcy8ke2tleX0vd2ViaG9va3NgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBzcGVjaWZpYyB3ZWJob29rXG4gICAqXG4gICAqIEBwYXJhbSBrZXkgV2ViaG9vayBrZXlcbiAgICogQHJldHVybiB7UHJvbWlzZS48T2JqZWN0Pn1cbiAgICovXG4gIGdldE9uZSAoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YC92Mi93ZWJob29rcy8ke2tleX1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgd2ViaG9vayBmb3IgcGlwZWxpbmVcbiAgICpcbiAgICogQHBhcmFtIGtleSBQaXBlbGluZSBrZXlcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQHJldHVybiB7UHJvbWlzZS48T2JqZWN0Pn1cbiAgICovXG4gIGNyZWF0ZSAoa2V5OiBzdHJpbmcsIGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnBvc3QoYWV1YC92Mi9waXBlbGluZXMvJHtrZXl9L3dlYmhvb2tzYCwgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgd2ViaG9va1xuICAgKlxuICAgKiBAcGFyYW0ga2V5IFdlYmhvb2sga2V5XG4gICAqIEByZXR1cm4ge1Byb21pc2UuPE9iamVjdD59XG4gICAqL1xuICBkZWxldGUgKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZGVsZXRlKGFldWAvdjIvd2ViaG9va3MvJHtrZXl9YCk7XG4gIH1cblxuICAvKipcbiAgICogRWRpdCBhIHdlYmhvb2tcbiAgICpcbiAgICogQHBhcmFtIGtleSBXZWJob29rIGtleVxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxPYmplY3Q+fVxuICAgKi9cbiAgdXBkYXRlIChrZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXVgL3YyL3dlYmhvb2tzLyR7a2V5fWAsIGRhdGEpO1xuICB9XG59XG5cbmNsYXNzIFRlYW1zIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG5cbiAgY29uc3RydWN0b3IgKHM6IFN0cmVhaywgYzogQ29ubkhlbHBlcikge1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBsaXN0IG9mIG15IHRlYW1zXG4gICAqIEByZXR1cm4ge1Byb21pc2U8T2JqZWN0Pn1cbiAgICovXG4gIGdldEFsbCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldWAvdjIvdXNlcnMvbWUvdGVhbXNgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSB0ZWFtXG4gICAqXG4gICAqIEBwYXJhbSBrZXkgVGVhbSBrZXlcbiAgICogQHJldHVybiB7UHJvbWlzZTxPYmplY3Q+fVxuICAgKi9cbiAgZ2V0T25lIChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXVgL3YyL3RlYW1zLyR7a2V5fWApO1xuXG4gIH1cbn1cblxuY2xhc3MgQ29udGFjdHMge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcblxuICBjb25zdHJ1Y3RvciAoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgY29udGFjdFxuICAgKlxuICAgKiBAcGFyYW0ga2V5XG4gICAqIEByZXR1cm4ge1Byb21pc2U8T2JqZWN0Pn1cbiAgICovXG4gIGdldE9uZSAoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1YC92Mi9jb250YWN0cy8ke2tleX1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgY29udGFjdFxuICAgKlxuICAgKiBAcGFyYW0ga2V5IFRlYW0ga2V5XG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPE9iamVjdD59XG4gICAqL1xuICBjcmVhdGUgKGtleTogc3RyaW5nLCBkYXRhOiBPYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wb3N0KGFldWAvdjIvdGVhbXMvJHtrZXl9L2NvbnRhY3RzYCwgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogRWRpdCBhIGNvbnRhY3RcbiAgICpcbiAgICogQHBhcmFtIGtleSBDb250YWN0IGtleVxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxPYmplY3Q+fVxuICAgKi9cbiAgdXBkYXRlIChrZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXVgL3YyL2NvbnRhY3RzLyR7a2V5fWAsIGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIGNvbnRhY3RcbiAgICpcbiAgICogQHBhcmFtIGtleSBDb250YWN0IGtleVxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxPYmplY3Q+fVxuICAgKi9cbiAgZGVsZXRlIChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmRlbGV0ZShhZXVgL3YyL2NvbnRhY3RzLyR7a2V5fWApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBjb250YWN0cyB0byBib3hcbiAgICogQHBhcmFtIGtleSBCb3gga2V5IHRvIGFkZCBjb250YWN0cyB0b1xuICAgKiBAcGFyYW0gZGF0YSBBcnJheSB3aXRoIGNvbnRhY3RzLiBFLmcge2NvbnRhY3RzOlt7PGEgY29udGFjdD59XX1cbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZTxPYmplY3Q+fVxuICAgKi9cbiAgYWRkVG9Cb3ggKGtleTogc3RyaW5nLCBkYXRhOiBBcnJheSkge1xuICAgIHJldHVybiB0aGlzLl9jLnBvc3QoYWV1YC92MS9ib3hlcy8ke2tleX1gLCBkYXRhKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBTdHJlYWsge1xuICBfYzogQ29ubkhlbHBlcjtcbiAgTWU6IE1lO1xuICBQaXBlbGluZXM6IFBpcGVsaW5lcztcbiAgQm94ZXM6IEJveGVzO1xuICBGaWxlczogRmlsZXM7XG4gIFRocmVhZHM6IFRocmVhZHM7XG4gIFRhc2tzOiBUYXNrcztcbiAgV2ViaG9va3M6IFdlYmhvb2tzO1xuICBUZWFtczogVGVhbXM7XG4gIENvbnRhY3RzOiBDb250YWN0cztcblxuICBjb25zdHJ1Y3RvciAoYXV0aEtleTogc3RyaW5nKSB7XG4gICAgdGhpcy5fYyA9IG5ldyBDb25uSGVscGVyKGF1dGhLZXkpO1xuICAgIHRoaXMuTWUgPSBuZXcgTWUodGhpcywgdGhpcy5fYyk7XG4gICAgdGhpcy5QaXBlbGluZXMgPSBuZXcgUGlwZWxpbmVzKHRoaXMsIHRoaXMuX2MpO1xuICAgIHRoaXMuQm94ZXMgPSBuZXcgQm94ZXModGhpcywgdGhpcy5fYyk7XG4gICAgdGhpcy5GaWxlcyA9IG5ldyBGaWxlcyh0aGlzLCB0aGlzLl9jKTtcbiAgICB0aGlzLlRocmVhZHMgPSBuZXcgVGhyZWFkcyh0aGlzLCB0aGlzLl9jKTtcbiAgICB0aGlzLlRhc2tzID0gbmV3IFRhc2tzKHRoaXMsIHRoaXMuX2MpO1xuICAgIHRoaXMuV2ViaG9va3MgPSBuZXcgV2ViaG9va3ModGhpcywgdGhpcy5fYyk7XG4gICAgdGhpcy5UZWFtcyA9IG5ldyBUZWFtcyh0aGlzLCB0aGlzLl9jKTtcbiAgICB0aGlzLkNvbnRhY3RzID0gbmV3IENvbnRhY3RzKHRoaXMsIHRoaXMuX2MpO1xuXG4gICAgLy8gY29uc3RhbnRzIGZvciB3ZWJob29rIGV2ZW50IHR5cGVzXG4gICAgdGhpcy5XZWJob29rcy5ib3hDcmVhdGUgPSAnQk9YX0NSRUFURSc7XG4gICAgdGhpcy5XZWJob29rcy5ib3hEZWxldGUgPSAnQk9YX0RFTEVURSc7XG4gICAgdGhpcy5XZWJob29rcy5zdGFnZUNyZWF0ZSA9ICdTVEFHRV9DUkVBVEUnO1xuICAgIHRoaXMuV2ViaG9va3MuYm94TmV3RW1haWxBZGRyZXNzID0gJ0JPWF9ORVdfRU1BSUxfQUREUkVTUyc7XG4gICAgdGhpcy5XZWJob29rcy5ib3hFZGl0ID0gJ0JPWF9FRElUJztcbiAgICB0aGlzLldlYmhvb2tzLmJveENoYW5nZVN0YXRlID0gJ0JPWF9DSEFOR0VfU1RBR0UnO1xuICAgIHRoaXMuV2ViaG9va3MuYm94Q2hhbmdlUGlwZWxpbmUgPSAnQk9YX0NIQU5HRV9QSVBFTElORSc7XG4gICAgdGhpcy5XZWJob29rcy5jb21tZW50Q3JlYXRlID0gJ0NPTU1FTlRfQ1JFQVRFJztcbiAgICB0aGlzLldlYmhvb2tzLnRhc2tDcmVhdGUgPSAnVEFTS19DUkVBVEUnO1xuICAgIHRoaXMuV2ViaG9va3MudGFza0NvbXBsZXRlID0gJ1RBU0tfQ09NUExFVEUnO1xuICAgIHRoaXMuV2ViaG9va3MudGFza0R1ZSA9ICdUQVNLX0RVRSc7XG4gIH1cblxuICBzZWFyY2ggKHF1ZXJ5OiBzdHJpbmcpOiBQcm9taXNlPE9iamVjdD4ge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXVgL3YxL3NlYXJjaD9xdWVyeT0ke3F1ZXJ5fWApO1xuICB9XG59XG4iXX0=