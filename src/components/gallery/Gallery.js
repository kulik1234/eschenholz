import React from 'react';
import UploadImage from './modules/UploadImage';
import GalleryImage from './modules/GalleryImage';
import Style from './css/MainGalleryStyles.module.css'
import config from '../../messages/messages';
import FullPhoto from './modules/FullPhoto';


class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = 
      {
        photos: [],
        loading: false,
        fullPhoto: true,
        currentPhoto: null
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
    .then(resp => this.setState({ photos: resp,currentPhoto: resp[0]?resp[0]:null}))
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
  showFullPhoto(event){
    console.log(event);
    this.setState({fullPhoto: true});

  }
  hideFullPhoto(){
    this.setState({fullPhoto: false});
  }

    render() {
        let fullPhoto = this.state.fullPhoto?<FullPhoto />:"";
      return (
        <div className={Style.main}>
          {console.log(this.state)}
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
         click={this.showFullPhoto}
         />)}
         </div>
         <UploadImage newphoto={this.addPhoto}/>
         {fullPhoto}
        </div>
      );
    }
  }
  
  export default Gallery;


