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
        {
            resolve: `gatsby-source-atom`,
            options: {
                source: `https://web-standards.ru/podcast/feed/`,
                additionalEntryFields: ['itunes:summary'],
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
