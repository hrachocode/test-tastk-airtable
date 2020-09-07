import React, {Component} from 'react';
import PropTypes from 'prop-types';
import enroute from 'react-enroute';
import invariant from 'invariant';

export class Router extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        location: PropTypes.string.isRequired
    }

    constructor (props) {
        super(props);

        this.routes = {};

        this.rrouter = enroute(this.routes);
    }

    render () {
        const { location } = this.props;
        invariant(location, '<Router/> needs a location to work');
        return this.router(location)
    }
}