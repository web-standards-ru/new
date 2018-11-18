import React from 'react';
import {graphql} from 'gatsby';
import {Layout} from '../components';

export default (props) => {
    const {
        data: {
            markdownRemark: {
                frontmatter,
                html
            }
        }
    } = props;

    return (
        <Layout>
            <h1>{frontmatter.title}</h1>
            <time>{frontmatter.date}</time>
            <div dangerouslySetInnerHTML={{__html: html}} />
        </Layout>
    );
};

export const pageQuery = graphql`
    query ArticleBySlug($slug: String!) {
        site {
            siteMetadata {
                title
            }
        }
        markdownRemark(
            fields: {
                slug: {
                    eq: $slug
                }
            }
        ) {
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
