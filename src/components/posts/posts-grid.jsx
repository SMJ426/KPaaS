import PostItem from './post-item';
import styles from './posts-grid.module.css';

export default function PostsGrid({ postData, accessToken }) {
  // const { posts, selectedCategory, accessToken } = props;

  if (!postData) {
    return null;
  }

  // let filteredPosts = [];
  // if (selectedCategory && selectedCategory.length > 0) {
  //   filteredPosts = posts.content.filter((post) =>
  //     selectedCategory.includes(post.category_id)
  //   );
  // } else {
  //   filteredPosts = posts.content;
  // }

  const postDataArr = postData.content;

  return (
    <ul className={styles.postsGrid}>
      {postDataArr.map((post) => (
        <PostItem
          key={post.post_id}
          postData={post}
          posts={postData}
          accessToken={accessToken}
        />
      ))}
    </ul>
  );
}
