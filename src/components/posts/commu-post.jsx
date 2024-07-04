import PostsGrid from './posts-grid';
import styles from './commu-post.module.css';

export default function CommuPosts({ postData }) {
  return (
    <section className={styles.sections}>
      <PostsGrid postData={postData} accessToken={postData.accessToken} />
    </section>
  );
}
