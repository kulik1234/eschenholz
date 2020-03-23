import React from 'react';
import { Link } from 'react-router-dom';
import Style from './CLink.module.css';

class CLink extends React.Component {
    render(){
        return(
            <Link {...this.props} className={Style.main}>{this.props.children}</Link>
        )
    } 
    
}

export default CLink;