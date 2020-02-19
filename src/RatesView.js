import React from 'react'
import './App.css'

class RatesView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      error: null,
      rates: [],
      base: '',
      date: ''
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
            rates: result.rates,
            base: result.base,
            date: result.date
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
          <h1>
            {this.state.date}の対{this.state.base}
          </h1>
          <p>
            <b>1ユーロ = {this.state.rates.JPY} 円</b>
          </p>
        </div>
      )
    }
  }
}

export default RatesView
