import React from 'react';
import Link from 'gatsby-link';
import { Layout } from '../components';

const Index = () => (
    <Layout>
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

export { Index as default };
