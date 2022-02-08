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
    },
    layouts: {
      root: './',
    },
    templates: {
      filetypes: 'html',
      source: 'src/templates',
      destination: {
        path: 'build_local',
        extension: 'html',
      },
      assets: {
        source: 'src/images',
        destination: 'images',
      },
    },
    tailwind: {
      css: 'src/css/tailwind.css',
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
  baseURL: '',
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
    mergeLonghand: false,
    excludedProperties: null,
  },
  removeUnusedCSS: {
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
    unformatted: ['code', 'pre', 'em', 'strong', 'span'],
    indent_inner_html: true,
    indent_char: ' ',
    indent_size: 2,
    sep: '\n',
    ocd: true,
  },
  minify: {
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
    root: './',
    encoding: 'utf8',
    markdownit: {},
    plugins: [],
  },
  // events: {
  //   beforeCreate(config) {},
  //   beforeRender(html, config) {
  //     return html
  //   },
  //   afterRender(html, config) {
  //     return html
  //   },
  //   afterTransformers(html, config) {
  //     return html
  //   },
  //   afterBuild(files) {},
  // }
}
