import Image from 'next/image';
import classes from '../components/posts/post-detail/post-content.module.css';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

import { slugOfPost } from '../components/posts/post-detail/post-content.js';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

export const customRenderers = {
  /*img(image) {
    return (
      <Image
        src={`/image/posts/${slug}/${image.src}`}
        alt={image.alt}
        width={600}
        height={300}
      />
    );
  },*/
  p(paragraph) {
    const { node } = paragraph;

    if (node.children[0].tagName === 'img') {
      const image = node.children[0];

      return (
        <div className={classes.image}>
          <Image
            src={`/images/posts/${slugOfPost}/${image.properties.src}`}
            alt={image.properties.alt}
            width={600}
            height={300}
          />
        </div>
      );
    }

    return <p>{paragraph.children}</p>;
  },

  code(code) {
    const { className, children } = code;
    const language = className.split('-')[1]; // className is something like language-js => We need the "js" part here
    return (
      <SyntaxHighlighter
        style={atomDark}
        language={language}
        children={children}
      />
    );
  },
};