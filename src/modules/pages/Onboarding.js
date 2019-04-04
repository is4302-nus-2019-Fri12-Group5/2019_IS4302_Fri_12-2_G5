// Imports
import React, { PureComponent } from 'react'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H1, H6 } from '../../ui/typography'
import Modal from '../../ui/modal/Modal'
import Button from '../../ui/button'
import { white } from '../../ui/common/colors'
import { textLevel1 } from '../../ui/common/shadows'

// App Imports
import { APP_URL } from '../../setup/config/env'

// Component
class Onboarding extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      currentStep: 0
    }
  }

  componentDidMount() {
    const onboarding = window.localStorage.getItem('onboarding')
    if (!onboarding) {
      this.toggleVisible(true)

      window.localStorage.setItem('onboarding', 1)
    }
  }

  toggleVisible = (visible) => {
    this.setState({
      visible
    })
  }

  nextStep = () => {
    this.setState(state => ({
      currentStep: state.currentStep + 1
    }))
  }

  close = () => {
    this.toggleVisible(false)
  }

  render() {
    const steps = [
      /* 1. Welcome to MediChain */
      <Grid alignCenter={true} style={{ height: '100%', textAlign: 'center', color: white }}>
        {/* Left - Headline and info */}
        <GridCell>
          <H1 font="secondary" style={{ textShadow: textLevel1 }}>Welcome to MediChain</H1>

          <H6 style={{ marginTop: '0.5em' }}>Interactive telemedicine Platform!</H6>

          <Button theme="primary" style={{ marginTop: '1.5em' }} onClick={this.nextStep}>Next</Button>
        </GridCell>

        {/* Right - Image */}
        <GridCell>
          <img src={`${ APP_URL }/images/onboarding_1.png`} alt="collage" title="products collage" style={{ width: 400 }}/>
        </GridCell>
      </Grid>,

      /* 2. For Men */
      <Grid alignCenter={true} style={{ height: '100%', textAlign: 'center', color: white }}>
        {/* Left - Image */}
        <GridCell>
          <img src={`${ APP_URL }/images/onboarding_2.jpg`} alt="collage" title="products collage" style={{ width: 400 }}/>
        </GridCell>

        {/* Right - Headline and info */}
        <GridCell>
          <H1 font="secondary" style={{ textShadow: textLevel1 }}>For Patient</H1>

          <H6 style={{ marginTop: '0.5em' }}>Gain access to professional <br/> doctors and pay online!</H6>

          <Button theme="primary" style={{ marginTop: '1.5em' }} onClick={this.nextStep}>Next</Button>
        </GridCell>
      </Grid>,

      /* 3. For Women */
      <Grid alignCenter={true} style={{ height: '100%', textAlign: 'center', color: white }}>
        {/* Left - Headline and info */}
        <GridCell>
          <H1 font="secondary" style={{ textShadow: textLevel1 }}>For Doctor</H1>

          <H6 style={{ marginTop: '0.5em' }}>Save more patients <br/> and earn more!</H6>

          <Button theme="primary" style={{ marginTop: '1.5em' }} onClick={this.nextStep}>Next</Button>
        </GridCell>

        {/* Right - Image */}
        <GridCell>
          <img src={`${ APP_URL }/images/onboarding_3.png`} alt="collage" title="products collage" style={{ width: 400 }}/>
        </GridCell>
      </Grid>,

      /* 4. Fix me up */
      <Grid alignCenter={true} style={{ height: '100%', textAlign: 'center', color: white }}>
        {/* Center - Headline and info */}
        <GridCell>
          <H1 font="secondary" style={{ textShadow: textLevel1 }}>Subscribe to MediChain!</H1>

          <H6 style={{ marginTop: '0.5em' }}> Take action! </H6>

          <Button theme="primary" style={{ marginTop: '1.5em' }} onClick={this.close}>Start</Button>
        </GridCell>
      </Grid>
    ]

    return (
      <div>
        {/* Modal */}
        <Modal visible={this.state.visible}>
          {steps[this.state.currentStep]}
        </Modal>
      </div>
    )
  }
}

export default Onboarding
