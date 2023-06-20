import './index.css'

const RepositoryItem = props => {
  const {Repository} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = Repository
  return (
    <li className="item">
      <img src={avatarUrl} alt={name} className="img" />
      <h1>{name}</h1>
      <ul>
        <li className="count" key="1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
            alt="stars"
            className="count-img"
          />
          <p>{starsCount} stars</p>
        </li>
        <li className="count" key="2">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
            alt="forks"
            className="count-img"
          />
          <p>{forksCount} forks</p>
        </li>
        <li className="count" key="3">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
            alt="open issues"
            className="count-img"
          />
          <p>{issuesCount} open issues</p>
        </li>
      </ul>
    </li>
  )
}
export default RepositoryItem
