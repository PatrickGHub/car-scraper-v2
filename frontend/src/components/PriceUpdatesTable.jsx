import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

const PriceUpdatesTable = ({ rows }) => {
  return (
    <TableContainer component={ Paper } >
      <Table size="small" >
        <TableHead>
          <TableRow>
            <TableCell>Price</TableCell>
            <TableCell>Date Found</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {
            rows.map((listing) => {
              return (
                <TableRow key={`${listing.carId}${listing.dateFound}`} >
                  <TableCell>${ listing.price }</TableCell>
                  <TableCell>{ listing.dateFound }</TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PriceUpdatesTable
