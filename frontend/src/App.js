import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

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
const CREATE_PRODUCT = gql`
  mutation CreateProduct($productInput: ProductInput) {
    createProduct(productInput: $productInput) {
      category
      name
      manufacturer
    }
  }
`
const DELETE_PRODUCT = gql`
  mutation DeleteProduct($productId: ID!) {
    deleteProduct(productId: $productId)
  }
`

const emptyCreateProductForm = {
  name: '',
  category: '',
  manufacturer: '',
  location: ''
}

function App() {
  const [createProductForm, setCreateProductForm] = useState(
    emptyCreateProductForm
  )

  const products = useQuery(GET_PRODUCTS)
  const [createProduct] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [GET_PRODUCTS]
  })
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [GET_PRODUCTS]
  })

  const createProductHandler = (evt) => {
    const value = evt.target.value
    setCreateProductForm({ ...createProductForm, [evt.target.name]: value })
  }

  return (
    <div>
      {/* Display list of products */}
      <table>
        <tbody>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Manufacturer</th>
            <th>Location</th>
            <th>City</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
          {products.loading === false
            ? products.data.getProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name ? product.name : '(Empty)'}</td>
                  <td>{product.category ? product.category : '(Empty)'}</td>
                  <td>
                    {product.manufacturer ? product.manufacturer : '(Empty)'}
                  </td>
                  <td>{product.location ? product.location : '(Empty)'}</td>
                  <td>(Empty)</td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        deleteProduct({ variables: { productId: product.id } })
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button>Edit</button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      <hr />
      {/* Form to add product */}
      <h1>Add a product</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          createProduct({ variables: { productInput: createProductForm } })
          setCreateProductForm(emptyCreateProductForm)
        }}
      >
        <label>Product Name*</label>
        <input
          name="name"
          value={createProductForm.name}
          onChange={createProductHandler}
        />
        <br />
        <label>Category</label>
        <input
          name="category"
          value={createProductForm.category}
          onChange={createProductHandler}
        />
        <br />
        <label>Manufacturer</label>
        <input
          name="manufacturer"
          value={createProductForm.manufacturer}
          onChange={createProductHandler}
        />
        <br />
        <label>Location</label>
        <input
          name="location"
          value={createProductForm.locations}
          onChange={createProductHandler}
        />
        <br />
        <button type="submit">Submit</button>
      </form>

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
