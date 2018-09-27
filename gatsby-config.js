module.exports = {
    siteMetadata: {
        title: 'Веб-стандарты',
        description: 'Сообщество разработчиков «Веб-стандарты»',
        keywords: 'web standards'
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/articles`,
                name: 'articles'
            }
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: []
            }
        }
    ]
};
