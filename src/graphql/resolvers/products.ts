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
      if (name.trim() === '') {
        throw new Error('Product name must not be empty')
      }
      const newProduct = new Product({ name, category, manufacturer, location })
      const product = await newProduct.save()
      return product
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
    }
  }
}
