const { Pool } = require('pg');
const {
  pgUser,
  pgHost,
  pgDb,
  pgPassword,
  pgPort
} = require('./config.js');

const saveToDatabase = async (cars) => {
  console.log('Creating DB pool')
  const pool = new Pool({
    user: pgUser,
    host: pgHost,
    database: pgDb,
    password: pgPassword,
    port: pgPort,
    max: 100
  })

  const client = await pool.connect()
  
  try {
    console.log(`Saving ${cars.length} vehicles to the database`)

    for (const vehicle of cars) {
      const text = 'INSERT INTO cars (manufacturer, model, body_type, car_id, listing_date, updated_date, price, mileage, model_year, gearbox, engine, sold_by, post_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *';
      const values = [
        vehicle.manufacturer,
        vehicle.model,
        vehicle.bodyType,
        vehicle.carId,
        vehicle.listingDate,
        vehicle.updatedDate,
        vehicle.price,
        vehicle.mileage,
        vehicle.modelYear,
        vehicle.gearbox,
        vehicle.engine,
        vehicle.soldBy,
        vehicle.postCode
      ]
    
      console.log(`Inserting vehicle ${vehicle.carId}`)
      await client.query(text, values)
      console.log(`Done inserting vehicle ${vehicle.carId}`)
    }
  } finally {
    console.log('Clearing DB connections')
    client.release()
    pool.end()
  }
}

module.exports = {
  saveToDatabase
}