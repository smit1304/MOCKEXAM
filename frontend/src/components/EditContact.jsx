import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useQuery, useMutation } from "@apollo/client/react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const GET_CONTACT = gql`
  query GetContact($id: ID!) {
    contact(id: $id) {
      contactId
      name
      email
      phone
      address
    }
  }
`;

const UPDATE_CONTACT = gql`
  mutation UpdateContact($id: ID!, $contactId: String!, $name: String!, $email: String!, $phone: String!, $address: String!) {
    updateContact(id: $id, contactId: $contactId, name: $name, email: $email, phone: $phone, address: $address) {
      id
      contactId
      name
      email
      phone
      address
    }
  }
`;

function EditContact() {
    const { id } = useParams();
    let navigate = useNavigate();
    
    const { loading, error, data } = useQuery(GET_CONTACT, { variables: { id } });
    const [updateContact] = useMutation(UPDATE_CONTACT);
    
    const [contact, setContact] = useState({ contactId: '', name: '', email: '', phone: '', address: '' });

    useEffect(() => {
        if (data) setContact(data.contact);
    }, [data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateContact({ 
            variables: { 
                id: String(id), 
                contactId: contact.contactId,
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
                address: contact.address
            } 
        }); 
        navigate('/contactlist');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <Form onSubmit={handleSubmit} className="mt-4">
            <h2>Edit Contact</h2>
            <Form.Group controlId="formContactId" className="mb-3">
                <Form.Label>Contact ID</Form.Label>
                <Form.Control
                    type="text"
                    name="contactId"
                    value={contact.contactId}
                    onChange={handleInputChange}
                    placeholder="Enter contact ID"
                />
            </Form.Group>
            
            <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={contact.name}
                    onChange={handleInputChange}
                    placeholder="Enter name"
                />
            </Form.Group>
            
            <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={contact.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                />
            </Form.Group>
            
            <Form.Group controlId="formPhone" className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    type="text"
                    name="phone"
                    value={contact.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone"
                />
            </Form.Group>
            
            <Form.Group controlId="formAddress" className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    name="address"
                    value={contact.address}
                    onChange={handleInputChange}
                    placeholder="Enter address"
                />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Update Contact
            </Button>
        </Form>
    );
}

export default EditContact;