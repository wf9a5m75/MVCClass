# MVCClass

This is an extended class of [MVCObject](https://github.com/Treri/MVCObject).

## What does 'mvcclass = mvcobject + events' mean?

@Treri creates [MVCObject](https://github.com/Treri/MVCObject), this is great, and I appreciate for his work.

But he does not implement the "addEventListener" method.
And I wanted to use similar methods, such as "on()", "once()", "emit()", and so on,
so I decided to extend the MVCObject class.

## How to use in Node.js?

1. Creates a class.

  ```js
  var MVCClass = require("./mvcclass");;

  function MyClass(params) {
    MVCClass.call(this, params);
  }

  MyClass.prototype = new MVCClass();
  ```

2. Creates an instance from the created class.

  ```js
  var testObj = new MyClass();

  testObj.once("hoge_changed", function() {
    console.log("hoge = " + this.get("hoge"));
  });

  testObj.set("hoge", 1);

  testObj.set("hoge", 2);
  ```

## Methods

See [MVCObject](https://github.com/Treri/MVCObject) and [events](https://nodejs.org/api/events.html).
