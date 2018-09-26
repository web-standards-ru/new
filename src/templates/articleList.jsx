import React from 'react';

export default (props) => {
    const {pageContext: {nodes}} = props;

    return (
        <div className="article-list">
            {nodes.map(node => (
                    <div key={node.fields.slug} className="article-list__item">
                        <a href={node.fields.slug}>{node.fields.slug}</a>
                    </div>
                )
            )}
        </div>
    );
};
