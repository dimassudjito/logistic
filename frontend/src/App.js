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
      <table>
        <tr>
          <th>Product</th>
          <th>Category</th>
          <th>Manufacturer</th>
          <th>Location</th>
        </tr>
      </table>
      {data.getProducts.map((product) => (
        <tr>
          <td>{product.name ? product.name : '<Empty>'}</td>
          <td>{product.category ? product.category : '<Empty>'}</td>
          <td>{product.manufacturer ? product.manufacturer : '<Empty>'}</td>
          <td>{product.location ? product.location : '<Empty>'}</td>
        </tr>
      ))}
    </div>
  )
}

export default App
