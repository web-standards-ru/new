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
            const months = {
                ru: {
                    '01': 'января',
                    '02': 'февраля',
                    '03': 'марта',
                    '04': 'апреля',
                    '05': 'мая',
                    '06': 'июня',
                    '07': 'июля',
                    '08': 'августа',
                    '09': 'сентября',
                    '10': 'октября',
                    '11': 'ноября',
                    '12': 'декабря',
                },
            };
            const stringMonth = months.ru[dateArray[1]];
            return `${dateArray[2]} ${stringMonth} ${dateArray[0]}`;
        } else {
            return stringDate;
        }
    };

    return (
        <Layout>
            <h1>{frontmatter.title}</h1>
            <time>{beautyDate(frontmatter.date)}</time>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <a href={`${github}/${path}/index.md`}>
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
