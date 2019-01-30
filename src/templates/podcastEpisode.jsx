import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Layout } from '../components';

const PodcastEpisode = props => {
    const {
        data: {
            feedPodcast: { title, content, guid },
        },
        location,
    } = props;

    return (
        <Layout path={location.pathname}>
            <h1>{title}</h1>
            <audio controls src={guid} />
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </Layout>
    );
};
PodcastEpisode.propTypes = {
    data: PropTypes.shape({
        feedPodcast: PropTypes.shape({
            title: PropTypes.string,
            content: PropTypes.string,
            guid: PropTypes.string,
        }),
    }),
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }),
    '*': PropTypes.string.isRequired,
};

export const pageQuery = graphql`
    query EposodeBySlug($slug: String!) {
        feedPodcast(fields: { slug: { eq: $slug } }) {
            title
            content
            guid
        }
    }
`;

export { PodcastEpisode as default };
