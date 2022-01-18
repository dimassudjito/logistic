const Product = require('../../models/Product')

type ProductInput = {
  name: String
  category?: String
  manufacturer?: String
  location?: String
}

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
        productInput
      }: {
        productInput: ProductInput
      }
    ) {
      try {
        if (!productInput.name || productInput.name.trim() === '') {
          throw new Error('Product name must not be null or empty')
        }
        const newProduct = new Product(productInput)
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
        productInput: ProductInput
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
