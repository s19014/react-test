import React from 'react'
import './App.css'
import Button from '@material-ui/core/Button'

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
      usdDate: '',
      startDisplay: false,
      eurJudge: false,
      usdJudge: false
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

  handleClickEur () {
    this.setState({ startDisplay: true, eurJudge: true, usdJudge: false })
  }

  handleClickUsd () {
    this.setState({ startDisplay: true, usdJudge: true, eurJudge: false })
  }

  // clickAlertEur () {
  //   window.alert(
  //     `1ユーロ = ${Math.round(this.state.eurRates.JPY * 100) / 100}円`
  //   )
  // }

  // clickAlertUsd () {
  //   window.alert(`1ドル = ${Math.round(this.state.usdRates.JPY * 100) / 100}円`)
  // }

  render () {
    let result
    if (this.state.startDisplay && this.state.eurJudge) {
      result = (
        <div className='result'>
          1{this.state.eurBase} ={' '}
          {Math.round(this.state.eurRates.JPY * 100) / 100}円
        </div>
      )
    } else if (this.state.startDisplay && this.state.usdJudge) {
      result = (
        <div className='result'>
          1{this.state.usdBase} ={' '}
          {Math.round(this.state.usdRates.JPY * 100) / 100}円
        </div>
      )
    }
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>
    } else if (!this.state.isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <h1>為替レート</h1>
          <div className='rate'>
            <div className='rateEur'>
              <h2>
                {this.state.eurDate} {this.state.eurBase} - 日本円
              </h2>
              <div className='button'>
                <Button
                  variant='contained'
                  color='primary'
                  className='button'
                  onClick={() => {
                    this.handleClickEur()
                  }}
                >
                  クリック
                </Button>
              </div>
            </div>
            <div className='rateUsd'>
              <h2>
                {this.state.usdDate} {this.state.usdBase} - 日本円
              </h2>
              <div className='button'>
                <Button
                  variant='contained'
                  color='primary'
                  className='button'
                  onClick={() => {
                    this.handleClickUsd()
                  }}
                >
                  クリック
                </Button>
              </div>
            </div>
          </div>
          {result}
        </div>
      )
    }
  }
}

export default RatesView
