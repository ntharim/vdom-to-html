/**
 * Attribute types.
 */

var types = {
  BOOLEAN: 1,
  OVERLOADED_BOOLEAN: 2
};

/**
 * Properties.
 *
 * Taken from https://github.com/facebook/react/blob/v0.12.0/src/browser/ui/dom/HTMLDOMPropertyConfig.js
 *
 * Differences:
 * - `autofocus` uncommented
 * - everthing except for BOOLEAN and OVERLOADED_BOOLEAN changed to `true`
 */

var properties = {
  /**
   * Standard Properties
   */
  accept: true,
  acceptCharset: true,
  accessKey: true,
  action: true,
  allowFullScreen: types.BOOLEAN,
  allowTransparency: true,
  alt: true,
  async: types.BOOLEAN,
  autocomplete: true,
  autofocus: types.BOOLEAN,
  autoplay: types.BOOLEAN,
  cellPadding: true,
  cellSpacing: true,
  charSet: true,
  checked: types.BOOLEAN,
  classID: true,
  className: true,
  cols: true,
  colSpan: true,
  content: true,
  contentEditable: true,
  contextMenu: true,
  controls: types.BOOLEAN,
  coords: true,
  crossOrigin: true,
  data: true, // For `<object />` acts as `src`.
  dateTime: true,
  defer: types.BOOLEAN,
  dir: true,
  disabled: types.BOOLEAN,
  download: types.OVERLOADED_BOOLEAN,
  draggable: true,
  enctype: true,
  form: true,
  formNoValidate: types.BOOLEAN,
  frameBorder: true,
  height: true,
  hidden: types.BOOLEAN,
  href: true,
  hreflang: true,
  htmlFor: true,
  httpEquiv: true,
  icon: true,
  id: true,
  label: true,
  lang: true,
  list: true,
  loop: types.BOOLEAN,
  manifest: true,
  max: true,
  maxLength: true,
  media: true,
  mediaGroup: true,
  method: true,
  min: true,
  multiple: types.BOOLEAN,
  muted: types.BOOLEAN,
  name: true,
  noValidate: types.BOOLEAN,
  open: true,
  pattern: true,
  placeholder: true,
  poster: true,
  preload: true,
  radiogroup: true,
  readOnly: types.BOOLEAN,
  rel: true,
  required: types.BOOLEAN,
  role: true,
  rows: true,
  rowSpan: true,
  sandbox: true,
  scope: true,
  scrolling: true,
  seamless: types.BOOLEAN,
  selected: types.BOOLEAN,
  shape: true,
  size: true,
  sizes: true,
  span: true,
  spellcheck: true,
  src: true,
  srcdoc: true,
  srcset: true,
  start: true,
  step: true,
  style: true,
  tabIndex: true,
  target: true,
  title: true,
  type: true,
  useMap: true,
  value: true,
  width: true,
  wmode: true,

  /**
   * Non-standard Properties
   */
  autocapitalize: true, // Supported in Mobile Safari for keyboard hints
  autocorrect: true, // Supported in Mobile Safari for keyboard hints
  itemProp: true, // Microdata: http://schema.org/docs/gs.html
  itemScope: types.BOOLEAN, // Microdata: http://schema.org/docs/gs.html
  itemType: true, // Microdata: http://schema.org/docs/gs.html
  property: true // Supports OG in meta tags
};

/**
 * Properties to attributes mapping.
 *
 * The ones not here are simply converted to lower case.
 */

var attributeNames = {
  acceptCharset: 'accept-charset',
  className: 'class',
  htmlFor: 'for',
  httpEquiv: 'http-equiv'
};

/**
 * Exports.
 */

module.exports = {
  attributeTypes: types,
  properties: properties,
  attributeNames: attributeNames
};