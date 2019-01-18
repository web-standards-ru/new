import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Layout } from '../components';

const Article = props => {
    const {
        data: {
            markdownRemark: { frontmatter, html },
        },
        '*': path,
    } = props;

    const github = `https://github.com/web-standards-ru/new/blob/master`;

    function beautyDate(date, opts) {
        let options;
        if (!opts) {
            options = {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            };
        } else {
            options = opts;
        }
        if (typeof date === 'string') {
            const isValidStringDateReg = /[\d]{4}.[10]{1}[\d]{1}.[0-3]{1}[\d]{1}/;
            if (
                date.search(isValidStringDateReg) !== -1 &&
                date.length === 10 // 10 is valid length of format 3000.01.01
            ) {
                return new Date(date.replace(/\./g, '-')).toLocaleDateString(
                    'ru-RU',
                    options
                );
            }
        } else if (typeof date === 'object' && date instanceof Date) {
            return date.toLocaleDateString('ru-RU', options);
        }
        return date;
    }

    return (
        <Layout>
            <h1>{frontmatter.title}</h1>
            <time>{beautyDate(frontmatter.date)}</time>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <a href={`${github}/content/${path}/index.md`}>
                Отредактировать на Гитхабе
            </a>
        </Layout>
    );
};
Article.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.shape({
                title: PropTypes.string,
                date: PropTypes.string,
            }),
        }),
    }),
    '*': PropTypes.string.isRequired,
};

// Needs own personal export
export const pageQuery = graphql`
    query ArticleBySlug($slug: String!) {
        site {
            siteMetadata {
                title
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            excerpt
            html
            frontmatter {
                title
                date
            }
        }
    }
`;

export { Article as default };
