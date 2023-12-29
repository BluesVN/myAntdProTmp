import '@umijs/max';
import React from 'react';
export type SiderTheme = 'light' | 'dark';

import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  console.log('组件重新渲染');
  const toggleLanguage = () => {
    console.log('切换语言按钮被点击');
    const currentLanguage = i18n.language;
    const newLanguage = currentLanguage === 'zh-CN' ? 'zh-TW' : 'zh-CN';
    console.log(currentLanguage, newLanguage);

    i18n.changeLanguage(newLanguage);
    // setLocale(newLanguage, false)
    console.log('语言已切换为', newLanguage);
  };
  return <button onClick={toggleLanguage}>{t('切换语言')}</button>;
};
