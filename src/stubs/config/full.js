/** @type {import('@maizzle/framework').Config} */

module.exports = {
  build: {
    browsersync: {
      directory: true,
      notify: false,
      open: false,
      port: 3000,
      tunnel: false,
      ui: {port: 3001},
      watch: [
        'src/**/*.*',
        'tailwind.config.js',
      ],
    },
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
    layouts: {
      root: './',
      encoding: 'utf8',
      plugins: [],
      strict: false,
      slotTagName: 'block',
      fillTagName: 'block',
      tagName: 'extends',
    },
    templates: {
      source: 'src/templates',
      filetypes: 'html',
      destination: {
        path: 'build_local',
        extension: 'html',
      },
      assets: {
        source: 'src/images',
        destination: 'images',
      },
      omit: [],
      skip: [],
    },
    tailwind: {
      css: 'src/css/tailwind.css',
      config: 'tailwind.config.js',
      compiled: '',
    },
    posthtml: {
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
      fetch: {
        tags: ['fetch', 'remote'],
        attribute: 'url',
        got: {},
        preserveTags: false,
        expressions: {},
        plugins: {
          after(tree) {
            // Your plugin implementation
          },
          before: [
            tree => {
              // Your plugin implementation
            },
            tree => {
              // Your plugin implementation
            }
          ]
        },
      },
      outlook: {
        tag: 'outlook',
      },
      expressions: {},
    },
    postcss: {
      plugins: [],
    },
    fail: 'silent', // or 'verbose'
  },
  applyTransformers: true,
  baseURL: {
    url: '',
    tags: [],
    attributes: {},
    styleTag: true,
    inlineCss: true,
  },
  inlineCSS: {
    styleToAttribute: {
      'vertical-align': 'valign',
    },
    applyWidthAttributes: [],
    applyHeightAttributes: [],
    keepOnlyAttributeSizes: {
      width: [],
      height: [],
    },
    preferBgColorAttribute: false,
    excludedProperties: null,
  },
  shorthandCSS: false,
  removeUnusedCSS: {
    whitelist: [],
    backend: [
      { heads: '{{', tails: '}}' },
    ],
    removeHTMLComments: true,
    removeCSSComments: true,
    removeInlinedSelectors: true,
    uglify: false,
    doNotRemoveHTMLCommentsWhoseOpeningTagContains: ['[if', '[endif'],
  },
  replaceStrings: {},
  removeAttributes: [],
  safeClassNames: {},
  extraAttributes: {
    table: {
      cellpadding: 0,
      cellspacing: 0,
      role: 'presentation',
    },
    img: {
      alt: ''
    }
  },
  filters: {},
  urlParameters: {
    _options: {
      qs: {
        encode: false
      },
      tags: ['a'],
    }
  },
  prettify: {
    space_around_combinator: true, // Preserve space around CSS selector combinators
    newline_between_rules: false, // Remove empty lines between CSS rules
    indent_inner_html: false, // Helps reduce file size
    extra_liners: [],
    unformatted: ['code', 'pre', 'em', 'strong', 'span'],
    indent_char: ' ',
    indent_size: 2,
    sep: '\n',
    ocd: true,
  },
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
  sixHex: true,
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
  events: {
    beforeCreate(config) {},
    beforeRender(html, config) {
      return html
    },
    afterRender(html, config) {
      return html
    },
    afterTransformers(html, config) {
      return html
    },
    afterBuild(files) {},
  }
}
