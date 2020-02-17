import React from 'react';
import ReactDOM from 'react-dom';
import Style from './css/FullPhotoStyles.module.css';
import LoadingScreenStyle from '../../LoadingScreen/css/MainLoadingScreenStyles.module.css';

const modalRoot = document.getElementById("body"); 

class FullPhoto extends React.Component {

    constructor(props) {
        super(props);
        this.el = document.createElement('div');
      }
      componentDidMount() {
        modalRoot.appendChild(this.el);
      }
      componentWillUnmount() {
        modalRoot.removeChild(this.el);
      }

    render(){
        let screen = 
          <div className={LoadingScreenStyle.main} onClick={this.props.hide}>
            <div className={Style.imgContainer} data="image">
              <div className={Style.move + " " + Style.left} data="image" onClick={this.props.prev}>&#60;</div>
              <img className={Style.img} src={this.props.photo.path} alt={this.props.alt}></img>
              <div className={Style.move + " " + Style.right} data="image" onClick={this.props.next}>&#62;</div>
              <div className={Style.x}>
                X
         </div>
            </div>
          </div>;
        return ReactDOM.createPortal(screen,this.el);
    }
}

export default FullPhoto;