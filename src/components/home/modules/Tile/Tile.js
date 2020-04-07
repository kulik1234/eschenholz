import React from 'react';
import Style from './css/Tile.module.css';
import UserContext from '../../../../UserContext';
import Blank from './static/dd.jpg';
import {withRouter} from 'react-router';



class Tile extends React.Component {
    
    constructor(props) {
        super(props)
        this.goto = this.goto.bind(this)
      }
    goto(){
        this.props.history.push(this.props.to);
    }
    render(){
        return (
        <div className={Style.main} onClick={this.goto}>
            <div>
                <img src={Blank} alt="img" height="400px" width="300px"></img>
            </div>
            <div className={Style.desc}>
                {this.props.children}
            </div>
        </div>
        );
    }
}
Tile.contextType = UserContext;

export default withRouter(Tile); 