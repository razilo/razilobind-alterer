# raziloBind - Alterers ES6 JS/HTML Binding Library

## What is raziloBind?


ES6 JS/HTML binding library for creating dynamic web applications through HTML attribute binding. Made up of 4 libraries, puled in via a parent package that pulls in all required parts and configures as importable ES6 module 'RaziloBind'.

* **[razilobind-core](https://github.com/smiffy6969/razilobind-core)** *(the main part)*, to traverse, detect and observe.
* **[razilobind-binder](https://github.com/smiffy6969/razilobind-binder) [injectables]** *(the actual binders)*, binding object properties to elements to do various things.
* **[razilobind-resolver](https://github.com/smiffy6969/razilobind-resolver) [injectables]** *(to parse attribute data)*, resolving attribute data to things like strings, numbers, objects, methods etc.
* **[razilobind-alterer](https://github.com/smiffy6969/razilobind-alterer) [injectables]** *(to change things)*, altering resolved data to something else without affecting the model.

This package **razilobind-alterer**, is injectable functionality that alters bound, resolved data before applying the data in the binded fashion. Think of it like formatting a timestamp to a date string, or inverting a property value.


## What are Alterers?


Alterers are a way to change the end result of bound data that has been resolved. Simply, we create a bind (to do a thing), resolve the data in the bind (to know what to bind), then alter the resolved data if we wish. Alterers are the last point of that chain.

Alterers change the resolved data before using it in the binded element in the fashion it was intended to be used, such as trimming whitespace on strings, or formtatting dates. Substitue ??? for the binder you wish to alter the data on `alter-*=""`, such as alter-text, alter-show... with the alterer/s specified in attribute value such as

Alterers are linked to the binder you wish to change, and they take in any resolvable data, [see here for what types of resolvable data can be used](https://github.com/smiffy6969/razilobind-resolver).


```html
<!-- single alterer which gets the alterer type from the bound foobar property of the model -->
<p bind-text="foobar" alter-text="foobar"></p>

<!-- single alterer (as a string value) -->
<p bind-text="foobar" alter-text="'trim'"></p>

<!-- multiple alterers (as a strings or property) affects accumulate in order -->
<p bind-text="foobar" alter-text="['trim', 'another', foobar,...]"></p>

<!-- alterers with options (send in data to the alterer) -->
<p bind-text="foobar" alter-text="{'trim': 'options', 'another': ['options'],...}"></p>
```


NOTE: We don't link arbitary functions to an alterer, if you bind a property or a method, it will use the result of this to look for the alterer to use! If you want custom alterers, then define this as correct alterers and inject them into the tool correctly, see how further down.


## What Alterers are Available


### trim *Trims whitespace from string*

Trim whitespace from start and end of resolved string.

* **Accepts Type** string
* **Options** none
* **returns** string

```html
<span bind-text="foo" alter-text="'trim'"></span>
```


### json *JSON Stringify data*

Stringifies various data types to a JSON readable string.

* **Accepts Type** all 'typeof' data types
* **Options** none
* **returns** string

```html
<span bind-text="foo" alter-text="'json'"></span>
```


### prefix *Add to start of string*

Add a string to the start of a string, such as http:// infront of a web address.

* **Accepts Type** string
* **Options** string
* **returns** string

```html
<span bind-text="foo" alter-text="{'prefix': 'http://'}"></span>
```


### suffix *Add to end of string*

Add a string to the end of a string, such as .com to a TLD name.

* **Accepts Type** string
* **Options** string
* **returns** string

```html
<span bind-text="foo" alter-text="{'suffix': '.com'}"></span>
```


### join *Catenate strings into string*

Catenate strings together into a single string.

* **Accepts Type** object of strings
* **Options** none
* **returns** string

```html
<span bind-text="[foo, 'bar']" alter-text="join"></span>
<span bind-text="{'a': foo, 'b': 'bar'}" alter-text="join"></span>
```


### date *Format data to date string*

Format various data types to a date string in a specified format. Ported from dateFormat https://github.com/felixge/node-dateformat by Steven Levithan <stevenlevithan.com>, please visit this package for details on format types.

* **Accepts Type** 'string', 'number', 'object', 'symbol'
* **Options** string
* **returns** string

```html
<span bind-text="'1988/10/10'" alter-text="{'date': 'mmmm d, yyyy'}"></span>
<span bind-text="something.date" alter-text="{'date': 'yyyy-mm-dd'T'HH:MM:ss'}"></span>
<span bind-text="1234567890" alter-text="{'date': 'isoUtcDateTime'}"></span>
```


### not *Boolean inversion of data*

Return a boolean inversion of the resolved data.

* **Accepts Type** all 'typeof' data types
* **Options** none
* **returns** boolean

```html
<span bind-show="foo" alter-show="not"></span>
```


### equal *Return boolean if equal to*

Checks if the bound resolved data is equal to option alterer value.

* **Accepts Type** All resolved types
* **Options** mixed
* **returns** boolean

```html
<span bind-show="foo.bar" alter-text="{'equal': foo.bar2}"></span>
```


### identical *Return boolean if identical to*

Checks if the bound resolved data is identical (in value and type) to option alterer value.

* **Accepts Type** All resolved types
* **Options** mixed
* **returns** boolean

```html
<span bind-show="foo.bar" alter-text="{'identical': foo.bar2}"></span>
```


## Making your own Alterers


There are two ways to add your own alterers to the system, by injecting them with the addAlterers() method bundled with razilobind, or if you have decided to import the core and have extended it, you may inject them along with all the other alterers in the same fashion.

First off you will need a new alterer, you can start off by taking an existing alterer and copying it, changing the necessary parts. Lets call this **your-test.alterer.js**...

```javascript
import {RaziloBindAlterer} from 'razilobind-alterer'

/**
 * Test Alterer
 * A new test alterer
 *
 * Inherits
 *
 * properties: name, accepts
 * method: detect(name, resolved) { return bool }
 */
export default class YourTestAlterer extends RaziloBindAlterer {
	constructor() {
		super();
		this.name = 'your-test'; // this is the name you use in the html, it is how we detect if alterer should be used along with accepts below
		this.accepts = ['string']; // as returned by 'typeof resolvedData'..... [] = any type, ['string'] = string only
	}

	/**
	 * alter()
	 * Changes resolved data based on options
	 * @param mixed resolved The data to change
	 * @param mixed options Any options sent in with the alterer
	 * @return mixed Changed resolved data
	 */
	alter(resolved, options) {
		// add Boom!!! to end of string
		return resolved + ' Boom!!!';
	}
}
```

You can now import this into your project logic along with razilobind, injecting YourTestAlterer into razilobind by adding custom alterer...


```javascript
import RaziloBind from 'razilobind'
import YourTestAlterer from './your-test.alterer.js'

var model = {foo: 'foo', bar: 'bar'};

var rb = new RaziloBind();
rb.addAlterers({YourTest: YourTestAlterer});
rb.bind('#test', model);
```

or if you have extended the core with your own class, you can add them as follows...


```javascript
import {RaziloBindCore, RaziloBindCoreDetector} from 'razilobind-core'
import {RaziloBindTrimAlterer, ...} from 'razilobind-alterer'
import {RaziloBindForBinder, ...} from 'razilobind-binder'
import {RaziloBindBooleanResolver, ...} from 'razilobind-resolver'
import YourTestAlterer from './your-test.alterer.js'

export default class YourProjectBind extends RaziloBindCore {
    constructor(options) {
		super(options);

		// Inject injectables, pull in what you need!
		RaziloBindCoreDetector.defaultAlterers = {TrimAlterer: RaziloBindTrimAlterer, ...};
		RaziloBindCoreDetector.defaultBinders = {ForBinder: RaziloBindForBinder, ...};
		RaziloBindCoreDetector.defaultResolvers = {BooleanResolver: RaziloBindBooleanResolver, ...};

		// Inject custom injectables
		RaziloBindCoreDetector.customAlterers = {YourTest: YourTestAlterer, ...};
	}
}
```


...either way will inject custom alterers, should you wish to replace all default alterers with your own custom ones, substitute the default injectables with your custom ones. Default injectables will also be parsed first, followed by custom ones, you choose how to and what to inject.


Once your new alterer is injected, you should be able to use it like so (don't forget strings are in quotes, miss the quotes and you will be sending a property in!)


```html
<span bind-text="foo" alter-text="'your-test'"></span>
```
