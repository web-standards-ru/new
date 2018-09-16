import React from 'react';
import Link from 'gatsby-link';

import {
    Layout
} from '../components';

const Articles = () => (
    <Layout>
        <h2>Статьи</h2>
        <p>
            <Link to="/">Вернуться на главную</Link>
        </p>
    </Layout>
);

export default Articles;
