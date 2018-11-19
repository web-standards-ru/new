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
                name: 'events',
            },
        },
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sharp',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/articles`,
                name: 'articles',
            },
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    'gatsby-remark-copy-linked-files',
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            backgroundColor: 'transparent',
                            linkImagesToOriginal: false,
                            showCaptions: true,
                        },
                    },
                ],
            },
        },
    ],
};
