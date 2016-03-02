# MVCClass

This is an extended class of [MVCObject](https://github.com/Treri/MVCObject).

## What does 'mvcclass = mvcobject + events' mean?

@Treri creates [MVCObject](https://github.com/Treri/MVCObject), this is great, and I appreciate for his work.

But he does not implement the "addEventListener" method.
And I wanted to use similar methods, such as "on()", "once()", "emit()", and so on,
so I decided to extend the MVCObject class.

## Mechanism

You can use `set(key, value)` and `get(key)` methods basically.
Set a new value with `set(key)` method, you can catch the event named `(key)_changed`.

```js
var mvcclass = require('mvcclass');

var myClass = new mvcclass();

myClass.on('value1_changed', function(key) {
  console.log('The value1 is changed: ' + this.get('value1'));
});

myClass.set('value1', 'test');
```

Because of inheriting EventEmitter2 module, you can also use as event emitter.

```js
myClass.on('myEvent', function(data) {
  console.log('myEvent: ' + data);
});

myClass.emit('myEvent', 'hi!');
```

## Example1 : Catch the events when values are changed.

```js
var mvcclass = require('mvcclass');

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

// Outputs
//
// --> eventName: value1_changed, newValue: Welcome!
// --> eventName: value2_changed, newValue: 18
```

## Example2: Catch all events with wildcard

```js
var myClass = new mvcclass({
  'wildcard': true,   // wildcard, delimiter,
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


// Outputs
//
// --> eventName: value1_changed, newValue: Welcome!
// --> eventName: value2_changed, newValue: 18
```

## Example3: Set multiple values at once.

`setValues(object)` method allows you to set JSON Object as `key-value` pairs.

```js
var onValueChanged = function(key) {
  console.log('--> eventName: ' + this.event + ', newValue: ' + this.get(key));
};

myClass.on('*_changed', onValueChanged);

myClass.setValues({
  'value1': 'Welcome!',
  'value2': myClass.get('value2') + 15
});

// Outputs
//
// --> eventName: value1_changed, newValue: Welcome!
// --> eventName: value2_changed, newValue: 18
```

## Example4: Bind a property to another object.

`bindTo()` method sets the value that stored into the class to another object.

```js
var myClass = new mvcclass({
  'enable': true
});

// anotherObject.enable = myClass.enable
var anotherObject = new mvcclass();
myClass.bindTo('enable', anotherObject);

anotherObject.on('enable_changed', function(key) {
  console.log('--> (anotherObject) enable = ' + this.get(key));
});

myClass.set('enable', false);

// Outputs
//
// --> (anotherObject) enable = false
```

## Methods

See [MVCObject](https://github.com/Treri/MVCObject) and [EventEmitter2](https://github.com/asyncly/EventEmitter2).

## Change logs

- **version 0.1.2** Use EventEmitter2 instead of events internally.

 You can get the event name with `this.event` in event listeners.
