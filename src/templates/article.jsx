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
        if (
            typeof date === 'string' &&
            date.length === 10 && // 10 is valid length of format 'YYYY.MM.DD'
            new RegExp('[\\d]{4}.[10]{1}[\\d]{1}.[0-3]{1}[\\d]{1}').test(date)
            // ^ check that "date" is in the format 'YYYY.MM.DD'
        ) {
            return new Date(date.replace(/\./g, '-')).toLocaleDateString(
                'ru-RU',
                localOptions
            );
        } else if (date instanceof Date) {
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
