import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from 'react-google-maps';

const API_KEY = 'AIzaSyD1GyzFbb3jtdwoaFNqqMdZQY3DWP_N3h0';

const MapWithMarkers = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap defaultZoom={6} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
        <Marker position={{ lat: -34.397, lng: 150.644 }} />
        {props.locations.map((latlng, i) => (
            <Marker key={i} position={latlng} />
        ))}
    </GoogleMap>
));

class CalendarMap extends Component {
    state = {
        locations: [],
    };

    componentDidMount() {
        const allResponses = [];
        this.props.futureEvents.forEach(event => {
            const [city, country] = event.location.split(', ');

            allResponses.push(
                fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&components=country:${country}&key=${API_KEY}`
                ).then(result => result.json())
            );
        });

        Promise.all(allResponses).then(allResults => {
            const locations = allResults.map(item => {
                if (item.status === 'OK') {
                    return item.results[0].geometry.location;
                } else {
                    throw new Error(item.error_message);
                }
            });

            this.setState({
                locations,
            });
        });
    }

    render() {
        return this.state.locations.length > 0 ? (
            <MapWithMarkers locations={this.state.locations} />
        ) : (
            <div style={{ widht: '100%', height: '400px', background: '#ccc' }}>
                Static map .....
            </div>
        );
    }
}

CalendarMap.propTypes = {
    futureEvents: PropTypes.array,
};
export default CalendarMap;
