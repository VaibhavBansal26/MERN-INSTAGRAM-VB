import React,{useState,useContext} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';
import './Reset.css';

const Reset = () => {
   
    const history = useHistory();
    const [email, setEmail] = useState("");

    const submitData = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return M.toast({html:"invalid email",classes:"#c62828 red darken-3"});
        }
        fetch("/reset-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                email:email,
               
            })
        }).then(res =>res.json())
        .then(data => {
            
            if(data.error){
                M.toast({html:data.error,classes:"#c62828 red darken-3"});
            }else{
                M.toast({html:data.message,classes:"#43a047 green darken-3"});
                history.push('/login');
            }
        }).catch(err =>{
            console.log(err);
        })
    }
    return (
        <div className="login">
            <div className="card">
                <img className="logo" alt="logo" src="data:image/jpeg;base64,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"/>
                <h4 className="brand-logo">Instagram</h4>
                <input type="text" 
                       placeholder="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                />
               
                <button className="btn waves-effect waves-light" type="submit" name="action" onClick={() => submitData()}>Reset password
                
                </button>
                <div className="card__footer">
               
                </div>

            </div>
        </div>
    )
}

export default Reset;
