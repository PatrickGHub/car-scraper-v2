import data from '../cars.json'
import PriceUpdatesTable from '../components/PriceUpdatesTable'

const groupByVin = (data) => {
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

  return formattedData
}

const Home = () => {
  const formattedData = groupByVin(data)

  return (
    <div>
      {
        Object.keys(formattedData).map((carId) => {
          return (
            <div style={{marginBottom: '1em'}}>
              <p>{ carId }</p>
              <p>{ formattedData[carId][0].model }</p>
              <PriceUpdatesTable rows={formattedData[carId]} />
            </div>
          )
        })
      }
    </div>
  )
}

export default Home
