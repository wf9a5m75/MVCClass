(function(){
  var util = require("util"),
      events = require("events"),
      mvcobject = require("mvcobject");

  function MVCClass(params) {
    events.call(this);

    var self = this;
    self.mvcobj = new mvcobject();
    self.mvcobj.changed = function(key) {
      if (typeof self.changed === "function") {
        self.changed(self, key);
      }
      self.emit(key + "_changed", key);
    };

    self.setValues(params);
/*
    var keys = Object.keys(params);
    keys.forEach(function(key) {
      Object.defineProperty(self, key, {
        "value": params[key],
        "writable": false
      });
    });
*/
  }

  util.inherits(MVCClass, events);

  MVCClass.prototype.bindTo = function(key, target, targetKey, noNotify) {
    this.mvcobj.setValues.call(this.mvcobj, key, target, targetKey, noNotify);
  };
  MVCClass.prototype.get = function(key) {
    return this.mvcobj.get(key);
  };
  MVCClass.prototype.notify = function(key) {
    this.mvcobj.notify.call(this.mvcobj, key);
  };
  MVCClass.prototype.set = function(key, value) {
    // Prevent multiple events are triggered for the same key and value.
    if (this.get(key) === value) {
      return;
    }
    this.mvcobj.set.call(this.mvcobj, key, value);
  };
  MVCClass.prototype.setValues = function(values) {
    if (typeof values !== "object") {
      return;
    }
    var self = this;
    var keys = Object.keys(values);
    keys.forEach(function(key) {
      self.set.call(self, key, values[key]);
    });
  };
  MVCClass.prototype.unbind = function(key) {
    this.mvcobj.unbind.call(this.mvcobj, key);
  };
  MVCClass.prototype.unbindAll = function() {
    this.mvcobj.unbindAll.call(this.mvcobj);
  };

  module.exports = MVCClass;
})();
