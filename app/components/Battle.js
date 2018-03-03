import React from 'react';
import PropTypes from 'prop-types';
import { Link  } from 'react-router-dom';

const PlayerPreview = ({ avatar, username, id, onReset }) => (
  <div>
    <div className='column'>
      <img
        className='avatar'
        src={avatar}
        alt={`Avatar for ${username}`} />
      <h2 className='username'>@{username}</h2>
    </div>
    <button
      className='reset'
      onClick={() => onReset(id)}>
        Reset
    </button>
  </div>
)

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
}

class PlayerInput extends React.Component {
  state = {
    username: '',
  }

  handleChange = (e) => {
    const username = e.target.value;

    this.setState(() => ({ username }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.props.id, this.state.username)
  }

  render() {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {this.props.label}
        </label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handleChange} />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}>
            Submit
          </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

class Battle extends React.Component {
  state = {
    playerOneName: '',
    playerTwoName: '',
    playerOneImage: null,
    playerTwoImage: null,
  }

  handleSubmit = (id, username) => {
    this.setState(() => ({
      [`${id}Name`]: username,
      [`${id}Image`]: `https://github.com/${username}.png?size=200`,
    }));
  }

  handleReset = (id) => {
    this.setState(() => ({
      [`${id}Name`]: '',
      [`${id}Image`]: null,
    }));
  }

  render() {
    const { match } = this.props;
    const { playerOneName,
            playerTwoName,
            playerOneImage,
            playerTwoImage } = this.state;

    return (
      <div>
        <div className='row'>
          {!playerOneName &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit} />}
          
          {playerOneImage !== null &&
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}
              onReset={this.handleReset}
              id='playerOne' />}

          {!playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit} />}

          {playerTwoImage !== null &&
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}
              onReset={this.handleReset}
              id='playerTwo' />}
        </div>
        {playerOneImage && playerTwoImage &&
          <Link
            className='button'
            to={{
              pathname: `${match.url}/results`,
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`}} >
              Battle
            </Link>}
      </div>
    )
  }
}

export default Battle;