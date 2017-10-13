import React, { Component } from 'react';

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.post,
    };
  }

  render() {
    const { post } = this.state;
    return (
      <div onClick={this.handleClick} className={post.toggled ? 'post active' : 'post'}>
        <div>
          {post.toggled ? 'Saved' : ''}
        </div>
        <div>
          <img src={post.picture} alt={`Picture from ${post.username}`}/>
        </div>
        <span>{post.username}</span>
      </div>
    );
  }

  handleClick = () => {
    const { post } = this.state;
    const favourites = JSON.parse(localStorage.getItem("Favourites")) ? JSON.parse(localStorage.getItem("Favourites")) : [];
    let find = favourites.find((p) => {
      return p.id === post.id;
    });
    if(!find){
      post.toggled = true;
      localStorage.setItem("Favourites", JSON.stringify([...favourites, post]));
      this.setState({post: post});
    }else{
      post.toggled = false;
      this.setState({post: post});
      let removed = favourites.filter((p) => {
        return p.id !== post.id;
      });
      localStorage.setItem("Favourites", JSON.stringify(removed));
    }
  };
}

export default Image;
