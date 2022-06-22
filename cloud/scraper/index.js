const axios = require('axios')
const AWS = require('aws-sdk')
const { saveToDatabase } = require('./database.js')

const s3 = new AWS.S3()

const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const s3Object = await s3.getObject({
    Bucket: 'car-scraper-bucket',
    Key: 'cars.json'
  }).promise()

  const carsInS3 = JSON.parse(s3Object.Body.toString('utf-8'))

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

  console.log('Getting data')
  const { data } = await axios.get(url)
  console.log('Got data')

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
      dateFound: formattedDate,
      price: vehicle.typedPrices[0].amount,
      modelYear: vehicle.modelYear,
      mileage: vehicle.used.mileage,
      soldBy: vehicle.dealer.name,
      postCode: vehicle.dealer.zipCode
    }
  })

  await s3.putObject({
    Bucket: 'car-scraper-bucket',
    Key: 'cars.json',
    Body: JSON.stringify([...carsInS3, ...foundCars])
  }).promise()

  return 'Complete'
}

module.exports = { handler }
