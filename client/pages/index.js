import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'umi';
import { BOOKS } from '../graphql/book';
import Books from '../components/Books';
import styles from './index.less';

const tags = ['小说', '爱情', '历史', '外国文学', '青春', '励志', '随笔', '传记', '推理', '旅行', '奇幻', '经管'];

export default function () {
  return (
    <Query query={BOOKS} variables={{ limit: 5 }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return (
          <div className={styles.page}>
            <div className={styles.header}>最新图书</div>
            <Books books={data.books} />
            <div className={styles.header}>分类浏览</div>
            <div className={styles.tags}>
              {tags.map(tag => <Link to={`/books?tag=${tag}`} key={tag}><div className={styles.tag}>{tag}</div></Link>)}
            </div>
          </div>
        );
      }}
    </Query>
  );
}
