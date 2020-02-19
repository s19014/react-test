import React from 'react'
import './App.css'
import RatesView from './RatesView'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return <RatesView />
  }
}
export default App
