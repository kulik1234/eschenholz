import React from 'react';
import config from '../../../messages/messages';
import GalleryImage from './GalleryImage';
import UploadImage from './UploadImage';
import FullPhoto from './FullPhoto';
import Style from './css/SubGalleryStyles.module.css';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';

class SubGallery extends React.Component {

    constructor(props) {
        super(props);
    this.state = 
      {
        photos: [],
        loading: false,
        fullPhoto: false,
        currentPhoto: null,
        canUpload: false,
        showUpload: false
          };

    this.addPhoto = this.addPhoto.bind(this);
    this.showFullPhoto = this.showFullPhoto.bind(this);
    this.hideFullPhoto = this.hideFullPhoto.bind(this);
    this.fullPhotoNext = this.fullPhotoNext.bind(this);
    this.fullPhotoPrev = this.fullPhotoPrev.bind(this);
    this.loadPhotos = this.loadPhotos.bind(this);
    this.hideUpload = this.hideUpload.bind(this);

    }


    componentDidMount(){
        this.loadPhotos("/category/"+this.props.category);
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
    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
                this.loadPhotos("/category/"+this.props.category);
            
            
        }

    }
    hideUpload(e){
        
      if(e.target.getAttribute("data")=="close-alert")
      {
          this.setState({showUpload:false});
      }
      
  }
    render() {
        let fullPhoto = this.state.fullPhoto?
        <FullPhoto 
        photo={this.state.currentPhoto}  
        hide={this.hideFullPhoto} 
        next={this.fullPhotoNext}
        prev={this.fullPhotoPrev}
        />:"";
        let upload = <div onClick={()=>{this.setState({showUpload: true})}} style={{"cursor":"pointer","textAlign":"center","padding":"20px","border":"1px solid"}}>
          Przeslij zdjecia
        </div>;
        
        return (
            <div onClick={this.hideUpload}>
                <div >
                    {this.props.name}
                </div>
                {this.state.loading ? "loading..." : ""}
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
                    />)
                    }
                </div>
                {this.state.canUpload?upload:""}
                {this.state.showUpload?<LoadingScreen type="component" close={this.hideUpload}>
            <UploadImage newphoto={this.addPhoto} category={this.props.category}/>
          </LoadingScreen>:""}
                {fullPhoto}
            </div>
        )
    }
}

export default SubGallery;