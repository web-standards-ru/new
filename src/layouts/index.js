import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from '../components/Header';
import './index.css';

const Layout = ({children, data}) => {
    return (
        <div className="layout">
            <Helmet
                title={data.site.siteMetadata.title}
                meta={[
                    {name: 'description', content: data.site.siteMetadata.description},
                    {name: 'keywords', content: data.site.siteMetadata.keywords}
                ]}
            />
            <Header siteTitle={data.site.siteMetadata.title} />
            <main>
                {children()}
            </main>
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.func,
    data: PropTypes.shape({
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                title: PropTypes.string,
                description: PropTypes.string,
                keywords: PropTypes.string
            }).isRequired
        }).isRequired
    }).isRequired
};

export default Layout

export const query = graphql`
    query SiteTitleQuery {
        site {
            siteMetadata {
                title,
                description,
                keywords
            }
        }
    }
`;
