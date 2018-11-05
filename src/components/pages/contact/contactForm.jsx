import React from 'react';
import axios from 'axios';
import Loading from '../../common/loading/loading';
import SectionHeader from '../../common/components/header/sectionHeader';


// const hostname = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    };

    this.contactSubmit = this.contactSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  async contactSubmit() {
    const {
      email, message, firstName, lastName,
    } = this.state;
    try {
      this.setState({ loading: true });
      await axios.post('https://sfbeer-portal.herokuapp.com/api/v1/contactGuild', {
        email, message, first: firstName, last: lastName, toEmail: 'info@sfbrewersguild.org',
      });
      this.setState({
        loading: false,
        firstName: '',
        lastName: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      loading, email, message, firstName, lastName,
    } = this.state;
    return (
      <section className="blogPosts">
        <div className="container">

          <div className="grid">
            <div className="item">
              <SectionHeader
                title="Contact Us"
                icon="envelope"
                centered
              />
            </div>
          </div>

          <div className="grid align-center">
            <div className="item size-12">
              {
                loading ? <Loading /> :
                <form>
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    name="firstName"
                    value={firstName}
                    type="text"
                    aria-label="first name"
                    onChange={this.onChange}
                  />
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    name="lastName"
                    value={lastName}
                    type="text"
                    aria-label="last name"
                    onChange={this.onChange}
                  />
                  <label htmlFor="email">Email:</label>
                  <input
                    name="email"
                    value={email}
                    type="text"
                    aria-label="signup"
                    onChange={this.onChange}
                  />
                  <label htmlFor="message">Message:</label>
                  <textarea
                    name="message"
                    value={message}
                    aria-label="body"
                    onChange={this.onChange}
                  />
                  <button
                    className="input-group-button"
                    name="submit"
                    aria-label="submit"
                    onClick={this.contactSubmit}
                  >
                    Send
                  </button>
                </form>
              }
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ContactForm;
