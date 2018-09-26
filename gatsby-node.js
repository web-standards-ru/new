const path = require('path');
const {createFilePath} = require('gatsby-source-filesystem');

exports.createPages = ({actions, graphql}) => {
    const {createPage} = actions;
    const articleTemplate = path.resolve('./src/templates/article.jsx');

    return graphql(`{
        allMarkdownRemark(
          limit: 1000,
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                date
              }
            }
          }
        }
    }`).then(result => {
        if (result.errors) {
            return Promise.reject(result.errors);
        }

        createArticleListPage({
                createPage,
                nodes: result.data.allMarkdownRemark.edges.map(({node}) => node)
            }
        );

        // Create pages for each markdown file.
        result.data.allMarkdownRemark.edges.forEach(
            ({node}) => createArticlePage({node, createPage})
        );
    }).catch((error) => Promise.reject(error));
};

exports.onCreateNode = ({node, actions, getNode}) => {
    const {createNodeField} = actions;

    if (node.internal.type === `MarkdownRemark`) {
        createNodeField({
            name: `slug`,
            node,
            value: `/articles${createFilePath({node, getNode})}`
        });
    }
};

/**
 * @param {Object} data
 * @param {Function} data.createPage
 * @param {Object} data.node
 */
function createArticlePage({createPage, node}) {
    createPage({
        path: node.fields.slug,
        component: path.resolve('./src/templates/article.jsx'),
        context: {
            slug: node.fields.slug
        }
    });
}

/**
 * @param {Object} data
 * @param {Function} data.createPage
 * @param {Array} data.nodes
 */
function createArticleListPage({createPage, nodes}) {
    createPage({
        path: '/articles',
        component: path.resolve('./src/templates/articleList.jsx'),
        context: {
            nodes
        }
    });
}
