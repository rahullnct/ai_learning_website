
import { Routes,Router,Route} from 'react-router-dom';
import './App.css'
import Loader from './Loader';
import Dashboard from './Pages/Dashboard/Dashboard';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import AllPages from "./Components/Auth/AllPages";
import FlashCard from './Pages/FlashCard/FlashCard';
import DocumentList from './Pages/Document/DocumentList';
import Profile from './Pages/Profile/Profile';
import NotFoundPage from './Pages/NotFoundPage';

function App() {
   const isAuthenticated=false;
   const loader=false;

   if(loader){
    return(
      <div className='loader_container'>
        <Loader />
      </div>
    )
   }
  return (
      <Routes>
         <Route path="/" element={isAuthenticated ? <Dashboard />: <Login/> }/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/register' element={<Register />}/>

         <Route element={<AllPages/>}>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/document' element={<DocumentList/>}/>
          <Route path='/flashcard' element={<FlashCard/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
         </Route>
      </Routes>
  )
}

export default App
