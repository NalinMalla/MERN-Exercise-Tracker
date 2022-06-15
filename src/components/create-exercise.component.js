import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    //this setup
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      userName: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  //A LifeCycle method.
  //React calls these methods automatically at different points.
  //The 'componentDidMount()' method is called automatically right before anything is displayed on the page. So this loads before the component CreateExercise.
  componentDidMount() {
    axios.get('http://localhost:5000/users/').then(res =>{
      if(res.data.length > 0){
        this.setState({
          users: res.data.map(user => (""+user.userName.firstName+" "+user.userName.middleName+" "+user.userName.familyName)),
          userName: this.state.users[0],
        })
      }
    }).catch(err=>{console.log(err)})
  }

  onChangeUserName(e) {
    this.setState({
      userName: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault(); //Prevents Default HTML form behavior to take place and do what we define here.
    const exercise = {
      userName: this.state.userName,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    console.log(exercise);

    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => console.log(res.data)).catch(err=>{console.error(err)});

    // window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              required
              className="form-control"
              onChange={this.onChangeUserName}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label>Description : </label>
            <input
              required
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>

          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>

          <div className="form-group">
            <label>Date : </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
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
