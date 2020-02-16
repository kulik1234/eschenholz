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
        fullPhoto: false,
        currentPhoto: null
      };

    this.addPhoto = this.addPhoto.bind(this);
    this.showFullPhoto = this.showFullPhoto.bind(this);
    this.hideFullPhoto = this.hideFullPhoto.bind(this);
    this.fullPhotoNext = this.fullPhotoNext.bind(this);
    this.fullPhotoPrev = this.fullPhotoPrev.bind(this);

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
    let t = event.target;
    if(t.nodeName==="IMG")
    {
      let id = parseInt(t.getAttribute("alt"));
      this.setState({currentPhoto: this.state.photos.find(e=>e.id===id)})
    }
    this.setState({fullPhoto: true});

  }
  hideFullPhoto(event){
    if(event.target.nodeName!=="IMG"&&event.target.getAttribute("data")!=="image"){
      this.setState({fullPhoto: false});
    }
    
  }
  fullPhotoNext(){
    this.setState({
      currentPhoto: 
      this.state.photos[(this.state.photos.indexOf(this.state.currentPhoto)+1)%this.state.photos.length]
    });

  }
  fullPhotoPrev(event){
    let i = this.state.photos.indexOf(this.state.currentPhoto);
    if(i>0){
      i--;
    }
    else {
      i = this.state.photos.length-1;
    }
    this.setState({
      currentPhoto: 
      this.state.photos[i]
    });
    
  }

    render() {
        let fullPhoto = this.state.fullPhoto?
        <FullPhoto 
        photo={this.state.currentPhoto}  
        hide={this.hideFullPhoto} 
        next={this.fullPhotoNext}
        prev={this.fullPhotoPrev}
        />:"";
      return (
        <div className={Style.main}>
          {this.state.loading?"loading...":""}
         <div className={Style.imageContainer}>
         {this.state.photos.map(i => <GalleryImage 
         src={i.path} 
         author={i.author} 
         category={i.category}
         date={i.date}
         name={i.nameOrTitle}
         desc={i.description}
         key={i.id} 
         alt={i.id}
         show={this.showFullPhoto}
         />)}
         </div>
         <UploadImage newphoto={this.addPhoto}/>
         {fullPhoto}
        </div>
      );
    }
  }
  
  export default Gallery;


