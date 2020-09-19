import React,{useEffect,useState,useContext} from 'react';
import './Profile1.css';
import {Link} from 'react-router-dom';
import {UserContext} from '../App';
import EditIcon from '@material-ui/icons/Edit';

const Profile1 = () => {
    const [myPhotos,setPhotos] = useState([]);
    const [followers,setFollowers] = useState(0);
    const [following,setFollowing] = useState(0);
    const [postCount,setPostCount] = useState(0);
    const {state,dispatch} = useContext(UserContext);
    const [image,setImage] = useState("");
    const [url,setUrl] = useState(undefined);

    useEffect(() =>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result =>{
            console.log(result);
            setPostCount(result.myPost.length);
            setPhotos(result.myPost)
            //setFollowers(state.followers.length);
            //setFollowing(state.following.length)
            console.log(state);
        })
    },[])
    
    useEffect(()=>{
        if(image){
            const data = new FormData();
            data.append("file",image)
            data.append("upload_preset","insta-clone");
            data.append("cloud_name","vaibhavbansal");
    
            fetch("https://api.cloudinary.com/v1_1/vaibhavbansal/image/upload",{
                method:"post",
                body:data
            }).then(res => res.json())
            .then(data => {
                console.log(data);
                setUrl(data.url);
                localStorage.setItem("user",JSON.stringify({...state,photo:data.url}))
                dispatch({
                    type:"UPDATE__PHOTO",
                    payload:data.url
                });
                fetch('/updatePhoto',{
                    method:"put",
                    headers:{
                        "Content-TyPE":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        photo:data.url
                    })
                }).then(res => res.json())
                .then(result =>{
                    console.log("result",result);
                    localStorage.setItem("user",JSON.stringify({...state,photo:result.photo}))
                    dispatch({
                        type:"UPDATE__PHOTO",
                        payload:result.photo
                    });
                })
                // window.location.reload();
    
            }).catch(err => {
                console.log(err);
            });

        }

    },[image])

    const updatePhoto = (file) => {
        setImage(file);
    }

    console.log("new state:",state);
    return (
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
            {state?<>
            <div style={{
                display:"flex",justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom:"1px solid gray"
                }}>
                <div>
                    <img alt="tik" style={{width:"120px",height:"120px",borderRadius:"60px"}} src={state?state.photo:"loading"}/>
                   {/* <EditIcon style={{marginLeft:"-15px"}} onClick={() => updatePhoto}/> */}
                   <div className="file-field input-field">
                    <div className="btn #ED4C67 pink darken-1">
                        <span>photo</span>
                        <input type="file" onChange={(e) => updatePhoto(e.target.files[0])}/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                    </div>
                </div>
            
                    <button style={{backgroundColor:"#ededed",color:"white !important",width:"43px",height:"25px",borderRadius:"10px",cursor:"pointer"}}><Link to="/createPost">Post</Link></button>
                </div>
               
                <div>
                    <h4>{state?.name}</h4>
                    <div style={{display:"flex",justifyContent:"space-between",width:"96%"}}>
                        <h6>{postCount} posts</h6>
                        <h6>{state?.followers.length} followers</h6>
                        <h6>{state?.following.length} following</h6>
                    </div>
                </div>
                
            </div>
           
            <div className="gallery">
                {
                    myPhotos? (myPhotos.map((item,i) => {
                        return(
                        <img className="item" src={item?.photo} key={i} alt={item?._id}/>
                        )
                    })):(<>Loading .....</>)
                }
               
                
            </div></>:<h2>Loading</h2>}
        </div>
    )
}

export default Profile1
