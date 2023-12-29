import { Footer, AvatarDropdown, AvatarName, LanguageSwitcher } from '@/components';

import type { Settings as LayoutSettings } from '@ant-design/pro-components';

import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import { currentUser as queryCurrentUser } from '@/services/ant-design-pro/api';
import React from 'react';

import { ConfigProvider } from 'antd';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // 导入 i18n 配置
export const rootContainer = (container: React.ReactNode) => {
  return (
    <ConfigProvider>
      <I18nextProvider i18n={i18n}>{container}</I18nextProvider>
    </ConfigProvider>
  );
};

// const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser({
        skipErrorHandler: true,
      });
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    actionsRender: () => [<LanguageSwitcher key="language-switcher" />],
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    // bgLayoutImgList: [],
    // route
    // menu: {
    //   // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
    //   params: {
    //     userId: initialState?.currentUser?.userid,
    //   },
    //   request: async (params, defaultMenuData) => {
    //     // initialState.currentUser 中包含了所有用户信息
    //     const menuData = await fetchMenuData();
    //     return menuData;
    //   },
    // },// 接口可以动态加载菜单,https://pro.ant.design/zh-CN/docs/advanced-menu ,菜单国际化可以使用t包裹或者单独处理
    menuHeaderRender: undefined,
    // 自定义 403 页面
    unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return <>{children}</>;
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
