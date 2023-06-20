import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusObj = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    languageCategory: 'ALL',
    apiStatus: apiStatusObj.initial,
    ReposList: [],
  }

  componentDidMount() {
    this.getRepositoryItems()
  }

  getRepositoryItems = async () => {
    this.setState({
      apiStatus: apiStatusObj.loading,
    })
    const {languageCategory} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${languageCategory}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.popular_repos.map(product => ({
        name: product.name,
        id: product.brand,
        issuesCount: product.issues_count,
        forksCount: product.forks_count,
        starsCount: product.stars_count,
        avatarUrl: product.avatar_url,
      }))
      this.setState({
        ReposList: updatedData,
        apiStatus: apiStatusObj.success,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusObj.failure,
      })
    }
  }

  updateLanguageCategory = category => {
    console.log('ewf')
    this.setState({languageCategory: category}, this.getRepositoryItems)
  }

  render() {
    const {ReposList, apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusObj.loading:
        return (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        )

      case apiStatusObj.success:
        return (
          <div className="bg">
            <h1>Popular</h1>
            <ul className="languages">
              {languageFiltersData.map(language => (
                <LanguageFilterItem
                  languageDetails={language}
                  key={language.id}
                  updateLanguageCategory={this.updateLanguageCategory}
                />
              ))}
            </ul>
            <ul className="repositories">
              {ReposList.map(Repository => (
                <RepositoryItem Repository={Repository} key={Repository.id} />
              ))}
            </ul>
          </div>
        )
      case apiStatusObj.failure:
        return (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt="failure"
            />
            <h1>Somethong Went Wrong</h1>
          </div>
        )
      default:
        return null
    }
  }
}
export default GithubPopularRepos
