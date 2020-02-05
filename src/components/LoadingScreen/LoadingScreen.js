import React from 'react';
import ReactDOM from 'react-dom';
import Style from './css/MainLoadingScreenStyles.module.css'

const modalRoot = document.getElementById("body"); 

class LoadingScreen extends React.Component {

    constructor(props) {
        super(props);
        this.el = document.createElement('div');
      }

    componentDidMount() {
        // The portal element is inserted in the DOM tree after
        // the Modal's children are mounted, meaning that children
        // will be mounted on a detached DOM node. If a child
        // component requires to be attached to the DOM tree
        // immediately when mounted, for example to measure a
        // DOM node, or uses 'autoFocus' in a descendant, add
        // state to Modal and only render the children when Modal
        // is inserted in the DOM tree.
        modalRoot.appendChild(this.el);
      }
    
      componentWillUnmount() {
        modalRoot.removeChild(this.el);
      }

    render() {
        const screen = 
        <div className={Style.main}>
            <div className={Style.animation}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>;
      return (
        ReactDOM.createPortal(screen,this.el)
      );
    }
  }
  
  export default LoadingScreen;