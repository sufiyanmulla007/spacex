import React from 'react'
import Table from 'react-bootstrap/Table';
const View = ({data}) => {
  return (
    <>
  {/* <h1> {data.missions[0].name}</h1> 
  <h2>{data.landings}</h2> */}
  <Table striped bordered hover>
      <thead>
        <tr>
          <th>name</th>
          <th>flight</th>
          <th>landings</th>
          <th>type</th>
          <th>details</th>
          <th>reuse_count</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{data.missions[0].name}</td>
          <td>{data.missions[0].flight}</td>
          <td>{data.landings}</td>
          <td>{data.type}</td>
          <td>{data.details}</td>
          <td>{data.reuse_count}</td>
        </tr>
        
      </tbody>
    </Table>
    </>
  );
};

export default View;
