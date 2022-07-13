import data from '../cars.json'
import PriceUpdatesTable from '../components/PriceUpdatesTable'

const groupByVin = (data) => {
  const dataGroupedByVin = {}

  data.map((car) => {
    if (!dataGroupedByVin[car.carId]) {
      return dataGroupedByVin[car.carId] = [{ ...car }]
    }

    dataGroupedByVin[car.carId] = [
      ...dataGroupedByVin[car.carId],
      { ...car }
    ]
    
    return dataGroupedByVin[car.carId].sort((a, b) => {
      return new Date(b.dateFound) - new Date(a.dateFound)
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
