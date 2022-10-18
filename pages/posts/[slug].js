import fs from 'fs';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import remarkPrism from 'remark-prism';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { createElement, Fragment } from 'react';
import Link from 'next/link';


const MyImage = ({ src, alt }) => {
  return <Image src={src} alt={alt} width="1200" height="700" />;
};

const MyLink = ({ children, href }) => {
  if (href === '') href = '/';
  return href.startsWith('/') || href.startsWith('#') ? (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

const toReactNode = (content) => {
  return unified()
    .use(rehypeParse, {
      fragment: true,
    })
    .use(rehypeReact, {
      createElement,
      Fragment,
      components: {
        a: MyLink,
        img: MyImage,
      },
    })
    .processSync(content).result;
};


export async function getStaticProps({ params }) {
  const file = fs.readFileSync(`posts/${params.slug}.md`, 'utf-8');
  const { data, content } = matter(file);

  const result = await unified()
  .use(remarkParse)
  .use(remarkPrism, {
    /* options */
  })
  .use(remarkToc, {
    heading: '目次',
  })
  .use(remarkRehype)
  .use(rehypeStringify)
  .process(content);

  return {
    props: { frontMatter: data, content: result.toString(), slug: params.slug },
  };
}

export async function getStaticPaths() {
  const files = fs.readdirSync('posts');
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ''),
    },
  }));
  console.log('paths:', paths);
  return {
    paths,
    fallback: false,
  };
}

const Post = ({ frontMatter, content }) => {
  return (
    <>
      <NextSeo
        title={frontMatter.title}
        description={frontMatter.description}
        openGraph={{
          type: 'website',
          url: `http:localhost:3000/posts/${frontMatter.slug}`,
          title: frontMatter.title,
          description: frontMatter.description,
          images: [
            {
              url: `https://localhost:3000/${frontMatter.image}`,
              width: 1200,
              height: 700,
              alt: frontMatter.title,
            },
          ],
        }}
      />
      <div className="prose prose-lg max-w-none">
      <div className="border">
        <Image
          src={`/${frontMatter.image}`}
          width={1200}
          height={700}
          alt={frontMatter.title}
        />
      </div>
      <h1 className="mt-12">{frontMatter.title}</h1>
      <span>{frontMatter.date}</span>
      {toReactNode(content)}
    </div>
    </>
    
  );
};

export default Post;