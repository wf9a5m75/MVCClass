var mvcclass = require('../MVCClass');

var myClass = new mvcclass({
  'value1': 'Hello World',
  'value2': 3
});

var onValueChanged = function(key) {
  console.log('--> eventName: ' + this.event + ', newValue: ' + this.get(key));
};

myClass.on('value1_changed', onValueChanged);
myClass.on('value2_changed', onValueChanged);

myClass.set('value1', 'Welcome!');
myClass.set('value2', myClass.get('value2') + 15);
