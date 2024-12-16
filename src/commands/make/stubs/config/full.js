/** @type {import('@maizzle/framework').Config} */
export default {
  build: {
    content: ['emails/**/*.html'],
    static: {
      source: ['images/**/*.*'],
      destination: 'images',
    },
    output: {
      path: 'build_production',
      extension: 'html',
    },
    spinner: 'circleHalves',
    summary: true,
  },
  server: {
    hmr: true,
    maxRetries: 10,
    port: 3000,
    scrollSync: false,
    watch: ['./images/**/*'],
    reportFileSize: false,
    spinner: 'circleHalves',
  },
  plaintext: {
    output: {
      path: 'build_production/plaintext',
      extension: 'txt'
    },
    skipHtmlDecoding: true,
  },
  posthtml: {
    expressions: {},
    plugins: [],
    options: {
      directives: [],
      xmlMode: false,
      decodeEntities: false,
      lowerCaseTags: false,
      lowerCaseAttributeNames: false,
      recognizeCDATA: false,
      recognizeSelfClosing: true,
      sourceLocations: false,
      recognizeNoValueAttribute: true,
      singleTags: [],
      closingSingleTag: 'default',
      quoteAllAttributes: true,
      replaceQuote: true,
      quoteStyle: 2,
    },
  },
  // postcss: {
  //   options: {
  //   }
  // },
  components: {
    root: './',
    folders: ['components', 'emails', 'layouts'],
    tag: 'component',
    tagPrefix: 'x-',
    attribute: 'src',
    fileExtension: 'html',
    yield: 'yield',
    slot: 'slot',
    fill: 'fill',
    slotSeparator: ':',
    push: 'push',
    stack: 'stack',
    propsScriptAttribute: 'props',
    propsContext: 'props',
    propsAttribute: 'locals',
    propsSlot: 'props',
    parserOptions: {},
    expressions: {},
    plugins: [],
    attrsParserRules: {},
    strict: true,
    utilities: {},
    elementAttributes: {},
    safelistAttributes: [],
    blocklistAttributes: [],
  },
  outlook: {
    tag: 'outlook', // posthtml-mso config
  },
  useTransformers: true,
  css: {
    purge: {
      whitelist: [],
      backend: [
        { heads: '{{', tails: '}}' },
      ],
      removeHTMLComments: true,
      removeCSSComments: true,
      uglify: false,
      doNotRemoveHTMLCommentsWhoseOpeningTagContains: ['[if', '[endif'],
    },
    inline: {
      styleToAttribute: {
        'vertical-align': 'valign',
      },
      attributeToStyle: ['width', 'height', 'bgcolor', 'background', 'align', 'valign'],
      applyWidthAttributes: [],
      applyHeightAttributes: [],
      useAttributeSizes: true,
      removeInlinedSelectors: true,
      excludedProperties: [],
      preferUnitlessValues: false,
    },
    resolveCalc: true,
    resolveProps: true,
    safe: true,
    sixHex: true,
    shorthand: true,
  },
  locals: {},
  baseURL: {
    url: 'https://example.com',
    tags: ['img'],
  },
  replaceStrings: {
    '\\s?foo-bar=""': '', // remove empty foo-bar="" attributes
  },
  attributes: {
    add: {
      table: {
        cellpadding: 0,
        cellspacing: 0,
        role: 'none',
      },
      img: {
        alt: true,
      }
    },
    remove: ['foo-bar'],
  },
  fetch: {
    tags: ['fetch'],
    attribute: 'url',
    ofetch: {},
    preserveTag: false,
    expressions: {},
  },
  filters: false,
  urlParameters: {
    _options: {
      qs: {
        encode: false
      },
      tags: ['a'],
    },
    utm_source: 'maizzle',
    utm_campaign: 'Campaign Name',
    utm_medium: 'email',
  },
  prettify: true,
  minify: {
    lineLengthLimit: 500,
    removeIndentations: true,
    removeLineBreaks: false,
    removeCSSComments: true,
    removeHTMLComments: true,
    breakToTheLeftOf: [
      '</td',
      '<html',
      '<head',
      '<meta',
      '<table',
      '<script',
      '</script',
      '<!DOCTYPE',
      '<style',
      '</style',
      '<title',
      '<body',
      '@media',
      '</html',
      '</body',
      '<!--[if',
      '<!--<![endif'
    ]
  },
  markdown: {
    root: './',
    encoding: 'utf8',
    markdownit: {},
    plugins: [],
  },
  widowWords: {
    attributes: ['prevent-widows'],
    createWidows: false,
    minWords: 3,
    ignore: [
      {
        start: '{{',
        end: '}}'
      },
    ],
  },
  beforeCreate({config}) {},
  beforeRender({html, matter, config}) {},
  afterRender({html, matter, config}) {},
  afterTransformers({html, matter, config}) {},
  afterBuild({files, config}) {}
}
