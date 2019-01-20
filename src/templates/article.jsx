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

    function beautifyDate(date, optionsOfToLocaleDateString) {
        const defaults = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };
        const localOptions = Object.assign(
            {},
            defaults,
            optionsOfToLocaleDateString
        );
        if (/^[0-9]{4}\.[10][0-9]\.([0-2][0-9]|3[0-1])$/.test(date)) {
            const dateObj = new Date(date.replace(/\./g, '-'));
            return dateObj.toLocaleDateString('ru-RU', localOptions);
        }
        if (date instanceof Date) {
            return date.toLocaleDateString('ru-RU', localOptions);
        }
        return date;
    }

    return (
        <Layout>
            <h1>{frontmatter.title}</h1>
            <time>{beautifyDate(frontmatter.date)}</time>
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
