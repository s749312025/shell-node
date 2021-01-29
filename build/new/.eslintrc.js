module.export = {
  rout: true,
  env: {
    node: true
  },
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module"
  },
  extends: [
    'plugin:vue/essential'
  ],
  plugins: [
    'vue'
  ],
  // 添加自定义规则
  rules: {
    "no-console": "off",
    "no-extra-semi": "off"
  },
  parserOption: {
    parser: "babel-eslint"
  }
}