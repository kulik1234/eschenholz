import React from 'react';
import UploadImage from './modules/UploadImage';
import GalleryImage from './modules/GalleryImage';
import Style from './css/MainGalleryStyles.module.css'
import config from '../../messages/messages';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = 
      {
        photos: [],
        loading: false
      };
    

  }

  componentDidMount(){
    console.log("loading");
    this.setState({loading:true})
    fetch(config.HOST+"/api/photo?getAll=true")
    .then(
      resp => resp.json()
    )
    .then(resp => this.setState({ photos: resp}))
    .catch(e => console.log(e))
    .finally(r => {
      console.log("end of loading");
      this.setState({loading:false})
  });
  }



    render() {
      console.log(this.state);
      return (
        <div className={Style.main}>
          {this.state.loading?"loading...":""}
         <div className={Style.imageContainer}>
         {this.state.photos.map((i,k) => <GalleryImage src={i.path} key={k} alt={k}/>)}
         </div>
         <UploadImage />
        </div>
      );
    }
  }
  
  export default Gallery;


