import React from 'react';
import Style from './css/MainHomeStyles.module.css';
import Logo from './static/BigLogo.png';
import { Link } from 'react-router-dom';
import Tile from './modules/Tile/Tile';
import Hr from './modules/Hr/Hr';
class Home extends React.Component {
  render() {
    return (
      <div className={Style.main}>
        <div className={Style.container}>
          <div>
            <h1>Firma stolarska</h1>
          </div>
          <div className={Style.imageContainer}>
            <img className={Style.logo} src={Logo} alt="website logo" />
          </div>
          <div className={Style.shortDesc}>
          <Hr />
          <h2>W naszej ofercie są</h2>
          <div className={Style.tilesContainer}>
            <Tile to="/gallery/door">
            <h1>Drzwi</h1>
            <div>tutaj jest miejsce na opisanie tych fantastycznych drzwi</div>
            </Tile>
            <Tile to="/gallery/kitchen-furnitures">
            <h1>Meble</h1>
            <div>tutaj jest miejsce na opisanie tych fantastycznych mebli</div>
            </Tile>
            <Tile to="/gallery/stairs">
            <h1>Schody</h1>
            <div>tutaj jest miejsce na opisanie tych fantastycznych mebli</div>
            </Tile>
            
          </div>
          <Hr />
          </div>
          <div>
            <h2>Zapraszamy do kontaktu</h2>
            <ul className={Style.list}>
            <li><Link to="/contact">przez formularz kontaktowy</Link></li>
            <li><a href="mailto:abc@abc.pl">adres E-mail: abc@abc.pl</a></li>
            <li>
              dzwoniąc na numer telefonu
              <ul>
                <li>komórka 1: 111 111 111</li>
                <li>komórka 2: 222 222 222</li>
              </ul>
              </li>
          </ul>
          </div>
          <div>
            <h3>Jesteśmy dostępni w każdy dzień tygodnia</h3>
          </div>
          
        </div>

      </div>

    );
  }
}

export default Home;
