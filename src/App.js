import React, { Component } from 'react';
import data from './data/dummy';
import ImageList from './components/ImageList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      filteredList: [],
      favourites: [],
    };
  }

  componentDidMount() {
    let favourites = JSON.parse(localStorage.getItem("Favourites")) ? JSON.parse(localStorage.getItem("Favourites")) : [];
    setTimeout(() => {
      this.setState({ list: data, filteredList: data, favourites: favourites});
    }, 500);
  }

  render() {
    const { list, filteredList } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <input name="search" placeholder="Search..." onChange={this.handleChange}/>
        </header>
        {this.renderList()}
      </div>
    );
  }

  handleChange = (search) => {
    const { list } = this.state;
    let filtered = list.filter((post) => {
      return post.username.toLowerCase().includes(search.target.value.toLowerCase())
    });
    this.setState({ filteredList: filtered })
  };

  renderList = () => {
    const { filteredList, favourites } = this.state;
    let favouritesId = favourites.map((p)=> p.id);
    let noFavourites = filteredList.filter((post) => {
      return favouritesId.indexOf(post.id) < 0;
    });
    let fullList = [...favourites, ...noFavourites];
    return <ImageList list={fullList} handleClick={(post) => this.handleClick(post)}/>;
  }
}

export default App;
