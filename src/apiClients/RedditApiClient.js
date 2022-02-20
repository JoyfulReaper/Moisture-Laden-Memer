const { getRequest } = require('./ApiClient.js');
const { simpleEmbed } = require('../util/embedHelper.js');

module.exports = class RedditApiClient {

    async getRisingSubreddit(subreddit, over18 = false, count = 50) {
      return this.#RedditRequest(subreddit, over18, count, 'rising');
    }

    async getHotSubreddit(subreddit, over18 = false, count = 50) {
      return this.#RedditRequest(subreddit, over18, count, 'hot');
    }

    async getTopSubreddit(subreddit, over18 = false, count = 50) {
      return this.#RedditRequest(subreddit, over18, count, 'top');
    }

    async #RedditRequest(subreddit, over18 = false, count = 50, endpoint = 'hot') {
      if (count > 100) {
        count = 100;
      }

      const url = `https://reddit.com/r/${subreddit}/${endpoint}.json?&${count}`;

      try {
         const response = await getRequest(url);

         if (!over18) {
          response.data.children = response.data.children.filter(post => !post.data.over_18);
       }

       return response;
      }
      catch (err) {
        console.error('ReddditApiClient error:' + err);
      }
    }

    getRandomPost(subreddit, onlyImages = true) {
        let randomNumber;
        const count = subreddit.data.children.length;
        let tried = 0;
        do {
          if (tried > count) {
            throw new Error('No valid posts!');
          }

          tried++;
           randomNumber = Math.floor(Math.random() * subreddit.data.children.length);
           const url = subreddit.data.children[randomNumber].data.url;

           if (url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('webp')) {
              onlyImages = false;
            }
        } while (onlyImages);

        return subreddit.data.children[randomNumber].data;
    }

    getRandomEmbed(subreddit) {
        const post = this.getRandomPost(subreddit);

        return simpleEmbed(post.title, `Posted by: ${post.author}`, post.url, `https://reddit.com/${post.permalink}`);
    }
};