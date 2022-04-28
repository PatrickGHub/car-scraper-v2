const axios = require('axios')
const { saveToDatabase } = require('./database.js')

const handler = async (event, context) => {
  const models = [
    's3sb',
    's3limo',
    'rs3sb',
    'rs3limo',
    's4limo',
    'rs4avant',
    'rs5sb',
    'rs5coupe',
    'rs6avant',
    'a7sb',
    's7sb',
    'rs7sb',
    'rsq8',
    'ttcoupe',
    'ttscoupe',
    'ttrscoupe',
    'r8rwd',
    'r8spyderrwd',
    'r8performance',
    'r8spyderperformance'
  ]
  const formattedModels = models.join('%2Ccarline.')

  const formattedDate = new Date().toISOString().split('T')[0]
  const svd = `svd=svd-${formattedDate}t15_00_00_501-13`
  const size = '&size=300'
  const preset = '&preset=geo%3A-27.4660994_153.023588_5000_km_4000'
  const filter = `$filter=${formattedModels}`

  const url = `https://scs.audi.de/api/v2/search/filter/auuc/en?${svd}${size}${preset}${filter}`

  const { data } = await axios.get(url)

  const foundCars = data.vehicleBasic.map((vehicle) => {
    return {
      manufacturer: 'Audi',
      model: vehicle.symbolicCarline.description.replace('Audi ', ''),
      bodyType: vehicle.bodyType.description,
      gearbox: vehicle.gearType.description,
      engine: vehicle.modelCode.description,
      carId: vehicle.decodedCarId,
      listingDate: vehicle.dateOffer,
      updatedDate: vehicle.lastChange,
      price: vehicle.typedPrices[0].amount,
      modelYear: vehicle.modelYear,
      mileage: vehicle.used.mileage,
      soldBy: vehicle.dealer.name,
      postCode: vehicle.dealer.zipCode
    }
  })

  await saveToDatabase(foundCars)
}

module.exports = { handler }
