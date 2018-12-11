import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import logo from '../../images/logo.svg';

const Header = ({ siteTitle, path }) => (
    <header>
        <img src={logo} alt="Веб-стандарты" />
        {path === '/' ? (
            <h1>{siteTitle}</h1>
        ) : (
            <Link to={'/'}>
                {siteTitle}
            </Link>
        )}
    </header>
);

Header.propTypes = {
    siteTitle: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};

export { Header as default };
