import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from '../components';

const ArticleList = props => {
    const {
        pageContext: { nodes },
    } = props;

    function toIOS8601(strDate) {
        return new Date(strDate.replace(/\./g, '-'));
    }

    return (
        <Layout>
            <h1>Статьи</h1>
            <ul>
                {nodes.map(node => {
                    return (
                        <li key={node.fields.slug}>
                            <a href={node.fields.slug}>
                                {node.frontmatter.title}
                            </a>
                            ,{' '}
                            <time>
                                {toIOS8601(
                                    node.frontmatter.date
                                ).toLocaleDateString('ru-RU', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </time>
                        </li>
                    );
                })}
            </ul>
        </Layout>
    );
};

ArticleList.propTypes = {
    pageContext: PropTypes.shape({
        nodes: PropTypes.arrayOf(
            PropTypes.shape({
                fields: PropTypes.shape({
                    slug: PropTypes.string,
                }),
                frontmatter: PropTypes.shape({
                    title: PropTypes.string,
                    date: PropTypes.string,
                }),
            })
        ),
    }),
};

export { ArticleList as default };
