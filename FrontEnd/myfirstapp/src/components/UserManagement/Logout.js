import React, {Component} from 'react';
import { logout } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store from "../../store";

class Logout extends Component {

    render() {
        store.dispatch(logout());
        window.location.href = "/";
        return (
            <div>

            </div>
        );
    }
}
Logout.propTypes = {
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { logout }
)(Logout);