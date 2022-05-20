import data from '../cars.json'
import PriceUpdatesTable from '../components/PriceUpdatesTable'

const groupByVin = (data) => {
  const dataGroupedByVin = {}

  data.map((car) => {
    if (!dataGroupedByVin[car.car_id]) {
      return dataGroupedByVin[car.car_id] = [{ ...car }]
    }

    dataGroupedByVin[car.car_id] = [
      ...dataGroupedByVin[car.car_id],
      { ...car }
    ]
    
    return dataGroupedByVin[car.car_id].sort((a, b) => {
      return new Date(b.date_found) - new Date(a.date_found)
    })
  })

  return dataGroupedByVin
}

const Home = () => {
  const dataGroupedByVin = groupByVin(data)

  return (
    <div>
      {
        Object.keys(dataGroupedByVin).map((carId) => {
          return (
            <div style={{marginBottom: '1em'}}>
              <p>{ carId }</p>
              <p>{ dataGroupedByVin[carId][0].model }</p>
              <PriceUpdatesTable rows={dataGroupedByVin[carId]} />
            </div>
          )
        })
      }
    </div>
  )
}

export default Home
