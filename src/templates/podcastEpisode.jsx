import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Layout } from '../components';

const PodcastEpisode = props => {
    const {
        data: {
            atomEntry: { title, description, link },
        },
        location,
    } = props;

    return (
        <Layout path={location.pathname}>
            <h1>{title}</h1>
            <audio controls src={link} />
            <div dangerouslySetInnerHTML={{ __html: description }} />
        </Layout>
    );
};
PodcastEpisode.propTypes = {
    data: PropTypes.shape({
        atomEntry: PropTypes.shape({
            title: PropTypes.string,
            link: PropTypes.string,
            description: PropTypes.string,
        }),
    }),
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }),
    '*': PropTypes.string.isRequired,
};

export const pageQuery = graphql`
    query EposodeBySlug($slug: String!) {
        atomEntry(fields: { slug: { eq: $slug } }) {
            title
            link
            description
        }
    }
`;

export { PodcastEpisode as default };
