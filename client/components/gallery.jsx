import ImageGallery from 'react-image-gallery';
import React from 'react';

const CatImageGallery = (props) => {
  let images = [];
  let catData = props.data;
  for(var i = 0; i<catData.length; i++){
      images.push({
        original: catData[i].image,
        description: `name: ${catData[i].name},\n
                      breed: ${catData[i].breed},\n
                      Location: ${catData[i].city}, ${catData[i].state}`
      })
  }
  // console.log('images', images)
  return (
      <ImageGallery items={images}/>
    );
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