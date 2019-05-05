import React from 'react';
import axios from 'axios';
import InsertConfirmation from "./InsertConfirmation.jsx";
import UpdateConfirmation from "./UpdateConfirmation.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      guests: '',
      validEmail: true
    };
    this.emailValidate = this.emailValidate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    document.getElementById('update-confirmation').className = "confirmationColor transparent";
    this.setState({
      [event.target.id]: event.target.value.trim(),
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.emailValidate();
    const {firstName, lastName, email, guests} = this.state;
    if(this.state.validEmail === true && firstName !== '' && lastName !=='' && guests !==''){
    axios.post('/rsvps', {
    firstName,
    lastName,
    email,
    guests,
    })
    .then(results => {
      console.log(results)
      if (this.state.validEmail === true) {
        if (results.status === 201) {
          document.getElementById('insert-confirmation').className = "confirmationColor";
        }
        if (results.status === 202) {
          document.getElementById('update-confirmation').className = "confirmationColor";
        }
      }
      })
      .catch(error => console.error(error));
    }
  }

  render() {
    return (
      <div className="container">
      <form>
        <h2>Please RSVP below...</h2>
        <label>First Name: </label>
        <input type="text" id="firstName" onChange={this.handleChange}></input>
        <label>Last Name: </label>
        <input type="text" id="lastName" onChange={this.handleChange}></input>
        <label>Email: </label>
        <input type="text" id="email" onChange={this.handleChange}></input>
        <div className = "invalid-email transparent" id="validateEmail">
            *Please enter a valid email address to save your spot at the party!
          </div>
        <label>Number of Guests: </label>
        <input type="number" min="0" id="guests" onChange={this.handleChange}></input>
        <button type="submit" value="Submit" onClick={this.handleSubmit}>
          RSVP NOW
        </button>
        <div className = "confirmation transparent" id="insert-confirmation">
            <InsertConfirmation rsvp = {this.state}/>
        </div>
        <div className = "confirmation transparent" id="update-confirmation">
            <UpdateConfirmation rsvp = {this.state}/>
          </div>
      </form>
    </div>
    );
  }
}

export default App;
