import React, { Component } from 'react';
import Image from './Image';

class ImageList extends Component {
  render() {
    return (
      <div className="imageList">
        {this.renderImages()}
      </div>
    );
  }

  renderImages = () => {
    const { list } = this.props;
    if (list.length === 0) {
      return (<li>There is no image.</li>);
    } else {
      return list.map((post) => {
        return (<Image post={post} key={post.id} onClick={() => this.props.handleClick(post)}/>);
      });
    }
  };
}

export default ImageList;
