import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const logoutJobby = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          alt="website logo"
          className="website-logo"
        />
      </Link>

      <ul type="none" className="routes-container">
        <Link to="/" className="route-items">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="route-items">
          <li>Jobs</li>
        </Link>
      </ul>
      <ul type="none">
        <li>
          <button className="logout-button" onClick={logoutJobby} type="button">
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}
export default withRouter(Header)
