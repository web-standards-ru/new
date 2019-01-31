import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from '../components';

const PodcastList = props => {
    const {
        pageContext: { nodes },
        location,
    } = props;

    return (
        <Layout path={location.pathname}>
            <h1>Подкаст</h1>
            <ul>
                {nodes.map(node => {
                    return (
                        <li key={node.fields.slug}>
                            <a href={node.fields.slug}>{node.title}</a>
                            <div>{node.itunes_summary._}</div>
                        </li>
                    );
                })}
            </ul>
        </Layout>
    );
};

PodcastList.propTypes = {
    pageContext: PropTypes.shape({
        nodes: PropTypes.arrayOf(
            PropTypes.shape({
                fields: PropTypes.shape({
                    slug: PropTypes.string,
                }),
                title: PropTypes.string,
                itunes_summary: PropTypes.shape({
                    _: PropTypes.string,
                }),
            })
        ),
    }),
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }),
};

export { PodcastList as default };
