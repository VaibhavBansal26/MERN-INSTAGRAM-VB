import React,{useEffect,createContext,useReducer,useContext} from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch,useHistory} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
//import Profile from './components/Profile';
import Profile1 from './components/Profile1';
//import Home from './components/Home';
import HomeScreen from './components/HomeScreen';
import Post from './components/Post';
import Footer from './components/Footer';
import {reducer,initialState} from './reducer/useReducer'
import UserProfile from './components/UserProfile';
import SubscribedUserPost from './components/SubscribedUserPost';
import Reset from './components/Reset';
import NewPassword from './components/NewPassword';
//CONTEXT API

//1.Creation of Data layer
export const UserContext = createContext()

//2. Use reducer to listen on the actions dispatched

//we can access histoy in this routing
const Routing = () => {
  const history = useHistory();
  const {state,dispatch} = useContext(UserContext)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      dispatch({type:"SET_USER",payload:user});
    }else{
      if(!history.location.pathname.startsWith('/reset'))
        history.push('/login');
    }
  },[]);

  return(
    <Switch>
    <Route path="/login" component={Login}/>
    <Route path="/signup" component={Signup}/>
    <Route path="/createPost" component={Post}/>
    <Route path="/subscribedPost" component={SubscribedUserPost}/>
    <Route path="/reset/:token" component={NewPassword}/>
    <Route path="/reset" component={Reset}/>
    <Route path="/profile/:userId" component={UserProfile}/>
    <Route path="/profile" component={Profile1}/>
    <Route path="/" component={HomeScreen}/>
     </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <div className="app">
     <UserContext.Provider value={{state,dispatch}}>
      <Router>
      <Navbar/>
        <Routing/>
        <Footer/>
      </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
