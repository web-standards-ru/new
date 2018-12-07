import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import logo from '../../images/logo.svg';
import './header.css';

const Header = ({ siteTitle, path }) => (
    <header className="header">
        <img src={logo} alt="logo" className="header__logo" />
        {path === '/' ? (
            <h1 className="header__head">{siteTitle}</h1>
        ) : (
            <Link to={'/'} className="header__head">
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
