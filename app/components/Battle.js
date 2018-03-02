import React from 'react';
import PropTypes from 'prop-types';

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

  render() {
    const { playerOneName, playerTwoName } = this.state;

    return (
      <div className='row'>
        {!playerOneName &&
          <PlayerInput
            id='playerOne'
            label='Player One'
            onSubmit={this.handleSubmit} />}

        {!playerTwoName &&
          <PlayerInput
            id='playerTwo'
            label='Player Two'
            onSubmit={this.handleSubmit} />}
      </div>
    )
  }
}

export default Battle;