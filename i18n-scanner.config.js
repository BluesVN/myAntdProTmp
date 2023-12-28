const path = require('path');

module.exports = {
  input: [
    'src/**/*.{js,jsx,tsx}',
    // 不需要扫描的文件加!
    '!src/i18n/**',
    '!**/node_modules/**',
    // 其他需要扫描的文件...
  ],
  output: './',
  // 提取规则配置
  options: {
    // 正则表达式用于匹配待提取的文本
    lexers: {
      tsx: ['JsxLexer'],
    },
    debug: true,
    removeUnusedKeys: false, // Set to true to remove unused translation keys from i18n resource files.
    func: {
      list: ['t'],
      extensions: ['.js', '.jsx', '.tsx'],
    },
    lngs: ['zh-CN', 'zh-TW'], // 提取中文
    defaultLng: 'zh-CN',
    resource: {
      loadPath: path.resolve(__dirname, 'src/locales/{{lng}}.json'),
      savePath: path.resolve(__dirname, 'src/locales/{{lng}}.json'),
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: false, // 控制是否使用命名空间分隔符。当设置为 false 时，表示不使用命名空间，所有的翻译键将是扁平的，没有命名空间的概念。例如，如果有两个文件分别包含 t('hello.world') 和 t('foo.bar')，提取后的翻译键会直接是 'hello.world' 和 'foo.bar'。
    keySeparator: false, // 控制是否使用键分隔符。当设置为 false 时，表示不使用键分隔符，提取后的翻译键将直接是包含所有层级信息的字符串。例如，对于 t('hello.world')，提取后的翻译键会是 'hello.world'。
    interpolation: {
      // 控制插值的前缀和后缀。例如，如果插值的前缀设置为 {{，后缀设置为 }}，那么在扫描时会认识形如 t('message', { count: {{count}} }) 的语法，并将 {{count}} 视为一个插值标记，而不是翻译键的一部分。
      prefix: '{{',
      suffix: '}}',
    },
  },
};
