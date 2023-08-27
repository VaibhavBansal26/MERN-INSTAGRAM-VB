import React,{useState,useEffect,useContext} from 'react'
import './HomeScreen.css'
import {Link} from 'react-router-dom';
import {UserContext} from '../App';

const HomeScreen = () => {
    const [data,setData] = useState([]);
    const [aclick,setAclick] = useState(false);
    const {state,dispatch} = useContext(UserContext);
    useEffect(() =>{
        fetch('https://mern-instagram-vb.onrender.com/allpost',{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res =>res.json())
        .then(result => {
            console.log(result);
            setData(result.posts);
        })
    },[])

    const likePost = (id) =>{
        console.log("Unliked",id)
        fetch('https://mern-instagram-vb.onrender.com/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res =>res.json())
        .then(result =>{
            console.log(result)
            const newData = data.map(item => {
                if(item._id === result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData);
            
        }).catch(err => {
            console.log(err);
        })
    }
    const unlikePost = (id) =>{
        console.log("Unliked",id);
        fetch('https://mern-instagram-vb.onrender.com/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res =>res.json())
        .then(result =>{
            console.log(result);
            //New Data
            const newData = data.map(item => {
                if(item._id === result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData);
        }).catch(err => {
            console.log(err);
        })
    }

    const makeComment = (text,postId) => {
        fetch('https://mern-instagram-vb.onrender.com/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:postId,
                text:text
            })

        }).then(res =>res.json())
        .then(result => {
            console.log(result);
            const newData = data.map(item => {
                if(item._id === result._id){
                    return result
                }else{
                    return item
                }
                
            })
            setData(newData);
        }).catch(err =>{
            console.log(err);
        })
    }


    const deletePost = (postId) =>{
        fetch(`https://mern-instagram-vb.onrender.com/deletePost/${postId}`,{
            method:"delete",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json()).then(result => {
            console.log(result);
            const newData = data.filter(item => {
                return item._id !== result._id
            })
            setData(newData);
        })
    }

    const deleteComment = (postId,commentId) => {
        console.log("delete comment clicked");
        console.log(postId);
        console.log(commentId);
        //const p = JSON.stringify(postId);
        //const q =JSON.stringify(commentId);
        fetch(`https://mern-instagram-vb.onrender.com/deleteComment/${postId}/${commentId}`,{
            method:"delete",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res =>res.json())
        .then(result => {
            console.log("result:",result);
            const newData = data.map(item => {
                if(item._id === result._id){
                    return result
                }else{
                    return item
                }
                
            })
            setData(newData);
        })
    }

    console.log("state",state);
    console.log("data",data);
    return (
        <div  className="home">
            {
                data?.map((item,i) =>{
                    return(
                        <div className="card home-card" key={i}>
                            <div >
                            <h5>
                            <img src={item.postedBy?.photo} alt="ph" style={{width:"15px",height:"15px",objectFit:"containe",borderRadius:"8px",margin:"3px"}}/>    
                            <Link to={item.postedBy._id !== state._id ? `/profile/${item.postedBy._id}`:'/profile'}>{item.postedBy?.name}</Link>
                            {item.postedBy._id === state._id ?
                            <i style={{float:"right",color:"gray"}} className="material-icons" onClick={() => deletePost(item._id)}>delete</i>
                            :"" }
            
                            </h5>
                            </div>
                            <div className="card-image">
                                <img alt="tik" src={item?.photo}/>
                            </div>
                            <div className="card-content">
                                    {
                                        item.likes.includes(state._id)
                                        ?  (<i className="material-icons" style={{color:"red",cursor:"pointer"}} onClick={() => unlikePost(item._id)}>favorite</i>)
                                        : (<i className="material-icons" style={{cursor:"pointer"}} onClick={() => likePost(item._id)}>favorite_border</i>)
                                    }
                                <h6>{item.likes.length} Likes</h6>
                                <h6>{item?.title}</h6>
                                <p>{item?.body}</p>
                                <p style={{color:"gray"}} onClick={(e) => (setAclick(!aclick))}>{item.comments.length > 0 ? `view ${item.comments.length} comments`:""} </p>
                                {
                                    aclick?
                                    item.comments.map((record,i) =>{
                                        return(
                                        <h6 key={i}>
                                        <span>  <img src={record.postedBy?.photo} alt="ph" style={{width:"15px",height:"15px",objectFit:"containe",borderRadius:"8px"}}/></span>
                                        <span style={{fontWeight:"500"}}>{record.postedBy.name}</span>{" "}{record.text}
                                        {record.postedBy._id === state._id ? <span onClick={() => deleteComment(item._id,record._id)} className="del" style={{float:"right",color:"gray",fontWeight:"100",cursor:"pointer"}}>X</span>:""}
                                        </h6>
                                        )
                                    }):""
                                }
                                <form onSubmit={(e) =>{
                                    e.preventDefault();
                                    console.log(e.target[0].value);
                                    makeComment(e.target[0].value,item._id)
                                    e.target[0].value="";
                                }}>
                                   <input type="text" placeholder="add a comment"/>
                                </form>
                                
                            </div>
                        </div>

                    )
                })
            }
            
          
        </div>
    )
}

export default HomeScreen
