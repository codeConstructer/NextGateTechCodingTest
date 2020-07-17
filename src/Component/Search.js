import React, { Component } from "react";
import "./Search.css";

class Search extends Component {
  constructor(props) {
    super(props);    
  }

  onChangeHandler = (event) => {
    this.props.filterSearchInput(event.target.value);
  };

  render() {
    return (
      <header>
        <div className="logo">NextGateTech</div>
        <form>
          <center>
          <input id="search"
            type="text"
            placeholder="Start typing the Fund or Sub-fund or Shareclass name here"
            value={this.props.searchInputText}
            onChange={this.onChangeHandler}
          />
          </center>
        </form>        
        <hr />
      </header>
    );
  }
}

export default Search;

