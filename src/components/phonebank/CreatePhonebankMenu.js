import React, {Component} from 'react'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Script from '../script/Script'

const styles = {
  swipeableViewStyle: {
    marginTop: 10
  }
}

export default class CreatePhonebankMenu extends Component {
  state = {
    phonebank: {
      script: 'yyy',
      questions: [],
      phonebankers: [],
    },
    tabValue: 0
  }

  handleChange = (event, newValue) => {
    this.setState({tabValue: newValue})
  }

  handleChangeIndex = (index) => {
    this.setState({tabValue: index})
  }

  handleScriptChange = (newScript) => {
    this.setState((prevState) => {
      let phonebank = Object.assign({}, prevState.script)
      phonebank.script = newScript
      return { phonebank }
    })
  }

  render() {
    const {tabValue, phonebank} = this.state
  return (
    <div >
      <AppBar position="static" color="default">
        <Tabs
          value={tabValue}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Questions" />
          <Tab label="Phonebankers" />
          <Tab label="Time" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis="x"
        index={tabValue}
        onChangeIndex={this.handleChangeIndex}
        style = {styles.swipeableViewStyle}
      >
        <div dir="x">
          <Script text={phonebank.script} onScriptChange={this.handleScriptChange}></Script>
        </div>
        <div dir="x">Item Two</div>
        <div dir="x">Item Three</div>
      </SwipeableViews>
    </div>
  )
}
}
