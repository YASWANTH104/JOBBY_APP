import './index.css'
import {FaStar, FaLocationArrow} from 'react-icons/fa'
import {IoBag} from 'react-icons/io5'
import {Link} from 'react-router-dom'

const JobItem = props => {
  const {itemDetails} = props
  const {
    id,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
  } = itemDetails
  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="list">
        <div className="each-job">
          <div className="each-job-top-container">
            <img
              src={`${companyLogoUrl}`}
              alt="company logo"
              className="company-logo"
            />
            <div className="each-job-inner-top-container">
              <h1 className="each-job-heading">{title}</h1>
              <div className="ratings-container">
                <FaStar className="star" />
                <p className="each-job-para">{rating}</p>
              </div>
            </div>
          </div>
          <div className="each-job-top-down-container">
            <div className="location-type-container">
              <div className="ratings-container">
                <FaLocationArrow />
                <p className="each-job-para">{location}</p>
              </div>
              <div className="ratings-container">
                <IoBag />
                <p className="each-job-para">{employmentType}</p>
              </div>
            </div>
            <p className="each-job-para">{packagePerAnnum}</p>
          </div>
          <hr className="horizontal-line" />
          <h1 className="each-job-heading">Description</h1>
          <p className="each-job-para">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobItem
