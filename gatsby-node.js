const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;

    const articles = new Promise((resolve, reject) => {
        graphql(`
            {
                allMarkdownRemark(
                    limit: 1000
                    sort: { fields: [frontmatter___date], order: DESC }
                ) {
                    edges {
                        node {
                            fields {
                                slug
                            }
                            frontmatter {
                                title
                                date(formatString: "LL", locale: "ru")
                            }
                        }
                    }
                }
            }
        `)
            .then(result => {
                if (result.errors) {
                    return reject(result.errors);
                }

                createArticleListPage({
                    createPage,
                    nodes: result.data.allMarkdownRemark.edges.map(
                        ({ node }) => node
                    ),
                });

                // Create pages for each markdown file.
                result.data.allMarkdownRemark.edges.forEach(({ node }) =>
                    createArticlePage({ node, createPage })
                );

                resolve();
            })
            .catch(error => reject(error));
    });

    const podcast = new Promise((resolve, reject) => {
        graphql(`
            {
                allFeedPodcast(sort: { fields: [isoDate], order: DESC }) {
                    edges {
                        node {
                            fields {
                                slug
                            }
                            title
                            content
                            summary
                        }
                    }
                }
            }
        `)
            .then(result => {
                if (result.errors) {
                    return reject(result.errors);
                }

                createPodcastListPage({
                    createPage,
                    nodes: result.data.allFeedPodcast.edges.map(
                        ({ node }) => node
                    ),
                });

                result.data.allFeedPodcast.edges.forEach(({ node }) =>
                    createPodcastPage({ node, createPage })
                );

                resolve();
            })
            .catch(error => reject(error));
    });

    return Promise.all([articles, podcast]);
};

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `MarkdownRemark`) {
        createNodeField({
            name: `slug`,
            node,
            value: `/articles${createFilePath({ node, getNode })}`,
        });
    }

    if (node.internal.type === `FeedPodcast`) {
        const { url } = node.enclosure;
        const regex = new RegExp(
            'https://web-standards.ru/podcast/episodes/(\\d+).mp3'
        );
        const slug = regex.exec(url)[1];
        createNodeField({
            node,
            name: `slug`,
            value: `/podcast/${slug}`,
        });
    }
};

/**
 * @param {Object} data
 * @param {Function} data.createPage
 * @param {Object} data.node
 */
function createArticlePage({ createPage, node }) {
    createPage({
        path: node.fields.slug,
        component: path.resolve('./src/templates/article.jsx'),
        context: {
            slug: node.fields.slug,
        },
    });
}

function createPodcastPage({ createPage, node }) {
    createPage({
        path: node.fields.slug,
        component: path.resolve('./src/templates/podcastEpisode.jsx'),
        context: {
            slug: node.fields.slug,
        },
    });
}

/**
 * @param {Object} data
 * @param {Function} data.createPage
 * @param {Array} data.nodes
 */
function createArticleListPage({ createPage, nodes }) {
    createPage({
        path: '/articles',
        component: path.resolve('./src/templates/articleList.jsx'),
        context: {
            nodes,
        },
    });
}

function createPodcastListPage({ createPage, nodes }) {
    createPage({
        path: '/podcast',
        component: path.resolve('./src/templates/podcastList.jsx'),
        context: {
            nodes,
        },
    });
}
