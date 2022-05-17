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
    event.preventDefault();
    if (this.state.imgName === '') {
      return toast.warn('Enter something, please', {
        autoClose: 3000,
      });
    }
    this.props.onSubmit(this.state.imgName);
    this.setState({ imgName: '' });
  };

  render() {
    return (
      <>
        <header className={styles.searchbar}>
          <form onSubmit={this.handleSubmit} className={styles.form}>
            <ToastContainer />
            <button type="submit" className={styles.button}>
              <span className={styles.buttonLabel}></span>
            </button>
            <input
              onChange={this.handleNameChange}
              className={styles.input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </>
    );
  }
}
