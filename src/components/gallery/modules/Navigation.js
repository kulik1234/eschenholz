import React from 'react';
import { Link } from 'react-router-dom';
import Style from './css/NavigationStyles.module.css';

class Navigation extends React.Component {

    render(){
        let style = this.props.s?Style.s:"";
        return <div className={Style.main+" "+style}>
            {this.props.param.map(
                (i,k)=>
                {
                    let a = [i[0].toString().toLowerCase().replace("_","-"),i[1]];
                    
                
                
                return <Link to={"/gallery/"+a[0]} key={k}>{a[1]}</Link>
            }
                )}
 
        </div>;
    }
}

export default Navigation;