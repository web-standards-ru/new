import React from 'react';

export default (props) => {
    const {
        pageContext: {
            nodes
        }
    } = props;

    return (
        <ul className="article-list">
            {nodes.map(node => {
                    return (
                        <li key={node.fields.slug} className="article-list__item">
                            <a href={node.fields.slug}>{node.frontmatter.title}</a> |
                            {node.frontmatter.date}
                        </li>
                    );
                }
            )}
        </ul>
    );
};
