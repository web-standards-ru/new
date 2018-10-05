import React from 'react';
import Link from 'gatsby-link';
import {
    StaticQuery,
    graphql
} from 'gatsby';

import {
    Layout
} from '../components';

const ArticlesTemplate = ({data}) => {

    console.log('data: ', data); // eslint-disable-line

    return (
        <Layout>
            <h2>Статьи сайта</h2>
            <p>
                <Link to="/">Вернуться на главную</Link>
            </p>
        </Layout>
    );
};

const Articles = () => {

    return (
        <StaticQuery
            query={graphql`
                query ArticlesQuery {
                    allMarkdownRemark {
                        edges {
                            node {
                                html
                                headings {
                                    depth
                                    value
                                }
                                frontmatter {
                                    title
                                }
                            }
                        }
                    }
                }
            `}
            render={ArticlesTemplate}
        >

        </StaticQuery>
    );
};

export default Articles;
