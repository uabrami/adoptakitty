import ImageGallery from 'react-image-gallery';
// import ImageGallery from '../../node_modules/react-image-gallery/src/ImageGallery';
import React from 'react';
// const CatImageGallery = (props) => {

class CatImageGallery extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showIndex: true,
    }
  }

  // _onImageClick(event) {
  //   console.debug('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
  // }

  render(){
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
  // console.log('images', getCurrentIndex())
  // onClick={this._onImageClick.bind(this)}
  return (
        <ImageGallery items={images} showIndex={this.state.showIndex}/>
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