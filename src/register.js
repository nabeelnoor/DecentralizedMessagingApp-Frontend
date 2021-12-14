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
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
//
function Register() {


    //     console.log(window.location.pathname); //yields: "/js" (where snippets run)
    // console.log(window.location.href);  

    var url = window.location.href;

    // console.log("Url : "+ url);

    var str = url;
    str = str.replace("/register", "");

    const [privateKey, setPrivateKey] = useState("");
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
                    console.log(privateKey)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                }
            )
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
                        <TextField id="outlined-basic" label="Enter Your Private Key" variant="outlined" style={{ color: 'wheat', marginLeft: '20px', paddingBottom: '30px' }} />
                        <Button variant="contained" style={{ marginLeft: '80px', marginBottom: '30px' }}>Login</Button>
                        <Button variant="contained" style={{ marginLeft: '50px', paddingBottom: '10px' }} onClick={Reg}>Register Yourself</Button>
                        <br />
                    </CardContent>
                    {/* <TextField id="outlined-basic" label={privateKey} variant="outlined" style={{color:'wheat',marginLeft:'20px',paddingBottom:'30px'}} /> */}
                    <TextareaAutosize
                        aria-label="empty textarea"
                        placeholder={privateKey}
                        readOnly="readonly"
                        style={{ width: 300, height: 100, marginLeft: '15px' }}
                    />

                </Card>

                {/* <TextField id="outlined-basic" label="Enter Your Private Key" variant="outlined" style={{color:'wheat'}} />
<Button variant="contained" style={{marginLeft:'50px'}}>Register Yourself</Button> */}
            </div>
        </div>
    );
}

export default Register;
