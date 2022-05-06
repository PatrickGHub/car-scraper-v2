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
                <TableRow key={`${listing.car_id}${listing.date_found}`} >
                  <TableCell>${ listing.price }</TableCell>
                  <TableCell>{ listing.date_found }</TableCell>
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
