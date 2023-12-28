## 环境
本项目使用 antd pro 6.0模板搭建
pnpm -v8.12.1
node -v20.10.0

## 运行
pnpm run start 

## 分支规范
生产：master
预发：pre
测试：dev
功能模块/个人开发分支:从dev拉取， 命名feat/， 或者自己的名字

## 国际化繁简翻译
详看 npm script 中的 translate 脚本，如果运行或打包之前没有国际化文件，需要先执行 translate。
### 例子
pnpm run translate 
pnpm run start:translate 

## 至于动态菜单加载的国际化方案
可以不用运行时 layout 配置的menu，使用BaseLayout中自定义menu标签结构，并用t函数包裹。
后端接口返回的json中menu的name始终用简体中文就行。要想使用运行时配置的方式也不是不行，那就得同时用antdpro内置的方案和规则结构。我选择全部自定义统一用一套方案。


## 通用组件 TODO
Myicon、TableLayout（可选、包含分页器逻辑）、SearchFilter（查询条容器）等



