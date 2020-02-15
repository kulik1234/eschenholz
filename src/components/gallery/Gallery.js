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

    this.addPhoto = this.addPhoto.bind(this);

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

  addPhoto(photo){
    console.log(photo);
     let tab = this.state.photos;
    tab.push(photo);
    this.setState({photos: tab});
    
  }

    render() {

      return (
        <div className={Style.main}>
          
          {this.state.loading?"loading...":""}
         <div className={Style.imageContainer}>
         {this.state.photos.map((i,k) => <GalleryImage 
         src={i.path} 
         author={i.author} 
         category={i.category}
         date={i.date}
         name={i.nameOrTitle}
         desc={i.description}
         key={k} 
         alt={k}
         />)}
         </div>
         <UploadImage newphoto={this.addPhoto}/>
         
        </div>
      );
    }
  }
  
  export default Gallery;


