import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../Stylesheets/Login.css";
import { login } from "../../actions/securityActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/* This is a login page where the user can input their email address and their password
   to log into BOOKERO. User can also navigate to sign up page if they do not have an
   account yet or go to the forget password page if they forgot their password
*/
class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/home");
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({errors: nextProps.errors})

    if (nextProps.security.validToken) {
      window.location.href = "/home";
    }
  }
  
  onSubmit(e) {
    e.preventDefault();
    const LoginRequest = {
      username: this.state.username,
      password: this.state.password
    };
    
    this.props.login(LoginRequest);
  }
  
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto blue-background login-main">
              <h1 className="display-4 text-center mb-4">Log In</h1>
              {Object.keys(this.state.errors).length > 0 && Object.keys(this.state.errors).map(key => {
                if (key == "message") {
                  return (
                    <div key={key} className="alert alert-success text-center" role="alert">
                      {this.state.errors[key]}
                    </div>
                  )
                } else {
                  return (
                    <div key={key} className="alert alert-danger text-center" role="alert">
                      {this.state.errors[key]}
                    </div>
                  )
                }
                
              })}
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    required
                  />

                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
              <div className="external-links">
                <Link to="/register">Sign Up</Link>
                <Link to="/forget-password">Forget Password</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
