import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { Layout } from '../components/Layout';

const Events = ({ uri }) => {
    const currentDate = new Date();

    return (
        <Layout path={uri}>
            <StaticQuery
                query={graphql`
                    query EventsQuery {
                        allIcal(
                            filter: { sourceInstanceName: { eq: "events" } }
                            sort: { order: ASC, fields: [start] }
                        ) {
                            edges {
                                node {
                                    start
                                    end
                                    summary
                                    description
                                    location
                                }
                            }
                        }
                    }
                `}
                render={({ allIcal: { edges: events } }) => (
                    <>
                        <h1>События</h1>
                        <ul>
                            {events
                                .reduce((events, event) => {
                                    event = event.node;
                                    event.dtstamp = new Date(event.dtstamp);
                                    event.start = new Date(event.start);
                                    event.end = new Date(event.end);

                                    if (event.end < currentDate) {
                                        return events;
                                    }

                                    return [...events, event];
                                }, [])
                                .map(event => (
                                    <li
                                        key={`${
                                            event.summary
                                        } Date: ${event.start.toLocaleString()}`}
                                    >
                                        <h2>
                                            <a href={event.description}>
                                                {event.summary}
                                            </a>
                                        </h2>
                                        <ul>
                                            <li>Место: {event.location}</li>
                                            <li>
                                                Начало:{' '}
                                                {event.start.toLocaleString()}
                                            </li>
                                            <li>
                                                Конец:{' '}
                                                {event.end.toLocaleString()}
                                            </li>
                                        </ul>
                                    </li>
                                ))}
                        </ul>
                    </>
                )}
            />
        </Layout>
    );
};

Events.propTypes = {
    uri: PropTypes.string.isRequired,
};

export default Events;
