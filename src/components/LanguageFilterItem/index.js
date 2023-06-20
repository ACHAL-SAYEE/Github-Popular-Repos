import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, updateLanguageCategory} = props
  const {language, id} = languageDetails
  const onclickBtn = () => {
    updateLanguageCategory(id)
  }
  return (
    <li className="language-item">
      <button className="btn" type="button" onClick={onclickBtn}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
