import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../images/logo.svg';
import './header.css';

const Header = ({ siteTitle }) => (
    <header className="header">
        <img src={logo} alt="logo" className="header__logo" />
        <h1 className="header__head">{siteTitle}</h1>
    </header>
);

Header.propTypes = {
    siteTitle: PropTypes.string.isRequired,
};

export { Header as default };
