
var VNode = require('virtual-dom/vnode/vnode');
var VText = require('virtual-dom/vnode/vtext');
var partial = require('vdom-thunk');
var assert = require('assert');
var toHTML = require('..');

describe('toHTML()', function () {
  it('should not render invalid virtual nodes', function () {
    assert(toHTML(null) === '');
    assert(toHTML('hi') === '');
  });

  it('should render simple HTML', function () {
    var node = new VNode('span');
    assert(toHTML(node) === '<span></span>');
  });

  it('should render inner text', function () {
    var node = new VNode('span', null, [new VText('hello')]);
    assert(toHTML(node) === '<span>hello</span>');
  });

  it('should convert properties to attributes', function () {
    var node = new VNode('form', {
      className: 'login',
      acceptCharset: 'ISO-8859-1',
      accessKey: 'h' // prop to lower case
    });
    assert(toHTML(node) === '<form class="login" accept-charset="ISO-8859-1" accesskey="h"></form>');
  });

  it('should not render end tags for void elements', function () {
    var node = new VNode('input');
    assert(toHTML(node) === '<input>');
    node = new VNode('br');
    assert(toHTML(node) === '<br>');
  });

  it('should not render non-standard properties', function () {
    var node = new VNode('web-component', {
      'ev-click': function () {},
      'random-prop': 'random!'
    });
    assert(toHTML(node) === '<web-component></web-component>');
  });

  it('should not render null properties', function () {
    var node = new VNode('web-component', {
      'className': null,
      'id': null
    });
    assert(toHTML(node) === '<web-component></web-component>');
  });

  it('should render `data-` and `aria-` properties', function () {
    var node = new VNode('web-component', {
      'data-click': 'clicked!',
      'aria-labelledby': 'label'
    });
    assert(toHTML(node) === '<web-component data-click="clicked!" aria-labelledby="label"></web-component>');
  });

  it('should render CSS for style property', function () {
    var node = new VNode('div', {
      style: {
        background: 'black',
        color: 'red'
      }
    });
    assert(toHTML(node) === '<div style="background: black; color: red;"></div>');
  });

  it('should render boolean properties', function () {
    var node = new VNode('input', {
      autofocus: true,
      disabled: false
    });
    assert(toHTML(node) === '<input autofocus>');
  });

  it('should render overloaded boolean properties', function () {
    var node = new VNode('a', {
      href: '/images/xxx.jpg',
      download: true
    });
    assert(toHTML(node) === '<a href="/images/xxx.jpg" download></a>');
    node = new VNode('a', {
      href: '/images/xxx.jpg',
      download: 'sfw'
    });
    assert(toHTML(node) === '<a href="/images/xxx.jpg" download="sfw"></a>');
  });

  it('should render any attributes', function () {
    var node = new VNode('circle', {
      attributes: {
        cx: "60",
        cy: "60",
        r: "50"
      }
    });
    assert(toHTML(node) === '<circle cx="60" cy="60" r="50"></circle>');
  });

  it('should not render null attributes', function () {
    var node = new VNode('circle', {
      attributes: {
        cx: "60",
        cy: "60",
        r: null
      }
    });
    assert(toHTML(node) === '<circle cx="60" cy="60" ></circle>');
  });

  it('it should render nested children', function () {
    var node = new VNode('div', null, [
      new VNode('div', { id: 'a-div' }, [
        new VNode('div', null, [new VText('HI!')])
      ]),
      new VNode('div', { className: 'just-another-div' })
    ]);
    assert(toHTML(node) === '<div><div id="a-div"><div>HI!</div></div><div class="just-another-div"></div></div>');
  });

  it('should encode attribute names/values and text contents', function () {
    var node = new VNode('div', {
      attributes: {
        'data-"hi"': '"hello"'
      }
    }, [new VText('<span>sup</span>')]);
    assert(toHTML(node) === '<div data-&quot;hi&quot;="&quot;hello&quot;">&lt;span&gt;sup&lt;/span&gt;</div>');
  });

  it('should not encode script tag contents', function () {
    var node = new VNode('div', null, [
      new VNode('script', null, [new VText('console.log("zzz");')])
    ]);
    assert(toHTML(node) === '<div><script>console.log("zzz");</script></div>');
  });

  it('should render `innerHTML`', function () {
    var node = new VNode('div', {
      innerHTML: '<span>sup</span>'
    });
    assert(toHTML(node) === '<div><span>sup</span></div>');
  });

  it('should render thunks', function () {
    var fn = function fn(text) {
      return new VNode('span', null, [new VText(text)]);
    };
    var node = partial(fn, 'hello');
    assert(toHTML(node) === '<span>hello</span>');
  });
});