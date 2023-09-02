// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {isActive, languageFiltersDetails, setActiveLanguageId} = props
  const {id, language} = languageFiltersDetails
  const btnClassName = isActive
    ? 'language-btn active-language-btn'
    : 'language-btn'
  const onClickLanguageFilter = () => {
    setActiveLanguageId(id)
  }

  return (
    <li className="list_language_Container">
      <button
        className={btnClassName}
        onClick={onClickLanguageFilter}
        type="button"
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
