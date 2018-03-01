import React from 'react';
import PropTypes from 'prop-types';

const SelectLanguage = ({ onSelect, selectedLanguage }) => {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className='languages'>
      {languages.map(lang => (
        <li
          onClick={() => onSelect(lang)}
          className={lang === selectedLanguage ? "selectedLanguage" : ""}
          key={lang}>
            {lang}
        </li>
      ))}
    </ul>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}


class Popular extends React.Component {
  state = {
    selectedLanguage: 'All'
  }

  updateLanguage = (lang) => {
    this.setState(() => ({selectedLanguage: lang}));
  }

  render() {
    return (
      <div>
        <SelectLanguage 
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}/>
      </div>
    )
  }
}

export default Popular;