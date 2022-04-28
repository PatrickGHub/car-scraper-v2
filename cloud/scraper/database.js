const { Pool } = require('pg');
const {
  pgUser,
  pgHost,
  pgDb,
  pgPassword,
  pgPort
} = require('./config.js');

const saveToDatabase = async (cars) => {
  const pool = new Pool({
    user: pgUser,
    host: pgHost,
    database: pgDb,
    password: pgPassword,
    port: pgPort,
    max: 100
  })

  cars.forEach(async (vehicle) => {
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
  
    try {
      await pool.query(text, values)
    } catch (error) {
      console.log(error.stack)
    }
  })

  await pool.end()
}

module.exports = {
  saveToDatabase
}