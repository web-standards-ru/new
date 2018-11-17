import React from 'react';
import Link from 'gatsby-link';

import { Layout } from '../components';

const Index = () => (
    <Layout>
        <h2>О прооекте</h2>
        <ul>
            <li>
                <Link to="/events/">События</Link>
            </li>
            <li>
                <Link to="/articles/">Статьи</Link>
            </li>
        </ul>
    </Layout>
);

export { Index as default };
