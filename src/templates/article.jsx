import React from 'react';
import {graphql} from 'gatsby';

export default (props) => {
    console.log('props: ', props); // eslint-disable-line

    const {
        data: {
            markdownRemark: {
                excerpt,
                frontmatter,
                html
            }
        }
    } = props;

    return (
        <div className="article">
            <h1 className="article__title">{frontmatter.title}</h1>
            <div className="article__date">{frontmatter.date}</div>
            <div
                className="article__content"
                dangerouslySetInnerHTML={{__html: html}}
            />
        </div>
    );
};

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
