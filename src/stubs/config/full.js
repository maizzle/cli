module.exports = {
  build: {
    destination: {
      path: 'build_local',
      extension: 'html',
    },
    assets: {
      source: 'src/assets/images',
      destination: 'images',
    },
    browsersync: {
      watch: [
        'src/**/*.*',
        'tailwind.config.js',
      ],
    },
    components: {
      root: './',
    },
    layouts: {
      root: './',
    },
    templates: {
      root: 'src/templates',
      extensions: 'html',
    },
    tailwind: {
      css: 'src/assets/css/main.css',
      config: 'tailwind.config.js',
    },
    posthtml: {
      plugins: [],
      options: {},
      fetch: {},
      outlook: {},
      expressions: {},
    },
    postcss: {
      plugins: [],
    },
    fail: 'silent',
  },
  baseImageURL: '',
  googleFonts: '',
  inlineCSS: {
    enabled: false,
    styleToAttribute: {
      'background-color': 'bgcolor',
      'background-image': 'background',
      'text-align': 'align',
      'vertical-align': 'valign',
    },
    applySizeAttribute: {
      width: [],
      height: [],
    },
    keepOnlyAttributeSizes: {
      width: [],
      height: [],
    },
    preferBgColorAttribute: {
      enabled: false,
    },
    mergeLonghand: false,
    excludedProperties: null,
  },
  purgeCSS: {
    content: [
      'src/layouts/**/*.*',
      'src/partials/**/*.*',
      'src/components/**/*.*',
    ],
    whitelist: [],
    whitelistPatterns: [],
    extractor: /[\w-/:%]+(?<!:)/g,
  },
  removeUnusedCSS: {
    enabled: false,
    whitelist: [],
    backend: [
      { heads: '{{', tails: '}}' },
    ],
    removeHTMLComments: false,
    removeCSSComments: false,
    uglifyClassNames: false,
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
  transformContents: {},
  urlParameters: {
    _options: {
      qs: {
        encode: false
      },
      tags: ['a'],
    }
  },
  prettify: {
    enabled: false,
    unformatted: ['code', 'pre', 'em', 'strong', 'span'],
    indent_inner_html: true,
    indent_char: ' ',
    indent_size: 2,
    sep: '\n',
    ocd: true,
  },
  minify: {
    enabled: false,
    lineLengthLimit: 500,
    removeIndentations: true,
    removeLineBreaks: false,
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
    baseUrl: null,
    breaks: false,
    gfm: true,
    headerIds: true,
    headerPrefix: '',
    highlight: null,
    langPrefix: 'language-',
    mangle: true,
    pedantic: false,
    renderer: null,
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartLists: false,
    smartypants: false,
    tokenizer: null,
    xhtml: false,
  },
}
