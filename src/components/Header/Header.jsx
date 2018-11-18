import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ siteTitle }) => (
    <header className="header">
        <h1>{siteTitle}</h1>
    </header>
);

Header.propTypes = {
    siteTitle: PropTypes.string.isRequired,
};

export { Header as default };
