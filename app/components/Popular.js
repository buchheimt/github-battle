import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from './../utils/api';

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

const RepoGrid = ({ repos }) => {

  return (
    <ul className="popular-list">
      {repos.map((repo, i) => (
        <li 
          key={repo.name}
          className='popular-item'>
          <div className='popular-rank'>
            #{i + 1}
          </div>
          <ul className='space-list-items'>
            <li>
              <img
                className='avatar'
                src={repo.owner.avatar_url}
                alt={`Avatar for ${repo.owner.login}`} />
            </li>
            <li>
              <a href={repo.html_url}>{repo.name}</a>
            </li>
            <li>@{repo.owner.login}</li>
            <li>{repo.stargazers_count} stars </li>
          </ul>
        </li>
      ))}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}


class Popular extends React.Component {
  state = {
    selectedLanguage: 'All',
    repos: null
  }

  updateLanguage = async (lang) => {
    const repos = await fetchPopularRepos(lang);

    this.setState(() => ({
      selectedLanguage: lang,
      repos
    }));
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  render() {
    console.log(this.state.repos);
    return (
      <div>
        <SelectLanguage 
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}/>
        {!!this.state.repos
          ? <RepoGrid repos={this.state.repos} />
          : <p>Loading</p>}
        
      </div>
    )
  }
}

export default Popular;