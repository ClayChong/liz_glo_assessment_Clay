import { createServer } from 'miragejs';

import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', (_, { queryParams }) => {
      const { page, filter, limit } = queryParams;
      let posts = data.posts;

      // todo handle exception for query params

      if(filter) {
        const filterData = filter.split(',')
        posts = data.posts.filter(post => {
          let valid = false;
          post.categories.forEach(category => {
            if(valid) return;

            if (filterData.includes(category.name)) valid = true;
          })

          return valid
        })
      }

      const totalPages = Math.ceil(posts.length / limit)
      const hasMore = totalPages > page;
      posts = posts.slice(page === 1 ? 0 : limit * (page - 1),  limit * page)

      return {
        totalPages,
        hasMore,
        posts
      };
    });

    this.get('/categories', () => {
      const dataSet = new Set();
      data.posts.forEach(post => {
        post.categories.forEach(category => {
          dataSet.add(category.name)
        })
      })

      return {
        categories: Array.from(dataSet)
      }
    })
  },
});
