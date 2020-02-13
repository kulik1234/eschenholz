import React from 'react';
import Style from './css/GalleryImageStyles.module.css';


class GalleryImage extends React.Component {




    render() {
      return (
        <div className={Style.main}>
            <div className={Style.imageItem}>
                <div>
                    <img src={this.props.src} className={Style.image} width="240px" alt={this.props.alt}></img>
                </div>
            
            </div>
            
        </div>
      );
    }
  }
  
  export default GalleryImage;
