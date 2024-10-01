import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'

class Login extends Component {
  state = {username: '', password: '', errMsg: '', showErrMsg: false}

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrMsg: true, errMsg: errorMsg})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errMsg, showErrMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form className="login-card" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="webiste-logo"
          />
          <label htmlFor="USERNAME" className="label">
            USERNAME
          </label>
          <input
            type="text"
            id="USERNAME"
            className="input-box"
            placeholder="Username"
            onChange={this.onChangeUsername}
            value={username}
          />
          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="input-box"
            placeholder="Password"
            onChange={this.onChangePassword}
            value={password}
          />
          <button type="submit" className="form-button">
            Login
          </button>
          {showErrMsg ? <p className="error-msg">*{errMsg}</p> : ''}
        </form>
      </div>
    )
  }
}
export default Login
