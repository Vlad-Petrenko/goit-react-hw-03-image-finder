import { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    imgName: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleNameChange = event => {
    this.setState({ imgName: event.currentTarget.value });
  };

  handleSubmit = event => {
    const { imgName } = this.state;
    const { onSubmit } = this.props;
    event.preventDefault();

    if (imgName === '') {
      return toast.warn('Enter something, please');
    }

    onSubmit(this.state.imgName);
    this.setState({ imgName: '' });
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <ToastContainer />
          <button type="submit" className={styles.button}>
            <span className={styles.buttonLabel}></span>
          </button>
          <input
            onChange={this.handleNameChange}
            className={styles.input}
            value={this.state.imgName}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
