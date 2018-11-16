import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';

const Article = (props) => {
    const {
        data: {
            markdownRemark: {
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
Article.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.shape({
                title: PropTypes.string,
                date: PropTypes.string
            })
        })
    })
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

export {
    Article as default
}
