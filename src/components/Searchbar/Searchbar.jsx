import { Component } from 'react';
import styles from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    imgName: '',
  };

  handleNameChange = event => {
    this.setState({ imgName: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.imgName);
    this.setState({ imgName: '' });
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <button
            type="submit"
            className={styles.button}
            disabled={this.state.imgName === ''}
          >
            <span className={styles.buttonLabel}></span>
          </button>

          <input
            onChange={this.handleNameChange}
            className={styles.input}
            type="text"
            autoComplete="off"
            // autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
