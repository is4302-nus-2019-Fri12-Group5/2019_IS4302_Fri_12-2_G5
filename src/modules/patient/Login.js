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
import home from '../../setup/routes/home'
import { APP_URL } from '../../setup/config/env'
import patientRoutes from '../../setup/routes/patient'
import patientsRoutes from '../../setup/routes/patients'
import { messageShow, messageHide } from '../common/api/actions'
import { login } from './api/actions'
import AuthCheck from '../auth/AuthCheck'

// Component
class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      user: {
        username: '',
        password: '',
      }
    }

    // Function bindings
  }

  onChange = (event) => {
    let user = this.state.user
    user[event.target.name] = event.target.value

    this.setState({
      user
    })
  }

  /*onSubmit = (event) => {
    event.preventDefault()

    this.props.messageShow('Logging in, please wait...')

    this.props.login(this.state.user)
      .then(response => {
        if (this.props.user.error && this.props.user.error.length > 0) {
          this.props.messageShow(this.props.user.error)

          window.setTimeout(() => {
            this.props.messageHide()
          }, 5000)
        } else {
          this.props.messageHide()
        }
      })
      .catch(error => {
        this.props.messageShow(this.props.user.error)

        window.setTimeout(() => {
          this.props.messageHide()
        }, 5000)
      })
  }*/

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.user.username == "bcd" && this.state.user.password == "password") {
      this.props.history.push(patientsRoutes.patientsDashboard.path);
    } else {
      alert('Failed to login.');
    }
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
                    <ImageTile width={700} height={630} shadow={level1} image={`${ APP_URL }/images/hospital_1.jpg`}/>
                </GridCell>
            </Grid>
        </GridCell>

        <GridCell style={{ textAlign: 'center' }}>
          <H3 font="secondary" style={{ marginBottom: '1em' }}>Login to your account</H3>

          {/* Login Form */}
          <form onSubmit={this.onSubmit}>
            <div style={{ width: '25em', margin: '0 auto' }}>
              {/* Username */}
              <Input
                type="username"
                fullWidth={true}
                placeholder="Username"
                required="required"
                name="username"
                value={this.state.user.username}
                onChange={this.onChange}
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
                onChange={this.onChange}
                style={{ marginTop: '1em', color: "#333"}}
              />
            </div>

            {/*<div style={{ marginTop: '2em' }}>*/}
              {/*/!* Signup link *!/*/}
              {/*<Link to={userRoutes.signup.path}>*/}
                {/*<Button type="button" style={{ marginRight: '0.5em' }}>Signup</Button>*/}
              {/*</Link>*/}

              {/*/!* Form submit *!/*/}
              {/*<Button type="submit" theme="secondary" disabled={isLoading}>*/}
                {/*Login*/}
                {/*<Icon size={1.2} style={{ color: white }}>navigate_next</Icon></Button>*/}
            {/*</div>*/}

            <div style={{ marginTop: '2em' }}>
              {/* Signup link */}
              <Link to={patientRoutes.signup.path}>
                <Button type="button" style={{ marginRight: '0.5em' }}>Signup</Button>
              </Link>

              <Button type="submit" theme="secondary">Login</Button>
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

export default connect(loginState, { login, messageShow, messageHide })(withRouter(Login))
