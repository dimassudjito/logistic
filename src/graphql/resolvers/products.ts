const Product = require('../../models/Product')

module.exports = {
  Query: {
    async getProducts() {
      try {
        const products = await Product.find()
        return products
      } catch (err: any) {
        throw new Error(err)
      }
    }
  },
  Mutation: {
    async createProduct(
      _: any,
      {
        productInput: { name, category, manufacturer, location }
      }: {
        productInput: {
          name: string
          category: string
          manufacturer: string
          location: string
        }
      }
    ) {
      try {
        if (name.trim() === '') {
          throw new Error('Product name must not be empty')
        }
        const newProduct = new Product({
          name,
          category,
          manufacturer,
          location
        })
        const product = await newProduct.save()
        return product
      } catch (err: any) {
        throw new Error(err)
      }
    },
    async deleteProduct(_: any, { productId }: { productId: string }) {
      try {
        const product = await Product.findById(productId)
        if (product) {
          await product.delete()
        }
        return 'Product deleted successfully'
      } catch (err: any) {
        throw new Error(err)
      }
    },
    async updateProduct(
      _: any,
      {
        productId,
        productInput
      }: {
        productId: string
        productInput: {
          name: string
          category: string
          manufacturer: string
          location: string
        }
      }
    ) {
      try {
        let product = await Product.findById(productId)
        if (product) {
          // udpate each attribute in product
          for (const [key, val] of Object.entries(productInput)) {
            product[key] = val
          }
          await product.save()
          return product
        }
      } catch (err: any) {
        throw new Error(err)
      }
    }
  }
}
