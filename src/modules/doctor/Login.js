// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import Button from '../../ui/button'
import ImageTile from '../../ui/image/Tile'
import Input from '../../ui/input/Input'
import H3 from '../../ui/typography/H3'
import Icon from '../../ui/icon'
import { level1 } from '../../ui/common/shadows'
import { white } from '../../ui/common/colors'

// App Imports
import { APP_URL } from '../../setup/config/env'
import doctorRoutes from '../../setup/routes/doctor'
import doctorsRoutes from '../../setup/routes/doctors'
import { messageShow, messageHide } from '../common/api/actions'
import { login } from './api/actions'
import AuthCheck from '../auth/AuthCheck'
import userRoutes from "../../setup/routes/doctor";
import home from "../../setup/routes/home";

// Component
class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      user: {
        nric: '',
        password: ''
      }
    }

    // Function bindings
  }

  onChangeNRIC = async (event) => {
    
    const userCopy = {
      nric: event.target.value,
      password: this.state.user.password
    }

    await this.setState({
      user: userCopy
    });

    console.log(this.state.user.nric);
  }

  onChangePassword = async (event) => {

    const userCopy = {
      nric: this.state.user.nric,
      password: event.target.value
    }

    await this.setState({
      user: userCopy
    });

    console.log(this.state.user.password);
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.user.nric == "abc" && this.state.user.password == "password") {
      this.props.history.push(doctorsRoutes.doctorsDashboard.path);
    } else {
      alert('Failed to login.');
    }
  }

  onTryLogin = () => {
    localStorage.setItem('user', this.state.user.nric);
    console.log(localStorage.getItem('user'));

    console.log("Submitted");
  }


  render() {
    const { isLoading, error } = this.props.user

    return (

       <Grid gutter={true} alignCenter={true} style={{ padding: '2em' }}>

        {/* SEO */}
        <Helmet>
          <title>Login to your account - MediChain</title>
        </Helmet>

        {/* Left Content - Image Collage */}
        <GridCell>
            <Grid gutter={true} alignCenter={true}>
                <GridCell justifyCenter={true}>
                    <ImageTile width={700} height={630} shadow={level1} image={`${ APP_URL }/images/hospital_2.jpg`}/>
                </GridCell>
            </Grid>
        </GridCell>

        <GridCell style={{ textAlign: 'center' }}>
          <H3 font="secondary" style={{ marginBottom: '1em' }}>Login to your account</H3>

          {/* Login Form */}
          <form onSubmit={this.onSubmit}>
            <div style={{ width: '25em', margin: '0 auto' }}>
              {/* Email */}
              <Input
                type="text"
                fullWidth={true}
                placeholder="Username"
                required="required"
                name="nric"
                value={this.state.user.nric}
                onChange={this.onChangeNRIC}
                style={{ marginTop: '1em', color: "#333"}}
              />

              {/* Password */}
              <Input
                type="password"
                fullWidth={true}
                placeholder="Password"
                required="required"
                name="password"
                value={this.state.user.password}
                onChange={this.onChangePassword}
                style={{ marginTop: '1em', color: "#333"}}
              />
            </div>

              <div style={{ marginTop: '2em' }}>
                  {/* Signup link */}
                  <Link to={userRoutes.doctorSignup.path}>
                      <Button type="button" style={{ marginRight: '0.5em' }} >Signup</Button>
                  </Link>

                  <Button type="submit" theme="secondary" onClick={this.onTryLogin}>Login</Button>
              </div>



          </form>
        </GridCell>

        {/* Auth Check */}
        <AuthCheck/>
      </Grid>
    )
  }
}

// Component Properties
Login.propTypes = {
  user: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired
}

// Component State
function loginState(state) {
  return {
    user: state.user
  }
}

export default connect(loginState, { login: messageShow, messageHide })(withRouter(Login))
