import Head from 'next/head';
import AllPosts from '../../components/posts/all-posts';

import { getAllPosts } from '../../lib/posts-util';

function AllPostsPage(props) {
  return (
    <>
      <Head>
        <meta
          name='description'
          content='A list of all web development related blog posts!'
        />
      </Head>
      <AllPosts posts={props.posts} />
    </>
  );
}

export function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    }
  };
}

export default AllPostsPage;