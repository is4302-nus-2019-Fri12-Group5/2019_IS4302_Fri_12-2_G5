// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../../ui/grid'
import { primary as primaryGradient } from '../../../ui/common/gradients'
import { level1 } from '../../../ui/common/shadows'

// App Imports
import home from '../../../setup/routes/home'
import Logo from './Logo'
import Menu from './Menu'
import MenuItem from './MenuItem'

// Component
const Header = (props) => {
  return (
    <header style={{
      backgroundImage: primaryGradient,
      boxShadow: level1,
      padding: '0 2em',
      height: '5em',
      position: 'fixed',
      left: 0,
      right: 0,
      top: 0
    }}>
      <Grid alignCenter={true} style={{ marginTop: '1.5em' }}>
        <GridCell>
          {/* Logo */}
          <Logo style={{ float: 'left' }}/>

          {/* Left menu */}
          <Menu style={{ float: 'left', marginTop: '0.5em', marginLeft: '2em' }}>
              <MenuItem to={home.howItWorks.path}>How It Works</MenuItem>
          </Menu>
        </GridCell>
      </Grid>
    </header>
  )
}

// Component Properties
Header.propTypes = {
  user: PropTypes.object.isRequired
}

// Component State
function headerState(state) {
  return {
    user: state.user
  }
}

export default withRouter(connect(headerState, {})(Header))
