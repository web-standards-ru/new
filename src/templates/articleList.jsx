import React from 'react';
import PropTypes from 'prop-types';

const ArticleList = (props) => {
    const {pageContext: {nodes}} = props;

    return (
        <ul className="article-list">
            {nodes.map(node => {
                    return (
                        <li key={node.fields.slug} className="article-list__item">
                            <a href={node.fields.slug}>{node.frontmatter.title}</a> |
                            {node.frontmatter.date}
                        </li>
                    );
                })
            }
        </ul>
    );
};

ArticleList.propTypes = {
    pageContext: PropTypes.shape({
        nodes: PropTypes.arrayOf(PropTypes.shape({
            fields: PropTypes.shape({
                slug: PropTypes.string
            }),
            frontmatter: PropTypes.shape({
                title: PropTypes.string,
                date: PropTypes.string
            })
        }))
    })
};

export {
    ArticleList as default
}
