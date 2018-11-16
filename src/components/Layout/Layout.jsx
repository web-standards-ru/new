import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {
    StaticQuery,
    graphql
} from 'gatsby';

import {Header} from '../../components';
import './Layout.css';

const Layout = ({children}) => (
    <StaticQuery
        query={graphql`
            query SiteTitleQuery {
                site {
                  siteMetadata {
                        title,
                        description,
                        keywords
                    }
                }
          }
        `}
        render={data => (
            <>
                <Helmet
                    title={data.site.siteMetadata.title}
                    meta={[
                        {
                            name: 'description',
                            content: data.site.siteMetadata.description
                        },
                        {
                            name: 'keywords',
                            content: data.site.siteMetadata.keywords
                        }
                    ]}
                >
                    <html lang="en"/>
                </Helmet>
                <Header siteTitle={data.site.siteMetadata.title}/>
                <main>
                    {children}
                </main>
            </>
        )}
    />
);

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export {
    Layout as default
};
