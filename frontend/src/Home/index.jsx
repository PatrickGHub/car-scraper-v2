import data from '../cars.json'

const Home = () => {
  const formattedData = {}

  data.map((car) => {
    if (!formattedData[car.car_id]) {
      return formattedData[car.car_id] = [{ ...car }]
    }

    return formattedData[car.car_id] = [
      ...formattedData[car.car_id],
      { ...car }
    ]

  })

  console.log('\n---------- LOGGING formattedData ----------\n', formattedData)

  return (
    <div>
      {
        Object.keys(formattedData).map((carId) => {
          return (
            <div style={{marginBottom: '1em'}}>
              { carId } { formattedData[carId][0].model } 
              {
                formattedData[carId].map((listing) => {
                  return (
                    <div>
                      ${ listing.price } - { listing.date_found }
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default Home
