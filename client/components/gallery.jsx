import ImageGallery from './ImageGallery';
// import ImageGallery from '../../node_modules/react-image-gallery/src/ImageGallery';
import React from 'react';
// const CatImageGallery = (props) => {

class CatImageGallery extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showIndex: true,
      index: 1,
      showThumbnails: false,
      showFullscreenButton: false,
    }
  }

  _onImageSlide(event) {
    this.setState({
      index: this._imageGallery.getCurrentIndex() + 1,
    });
    this.props.callbackFromParent(this.state.index)
    console.log('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
    console.log(this.state.index)
  }

  render(){
  // let idx = this._imageGallery.getCurrentIndex();
  let images = [];
  let catData = this.props.data;
  for(var i = 0; i<catData.length; i++){
      images.push({
        original: catData[i].image,
        description: `name: ${catData[i].name},\n
                      breed: ${catData[i].breed},\n
                      Location: ${catData[i].city}, ${catData[i].state}`,

      })
  }
  // console.log("Index",this._imageGallery.getCurrentIndex());

  // console.log('images', getCurrentIndex())
  // onClick={this._onImageClick.bind(this)}
  return (
        <ImageGallery items={images} showIndex={this.state.showIndex} ref={i => this._imageGallery = i} onSlide={this._onImageSlide.bind(this)} showThumbnails={this.state.showThumbnails} showFullscreenButton={this.state.showFullscreenButton}/>
        // idx= {this._imageGallery.getCurrentIndex()} setCatIdState={this.props.setCatIdState(this.state.index)}
    );
  }
};

// const CatImageGallery = (props) => {
//   let images = [];
//   let catData = props.data;
//   for(var i = 0; i<catData.length; i++){
//       images.push({
//         original: catData[i].image,
//         description: `${catData[i].name},
//                       ${catData[i].breed},
//                       ${catData[i].city}, ${catData[i].state}`
//       })
//   }
//   // console.log('images', images)
//   return (
//       <ImageGallery items={images}/>
//     );
// };



export default CatImageGallery;