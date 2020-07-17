import React, { Component } from "react";
import * as ReactBootStrap from "react-bootstrap";

const Table = (props) => {
  const renderTable = (fundtable, index) => {
    return (
      <tr key={fundtable.index}>
        <td>{fundtable.index}</td>
        <td>{fundtable.fund_name}</td>
        <td>{fundtable.fund_id}</td>
        <td>{fundtable.subfund_name}</td>
        <td>{fundtable.subfund_id}</td>
        <td>{fundtable.share_class_name}</td>
        <td>{fundtable.share_class_id}</td>
        <td>{fundtable.date}</td>
        <td>{fundtable.report_status}</td>
        <td>{fundtable.nb_alerts}</td>
      </tr>
    );
  };

  return (
    <div>
      {props.totalFilteredResultCount && (
        <h5>Number of funds after filter : {props.totalFilteredResultCount}</h5>
      )}
      <h5>True Value : {props.fundWithTrue}</h5>
      <h5>False Value : {props.fundWithFalse}</h5>
      <h5>Alert Value : {props.alertTotal}</h5>

      <div className="table">
        <ReactBootStrap.Table striped bordered hover>
          <thead>
            <tr>
              <th>index</th>
              <th>fund_name</th>
              <th>fund_id</th>
              <th>subfund_name</th>
              <th>subfund_id</th>
              <th>share_class_name</th>
              <th>share_class_id</th>
              <th>date</th>
              <th>report_status</th>
              <th>nb_alerts</th>
            </tr>
          </thead>
          <tbody>{props.funds.map(renderTable)}</tbody>
        </ReactBootStrap.Table>
      </div>
    </div>
  );
};

export default Table;
