import 'components/phonebook.css';
import React, { Component } from 'react';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filter: '',
      name: '',
      number: '',
    };
  }

  addContact = (name, number) => {
    const newContact = {
      id: Date.now(),
      name,
      number,
    };
    this.setState(prevState => ({
      contacts: [prevState.contacts, newContact],
      name: '',
      number: '',
    }));
  };

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleNumberChange = event => {
    this.setState({ number: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { name, number } = this.state;
    const { contacts } = this.props;

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert('This contact already exists!');
      return;
    }

    this.props.addContact(name, number);
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <p>Name</p>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я])$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={this.handleNameChange}
        />
        <p>Number</p>
        <input
          type="tel"
          name="number"
          pattern="+?\d{0,4}[-.\s]??\d1,3??\d1,3??[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={this.handleNumberChange}
        />
        <button className="buttonAdd" type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}

class ContactItem extends React.Component {
  handleDeleteContact = () => {
    const { contact, handleDeleteContact } = this.props;
    handleDeleteContact(contact.id);
  };

  render() {
    const { contact } = this.props;

    return (
      <li>
        {contact.name} - {contact.number}
        <button className="buttonDelete" onClick={this.handleDeleteContact}>
          Delete
        </button>
      </li>
    );
  }
}

class ContactList extends React.Component {
  render() {
    const { contacts, filter, handleDeleteContact } = this.props;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <ul className='contactList'>
        {filteredContacts.map(contact => (
          <ContactItem
            key={contact.id}
            contact={contact}
            handleDeleteContact={handleDeleteContact}
          />
        ))}
      </ul>
    );
  }
}

class Filter extends React.Component {
  handleFilterChange = event => {
    const { handleFilterChange } = this.props;
    handleFilterChange(event.target.value);
  };

  render() {
    const { filter } = this.props;

    return (
      <div className='filter'>
        <label>
          Filter contacts by name:
          <input
            type="text"
            value={filter}
            onChange={this.handleFilterChange}
          />
        </label>
      </div>
    );
  }
}

class Phonebook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filter: '',
    };
  }

  addContact = (name, number) => {
    const contact = {
      id: Date.now().toString(),
      name: name,
      number: number,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  handleFilterChange = value => {
    this.setState({ filter: value });
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <div className="phonebook">
        <h1>Phonebook</h1>
        <div className="contacts">
          <ContactForm addContact={this.addContact} contacts={contacts} />
        </div>

        <h1>Contacts</h1>
        <Filter filter={filter} handleFilterChange={this.handleFilterChange} />
        <ContactList
          contacts={contacts}
          filter={filter}
          handleDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

export default Phonebook;
