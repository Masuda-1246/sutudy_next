import fs from 'fs';
import matter from 'gray-matter';
import Pagination from '../../components/Pagination';
import PostCard from '../../components/PostCard';

const PAGE_SIZE = 3;

const range = (start, end, length = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i);

  export async function getStaticPaths() {
    const files = fs.readdirSync('posts');
    const count = files.length;

    const paths = range(1, Math.ceil(count / PAGE_SIZE)).map((i) => ({
      params: { page: i.toString() },
    }));

    return {
      paths,
      fallback: false,
    };
  }

export async function getStaticProps({ params }) {
  const current_page = params.page;
  const files = fs.readdirSync('posts');
  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fileContent = fs.readFileSync(`posts/${fileName}`, 'utf-8');
    const { data } = matter(fileContent);

    return {
      frontMatter: data,
      slug,
    };
  });

  const pages = range(1, Math.ceil(posts.length / PAGE_SIZE));

  const sortedPosts = posts.sort((postA, postB) =>
    new Date(postA.frontMatter.date) > new Date(postB.frontMatter.date) ? -1 : 1
  );

  const slicedPosts = sortedPosts.slice(
    PAGE_SIZE * (current_page - 1),
    PAGE_SIZE * current_page
  );

  return {
    props: {
      posts: slicedPosts,
      pages,
      current_page,
    },
  };
}

const Page = ({ posts, pages, current_page }) => {
  return (
    <div className="my-8">
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <Pagination pages={pages} current_page={current_page} />
    </div>
  );
};

export default Page;
