import React from 'react'
import StickyTable from '../table/StickyTable';
import { getEmployee } from '../store/employee';
import { fetchEmployee } from '../store/employee';


const Employee = () => {
  
  const columns = [
    { id: 'employee_name', label: 'Name', minWidth: 170 },
    { id: 'studio_code', label: 'Code', minWidth: 170 },
    { id: 'employee_email', label: 'Email', minWidth: 170 },
  ];

  const rows =[
    {employee_name:"test",studio_code:'FE', employee_email:'test@gmail.com' },
    {employee_name:"test",studio_code:'FE', employee_email:'test@gmail.com' },
    {employee_name:"test",studio_code:'FE', employee_email:'test@gmail.com' },
    {employee_name:"test",studio_code:'FE', employee_email:'test@gmail.com' },
    {employee_name:"test",studio_code:'FE', employee_email:'test@gmail.com' },
  ]
  return (
    <StickyTable columns={columns} rows={rows} />
  )
}

export default Employee