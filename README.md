## JClass

a slight tool to create object

a convenient tool to prototypal inheritance

## Usage

### JClass(constructor)

**Description**

create a class

**Parameters**

* constructor——the constructor of your new class

**Return Value**

the reference of constructor

```javascript
// create a class
var Person = JClass(function (name, age) {
    // private variable
    var secret = "you can get me by privilege method"

    // constructor
    this.name = name;
    this.age = age;

    // privilege method
    this.getSecret = function () {
        return secret;
    }
    this.setSecret = function (newValue) {
        secret = newValue;
    }
}).proto({
    // prototype
    showInfo: function () {
        return this.name + this.age;
    }
}).static({
  	// static
    num: 3
});

var person = new Person('Jack', 19);
person.getSecret();
```

## JClass.extend(constructor)

**Description**

create a class which is a child of another class

**Parameters**

- constructor——the constructor of your subclass

**Return Value**

the reference of the subclass's constructor

```javascript
// class Teacher extend Person
var Teacher = Person.extend((function (name, age, subject) {
  	// super constructor will be automagically called
    this.subject = subject;
})).proto({
    showSubject: function () {
        return this.subject;
    },
}).static({
    num: 3
});

var teacher = new Teacher('jack', 18, 'math');
```

## JClass.proto(object)

**Description**

add the object's property to the prototype of JClass, it will override if the property already exists

**Parameters**

- obj——the object to copy, not deep, just copy one layer

**Return Value**

the reference of the caller

```javascript
// create a class
var Person = JClass(function (name, age) {
    // constructor
    this.name = name;
    this.age = age;
}).proto({
    // add prototype property,override if exist
    showInfo: function () {
        return this.name + this.age;
    }
})
```

## JClass.static(object)

**Description**

add the object's property to the constructor, it will override if the property already exists

**Parameters**

- obj——the object to copy, not deep, just copy one layer

**Return Value**

the reference of the caller

```javascript
// create a class
var Person = JClass(function (name, age) {
    // constructor
    this.name = name;
    this.age = age;
}).static({
    // add static property,override if exist
    someInfo: 'hello'
})
```

## instance(object)

**Description**

add property to the caller, what should pay attention to is that the caller must be the instance of JClass, otherwise this function will do nothing

**Parameters**

- object——the object to copy, not deep, just copy one layer

**Return Value**

the reference of the caller

```javascript
// create a class
var Person = JClass(function (name, age) {
    // constructor
    this.name = name;
    this.age = age;
}).static({
    // add static property,override if exist
    someInfo: 'hello'
});

var person = new Person('Jack',20);
// add an method that belong to the instance of Person
person.instance({
  getName: function(){
    return this.name;
  }
});

person.getName();
```

