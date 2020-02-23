module.exports = {
  doctype: 'html',
  language: 'en',
  charset: 'utf-8',
  googleFonts: '',
  baseImageURL: '',
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
    excludedProperties: null,
  },
  cleanup: {
    purgeCSS: {
      content: [
        'src/layouts/**/*.*',
        'src/partials/**/*.*',
        'src/components/**/*.*',
      ],
      whitelist: [],
      whitelistPatterns: [],
    },
    removeUnusedCSS: {
      enabled: false,
    },
    replaceStrings: false,
    keepOnlyAttributeSizes: {
      width: [],
      height: [],
    },
    preferBgColorAttribute: false,
  },
  applyExtraAttributes: {
    table: {
      cellpadding: 0,
      cellspacing: 0,
      role: 'presentation',
    },
    img: {
      alt: ''
    }
  },
  urlParameters: {},
  prettify: {
    enabled: false,
    indent_inner_html: false,
    ocd: true,
  },
  minify: {
    enabled: false,
  },
  browsersync: {
    directory: true,
    notify: false,
    open: false,
    port: 3000,
    tunnel: false,
    watch: [
      'src/layouts/**/*.*',
      'src/partials/**/*.*',
      'src/components/**/*.*',
    ],
  },
  markdown: {
    baseUrl: null,
    breaks: false,
    gfm: true,
    headerIds: false,
    headerPrefix: '',
    highlight: null,
    langPrefix: 'language-',
    mangle: true,
    pendantic: false,
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartLists: false,
    smartypants: false,
    tables: true,
    xhtml: false
  },
  build: {
    destination: {
      path: 'build_local',
      extension: 'html',
    },
    templates: {
      source: 'src/templates',
      filetypes: 'html|njk|nunjucks',
    },
    tailwind: {
      css: 'src/assets/css/main.css',
      config: 'tailwind.config.js',
    },
    assets: {
      source: 'src/assets/images',
      destination: 'images',
    },
  },
}
