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

    /**
     *
     * @param {string} stringDate, example = '3000.01.01'
     * @returns {string} beautyDate
     * or
     * @returns {string} stringDate if date isn't in format YYYY.MM.DD
     */
    const beautyDate = function(stringDate) {
        const isValidDateReg = /[\d]{4}.[10]{1}[\d]{1}.[0-3]{1}[\d]{1}/;
        if (
            stringDate.search(isValidDateReg) !== -1 &&
            stringDate.length === 10 // 10 is valid length of format 3000.01.01
        ) {
            const dateArray = stringDate.split('.');
            const d = new Date(dateArray[0], dateArray[1], dateArray[2]);
            return d.toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
        } else {
            return stringDate;
        }
    };

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
