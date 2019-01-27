module.exports = {
    siteMetadata: {
        title: 'Веб-стандарты',
        description: 'Сообщество разработчиков «Веб-стандарты»',
        keywords: 'web standards',
    },
    plugins: [
        {
            resolve: 'gatsby-source-ical',
            options: {
                url: 'https://web-standards.ru/calendar.ics',
                name: 'calendar',
            },
        },
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sharp',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/content/articles`,
                name: 'articles',
            },
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: ['gatsby-remark-static-images'],
            },
        },
    ],
};
