import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { Layout } from '../components';

const Index = ({ location }) => (
    <Layout path={location.pathname}>
        <nav>
            <ul>
                <li>
                    <Link to="/articles/">Статьи</Link>
                </li>
                <li>
                    <Link to="/calendar/">Календарь</Link>
                </li>
                <li>
                    <Link to="/conference/">Конференция</Link>
                </li>
            </ul>
        </nav>
    </Layout>
);

Index.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }),
};

export { Index as default };
