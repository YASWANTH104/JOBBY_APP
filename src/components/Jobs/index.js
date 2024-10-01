import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import JobItem from '../JobItem'
import ProfileDetails from '../ProfileDetails'
import Header from '../Header'
import FiltersGroup from '../FiltersGroup'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    status: apiStatus.initial,
    selectedEmploymentType: [],
    selectedSalaryRange: '',
    enteredString: '',
    allJobs: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getAllJobItems()
  }

  getAllJobItems = async () => {
    const {
      selectedEmploymentType,
      selectedSalaryRange,
      enteredString,
      allJobs,
    } = this.state
    const stringSelectedEmploymentType = selectedEmploymentType.join(',')
    console.log(stringSelectedEmploymentType)
    this.setState({status: apiStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${selectedEmploymentType}&minimum_package=${selectedSalaryRange}&search=${enteredString}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const {jobs} = data
      const updatedData = jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({allJobs: updatedData, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  countedSuccessView = () => {
    const {allJobs} = this.state
    return (
      <ul type="none">
        {allJobs.map(each => (
          <JobItem itemDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  noJobsView = () => (
    <div className="no-jobs-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-job-heading">No Jobs Found</h1>
      <p className="no-job-para">
        We could not find any Jobs. Try other filters.
      </p>
    </div>
  )

  successView = () => {
    const {allJobs} = this.state
    const jobsCount = allJobs.length
    if (jobsCount > 0) {
      return this.countedSuccessView()
    }
    return this.noJobsView()
  }

  failureView = () => (
    <div className="no-jobs-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-jobs-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button className="logout-button" onClick={this.retryJobs}>
        Retry
      </button>
    </div>
  )

  retryJobs = () => {
    this.getAllJobItems()
  }

  onChangeSearchInput = event => {
    this.setState({enteredString: event.target.value})
  }

  onClickSearchButton = () => {
    const {enteredString} = this.state
    this.setState({searchInput: enteredString}, this.getAllJobItems)
  }

  changeSalaryItem = id => {
    this.setState({selectedSalaryRange: id}, this.getAllJobItems)
  }

  changeEmploymentItem = empid => {
    const {selectedEmploymentType} = this.state
    const isPresent = selectedEmploymentType.includes(empid)
    if (isPresent === false) {
      this.setState(
        prev => ({
          selectedEmploymentType: [...prev.selectedEmploymentType, empid],
        }),
        this.getAllJobItems,
      )
    } else {
      const filteredList = selectedEmploymentType.filter(each => each !== empid)
      this.setState(
        {
          selectedEmploymentType: filteredList,
        },
        this.getAllJobItems,
      )
    }
  }

  renderAllJobItems = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.success:
        return this.successView()
      case apiStatus.failure:
        return this.failureView()
      case apiStatus.loading:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    const {enteredString, selectedSalaryRange, selectedEmploymentType} =
      this.state
    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-inner-container">
          <div className="jobs-side-container">
            <ProfileDetails />
            <FiltersGroup
              salaryRangesList={salaryRangesList}
              employmentTypesList={employmentTypesList}
              changeEmploymentItem={this.changeEmploymentItem}
              changeSalaryItem={this.changeSalaryItem}
            />
          </div>
          <div className="jobs-second-side-container">
            <div className="search-container">
              <input
                type="search"
                className="input-box-search"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.onClickSearchButton}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderAllJobItems()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
