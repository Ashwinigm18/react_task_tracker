
import './App.css';
import About from './components/About';
import AddTask from './components/AddTask';
import Footer from './components/Footer';

import Header from './components/Header';
import Tasks from './components/Tasks';
import {useState,useEffect} from 'react'
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'

function App() {
  const [showAddTask,setShowAddTask]=useState(false)
  const [tasks, setTasks] = useState([])

  //get data
  useEffect(() => {
    const getData=async()=>{
      const tasksFromServer=await fetchData();
      setTasks(tasksFromServer)

      
    }
    getData()
  }, [])
  

  //fetch data
  const fetchData=async()=>{
    const res= await fetch('http://localhost:5000/tasks')
    const data=await res.json();
    // console.log(data);
    return data;
  
  }
  //fetch data
  const fetchTask=async(id)=>{
    const res= await fetch(`http://localhost:5000/tasks/${id}`)
    const data=await res.json();
    // console.log(data);
    return data;
  
  }

 //Delete task
 const deleteTask=async(id)=>{
  // console.log("Task deleted",id);
  await fetch(`http://localhost:5000/tasks/${id}`,
  {
    method:'DELETE',
  })
 setTasks( tasks.filter((task)=>(task.id!==id)))
 }

//  Toggle remainder
const toggleRemainder=async(id)=>{
  const taskToToggle= await fetchTask(id)
  const updTask= {...taskToToggle,reminder:!taskToToggle.reminder}

  const res=await fetch(`http://localhost:5000/tasks/${id}`,
  {
    method:'PUT',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(updTask)
  })

const data= await res.json()
  setTasks(
    tasks.map(
      (task)=>(task.id===id)?{...task,reminder:!task.reminder}:task
      )
      )
}

//add task
const addTask=async(task)=>{
const res=await fetch('http://localhost:5000/tasks',{
  method:'POST',
  headers:{
    'Content-type':'application/json',
  },
  body:JSON.stringify(task),
})
const data= await res.json()
console.log(data);
setTasks([...tasks,data])

//  const id=Math.floor(Math.random()*10000)+1
//  const newTask= {id,...task}
//  setTasks([...tasks,newTask])
}
  return (
    <Router>
    <div className='container'>
        
        <Header onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      
      <Routes> 
        <Route path='/'  element={
          <>
               { showAddTask && <AddTask onAdd={addTask}/>}

{ tasks.length>0 ?<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleRemainder} />:"No Tasks To Show"}
          </>
        }/>
        <Route path='about' element={<About/>}/>
      </Routes>
       <Footer/>
       
    </div>
    </Router>
  );

}
export default App;
