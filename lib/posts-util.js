import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');       // process.cwd() - "cwd" means: "current working directory", as the root folder of the project

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory);       // read all the content of a given folder syncronously - so in a blocking way - it will be an array of filenames in string type
};

export function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, '');                 // removes the file extensoin
  const filePath = path.join(postsDirectory, `${postSlug}.md`);   // path of the post file in the directory of posts
  const fileContent = fs.readFileSync(filePath, 'utf-8');               // read all the content of a given file
  const { data, content } = matter(fileContent);                        // for matter we have to passing a string, which is the "fileContent" - matter will return an object with two properties, "data" (metadata of the post) and "content" (content of the post).
                                                                        // "data" & "content" names are not up to you - these are come from the object created "matter"

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

export function getAllPosts() {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postFile) => getPostData(postFile));

  const sortedPosts = allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1 );

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}

