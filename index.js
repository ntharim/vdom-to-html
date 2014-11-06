var escape = require('escape-html');
var extend = require('xtend');
var isVNode = require('vtree/is-vnode');
var isVText = require('vtree/is-vtext');
var createAttribute = require('./create-attribute');
var voidElements = require('./void-elements');

module.exports = toHTML;

function toHTML(node) {
  if (!node) return '';

  if (isVNode(node)) {
    return openTag(node) + tagContent(node) + closeTag(node);
  } else if (isVText(node)) {
    return escape(String(node.text));
  }

  return '';
}

function openTag(node) {
  var props = node.properties;
  var ret = '<' + node.tagName;

  for (var name in props) {
    var value = props[name];
    if (value == null) continue;

    if (name == 'attributes') {
      value = extend({}, value);
      for (var attrProp in value) {
        ret += ' ' + createAttribute(attrProp, value[attrProp], true);
      }
      continue;
    }

    if (name == 'style') {
      var css = '';
      value = extend({}, value);
      for (var styleProp in value) {
        css += styleProp + ': ' + value[styleProp] + '; ';
      }
      value = css.trim();
    }

    var attr = createAttribute(name, value);
    if (attr) ret += ' ' + attr;
  }

  return ret + '>';
}

function tagContent(node) {
  var innerHTML = node.properties.innerHTML;
  if (innerHTML != null) return innerHTML;
  else {
    var ret = '';
    if (node.children && node.children.length) {
      for (var i = 0, l = node.children.length; i<l; i++) {
        var child = node.children[i];
        ret += toHTML(child);
      }
    }
    return ret;
  }
}

function closeTag(node) {
  return voidElements[node.tagName] ? '' : '</' + node.tagName + '>';
}

var VNode = require('vtree/vnode');
var VText = require('vtree/vtext');

var vnode = new VNode('div', {
  type: 'text',
  autofocus: true,
  'ev-hook': 'hook',
  attributes: {
    d: 1,
    cy: 10
  },
  style: {
    width: '10px',
    background: 'blue'
  }
}, [ new VNode('br'), new VText('div') ]);

var str = module.exports(vnode);

console.log(str);