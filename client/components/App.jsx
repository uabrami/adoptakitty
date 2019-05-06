import React from 'react';
import axios from 'axios';
import InsertConfirmation from "./InsertConfirmation.jsx";
import DeleteConfirmation from "./DeleteConfirmation.jsx";
import CatImageGallery from "./gallery.jsx";
// import '@vaadin/vaadin-button/vaadin-button.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      breed: '',
      image: '',
      city: '',
      state:'',
      firstname: '',
      lastname: '',
      email: '',
      week: '',
      weekday: '',
      timeblock: '',
      catid: 1,
      validEmail: true,
      data: '',
    };
    this.emailValidate = this.emailValidate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteOwner = this.deleteOwner.bind(this);
  }

  componentDidMount(){
    axios.get('/cats/info')
    .then((results) => {
      this.setState({
        data: results.data,
      });
    });
  }
  emailValidate() {
    if (this.state.email === '' || !(this.state.email).includes('@')) {
      document.getElementById('validateEmail').className = "invalid-email";
      this.setState({
        validEmail: false
      })
    } else {
      document.getElementById('validateEmail').className = "invalid-email transparent";
      this.setState({
        validEmail: true
      })
    }
  }

  handleChange(event) {
    event.preventDefault();
    document.getElementById('insert-confirmation').className = "confirmationColor transparent";
    this.setState({
      [event.target.id]: event.target.value.trim(),
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.emailValidate();
    const {firstname, lastname, email, week, weekday, timeblock, catid} = this.state;
    if(this.state.validEmail === true){
    axios.post('/owner/add', {
      firstname,
      lastname,
      email,
      week,
      weekday,
      timeblock,
      catid
    })
    .then(results => {
      console.log("post results", results)
      if (this.state.validEmail === true) {
        if (results.status === 201) {
          document.getElementById('insert-confirmation').className = "confirmationColor";
        }
        // if (results.status === 202) {
        //   document.getElementById('update-confirmation').className = "confirmationColor";
        // }
      }
      })
      .catch(error => console.error(error));
    }
  }

  deleteOwner(event) {
    event.preventDefault();
    this.emailValidate();
    document.getElementById('delete-confirmation').className = "confirmationColor transparent";
    const {email} = this.state;
    if(this.state.validEmail === true){
    axios.post('/owner/delete', {
      email,
    })
    .then(results => {
      console.log("delete results", results)
      if (this.state.validEmail === true) {
        if (results.status === 200) {
          document.getElementById('delete-confirmation').className = "confirmationColor";
        }
      }
      })
      .catch(error => console.error(error));
    }
  }

  render() {
    return (
      <div className="main">
        <div className="header">
          <h2>Cat-in-a-Box!</h2>
          {/* <img src='https://s3-us-west-1.amazonaws.com/mvpuma/catsinabox.webp' width="100px" height="100px"></img> */}
        </div>
        <div className="gallery" id="gallery">
        <CatImageGallery data = {this.state.data}/>
        </div>
        <div className="container">
        <form>
          <h2>Schedule or Update your video consultation...</h2>
          <label>First Name: </label>
          <input type="text" id="firstname" onChange={this.handleChange}></input>
          <label>Last Name: </label>
          <input type="text" id="lastname" onChange={this.handleChange}></input>
          <label>Email: </label>
          <input type="text" id="email" onChange={this.handleChange}></input>
          <div className = "invalid-email transparent" id="validateEmail">
              *Please enter a valid email address
            </div>
            <label>Week: </label>
          <select id="week" onChange={this.handleChange}>
            <option selected value="chooseWeek">Choose a week</option>
              <option value="current week">this week</option>
              <option value="next week">next week</option>
              <option value="two weeks">in two weeks</option>
              <option value="three weeks">in three weeks</option>
          </select>
          <label>Weekday: </label>
          <select id="weekday" onChange={this.handleChange}>
            <option selected value="chooseDay">Choose a day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          <label>Time Block: </label>
          <select id="timeblock" onChange={this.handleChange}>
            <option selected value="chooseTime">choose a time</option>
            <option  value="10am-12pm">10am-12pm</option>
            <option value="12pm-2pm">12pm-2pm</option>
            <option value="2pm-4pm">2pm-4pm</option>
            <option value="4pm-6pm">4pm-6pm</option>
            <option value="6pm-8pm">6pm-8pm</option>
          </select>
          <button className="button" type="submit" value="Claim your Kitty!" onClick={this.handleSubmit}>
            Claim your Kitty!
          </button>
          <div className = "confirmation transparent" id="insert-confirmation">
              <InsertConfirmation owner = {this.state}/>
          </div>
        </form>
        <div>
          <button className="deleteButton" value="Cancel your appointment" onClick={this.deleteOwner}> Cancel your appointment </button>
            <div className = "confirmation transparent" id="delete-confirmation">
              <DeleteConfirmation owner = {this.state}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
