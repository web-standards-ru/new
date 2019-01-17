import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { Layout } from '../components';

const NotFound = ({ uri }) => (
    <Layout path={uri}>
        <h2>Страница не найдена</h2>
        <p>
            <Link to="/">Вернуться на главную</Link>
        </p>
    </Layout>
);

NotFound.propTypes = {
    uri: PropTypes.string.isRequired,
};

export default NotFound;
