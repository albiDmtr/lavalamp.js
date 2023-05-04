# lavalamp.js
A small JS script for creating colorful flowing animations without WebGL.

## Demo:
![](https://github.com/albiDmtr/lavalamp.js/raw/main/demo/demo.gif)

## Usage:
To give the lavalamp background to an element, give it the HTML attribute `data-lavalamp-color` and set its value to the preferred HEX code like so:
```html
<div data-lavalamp-color="#ff0000">
```
The default is that the background color of the element is left untouched. If you'd like to add a solid background, set the HTML attribute `data-lavalamp-bg` to `true`:
```html
<div data-lavalamp-color="#ff0000" data-lavalamp-bg="true">
```