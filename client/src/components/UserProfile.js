import React,{useEffect,useState,useContext} from 'react';
import './UserProfile.css';
import {useParams} from 'react-router-dom';
import {UserContext} from '../App';

const UserProfile = () => {
    const [userProfile,setProfile] = useState(null);
    const [showfollow,setShowFollow] = useState(true);
    const {state,dispatch} = useContext(UserContext);
    const {userId} = useParams();

    useEffect(() =>{
        console.log(userId);
        fetch(`/profile/${userId}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result =>{
            console.log(result);
           
            setProfile(result);
        })
    },[])
    //console.log(userId);

    const followUser = () => {
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userId
            })
        }).then(res =>res.json())
        .then(data =>{
            console.log("updated state:",data);
            dispatch({
                type:"UPDATE",
                payload:{
                    following:data.following,
                    followers:data.followers
                }
            })
            console.log("new:",data);
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState) => {
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
                }
            })
            console.log(data)
            setShowFollow(false);
        })
    }

    const unfollowUser = () => {
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userId
            })
        }).then(res =>res.json())
        .then(data =>{
            dispatch({
                type:"UPDATE",
                payload:{
                    following:data.following,
                    followers:data.followers
                }
            })
            console.log("new:",data);
            localStorage.setItem("user",JSON.stringify(data));
           
            setProfile((prevState) => {
                const newFollower = prevState.user.followers.filter(item => item !== data._id)
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
            console.log(data);
            setShowFollow(true);
           
        })
    }
    
    return (
        <>
        {userProfile ? 
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style={{
                display:"flex",justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom:"1px solid gray"
                }}>
                <div>
                    <img alt="tik" style={{width:"120px",height:"120px",borderRadius:"60px"}} src={userProfile.user.photo}/>
                </div>
                <div>
                    <h4>{userProfile?.user.name}</h4>
                    <div style={{display:"flex",justifyContent:"space-between",width:"96%"}}>
                        <h6>{userProfile?.posts.length} posts</h6>
                        <h6>{userProfile.user.followers.length} followers</h6>
                        <h6>{userProfile.user.following.length} following</h6>
                    </div>
                    {showfollow && !userProfile?.user.followers.includes(state._id)?
                    <button style={{margin:"10px 0px"}}className="btn waves-effect waves-light #64b5f6 blue dark-1" type="submit" name="action" onClick={() => followUser()}>Follow
                    </button>:
                <button style={{margin:"10px 0px",backgroundColor:"#ededed"}}className="btn waves-effect waves-light #ededed" type="submit" name="action" onClick={() => unfollowUser()}>unFollow
                </button>
                }
                </div>
            </div>
            <div className="gallery">
                {
                    userProfile.posts? (userProfile.posts.map((item,i) => {
                        return(
                        <img className="item" src={item?.photo} key={i} alt={item?._id}/>
                        )
                    })):(<>Loading .....</>)
                }
               
                
            </div>
        </div> : <h2>loading..</h2>}
        </>
    )
}

export default UserProfile;
