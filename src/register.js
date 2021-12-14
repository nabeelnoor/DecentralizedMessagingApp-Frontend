import './App.css';
import BackgroundSlider from 'react-background-slider'
import background from "./c1.jpg"
import background1 from "./c2.jpg"
import background2 from "./c3.jpg"
import Button from '@mui/material/Button';
import { TextField, Input, TextareaAutosize } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {  BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch } from "react-router-dom";
import { useEffect, useState } from 'react';
import ClipboardIcon from 'react-clipboard-icon'
import axios from "axios";
import request from "superagent";
import Chat from './chat';



const style1 = { fill: 'grey',marginLeft:'10px' }

//
function Register() {
    

    //     console.log(window.location.pathname); //yields: "/js" (where snippets run)
    // console.log(window.location.href);  

    var url = window.location.href;

    // console.log("Url : "+ url);

    var str = url;
    str = str.replace("/register", "");

    const [privateKey, setPrivateKey] = useState("");
    const [publicKey, setPublicKey] = useState("");
    const [loginPass, setloginPass] = useState('');
    // console.log(str)


    const Reg = () => {
        // console.log(process.env.REACT_APP_TEST)
        fetch(process.env.REACT_APP_TEST+":4000/registeration")
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log("\n\nConsole log env::",process.env.REACT_APP_Test)
                    console.log(result)
                    setPrivateKey(result.PrivateKey)
                    setPublicKey(result.PublicKey)
                    console.log(privateKey)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                }
            )
    }



    const doSome = () => {
        navigator.clipboard.writeText(document.getElementById("targetPrivateKey").value)
        // e.preventDefault();
        // console.log(e)
    }


    const Login = () => {
        // //console.log('Login function called');


//         fetch("http://localhost:4000/login", {
//     // Adding method type
//     method: "POST",
//     // Adding body or contents to send
//     body: JSON.stringify({
//         UserAddress: loginPass
//     }), 
//     // Adding headers to the request
//     headers: {
//         "Content-type": "application/json; charset=UTF-8"
//     }
// })
 
// // Converting to JSON
// .then(response => response.json())
 
// // Displaying results to console
// .then(json => console.log(json));
        // axios.post("http://localhost:4000/login", {
        //     UserAddress: loginPass,
        // })
        //   .then((Response) => {
        //     console.log(Response)
            // if(Response == Response.data.msg) {
            //   setloginStatus(Response.data.msg);
            // }
            // if(Response.data.msg == "Password matched") {
            //   window.location.href = `http://localhost:3000/doctorM?id=${loginID}`;
            // }
            // else {
            //   setloginStatus(Response.data.msg);
            // }
        //   })

// //  request
// // .post('http://localhost:4000/login')
// // .set('Content-Type', 'application/x-www-form-urlencoded')
// // .send({ UserAddress: loginPass})
// // .end(function(err, res){
// // console.log(res.AuthenticationStatus);
// // });  
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "UserAddress": loginPass
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:4000/login", requestOptions)
  .then(response => response.json())
  .then(result => {
      console.log(result)
      if (result.AuthenticationStatus=="Verified"){
        <Link to="chat"></Link>
        // navigate(`/chat/${publicKey}`)
          console.log("1111")
          window.location.href = `http://localhost:3000/chat?id=${privateKey}`;
         
      }
  })
  .catch(error => console.log('error', error));










      
      }

    return (
        <div>
            <Link to="/" activeClassName="active"><Button variant="contained">Back</Button></Link>
            <BackgroundSlider
                images={[background, background1, background2]}
                duration={8} transition={2} />
            <div>
                <h1 style={{ color: 'white', paddingLeft: '50px', paddingTop: '60px' }}>Secure Messaging Application</h1>
                <p style={{ color: 'whitesmoke', paddingLeft: '50px', fontSize: 20 }}>An End-to-End Secure Messaging Application which ensures that your data is
                    Encrypted and and is not altered by any third party.</p>
                <Card sx={{ maxWidth: 345, marginLeft: '500px' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Login with Your Private Key
                        </Typography>
                        <br />
                        <TextField id="outlined-basic" label="Enter Your Private Key" variant="outlined" style={{ color: 'wheat', marginLeft: '20px', paddingBottom: '30px' }} 
                        onChange={(e) => {setloginPass(e.target.value)}}
                        />
                        <Button variant="contained" style={{ marginLeft: '80px', marginBottom: '30px' }} onClick={Login}>Login</Button>
                        <br/>
                        <Button variant="contained" style={{ marginLeft: '75px', paddingBottom: '15px' }} onClick={Reg}>Register</Button>
                        <br />
                    </CardContent>
                    {/* <TextField id="outlined-basic" label={privateKey} variant="outlined" style={{color:'wheat',marginLeft:'20px',paddingBottom:'30px'}} /> */}
                    {/* <TextareaAutosize
                        aria-label="empty textarea"
                        placeholder={privateKey}
                        value={privateKey}
                        readOnly="readonly"
                        style={{ width: 300, height: 30, marginLeft: '15px' }}
                        onClick={doSome}
                        // onClick={  () => {navigator.clipboard.writeText(this.state.textToCopy)}}
                    /> */}
                     <input type="text" value={privateKey} id='targetPrivateKey' onClick={doSome} style={{height:'40px',marginLeft:'60px',marginBottom:'10px'}} />
                         <ClipboardIcon
                        size={20}
                        style={style1}
                        />

                </Card>

                {/* <TextField id="outlined-basic" label="Enter Your Private Key" variant="outlined" style={{color:'wheat'}} />
<Button variant="contained" style={{marginLeft:'50px'}}>Register Yourself</Button> */}
            </div>
        </div>
    );
}

export default Register;
