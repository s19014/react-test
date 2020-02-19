import React from 'react'
import './App.css'

class RatesView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      error: null,
      eurRates: [],
      eurBase: '',
      eurDate: '',
      usdRates: [],
      usdBase: '',
      usdDate: ''
    }
  }

  componentDidMount () {
    window
      .fetch('https://api.exchangeratesapi.io/latest')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            eurRates: result.rates,
            eurBase: result.base,
            eurDate: result.date
          })
        },
        error => {
          this.setState({
            isLoaded: true,
            error: error
          })
        }
      )
    window
      .fetch('https://api.exchangeratesapi.io/latest?base=USD')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            usdRates: result.rates,
            usdBase: result.base,
            usdDate: result.date
          })
        },
        error => {
          this.setState({
            isLoaded: true,
            error: error
          })
        }
      )
  }

  render () {
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>
    } else if (!this.state.isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <h1>為替レート</h1>
          <h2>
            {this.state.eurDate} {this.state.eurBase}-日本円
          </h2>
          <p>1ユーロ = {this.state.eurRates.JPY}円</p>
          <h2>
            {this.state.usdDate} {this.state.usdBase}-日本円
          </h2>
          <p>1ドル = {this.state.usdRates.JPY}円</p>
        </div>
      )
    }
  }
}

export default RatesView
