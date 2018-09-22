const path = require('path');
const {createFilePath} = require('gatsby-source-filesystem');

exports.createPages = ({actions, graphql}) => {
    const {createPage} = actions;
    const articleTemplate = path.resolve('./src/templates/article.jsx');

    return graphql(`{
        allMarkdownRemark(
          limit: 1000
        ) {
          edges {
            node {
              html
              fields {
                  slug
              }
              frontmatter {
                  date
                  path
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
                slug: node.fields.slug,
                path: `/articles/${node.frontmatter.path}/`,
                component: articleTemplate
            });
        });
    });
};

exports.onCreateNode = ({node, actions, getNode}) => {
    const {createNodeField} = actions;

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({node, getNode});
        createNodeField({
            name: `slug`,
            node,
            value,
        })
    }
};
