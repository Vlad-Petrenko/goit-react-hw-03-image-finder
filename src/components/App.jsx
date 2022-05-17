import { Component } from 'react';
import styles from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    imgName: '',
    page: 1,
  };

  handleFormSubmit = imgName => {
    this.setState({ imgName, page: 1 });
  };

  fetchImg = (imgName, page) => {
    return fetch(
      `https://pixabay.com/api/?q=${imgName}&page=${page}&key=27112752-ba9c06a82163f4d21667ea4bf&image_type=photo&orientation=horizontal&per_page=12`
    ).then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error(`Not found ${imgName}`));
    });
  };

  onClickLoadMore = () => {
    this.setState(state => {
      return { page: state.page + 1 };
    });
  };

  render() {
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          onClick={this.onClickLoadMore}
          fetchImg={this.fetchImg}
          imgName={this.state.imgName}
          page={this.state.page}
        />
        
      </div>
    );
  }
}
