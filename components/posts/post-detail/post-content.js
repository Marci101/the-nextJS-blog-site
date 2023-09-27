import ReactMarkdown from 'react-markdown';
import { customRenderers } from '../../../lib/markdown-utils';

import PostHeader from './post-header';
import classes from './post-content.module.css';

function PostContent(props) {
  const { post } = props;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  slugOfPost = post.slug;
  
  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
}

export let slugOfPost;

export default PostContent;