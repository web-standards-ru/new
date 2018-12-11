import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import logotype from '../../images/logotype.svg';

const Header = ({ siteTitle, path }) => (
    <header>
        {path === '/' ? (
            <h1>
                <img width="256" src={logotype} alt={siteTitle} />
            </h1>
        ) : (
            <Link to={'/'}>
                <img width="256" src={logotype} alt={siteTitle} />
            </Link>
        )}
    </header>
);

Header.propTypes = {
    siteTitle: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};

export { Header as default };
