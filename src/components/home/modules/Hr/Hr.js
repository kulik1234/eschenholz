import React from 'react';
import Style from './css/Hr.module.css';

class Hr extends React.Component {
    render(){
        return(
            <div className={Style.main}><hr></hr><hr></hr></div>
        );
    }
}

export default Hr;