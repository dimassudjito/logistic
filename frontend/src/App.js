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
const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($productId: ID!, $productInput: ProductInput) {
    updateProduct(productId: $productId, productInput: $productInput) {
      name
      category
      manufacturer
      location
    }
  }
`
const emptyProductForm = {
  name: '',
  category: '',
  manufacturer: '',
  location: ''
}

function App() {
  const [createProductForm, setCreateProductForm] = useState(emptyProductForm)
  const [editProductForm, setEditProductForm] = useState(emptyProductForm)
  const [editedProduct, setEditedProduct] = useState('')

  const products = useQuery(GET_PRODUCTS)
  const [createProduct] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [GET_PRODUCTS]
  })
  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [GET_PRODUCTS]
  })
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [GET_PRODUCTS]
  })

  const createProductHandler = (evt) => {
    const value = evt.target.value
    setCreateProductForm({ ...createProductForm, [evt.target.name]: value })
  }

  const editProductHandler = (evt) => {
    const value = evt.target.value
    setEditProductForm({ ...editProductForm, [evt.target.name]: value })
  }

  return (
    <div>
      {/* Display list of products */}
      <table>
        <tbody>
          <tr>
            <th>ID</th>
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
                  <td>{product.id ? product.id : '(Empty)'}</td>
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
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        setEditedProduct(product.id)
                      }}
                    >
                      Edit
                    </button>
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
          setCreateProductForm(emptyProductForm)
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
      <p>Select a product from the product table</p>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          updateProduct({
            variables: {
              productId: editedProduct,
              productInput: editProductForm
            }
          })
          setEditProductForm(emptyProductForm)
        }}
      >
        <label>Selected product ID</label>
        <input disabled value={editedProduct} />
        <br />
        <label>Product Name*</label>
        <input
          name="name"
          value={editProductForm.name}
          onChange={editProductHandler}
        />
        <br />
        <label>Category</label>
        <input
          name="category"
          value={editProductForm.category}
          onChange={editProductHandler}
        />
        <br />
        <label>Manufacturer</label>
        <input
          name="manufacturer"
          value={editProductForm.manufacturer}
          onChange={editProductHandler}
        />
        <br />
        <label>Location</label>
        <input
          name="location"
          value={editProductForm.location}
          onChange={editProductHandler}
        />
        <br />
        <button>Submit</button>
      </form>
      <hr />
      <form>
        <h1>Add a location</h1>
        <label>Location Name*</label>
        <input />
        <br />
        <label>City</label>
        <input />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App
