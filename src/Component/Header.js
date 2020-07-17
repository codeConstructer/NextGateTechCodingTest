import React, { Component } from 'react';
import './Header.css'


class Header extends Component {

    render() {
        return (
            <header>
                <div className="logo">NextGateTech</div>
                <center>
                    <select>
                        <option selected value="fundname">Fund Name</option>
                        <option value="subfundname">SubFund Name</option>
                        <option value="shareclassname">Shareclass Name</option>
                    </select>

                </center>
                <hr />
            </header>

        )
    }
}

export default Header;

/*<input />*/