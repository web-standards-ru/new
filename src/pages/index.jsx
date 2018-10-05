import React from 'react';
import Link from 'gatsby-link';

import {
    Layout
} from '../components';

const Index = () => (
    <Layout>
        <h2>О прооекте</h2>
        <p>
            <Link to="articles/">Статьи</Link>
        </p>
    </Layout>
);

export default Index;
