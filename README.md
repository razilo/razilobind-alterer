# raziloBind

## Alterers ES6 JS/HTML Binding Library

Alterers for ES6 JS/HTML binding library for creating cynamic web applications through HTML attribtue binding. Pulls in all required parts and configures as RaziloBind

A data binding library to bind ES6 JS to HTML views thorugh HTML attributes, offering live changes to update modules and vice versa.

Changes that you can apply to binded data. Alterers change the resolved data before using it in the binded element, such as trimming whitespace on strings.
Substitue * for the binder to alter `alter-*=""`, such as alter-text, alter-show... with the alterer/s specified in attribute value such as


```html
<p bind-text="foobar" alter-text="trim"></p>
<p bind-text="foobar" alter-text="['trim', 'another',...]"></p>
<p bind-text="foobar" alter-text="{'trim': 'options', 'another': 'options',...}"></p>
```


Alterers... may or may not take options in as data to act on when required. When multiple alterers affect a single bind type, the affects are cumulative.


* trim - Trims resolved data of whitespace at front and rear of string. No options used.
* json - Stringifies property as a JSON string.
* prefix - Add something to start of a string {'prefix': 'something'}.
* suffix - Add something to end of a string {'suffix': 'something'}.
* not - Get the boolean opposite of the property.
* date - Convert string, date object, timestamp into formatted date string {'date': '1978/11/01'}.
* join - Joins the values of array/object as a string and returns result.
