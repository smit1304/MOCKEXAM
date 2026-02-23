import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";

// Query to fetch contacts
const GET_CONTACTS = gql`
  query GetContacts {
    contacts {
      id
      contactId
      name
      email
      phone
      address
    }
  }
`;

const DELETE_CONTACT = gql`
  mutation DeleteContact($id: ID!) {
    deleteContact(id: $id) {
      id
    }
  }
`;

function ContactList() {
  const { loading, error, data, refetch } = useQuery(GET_CONTACTS);
  const [deleteContact] = useMutation(DELETE_CONTACT);
  const handleDelete = (id) => {
    deleteContact({ variables: { id } })
      .then(() => refetch()) // Refresh the list after deleting
      .catch((err) => console.error("Error deleting contact:", err));
  };
  if (loading) return <Spinner animation="border" />;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>Contact List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Contact ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.contactId}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.address}</td>
              <td>
                <Link to={`/editcontact/${contact.id}`}>Edit</Link>
              </td>
              <td>
                <Link to={`/editcontact/${contact.id}`} className="btn btn-sm btn-primary me-2">Edit</Link>
                <Button variant="danger" size="sm" onClick={() => handleDelete(contact.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="secondary" onClick={() => refetch()}>
        Refetch
      </Button>
    </div>
  );
}

export default ContactList;
