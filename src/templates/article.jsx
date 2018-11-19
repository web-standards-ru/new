import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Layout } from '../components';

const Article = props => {
    const {
        data: {
            markdownRemark: { frontmatter, html },
        },
    } = props;

    return (
        <Layout>
            <h1>{frontmatter.title}</h1>
            <time>{frontmatter.date}</time>
            <div dangerouslySetInnerHTML={{ __html: html }} />
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
