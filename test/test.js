
var VNode = require('virtual-dom/vnode/vnode');
var VText = require('virtual-dom/vnode/vtext');
var h = require('virtual-dom/h');
var svg = require('virtual-dom/virtual-hyperscript/svg');
var partial = require('vdom-thunk');
var assert = require('assert');
var toHTML = require('..');

describe('toHTML()', function () {
  it('should not render invalid virtual nodes', function () {
    assert.equal(toHTML(null), '');
    assert.equal(toHTML('hi'), '');
  });

  it('should render simple HTML', function () {
    var node = new VNode('span');
    assert.equal(toHTML(node), '<span></span>');
  });

  it('should render inner text', function () {
    var node = new VNode('span', null, [new VText('hello')]);
    assert.equal(toHTML(node), '<span>hello</span>');
  });

  it('should convert properties to attributes', function () {
    var node = new VNode('form', {
      className: 'login',
      acceptCharset: 'ISO-8859-1',
      accessKey: 'h' // prop to lower case
    });
    assert.equal(toHTML(node), '<form class="login" accept-charset="ISO-8859-1" accesskey="h"></form>');
  });

  it('should not render end tags for void elements', function () {
    var node = new VNode('input');
    assert.equal(toHTML(node), '<input>');
    node = new VNode('br');
    assert.equal(toHTML(node), '<br>');
  });

  it('should not render non-standard properties', function () {
    var node = new VNode('web-component', {
      'ev-click': function () {},
      'random-prop': 'random!',
      toString: function () {}
    });
    assert.equal(toHTML(node), '<web-component></web-component>');
  });

  it('should not render null properties', function () {
    var node = new VNode('web-component', {
      'className': null,
      'id': null
    });
    assert.equal(toHTML(node), '<web-component></web-component>');
  });

  it('should render CSS for style property', function () {
    var node = new VNode('div', {
      style: {
        background: 'black',
        color: 'red'
      }
    });
    assert.equal(toHTML(node), '<div style="background: black; color: red;"></div>');
  });

  it('should convert style property to param-case', function () {
    var node = new VNode('div', {
      style: {
        background: 'black',
        color: 'red',
        zIndex: '1'
      }
    });
    assert.equal(toHTML(node), '<div style="background: black; color: red; z-index: 1;"></div>');
  });

  it('should render style element correctly', function(){
    var node = new VNode('style',{},[
        new VText(".logo {background-image: url('/mylogo.png');}")
    ]);
    assert.equal(toHTML(node),"<style>.logo {background-image: url('/mylogo.png');}</style>");
  });

  it('should render data- attributes for dataset properties', function () {
    var node = new VNode('div', {
      dataset: {
        foo: 'bar',
        num: 42
      }
    });
    assert.equal(toHTML(node), '<div data-foo="bar" data-num="42"></div>');
  });

  it('should convert data- attributes to param-case', function () {
    var node = new VNode('div', {
      dataset: {
        fooBar: 'baz'
      }
    });
    assert.equal(toHTML(node), '<div data-foo-bar="baz"></div>');
  });

  it('should render boolean properties', function () {
    var node = new VNode('input', {
      autofocus: true,
      disabled: false
    });
    assert.equal(toHTML(node), '<input autofocus>');
  });

  it('should render overloaded boolean properties', function () {
    var node = new VNode('a', {
      href: '/images/xxx.jpg',
      download: true
    });
    assert.equal(toHTML(node), '<a href="/images/xxx.jpg" download></a>');
    node = new VNode('a', {
      href: '/images/xxx.jpg',
      download: 'sfw'
    });
    assert.equal(toHTML(node), '<a href="/images/xxx.jpg" download="sfw"></a>');
  });

  it('should render any attributes', function () {
    var node = new VNode('circle', {
      attributes: {
        cx: "60",
        cy: "60",
        r: "50"
      }
    });
    assert.equal(toHTML(node), '<circle cx="60" cy="60" r="50"></circle>');
  });

  it('should not render null attributes', function () {
    var node = new VNode('circle', {
      attributes: {
        cx: "60",
        cy: "60",
        r: null
      }
    });
    assert.equal(toHTML(node), '<circle cx="60" cy="60" ></circle>');
  });

  it('should render nested children', function () {
    var node = new VNode('div', null, [
      new VNode('div', { id: 'a-div' }, [
        new VNode('div', null, [new VText('HI!')])
      ]),
      new VNode('div', { className: 'just-another-div' })
    ]);
    assert.equal(toHTML(node), '<div><div id="a-div"><div>HI!</div></div><div class="just-another-div"></div></div>');
  });

  it('should encode attribute names/values and text contents', function () {
    var node = new VNode('div', {
      attributes: {
        'data-"hi"': '"hello"'
      }
    }, [new VText('<span>sup</span>')]);
    assert.equal(toHTML(node), '<div data-&quot;hi&quot;="&quot;hello&quot;">&lt;span&gt;sup&lt;/span&gt;</div>');
  });

  it('should not encode script tag contents', function () {
    var node = new VNode('div', null, [
      new VNode('script', null, [new VText('console.log("zzz");')])
    ]);
    assert.equal(toHTML(node), '<div><script>console.log("zzz");</script></div>');
  });

  it('should render `innerHTML`', function () {
    var node = new VNode('div', {
      innerHTML: '<span>sup</span>'
    });
    assert.equal(toHTML(node), '<div><span>sup</span></div>');
  });

  it('should render thunks', function () {
    var fn = function fn(text) {
      return new VNode('span', null, [new VText(text)]);
    };
    var node = partial(fn, 'hello');
    assert.equal(toHTML(node), '<span>hello</span>');
  });

  it('should render widgets', function () {
    var Widget = function(text) {
      this.text = text;
    }
    Widget.prototype.type = 'Widget';
    Widget.prototype.render = function() {
      return new VNode('span', null, [new VText(this.text)]);
    };
    var node = new Widget('hello');
    assert.equal(toHTML(node), '<span>hello</span>');
  });

  it('should render tag in lowercase', function () {
    var node = new VNode('SPAN', null, [new VText('hello')]);
    assert.equal(toHTML(node), '<span>hello</span>');
  });

  it('should render hyperscript', function () {
    var node = h('span', null, 'test');
    assert.equal(toHTML(node), '<span>test</span>');
  });

  it('should not encode script tag contents, when using hyperscript', function () {
    var node = h('div', null, [
      h('script', null, 'console.log("zzz");')
    ]);
    assert.equal(toHTML(node), '<div><script>console.log("zzz");</script></div>');
  });

  it('should not render end tags for void elements, when using hyperscript', function () {
    var node = h('input');
    assert.equal(toHTML(node), '<input>');
    node = h('br');
    assert.equal(toHTML(node), '<br>');
  });

  it('should preserve UTF-8 entities and escape special html characters', function () {
    var node = h('span', null, '测试&\"\'<>');
    assert.equal(toHTML(node), '<span>测试&amp;&quot;&#39;&lt;&gt;</span>');
  });

  it('should render svg with attributes in default namespace', function () {
    var node = svg('svg', {
      'viewBox': '0 0 10 10'
    });
    assert.equal(toHTML(node), '<svg viewBox="0 0 10 10"></svg>');
  });

  it('should render svg with attributes in non-default namespace', function () {
    var node = svg('use', {
      'xlink:href': '/abc.jpg'
    });
    assert.equal(toHTML(node), '<use xlink:href="/abc.jpg"></use>');
  });

  it('should render input value', function () {
    var node = h('input', { type: 'submit', value: 'add' });
    assert.equal(toHTML(node), '<input type="submit" value="add">');
  });
});
