import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AllTask = () => {
  const[Task,setTask]=useState([]);
  

 
  const getTask=async()=>{
    const res =await axios.get(`http://localhost:8080/alltask`)
    setTask(res.data)

  }
  useEffect(()=>{
    getTask();

},[])
  const deleteTask=async(id)=>{
    console.log("delete")
    let result= await fetch(`http://localhost:8080/deletetask/${id}`,{
      method:"Delete"
    });
    result=await result.json();
    if (result){
      alert(" Task deleted")
      toast.success("Task Deleted successfully")
      getTask();
    }
  }
 
  return (
    <div>
      <h1 style={{textAlign:"center"}}>All Tasks</h1>
      <div class="table-container">
        <div className='row'>
      <table>
      <thead >
        <tr>
          <th>SR No</th>
          <th>Title</th>
          <th className='col-6'>Description</th>
          <th>AssignedTo</th>
          <th>Status</th>
          <th>CreatedAt</th>
          <th>Edit</th>
          <th>Delete</th>
        
          
        </tr>
      </thead>
      
      {
        
        Task.map((item,index)=>{
          return(
        <tbody>
          <tr key={item._id} style={{textAlign:"center"}}>
            <td>{index+1}</td>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td >{item.assignedTo}</td>
            <td style={{paddingLeft:"20px"}}>{item.status}</td>
            <td style={{paddingLeft:"40px"}}>{item.createdAt}</td>
            <td><Link to={"/update/"+item._id}>< EditIcon  className='edit'/></Link></td>
            <td><button onClick={()=>deleteTask(item._id)} className='delete'><DeleteForeverRoundedIcon /></button></td>
         
          </tr>
        </tbody>
        
        )
        })
      }
      </table>
      </div>
    </div>
    </div>
   
  )
}

export default AllTask
