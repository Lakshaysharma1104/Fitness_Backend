import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import {Button , Box} from '@mui/material'
import { useContext, useEffect ,useState} from 'react'
import { useDispatch} from 'react-redux';
import {  setCredentials } from './store/authSlice';
import { AuthContext } from "react-oauth2-code-pkce";
import ActivityList from './components/ActivityList';
import ActivityForm from './components/ActivityForm';
import ActivityDetails from './components/ActivityDetails';

const ActivityPage = ()=>{
  return(
    <Box  sx={{ p: 2, border: '1px dashed grey' }}>
      <ActivityForm onActivityAdded = {()=> window.location.reload()} />
      <ActivityList />
    </Box>
  )
}

function App() {

  const  {token,tokenData,logIn,logOut,isAuthenticated} = useContext(AuthContext); 
  const dispatch = useDispatch();
  const [authReady,setAuthReady] = useState(false);

  useEffect(() =>{
        if(token){
          dispatch(setCredentials({token,user:tokenData}));
          setAuthReady(true);
        }
  },[token,tokenData,dispatch])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={
          !token?
          (<Button 
            variant="contained" 
            onClick={()=>{
          logIn();
        }}>Login</Button>):(
          <div>
          <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
            <Button variant="contained" onClick={()=>{ logOut();
              
            }}>Logout</Button>
           <Routes>
             <Route path="/activities"
              element={<ActivityPage />} />
             <Route path="/activities/:id" 
             element={<ActivityDetails />} />
             <Route path="/" 
             element={token ? 
             <Navigate to="/activities" replace/> : 
             <div>Please log in to view activities</div>}
             />
           </Routes>
            
          </Box>
          </div>
        )} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
