import axios from "axios";
import React, { Component } from "react";

export default class dumy extends Component {
  constructor() {
    super();
    this.state = {
      studentList: [],
    };
  }

  cmponentDidMount = () => {
    axios
      .get("https://localhost:44351/api/Roles")
      .then((res) => {
        debugger;
        this.setState({ studentList: res.data });
        console.log("res.data", res.data);
        console.log("this.state", this.state);
        console.log("final", this.state.studentList);
      })
      .catch(() => {
        alert("ajdbhfkjahdbfha");
      });
  };

  render() {
    return (
      <div onLoad={this.cmponentDidMount}>
        <table>
          <thead>
            <th>kasbd</th>
            <th>kasbd</th>
          </thead>
          <tbody>
            {this.state.map((item) => (
              <tr key={item.id}>
                <td>{item.rolesName}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
