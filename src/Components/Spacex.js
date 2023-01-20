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
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
//model
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import View from './View';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function Spacex() {
//   const baseURL= "https://api.spacexdata.com/v3/capsules";
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [originalData,setOriginalData]=useState([])
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading,setIsLoading]=useState(false)
  //mo
  const [open, setOpen] = useState(false);
  // const Navigate=useNavigate();
  const [data,setData]=useState("");
  const handleOpen = (item) =>{
  
    setOpen(true)
    setData(item)
    // Navigate("/view",{state:item})

  };
  // const customstyle={
  //   // with:"500px"
  //   position:"absolute",
  //   top:"300px",
  //   left:"200px",
  //   backGround:""
  // }
  const handleClose = () => setOpen(false);
  
  useEffect(()=>{
    setIsLoading(true)
    axios.get("https://api.spacexdata.com/v3/capsules")
    .then((res)=>{
    //   console.log(res.data);
    setRows(res.data);
    setOriginalData(res.data)
    setIsLoading(false)
    });
        
  },[]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // const location=useLocation();
  // console.log("use loaction",  location);
  return (
    <>
    <div className='sort' style={{display:"flex",padding:"5px"}}>
      
    <form action="#">
          <label htmlFor="sort"></label>
          <select
            name="sort"
            id="sort"
            onChange={(e)=>{
              if(e.target.value!==""){
              const newRows=originalData.filter((el)=>el.status===e.target.value)
              setRows(newRows)
              }
              else setRows(originalData)
              // console.log(newRows)
            }}
            >
            <option value="">All launches</option>
            <option value="#" disabled></option>
            <option value="retired">retired</option>
            <option value="#" disabled></option>
            <option value="unknown">unknown</option>
            <option value="#" disabled></option>
            <option value="active">active</option> 
            <option value="destroyed">destroyed</option> 
          </select>
        </form>
        </div>
    <Card sx={{ minWidth: 900, p: 4 }}>
    <CardContent>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        {!isLoading?<Table stickyHeader aria-label="sticky table">
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
                    
                    <TableCell  align="center">
                    {/* <Button>veiw</Button> */}
                    <div>
      <Button onClick={()=>handleOpen(row) }>View</Button>
      <Modal
     
        open={open}
        
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // style={{width:"500px"}}
      >
          <Box sx={style} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
              Spacex
             </Typography>
                  <View data={data}/>
                    <Button onClick={handleClose}>Close</Button>
                     </Box>
                    
                      </Modal>
                     </div>
                   </TableCell>
                  
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>: <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={40} height={40} />
      <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
    </Stack>}
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