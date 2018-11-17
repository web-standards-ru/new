import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Layout } from '../components/Layout';

const Events = () => {
    const currentDate = new Date();

    return (
        <Layout>
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
                                    <b>{event.summary}</b>
                                    <br />
                                    <p>
                                        Описание: {event.description}
                                        <br />
                                        Место: {event.location}
                                        <br />
                                        Начало: {event.start.toLocaleString()}
                                        <br />
                                        Конец: {event.end.toLocaleString()}
                                        <br />
                                    </p>
                                </li>
                            ))}
                    </ul>
                )}
            />
        </Layout>
    );
};

export { Events as default };
