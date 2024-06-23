/** @type {import('@maizzle/framework').Config} */
export default {
  build: {
    content: ['src/templates/**/*.html'],
    static: {
      source: ['src/images/**/*.*'],
      destination: 'images',
    },
    output: {
      path: 'build_production',
      extension: 'html',
    },
    summary: true,
    spinner: 'circleHalves',
  },
  server: {
    hmr: true,
    maxRetries: 10,
    port: 3000,
    scrollSync: true,
    watch: ['./src/images/**/*'],
    reportFileSize: true,
  },
  plaintext: {
    output: {
      path: 'build_production/plaintext',
      extension: 'rtxt'
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
    folders: ['src/components', 'src/layouts', 'src/templates'],
    tag: 'component',
    tagPrefix: 'x-',
    attribute: 'src',
    fileExtension: 'html',
    yield: 'content',
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
    blacklistAttributes: [],
  },
  outlook: {
    tag: 'outlook', // posthtml-mso config
  },
  // useTransformers: false,
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
      resolveCSSVariables: true,
      removeInlinedSelectors: true,
      excludedProperties: [],
      preferUnitlessValues: false,
      resolveCalc: true,
    },
    safeClassNames: true,
    sixHex: true,
    shorthand: true,
    shorthand: {
      tags: ['table'],
    },
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
        alt: ''
      }
    },
    remove: ['foo-bar'],
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
  minify: true,
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
    attrName: 'prevent-widows',
    removeWindowPreventionMeasures: false,
    convertEntities: true,
    targetLanguage: 'html',
    hyphens: true,
    minWordCount: 3,
    minCharCount: 20,
    ignore: [
      {
        heads: '{{',
        tails: '}}'
      },
    ],
  },
  beforeCreate(config) {
    // you may update the config object
  },
  async beforeRender({html, config, render}) {
    // must return `html`
    return html
  },
  afterRender({html, config, render}) {
    // must return `html`
    return html
  },
  afterTransformers({html, config, render}) {
    // must return `html`
    return html
  },
  async afterBuild({files, config, render}) {}
}
