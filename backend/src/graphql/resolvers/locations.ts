const ProductLocation = require('../../models/Location')

type LocationInput = {
  name: String
  city?: String
}

module.exports = {
  Query: {
    async getLocations() {
      try {
        const location = await ProductLocation.find()
        return location
      } catch (err: any) {
        throw new Error(err)
      }
    }
  },
  Mutation: {
    async createLocation(
      _: any,
      { locationInput }: { locationInput: LocationInput }
    ) {
      try {
        if (!locationInput.name || locationInput.name.trim() === '') {
          throw new Error('Location name must not be null or empty')
        }
        const newLocation = new ProductLocation(locationInput)
        const location = await newLocation.save()
        return location
      } catch (err: any) {
        throw new Error(err)
      }
    }
  },
  Product: {
    locationInfo: async ({ location: locationId }: { location: string }) => {
      try {
        if (locationId) {
          const location = await ProductLocation.findOne({ _id: locationId })
          return location
        } else {
          return null
        }
      } catch (err: any) {
        throw new Error(err)
      }
    }
  }
}
