import React from 'react';
import Style from './css/MainGalleryStyles.module.css'
import config from '../../messages/messages';
import SubGallery from './modules/SubGallery';
import { Switch, Route } from 'react-router-dom';
import Navigation from './modules/Navigation';
import Clink from '../CLink';


const galleries = [
  ["KITCHEN_FURNITURE", "Meble kuchenne"],
  ["STAIRS", "Schody"],
  ["BEDS", "łóżka"],
  ["DESKS", "Biurka"],
  ["WARDROBES", "Szafy"],
  ["TABLES", "Stoły"],
  ["BATHROOMS", "Łazienki"],
  ["DOOR", "Drzwi"],
  ["NONE", "Inne"]
];

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


  loadPhotos(parameter) {
    this.setState({ loading: true })
    fetch(config.HOST + "/api/photo" + parameter)
      .then(
        resp => resp.json()
      )
      .then(resp => this.setState({ photos: resp, currentPhoto: resp[0] ? resp[0] : null }))
      .catch(e => console.log(e))
      .finally(r => {
        this.setState({ loading: false })
      });

  }

  addPhoto(photo) {
    let tab = this.state.photos;
    tab.push(photo);
    this.setState({ photos: tab });

  }
  showFullPhoto(event) {
    let t = event.target;
    if (t.nodeName === "IMG") {
      let id = parseInt(t.getAttribute("alt"));
      this.setState({ currentPhoto: this.state.photos.find(e => e.id === id) })
    }
    this.setState({ fullPhoto: true });

  }
  hideFullPhoto(event) {
    if (event.target.nodeName !== "IMG" && event.target.getAttribute("data") !== "image") {
      this.setState({ fullPhoto: false });
    }

  }
  fullPhotoNext() {
    this.setState({
      currentPhoto:
        this.state.photos[(this.state.photos.indexOf(this.state.currentPhoto) + 1) % this.state.photos.length]
    });

  }
  fullPhotoPrev(event) {
    let i = this.state.photos.indexOf(this.state.currentPhoto);
    if (i > 0) {
      i--;
    }
    else {
      i = this.state.photos.length - 1;
    }
    this.setState({
      currentPhoto:
        this.state.photos[i]
    });

  }

  render() {
    return (
      <div className={Style.main}>
        <h1><Clink to="/gallery">Galeria</Clink></h1>
        {
          this.props.location.pathname==="/gallery"||this.props.location.pathname==="/gallery/"?"":<Navigation param={galleries} />
          }        
        <Switch>
          {galleries.map((i, k) =>
              <Route path={`${this.props.match.url}/${i[0].toString().toLowerCase().replace("_", "-")}`} key={k}>
                <SubGallery category={i[0]} name={i[1]}></SubGallery>
              </Route>
            )}
          <Route path={`${this.props.match.url}/`}>
            <Navigation s={true} param={galleries} />
          </Route>
                    
        </Switch>
      </div>
    );
  }
}

export default Gallery;


