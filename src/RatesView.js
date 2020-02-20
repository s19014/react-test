import React from 'react'
import './App.css'
import Button from '@material-ui/core/Button'

class RatesView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      error: null,
      jpyRates: [],
      jpyBase: '',
      jpyDate: '',
      usdRates: [],
      usdBase: '',
      usdDate: '',
      startDisplay: false,
      jpyJudge: false,
      usdJudge: false,
      value: ''
    }
  }

  componentDidMount () {
    window
      .fetch('https://api.exchangeratesapi.io/latest?base=JPY')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            jpyRates: result.rates,
            jpyBase: result.base,
            jpyDate: result.date
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

  handleClickjpy () {
    this.setState({ startDisplay: true, jpyJudge: true, usdJudge: false })
  }

  handleClickUsd () {
    this.setState({ startDisplay: true, usdJudge: true, jpyJudge: false })
  }

  doChange (e) {
    this.setState({ value: e.target.value })
  }

  render () {
    let result
    if (this.state.startDisplay && this.state.jpyJudge) {
      result = (
        <div className='result'>
          {this.state.value}
          <span>円</span> ={' '}
          {Math.round(this.state.value * this.state.jpyRates.USD * 1000) / 1000}
          <span>ドル</span>
        </div>
      )
    } else if (this.state.startDisplay && this.state.usdJudge) {
      result = (
        <div className='result'>
          {this.state.value}
          <span>ドル</span> ={' '}
          {Math.round(this.state.value * this.state.usdRates.JPY * 1000) / 1000}
          <span>円</span>
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
            <div className='rateJpy'>
              <h2>
                {this.state.jpyDate} - {this.state.jpyBase}を
                {this.state.usdBase}に
              </h2>
              <input type='number' onChange={e => this.doChange(e)} />
              <div className='button'>
                <Button
                  variant='contained'
                  color='primary'
                  className='button'
                  onClick={() => {
                    this.handleClickjpy()
                  }}
                >
                  変換
                </Button>
              </div>
            </div>
            <div className='rateUsd'>
              <h2>
                {this.state.usdDate} - {this.state.usdBase}を
                {this.state.jpyBase}に
              </h2>
              <input type='number' onChange={e => this.doChange(e)} />
              <div className='button'>
                <Button
                  variant='contained'
                  color='primary'
                  className='button'
                  onClick={() => {
                    this.handleClickUsd()
                  }}
                >
                  変換
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
