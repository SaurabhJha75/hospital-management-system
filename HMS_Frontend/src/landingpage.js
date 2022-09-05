import React, { Component } from 'react';
import Image from "./images/hospitalmanage.jpg";
import './home.css'
class Landing extends Component {
    
    render() {
        return (
            <div className="home-container" style={{  
                backgroundImage: "url("+Image+")",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width:'1000px'
              }}>
                
            </div>
        );
    }

    
}

export default Landing;