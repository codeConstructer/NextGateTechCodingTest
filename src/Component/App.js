import React, { Component } from "react";
import Search from "./Search";
import Table from "./Table";
import data from "../Data/fundRecord.json";

export class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   initialData: [],
    //   fundsToDisplay: [],
    //   totalFilteredResultCount: null,
    //   searchInputText: "",
    // };

    this.state = {
      initialData: data,
      fundsToDisplay: this.getOnlyFirstHundredResults(data),
      totalFilteredResultCount: null,
      searchInputText: "",
      alertTotal: null,
      fundWithTrue: null,
      fundWithFalse: null,
    };

    // this.getDataFromfirebase();
  }
  

  getDataFromfirebase = () => {
    fetch("https://ngt-with-data.firebaseio.com/").then((response) => {
      this.setState({
        ...this.state,
        initialData: response.data,
        fundsToDisplay: this.getOnlyFirstHundredResults(response.data),
      });
    });
  };

  getOnlyFirstHundredResults = (funds) => {
    if (funds.length < 100) {
      return funds;
    }
    const result = [];

    for (let i = 0; i < 100; i++) {
      result.push(funds[i]);
    }
    return result;
  };

  findInText = (text, searchText) => {
    return text.toLowerCase().includes(searchText.toLowerCase());
  };

  filterSearchInput = (searchText) => {
    if (searchText.length > 2) {
      let alertTotal = 0;
      let fundWithTrue = 0;
      let fundWithFalse = 0;
      const filteredData = this.state.initialData.filter((fund) => {
        const isMatchfound =
          this.findInText(fund.fund_name, searchText) ||
          this.findInText(fund.subfund_name, searchText) ||
          this.findInText(fund.share_class_name, searchText);

        if (isMatchfound) {
          alertTotal += parseInt(fund.nb_alerts);
          if (fund.report_status == "True") {
            fundWithTrue++;
          } else {
            fundWithFalse++;
          }
        }
        return isMatchfound;
      });

      // const totalAlert = data.reduce((total, record) => {
      //   total += record.nb_alerts;
      //   return total;
      // }, 0);

      /* const Table = () => {
        return (
          <>
            <table>
              {data.map(record => {
                <tr><td>{record.name}</td><td>{record.nb_alerts}</td></tr>
              })}
            </table>
            <div> Total debt: {totalAlert} </div>
          </>
        )
      }*/

      this.setState({
        ...this.state,
        fundsToDisplay: this.getOnlyFirstHundredResults(filteredData),
        searchInputText: searchText,
        totalFilteredResultCount: filteredData.length,
        alertTotal,
        fundWithTrue,
        fundWithFalse,
      });
    } else {
      this.setState({
        ...this.state,
        fundsToDisplay: this.getOnlyFirstHundredResults(this.state.initialData),
        totalFilteredResultCount: null,
        totalFilteredalertCount: null,
        alertTotal: null,
        fundWithTrue: null,
        fundWithFalse: null,
        searchInputText: searchText,
      });
    }
  };

  render() {
    return (
      <div>
        <Search
          searchInputText={this.state.searchInputText}
          filterSearchInput={this.filterSearchInput}
        />
        <h1 className="bg-primary text-center">Fund Data Table</h1>
        <Table
          funds={this.state.fundsToDisplay}
          totalFilteredResultCount={this.state.totalFilteredResultCount}
          alertTotal={this.state.alertTotal}
          fundWithTrue={this.state.fundWithTrue}
          fundWithFalse={this.state.fundWithFalse}
        />
      </div>
    );
  }
}

export default App;
