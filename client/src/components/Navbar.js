import React,{useContext,useRef,useEffect, useState} from 'react';
import './Navbar.css';
import {Link,useHistory} from 'react-router-dom';
import {UserContext} from '../App'
import {Search} from '@material-ui/icons';
import M from 'materialize-css';

const Navbar = () => {
    const searchModal = useRef(null); 
    const{state,dispatch} = useContext(UserContext);
    const history = useHistory();
    const [search, setSearch] = useState('')
    const [userDetails,setUserDetails] = useState([]);

    useEffect(()=>{
        M.Modal.init(searchModal.current)
    },[])

    const renderList = () => {
    
        if(state){
            return[
            <li key={10}>< Search data-target="modal1" className="material-icons modal-trigger" style={{color:"black"}}></ Search></li>, 
            <li key={5}><Link to="/subscribedPost">Following</Link></li>,
            <li key={2}><Link to="/profile">Profile</Link></li>,
            // <li key={3}><Link to="/createPost">Post</Link></li>,
            <li key={4}
                
                   name="action" 
                 onClick={()=>{
                     localStorage.clear();
                     dispatch({type:"CLEAR"});
                     history.push('/login');
                 }}
                 style={{color:"black",fontSize:"14px",cursor:"pointer",paddingRight:"4px"}}
                 >
                     Logout
                
            </li>
        ]
        }else{
            return[
            <li key={0}><Link to="/login">Login</Link></li>,
            <li key={1}><Link to="/signup">Signup</Link></li>]
        }  
    }

    const fetchUsers = (query) => {
        setSearch(query)
        fetch('/search-users',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                query:query
            })
        }).then(res =>res.json())
        .then(results =>{
            console.log(results);
            setUserDetails(results.user);
        })
    }

    return (     
        <nav className="navbar">
            <div className="nav-wrapper">
                <div className="headerRight">
                    <div className="headerRight__icon">
                    <Link to={state?"/":"/login"} className="brand-logo-left">
                        <img alt="insta" src="data:image/jpeg;base64,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" />
                    </Link>
                    </div>
                    <div className="headerRight__logo">
                        Instagram
                    </div>
                </div>

                <div className="headerLeft">
                    <ul className="bar">
                       {renderList()}
                    </ul>
                </div>

            </div>
            <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}> 
                <div className="modal-content">
                <input type="text" 
                       placeholder="Search Users..."
                       value={search}
                       onChange={(e) => fetchUsers(e.target.value)}
                />
                <ul className="collection">
                    {
                        userDetails?.map((item,i) =>{
                            return <Link key={i} to={item._id !== state._id?`/profile/${item._id}`:`/profile`} 
                            onClick={() => {
                                M.Modal.getInstance(searchModal.current).close()
                                setSearch("")
                                }}>
                                    <li key={i} className="col-item">
                                        <img src={item.photo} alt="user" style={{width:"34px",height:"34px",borderRadius:"17px",objectFit:"contain"}}/>
                                        {/* <span>{item.name}</span> */}
                                        <span>{item.email}</span>
                                        <hr/>
                                    </li>
                            </Link>
                        })
                    }
            
                    </ul>
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat" onClick={() => setSearch("")}>Close</button>    
                </div>
            </div>

        </nav>
    )
}

export default Navbar;
