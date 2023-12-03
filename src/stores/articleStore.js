/**
 * @typedef Article
 *
 * @property {string} title
 * @property {string} cover
 * @property {string} abstract
 * @property {string} author
 * @property {string} createdAt
 * @property {string} content
 */

/**
 * @type {Array<Article & {id: number}>}
 */
const articleList = JSON.parse(localStorage.getItem('articleList') || '[]')

function useArticleStore () {
  /**
   * 提交文章
   * @param {Article} article
   */
  function addArticle (article) {
    article.id = articleList.length + 1
    articleList.push(article)
    localStorage.setItem('articleList', JSON.stringify(articleList))
  }

  function getArticle (id) {
    return articleList.find(article => article.id === id)
  }

  return {
    articleList,
    addArticle,
    getArticle
  }
}

export default useArticleStore
