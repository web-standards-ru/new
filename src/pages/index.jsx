import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { Layout } from '../components';

const Index = ({ uri }) => (
    <Layout path={uri}>
        <nav>
            <ul>
                <li>
                    <Link to="/articles/">Статьи</Link>
                </li>
                <li>
                    <Link to="/events/">События</Link>
                </li>
                <li>
                    <Link to="/conference/">Конференция</Link>
                </li>
            </ul>
        </nav>
    </Layout>
);

Index.propTypes = {
    uri: PropTypes.string.isRequired,
};

export default Index;
