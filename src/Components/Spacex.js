import { useEffect,useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
//card
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


export default function Spacex() {
//   const baseURL= "https://api.spacexdata.com/v3/capsules";
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(()=>{
    axios.get("https://api.spacexdata.com/v3/capsules")
    .then((res)=>{
    //   console.log(res.data);
    setRows(res.data);
    });
        
  },[]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
    <Card sx={{ minWidth: 900, p: 4 }}>
    <CardContent>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Sr.No</TableCell>
             <TableCell align="center">capsule_id</TableCell>
             <TableCell align="center">capsule_serial</TableCell>
             <TableCell align="center">original_launch</TableCell>
             <TableCell align="center">original_launch_unix</TableCell>
             <TableCell align="center">status</TableCell>
             <TableCell>action</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,intex) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={intex}>
                    <TableCell>{intex+1}</TableCell>
                    <TableCell  align="center">
                     {row.capsule_id}     
                    </TableCell>
                    <TableCell  align="center">
                     {row.capsule_serial}     
                    </TableCell>
                    <TableCell  align="center">
                     {row.original_launch}     
                    </TableCell>
                    <TableCell  align="center">
                     {row.original_launch_unix}     
                    </TableCell>
                    <TableCell  align="center">
                     {row.status} 
                    </TableCell>
                    <Link to="/view">
                    <TableCell  align="center">
                    <Button>veiw</Button>
                    </TableCell>
                    </Link>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </CardContent>
    </Card>
   
    </>
  );
}