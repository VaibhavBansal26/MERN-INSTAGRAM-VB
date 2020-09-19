import React from 'react';
import './Profile.css';

const Profile = () => {
    return (
        <div className="profile">
            <div className="profile__Header">
                <div className="profile__Left">
                    <img alt="profile__image" src="https://images.unsplash.com/photo-1585883308132-4ba686bb4957?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>

                </div>
                  
                <div className="profile__Right">
                    <span className="profile__name">Samayra Stevenson</span>
                    <div className="profile__details">
                   
                        <div className="profile__det">
                            <span>10</span><br/>
                            <span>Posts</span>
                        </div>
                        <div className="profile__det">
                            <span>12</span><br/>
                            <span>Followers</span>
                        </div>
                        <div className="profile__det">
                            <span>20</span><br/>
                            <span>Following</span>
                        </div>
                        <div className="profile__detA">
                            <span></span><br/>
                            <span></span>
                        </div>
                        <div className="profile__detF">
                            <span></span><br/>
                            <span></span>
                        </div>
                        
                        
                    </div>
                   
                   
                </div>
                
            </div>
            <div className="profile__about">
                <div className="about__one">

                </div>
                <div className="about__two">
                        Hey! I am the best developer
                        Hey! I am the best developer
                        Hey! I am the best developer
                        Hey! I am the best developer
     
                </div>
            </div>

            <hr/>
            <div className="profile__stories">
                <img alt="story" className="story" src="https://images.unsplash.com/photo-1548101977-da6da849636b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                <img alt="story" className="story" src="https://images.unsplash.com/photo-1494708001911-679f5d15a946?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                <img alt="story" className="story" src="https://images.unsplash.com/photo-1548101977-da6da849636b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                <img alt="story" className="story" src="https://images.unsplash.com/photo-1494708001911-679f5d15a946?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                <img alt="story" className="story" src="https://images.unsplash.com/photo-1548101977-da6da849636b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                <img alt="story" className="story" src="https://images.unsplash.com/photo-1494708001911-679f5d15a946?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                <img alt="story" className="story" src="https://images.unsplash.com/photo-1548101977-da6da849636b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                <img alt="story" className="story" src="https://images.unsplash.com/photo-1494708001911-679f5d15a946?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>

            </div>
            <hr/>
           
                
                <div className="profile__gallery">
                    <img  className="item" alt="profile__image" src="https://images.unsplash.com/photo-1548101977-da6da849636b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                    <img  className="item" alt="profile__image" src="https://images.unsplash.com/photo-1494708001911-679f5d15a946?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                    <img  className="item" alt="profile__image" src="https://images.unsplash.com/photo-1548101977-da6da849636b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                    <img  className="item" alt="profile__image" src="https://images.unsplash.com/photo-1548101977-da6da849636b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                    <img  className="item" alt="profile__image" src="https://images.unsplash.com/photo-1548101977-da6da849636b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                    <img  className="item" alt="profile__image" src="https://images.unsplash.com/photo-1548101977-da6da849636b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                    <img  className="item" alt="profile__image" src="https://images.unsplash.com/photo-1548101977-da6da849636b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                    <img  className="item" alt="profile__image" src="https://images.unsplash.com/photo-1548101977-da6da849636b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                </div>
               

            
            
        </div>
    )
}

export default Profile

//rafce