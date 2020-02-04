import React from 'react';
import Style from './css/ItemStyles.module.css';

class Item extends React.Component {
    render() {
      return (
        <div className={Style.main}>
            <span className={this.props.bolded?Style.bold:null}>{this.props.label}</span>
        </div>
      );
    }
  }
  
  export default Item;
