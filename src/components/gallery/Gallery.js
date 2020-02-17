import React from 'react';
import UploadImage from './modules/UploadImage';
import GalleryImage from './modules/GalleryImage';
import Style from './css/MainGalleryStyles.module.css'
import config from '../../messages/messages';
import FullPhoto from './modules/FullPhoto';
import SubGallery from './modules/SubGallery';
import { Switch,Route} from 'react-router-dom';

const galleries = {
  "kitchenFurniture":{"category":"KITCHEN_FURNITURE","parameter":"/category/"},
  "stairs":{"category":"STAIRS","parameter":"/category/"}
}

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
    this.loadPhotos = this.loadPhotos.bind(this);

  }

  componentDidMount(){
    //this.loadPhotos("?getAll=true");
  }

  loadPhotos(parameter){
    this.setState({loading:true})
    fetch(config.HOST+"/api/photo"+parameter)
    .then(
      resp => resp.json()
    )
    .then(resp => this.setState({ photos: resp,currentPhoto: resp[0]?resp[0]:null}))
    .catch(e => console.log(e))
    .finally(r => {
      this.setState({loading:false})
  });
  }

  addPhoto(photo){
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
          <Switch>
            <Route path={`${this.props.match.url}/kitchen-furniture`}>
              <SubGallery g={galleries.kitchenFurniture} loadPhotos={this.loadPhotos}></SubGallery>
            </Route>
            <Route path={`${this.props.match.url}/stairs`}>
            <SubGallery g={galleries.stairs} loadPhotos={this.loadPhotos} />
            </Route>
          </Switch>
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


