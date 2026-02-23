// typeDefs.js
const typeDefs = `#graphql
  type Contact {
    id: ID!
    contactId: String!
    name: String!
    email: String!
    phone: String!
    address: String!
  }

  type Query {
    contacts: [Contact]
    contact(id: ID!): Contact
  }

  type Mutation {
    createContact(
      contactId: String!
      name: String!
      email: String!
      phone: String!
      address: String!
    ): Contact
    
    updateContact(
      id: ID!
      contactId: String!
      name: String!
      email: String!
      phone: String!
      address: String!
    ): Contact
    
    deleteContact(id: ID!): Contact
    
    deleteContactByEmail(email: String!): Contact
  }
`;

export default typeDefs;