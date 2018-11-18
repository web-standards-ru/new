import React from 'react';
import {Layout} from '../components';

export default (props) => {
    const {
        pageContext: {
            nodes
        }
    } = props;

    return (
        <Layout>
            <h1>Статьи</h1>
            <ul>
                {nodes.map(node => {
                    return (
                        <li key={node.fields.slug}>
                            <a href={node.fields.slug}>{node.frontmatter.title}</a>, <time>{node.frontmatter.date}</time>
                        </li>
                    );
                })}
            </ul>
        </Layout>
    );
};
