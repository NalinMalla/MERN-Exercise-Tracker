import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    //this setup
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeMiddleName = this.onChangeMiddleName.bind(this);
    this.onChangeFamilyName = this.onChangeFamilyName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      firstName: "",
      middleName: "",
      familyName: "",
      email: "",
      password: "",
    };
  }

  //A LifeCycle method.
  //React calls these methods automatically at different points.
  //The 'componentDidMount()' method is called automatically right before anything is displayed on the page. So this loads before the component CreateExercise.
  componentDidMount() {
    this.setState({
      userName: "test user",
    });
  }

  onChangeFirstName(e) {
    this.setState({
      //Here, this is undefined and to make this refer to this class we do #this setup
      firstName: e.target.value,
    });
  }

  onChangeMiddleName(e) {
    this.setState({
      middleName: e.target.value,
    });
  }

  onChangeFamilyName(e) {
    this.setState({
      familyName: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault(); //Prevents Default HTML form behavior to take place and do what we define here.
    const user = {
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      familyName: this.state.familyName,
      email: this.state.email,
      password: this.state.password,
    };

    console.log(user);

    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data));

    this.setState({ userName: "" });
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>First name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.firstName}
              onChange={this.onChangeFirstName}
            />
          </div>
          
          <div className="form-group">
            <label>Middle name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.middleName}
              onChange={this.onChangeMiddleName}
            />
          </div>

          <div className="form-group">
            <label>Family name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.familyName}
              onChange={this.onChangeFamilyName}
            />
          </div>

          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>

          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              className="btn btn-primary"
              value="Create Exercise Log"
            />
          </div>
        </form>
      </div>
    );
  }
}
