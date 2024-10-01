import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = props => {
  const findJobs = () => {
    const {history} = props
    history.push('/jobs')
  }
  return (
    <div className="home-container">
      <Header />
      <div className="inner-home-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-para">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button className="home-button" onClick={findJobs}>
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}
export default Home
