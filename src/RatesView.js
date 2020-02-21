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
      judgeDisplay: false,
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
    this.setState({
      judgeDisplay: true,
      jpyJudge: true,
      usdJudge: false
    })
  }

  handleClickUsd () {
    this.setState({
      judgeDisplay: true,
      usdJudge: true,
      jpyJudge: false
    })
  }

  doChange (e) {
    this.setState({ value: e.target.value })
  }

  render () {
    const len = Object.keys(this.state.jpyRates).length
    console.log(len)
    for (let i = 0; i < len; i++) {
      console.log(Object.keys(this.state.jpyRates)[i])
      console.log(Object.values(this.state.jpyRates)[i])
      console.log('--------------------')
    }

    let result
    if (this.state.judgeDisplay && this.state.jpyJudge) {
      result = (
        <div className='result'>
          {this.state.value}
          <span>円</span> ={' '}
          {Math.round(this.state.value * this.state.jpyRates.USD * 1000) / 1000}
          <span>ドル</span>
        </div>
      )
    }
    if (this.state.judgeDisplay && this.state.usdJudge) {
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
          <h1>ドル円 計算</h1>
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
                  計算
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
                  計算
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
