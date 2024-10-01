import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaStar, FaLocationArrow} from 'react-icons/fa'
import {IoBag} from 'react-icons/io5'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'

const apiStatus = {
  intital: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}
class JobItemDetails extends Component {
  state = {status: apiStatus.intital, eachJobItemDetailsList: []}

  componentDidMount() {
    this.getEachJobDetails()
  }

  getEachJobDetails = async () => {
    this.setState({status: apiStatus.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills.map(each => ({
          name: each.name,
          imageUrl: each.image_url,
        })),
        title: data.job_details.title,
        similarJobs: data.similar_jobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          title: each.title,
          rating: each.rating,
        })),
      }
      this.setState({
        eachJobItemDetailsList: updatedData,
        status: apiStatus.success,
      })
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryJobsEach = () => {
    this.getEachJobDetails()
  }

  failureView = () => (
    <>
      <Header />
      <div className="no-jobs-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="no-jobs-image"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button className="logout-button" onClick={this.retryJobsEach}>
          Retry
        </button>
      </div>
    </>
  )

  successView = () => {
    const {eachJobItemDetailsList} = this.state
    const {
      id,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
      similarJobs,
    } = eachJobItemDetailsList
    return (
      <>
        <div className="final-container">
          <Header />
          <div className="final-bottom-container">
            <div className="final-bottom-top-1-container">
              <img
                src={`${companyLogoUrl}`}
                alt="job details company logo"
                className="final-logo-image"
              />
              <div className="final-bottom-top-container">
                <h1 className="final-heading">{title}</h1>
                <div className="final-heading-top-down-container">
                  <FaStar className="star" />
                  <p className="final-para">{rating}</p>
                </div>
              </div>
            </div>
            <div className="final-bottom-top-2-container">
              <div className="final-bottom-top-1-container">
                <div className="final-bottom-top-1-container">
                  <FaLocationArrow className="iconss" />
                  <p className="final-para">{location}</p>
                </div>
                <div className="final-bottom-top-1-container">
                  <IoBag className="iconss" />
                  <p className="final-para">{employmentType}</p>
                </div>
              </div>
              <p className="final-para">{packagePerAnnum}</p>
            </div>
            <hr className="horizontal-line" />
            <div className="final-bottom-top-2-container">
              <h1 className="final-heading">Description</h1>
              <a href={`${companyWebsiteUrl}`}>Visit</a>
            </div>
            <p className="final-para">{jobDescription}</p>
            <h1 className="final-heading">Skills</h1>
            <ul className="inner-top-3-container">
              {skills.map(each => (
                <li className="final-bottom-top-3-container" key={each.name}>
                  <img
                    src={`${each.imageUrl}`}
                    className="skills-image"
                    alt={each.name}
                  />
                  <p className="final-para">{each.name}</p>
                </li>
              ))}
            </ul>
            <h1 className="final-heading">Life at Company</h1>
            <div className="final-top-4-container">
              <p className="final-para final-para-3">
                {lifeAtCompany.description}
              </p>
              <img
                src={`${lifeAtCompany.imageUrl}`}
                className="life-image"
                alt=" life at company"
              />
            </div>
          </div>
          <h1 className="final-heading-2">Similar Jobs</h1>
          <ul type="none" className="similar-jobs-items-container">
            {similarJobs.map(each => (
              <li className="list" key={each.id}>
                <div className="each-job">
                  <div className="each-job-top-container">
                    <img
                      src={`${each.companyLogoUrl}`}
                      alt="similar job company logo"
                      className="company-logo"
                    />
                    <div className="each-job-inner-top-container">
                      <h1 className="each-job-heading">{each.title}</h1>
                      <div className="ratings-container">
                        <FaStar className="star" />
                        <p className="each-job-para">{each.rating}</p>
                      </div>
                    </div>
                  </div>
                  <div className="each-job-top-down-container">
                    <div className="location-type-container">
                      <div className="ratings-container">
                        <FaLocationArrow />
                        <p className="each-job-para">{each.location}</p>
                      </div>
                      <div className="ratings-container">
                        <IoBag />
                        <p className="each-job-para">{each.employmentType}</p>
                      </div>
                    </div>
                    <p className="each-job-para">{each.packagePerAnnum}</p>
                  </div>
                  <hr className="horizontal-line" />
                  <h1 className="each-job-heading">Description</h1>
                  <p className="each-job-para">{each.jobDescription}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

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
export default JobItemDetails
