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
        let screen = <div className={LoadingScreenStyle.main}>full photo</div>;
        return ReactDOM.createPortal(screen,this.el);
    }
}

export default FullPhoto;