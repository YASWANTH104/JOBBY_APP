import './index.css'

const FiltersGroup = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    changeSalaryItem,
    changeEmploymentItem,
  } = props

  const onChangeSalaryItem = event => {
    changeSalaryItem(event.target.value)
  }
  const onChangeEmploymentItem = event => {
    changeEmploymentItem(event.target.value)
  }
  const employmentDetails = () => (
    <ul type="none" className="employment-details-container">
      {employmentTypesList.map(each => (
        <li className="each-employment-item" key={each.employmentTypeId}>
          <input
            type="checkbox"
            className="checkbox"
            id={each.employmentTypeId}
            value={each.employmentTypeId}
            onChange={onChangeEmploymentItem}
          />
          <label htmlFor={each.employmentTypeId} className="label-2">
            {each.label}
          </label>
        </li>
      ))}
    </ul>
  )

  const salaryDetails = () => (
    <ul type="none" className="employment-details-container">
      {salaryRangesList.map(each => (
        <li className="each-employment-item" key={each.salaryRangeId}>
          <input
            type="radio"
            className="checkbox"
            id={each.salaryRangeId}
            name="radio"
            value={each.salaryRangeId}
            onChange={onChangeSalaryItem}
          />
          <label htmlFor={each.salaryRangeId} className="label-2">
            {each.label}
          </label>
        </li>
      ))}
    </ul>
  )
  const renderEmploymentDetails = () => (
    <>
      <h1 className="type-of-employment-heading">Type of Employment</h1>
      {employmentDetails()}
    </>
  )

  const renderSalaryDetails = () => (
    <>
      <h1 className="type-of-employment-heading">Salary Range</h1>
      {salaryDetails()}
    </>
  )
  return (
    <>
      <hr className="horizontal-line" />
      {renderEmploymentDetails()}
      <hr className="horizontal-line" />
      {renderSalaryDetails()}
    </>
  )
}
export default FiltersGroup
