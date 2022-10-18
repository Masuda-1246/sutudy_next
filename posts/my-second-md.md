---
title: 'Next.jsでmarkdownブログを構築'
date: '2022-07-21'
description: 'Next.jsでmarkdownファイルを利用したブログの構築手順を解説しています。'
image: nextjs.png
---

## 目次

Next.js を利用して Markdown のブログサイトを一から作成します。

## Table of Contents

Next.js を利用して Markdown のブログサイトを一から作成します。

Next.js を使って Markdown のブログサイトの構築を一から行なっていきます。

## Next.js の準備

### プロジェクトの作成

npx create-next-app コマンドを利用して Next.js プロジェクトの作成を行います。

```js:js
import Layout from '../components/layout';
import '../styles/globals.css';
import '../styles/prism.css';
import SEO from '../next-seo.config';
import { DefaultSeo } from 'next-seo';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
```
![Next.jsのWelcomeページ](http://localhost:3000/nextjs.png)