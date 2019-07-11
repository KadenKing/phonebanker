import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ScriptBuilder from '../script/ScriptBuilder'

const styles = {
  swipeableViewStyle: {
    marginTop: 10
  }
}

export default function CreatePhonebankMenu() {
  const [value, setValue] = React.useState(0)

  function handleChange(event, newValue) {
    setValue(newValue)
  }

  function handleChangeIndex(index) {
    setValue(index)
  }

  return (
    <div >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
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
        index={value}
        onChangeIndex={handleChangeIndex}
        style = {styles.swipeableViewStyle}
      >
        <div dir="x">
          <ScriptBuilder></ScriptBuilder>
        </div>
        <div dir="x">Item Two</div>
        <div dir="x">Item Three</div>
      </SwipeableViews>
    </div>
  )
}
