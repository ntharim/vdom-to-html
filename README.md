
# vdom-to-html

[![NPM version][npm-image]][npm-url]
[![Github release][github-image]][github-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]

Turn [virtual-dom](https://github.com/Matt-Esch/virtual-dom/) nodes into HTML.

## Installation

```sh
npm install --save vdom-to-html
```

## Usage

```js
var VNode = require('vtree/vnode');
var toHTML = require('vdom-to-html');

toHTML(new VNode('input', { className: 'name', type: 'text' }));
// => '<input class="name" type="text">'
```

[npm-image]: https://img.shields.io/npm/v/vdom-to-html.svg?style=flat-square
[npm-url]: https://npmjs.org/package/vdom-to-html
[github-image]: http://img.shields.io/github/release/nthtran/vdom-to-html.svg?style=flat-square
[github-url]: https://github.com/nthtran/vdom-to-html/releases
[travis-image]: https://img.shields.io/travis/nthtran/vdom-to-html.svg?style=flat-square
[travis-url]: https://travis-ci.org/nthtran/vdom-to-html
[coveralls-image]: https://img.shields.io/coveralls/nthtran/vdom-to-html.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/nthtran/vdom-to-html?branch=master
[david-image]: http://img.shields.io/david/nthtran/vdom-to-html.svg?style=flat-square
[david-url]: https://david-dm.org/nthtran/vdom-to-html
[license-image]: http://img.shields.io/npm/l/vdom-to-html.svg?style=flat-square
[license-url]: LICENSE