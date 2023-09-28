import Head from 'next/head';
import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '../../lib/posts-util';

function PostDetailPage(props) {
  return (
    <>
      <Head>
        <title>{props.post.title}</title>
        <meta
          name='description'
          content={props.post.excerpt}
        />
      </Head>
      <PostContent post={props.post}/>
    </>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;
  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600
  };
}

export function getStaticPaths() {       // "getStaticPath" >> for the purpose to let NextJS know which concrete "slug" values it should pregenerate!
  const postFilenames = getPostsFiles();
  const slugs = postFilenames.map((fileName) => ( fileName.replace(/\.md$/, '') ));

  return {
    paths: slugs.map((slugData) => ({ params: { slug: slugData } })),     // we are pregenerating all paths in advance with all "slugs"
    fallback: false
  };
}

export default PostDetailPage;