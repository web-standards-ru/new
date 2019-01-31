const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const pathRegex = new RegExp(
    'https://web-standards.ru/podcast/episodes/(\\d+).mp3'
);

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;

    const articles = graphql(`
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
                return Promise.reject(result.errors);
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
        })
        .catch(error => Promise.reject(error));

    const podcast = graphql(`
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
                return Promise.reject(result.errors);
            }

            createPodcastListPage({
                createPage,
                nodes: result.data.allFeedPodcast.edges.map(({ node }) => node),
            });

            result.data.allFeedPodcast.edges.forEach(({ node }) =>
                createPodcastPage({ node, createPage })
            );
        })
        .catch(error => Promise.reject(error));

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
        const slug = pathRegex.exec(url);

        if (slug === null) {
            throw new Error(`Can't create slug for url: ${url}`);
        }

        createNodeField({
            node,
            name: `slug`,
            value: `/podcast/${slug[1]}`,
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
