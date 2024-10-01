import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}
class ProfileDetails extends Component {
  state = {status: apiStatus.initial, profileDetails: {}}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({status: apiStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const apiUrl = 'https://apis.ccbp.in/profile'
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        profileImageUrl: data.profile_details.profile_image_url,
        name: data.profile_details.name,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({status: apiStatus.success, profileDetails: updatedData})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  successView = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img src={`${profileImageUrl}`} alt="profile" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-para">{shortBio}</p>
      </div>
    )
  }

  retryProfile = () => {
    this.setState({status: apiStatus.loading}, this.getProfile)
  }

  failureView = () => (
    <div className="profile-failure-container">
      <button className="logout-button" onClick={this.retryProfile}>
        Retry
      </button>
    </div>
  )

  render() {
    const {status} = this.state
    switch (status) {
      case apiStatus.loading:
        return this.loadingView()
      case apiStatus.success:
        return this.successView()
      case apiStatus.failure:
        return this.failureView()
      default:
        return null
    }
  }
}
export default ProfileDetails
