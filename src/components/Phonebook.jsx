import React, { useState } from 'react';

import 'components/phonebook.css';

const ContactForm = ({ addContact, contacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert('This contact already exists!');
      return;
    }

    addContact(name, number);
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Name</p>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я])$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <p>Number</p>
      <input
        type="tel"
        name="number"
        pattern="+?\d{0,4}[-.\s]??\d1,3??\d1,3??[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={e => setNumber(e.target.value)}
      />
      <button className="buttonAdd" type="submit">
        Add Contact
      </button>
    </form>
  );
};

const ContactItem = ({ contact, handleDeleteContact }) => {
  const handleDelete = () => {
    handleDeleteContact(contact.id);
  };

  return (
    <li>
      {contact.name} - {contact.number}
      <button className="buttonDelete" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};

const ContactList = ({ contacts, filter, handleDeleteContact }) => {
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className="contactList">
      {filteredContacts.map(contact => (
        <ContactItem
          key={contact.id}
          contact={contact}
          handleDeleteContact={handleDeleteContact}
        />
      ))}
    </ul>
  );
};

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div className="filter">
      <label>
        Filter contacts by name:
        <input
          type="text"
          value={filter}
          onChange={e => handleFilterChange(e.target.value)}
        />
      </label>
    </div>
  );
};

const Phonebook = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    const newContact = {
      id: Date.now(),
      name,
      number,
    };
    setContacts([...contacts, newContact]);
  };

  const handleFilterChange = value => {
    setFilter(value);
  };

  const handleDeleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="phonebook">
      <h1>Phonebook</h1>
      <div className="contacts">
        <ContactForm addContact={addContact} contacts={contacts} />
      </div>

      <h1>Contacts</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <ContactList
        contacts={contacts}
        filter={filter}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default Phonebook;