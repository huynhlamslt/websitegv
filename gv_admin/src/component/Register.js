import React, { useState } from "react";

const Register = () => {
  const [picture, setPicture] = useState('');

  const onChangePicture = e => {
    console.log('picture: ', picture);
    setPicture(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="content-wrapper">
      <div className="register_player_column_layout_one">
        <div className="register_player_Twocolumn_layout_two">
          <form className="myForm">
            <div className="formInstructionsDiv formElement">
              <h2 className="formTitle" >Sign Up</h2>
              <p className="instructionsText"></p>
              <div className="register_profile_image">
                 <input id="profilePic" type="file" onChange={onChangePicture}/>
              </div>
              <div className="previewProfilePic" >
                <img className="playerProfilePic_home_tile w-25 h-25"   src={picture}></img>
              </div>
            </div>
            <div className="fillContentDiv formElement">
              <div className="names formContentElement">
                <input className="inputRequest " type="text" placeholder="First Name" />
                <input className="inputRequest " type="text" placeholder="Last Name" />
              </div>
            </div>
            <div className="submitButtonDiv formElement">
              <button className="submitButton">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;