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
              }
            }
          }
        }
    }`).then(result => {
        if (result.errors) {
            return Promise.reject(result.errors);
        }

        // Create pages for each markdown file.
        result.data.allMarkdownRemark.edges.forEach(({node}) => {

            createPage({
                path: node.fields.slug,
                component: articleTemplate,
                context: {
                    slug: node.fields.slug
                }
            });
        });
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
