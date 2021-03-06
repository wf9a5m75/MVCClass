var mvcclass = require('../MVCClass');

var myClass = new mvcclass({
  'wildcard': true,
  'delimiter': '_',
  'value1': 'Hello World',
  'value2': 3
});

var onValueChanged = function(key) {
  console.log('--> eventName: ' + this.event + ', newValue: ' + this.get(key));
};

myClass.on('*_changed', onValueChanged);

myClass.set('value1', 'Welcome!');
myClass.set('value2', myClass.get('value2') + 15);
