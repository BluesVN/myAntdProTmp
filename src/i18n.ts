// i18n.ts
import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

// 导入语言包
import zhCN from './locales/zh-CN.json';
import zhTW from './locales/zh-TW.json';

// 定义资源类型
type Resources = {
  translation: {
    [key: string]: string;
  };
};

// 定义语言类型
type Languages = 'zh-CN'; // 添加其他语言

// 配置 i18next
i18n.use(initReactI18next).init({
  resources: {
    'zh-CN': {
      translation: zhCN as Resource, // 强制类型转换为 i18next.Resource
    },
    'zh-TW': {
      translation: zhTW as Resource, // 强制类型转换为 i18next.Resource
    },
    // 添加其他语言...
  },
  lng: 'zh-CN', // 默认语言
  fallbackLng: 'zh-CN', // 如果找不到对应语言，使用默认语言
  interpolation: {
    escapeValue: false, // React 项目通常不需要 HTML 转义
  },
});

export default i18n;
