// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    imageUrl,
    startsCount,
    forksCount,
    issuesCount,
  } = repositoryDetails

  return (
    <li>
      <img className="img" src={imageUrl} alt={name} />
      <h1 className="repoName">{name}</h1>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p>{startsCount} stars</p>
      </div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p>{forksCount} forks</p>
      </div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
