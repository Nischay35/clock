import {Component} from 'react'
import './index.css'
class DigitalTimer extends Component {
  state = {
    isRunning: false,
    timerLimitInMinutes: 25,
    timerInSeconds: 0,
  }
  onPlusBtn = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }
  onMinusBtn = () => {
    const {timerLimitInMinutes} = this.state
    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }
  componentWillUnmount() {
    this.clearTimerInterval()
  }
  clearTimerInterval = () => {
    clearInterval(intervalId)
  }
  incrementTimer = () => {
    const {timerInSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = timerInSeconds === timerLimitInMinutes * 60
    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isRunning: false})
    } else {
      this.setState(prevState => ({
        timerInSeconds: prevState.timerInSeconds + 1,
      }))
    }
  }
  onStartOrPause = () => {
    const {timerInSeconds, isRunning, timerLimitInMinutes} = this.state
    const isTimerCompleted = timerInSeconds == timerLimitInMinutes * 60
    if (isTimerCompleted) {
      this.setState({timerInSeconds: 0})
    }
    if (isRunning) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimer, 1000)
    }
    this.setState(prevState => ({isRunning: !prevState.isRunning}))
  }

  onResetBtn = () => {
    this.clearTimerInterval()
    this.setState({
      timerLimitInMinutes: 25,
      isRunning: false,
      timerInSeconds: 0,
    })
  }
  formatOutputString = () => {
    const {timerLimitInMinutes, timerInSeconds} = this.state
    const remainingSeconds = timerLimitInMinutes * 60 - timerInSeconds
    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = Math.floor(remainingSeconds % 60)
    const minutesFormatted = minutes > 9 ? minutes : `0${minutes}`
    const secondsFormatted = seconds > 9 ? seconds : `0${seconds}`
    return `${minutesFormatted}:${secondsFormatted}`
  }
  render() {
    const {isRunning, timerLimitInMinutes, timerInSeconds} = this.state
    const startOrPauseText = isRunning ? 'Pause' : 'Start'
    const imageUrl = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const statusTimer = isRunning ? 'Running' : 'Paused'
    const altText = isRunning ? 'play icon' : 'pause icon'
    const isDisabled = timerInSeconds > 0
    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <h1 className="timer-text">{this.formatOutputString()}</h1>
          <p className="status">{statusTimer}</p>
        </div>
        <div className="buttons">
          <div className="start-stop">
            <button className="button" onClick={this.onStartOrPause}>
              <img src={imageUrl} alt={altText} className="image" />
            </button>
            <p className="btn-text">{startOrPauseText}</p>
          </div>
          <button className="button" onClick={this.onResetBtn}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              alt="reset icon"
              className="image"
            />
          </button>
          <p className="btn-text">Reset</p>
        </div>
        <p className="setTimer">Set Timer limit</p>
        <div className="limit-container">
          <button
            className="minus"
            onClick={this.onMinusBtn}
            disabled={isDisabled}
          >
            -
          </button>
          <p className="limit-text">{timerLimitInMinutes}</p>
          <button
            className="plus"
            onClick={this.onPlusBtn}
            disabled={isDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
