import React from 'react';
import Style from './css/GalleryImageStyles.module.css';
import UserContext from '../../../UserContext';

class GalleryImage extends React.Component {


    constructor(props){
      super(props);
      this.state={
        
      };
    }

    render() {
      return (
        <div className={Style.main}>
            <div className={Style.description}>{
            //this.props.desc
            }
            {this.props.admin?<button>usun</button>:""}
            </div>
            <div className={Style.imageItem}>
                <div>
                <img src={this.props.src} 
                    className={Style.image} 
                    width="240px" 
                    alt={this.props.alt}
                    onClick={this.props.show}
                    ></img>
                <div className={Style.date}>{
                //this.props.date.split("T")[0]
                }</div>
                  </div>                     
            </div>
            
                <div>{
                //this.props.category
                }
                </div>
                <div>{
                //this.props.name
                }</div>
                
        </div>
      );
    }
  }

  GalleryImage.contextType = UserContext;
  
  export default GalleryImage;
