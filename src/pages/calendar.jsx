import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { Layout } from '../components/Layout';

import CalendarMap from '../components/CalendarMap';

const currentDate = new Date();

const getFutureEvents = calendar =>
    calendar.reduce((calendar, event) => {
        event = event.node;
        event.dtstamp = new Date(event.dtstamp);
        event.start = new Date(event.start);
        event.end = new Date(event.end);

        if (event.end < currentDate) {
            return calendar;
        }

        return [...calendar, event];
    }, []);

const Calendar = ({ location }) => (
    <Layout path={location.pathname}>
        <StaticQuery
            query={graphql`
                query CalendarQuery {
                    allIcal(
                        filter: { sourceInstanceName: { eq: "calendar" } }
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
            render={({ allIcal: { edges: calendar } }) => {
                const futureEvents = getFutureEvents(calendar);
                return (
                    <>
                        <h1>Календарь</h1>
                        <CalendarMap futureEvents={futureEvents.slice(0, 2)} />
                        <ul>
                            {futureEvents.map(event => (
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
                                            Конец: {event.end.toLocaleString()}
                                        </li>
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </>
                );
            }}
        />
    </Layout>
);

Calendar.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }),
};

export { Calendar as default };
