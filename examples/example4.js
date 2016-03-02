var mvcclass = require('../MVCClass');

var myClass = new mvcclass({
  'enable': true
});

// anotherObject.enable = myClass.enable
var anotherObject = new mvcclass();
myClass.bindTo('enable', anotherObject);

anotherObject.on('enable_changed', function(key) {
  console.log('(anotherObject) enable = ' + this.get(key));
});

myClass.set('enable', false);
