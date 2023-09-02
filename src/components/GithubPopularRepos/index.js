import {Component} from 'react'
import './index.css'

import Loader from 'react-loader-spinner'

import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    repositoriesData: [],
    activeLanguage: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeLanguage} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const updateData = fetchedData.popular_repos.map(eachRepo => ({
        id: eachRepo.id,
        imageUrl: eachRepo.avatar_url,
        name: eachRepo.name,
        startsCount: eachRepo.stars_count,
        forksCount: eachRepo.forks_count,
        issuesCount: eachRepo.issues_count,
      }))

      this.setState({
        repositoriesData: updateData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader color="#0284c7" type="ThreeDots" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure_view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderRepositoriesView = () => {
    const {repositoriesData} = this.state
    return (
      <ul className="list-container">
        {repositoriesData.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repositoryDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  setActiveLanguageId = newFilterId => {
    this.setState({activeLanguage: newFilterId}, this.getRepositories)
  }

  renderLanguageList = () => {
    const {activeLanguage} = this.state

    return (
      <ul>
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            key={eachLanguage.id}
            isActive={eachLanguage.id === activeLanguage}
            languageFiltersDetails={eachLanguage}
            setActiveLanguageId={this.setActiveLanguageId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="main-container">
        <div className="container">
          <h1 className="heading">Popular</h1>
          {this.renderLanguageList()}
          {this.renderRepositories()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
