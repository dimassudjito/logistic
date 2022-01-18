import React from 'react'
import { useQuery, gql } from '@apollo/client'

const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      id
      name
      category
      manufacturer
    }
  }
`

function App() {
  const { data } = useQuery(GET_PRODUCTS)
  console.log(data.getProducts)
  return (
    <div>
      {/* Display list of products */}
      <table>
        <tr>
          <th>Product Name</th>
          <th>Category</th>
          <th>Manufacturer</th>
          <th>Location</th>
          <th>City</th>
          <th>Delete</th>
          <th>Edit</th>
        </tr>
        {data.getProducts.map((product) => (
          <tr>
            <td>{product.name ? product.name : '(Empty)'}</td>
            <td>{product.category ? product.category : '(Empty)'}</td>
            <td>{product.manufacturer ? product.manufacturer : '(Empty)'}</td>
            <td>{product.location ? product.location : '(Empty)'}</td>
            <td>(Empty)</td>
            <td>
              <button>Delete</button>
            </td>
            <td>
              <button>Edit</button>
            </td>
          </tr>
        ))}
      </table>
      <hr />
      {/* Form to add product */}
      <h1>Add a product</h1>
      <label>Product Name*</label>
      <input />
      <br />
      <label>Category</label>
      <input />
      <br />
      <label>Manufacturer</label>
      <input />
      <br />
      <label>Location</label>
      <input />
      <br />
      <button>Submit</button>
      <hr />
      {/* Form to edit product  */}
      <h1>Edit a product</h1>
      <label>Product Name*</label>
      <input />
      <br />
      <label>Category</label>
      <input />
      <br />
      <label>Manufacturer</label>
      <input />
      <br />
      <label>Location</label>
      <input />
      <br />
      <button>Submit</button>
      <hr />
      <h1>Add a location</h1>
      <label>Location Name*</label>
      <input />
      <br />
      <label>City</label>
      <input />
      <br />
      <button>Submit</button>
    </div>
  )
}

export default App
