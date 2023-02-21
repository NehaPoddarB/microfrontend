import React from 'react'
import StickyTable from '../table/StickyTable';
import { useDispatch, useSelector } from "react-redux";
// import { fetchStudio, getStudio } from '../store/studio';
import { getStudio } from '../store/studio/selectors.ts'
import { fetchStudio } from '../store/studio/actions.ts';

const Studio = () => {
  const columns = [
    { id: 'studio_name', label: 'Name', minWidth: 170 },
    { id: 'studio_code', label: 'Code', minWidth: 170 },
    { id: 'studioAdmin_email', label: 'Email', minWidth: 170 },
  ];

  const rows = [
    { studio_name: "test", studio_code: 'FE', studioAdmin_email: 'test@gmail.com' },
    { studio_name: "test", studio_code: 'FE', studioAdmin_email: 'test@gmail.com' },
    { studio_name: "test", studio_code: 'FE', studioAdmin_email: 'test@gmail.com' },
    { studio_name: "test", studio_code: 'FE', studioAdmin_email: 'test@gmail.com' },
    { studio_name: "test", studio_code: 'FE', studioAdmin_email: 'test@gmail.com' },
  ]

  const studioState = useSelector(getStudio);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchStudio())
  }, [dispatch]);


  let studioStateData = studioState?.data;
  console.log(studioStateData)
  return (
    <StickyTable columns={columns} rows={rows} />
  )
}

export default Studio;