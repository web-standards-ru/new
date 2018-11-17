import React from 'react';
import Link from 'gatsby-link';

import { Layout } from '../components';

const NotFound = () => (
    <Layout>
        <h2>Страница не найдена</h2>
        <p>
            <Link to="/">Вернуться на главную</Link>
        </p>
    </Layout>
);

export { NotFound as default };
