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
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import ClipboardIcon from 'react-clipboard-icon'
import { createBrowserHistory } from 'history';
import Cookies from 'universal-cookie'


const history = createBrowserHistory({ basename: `${process.env.PUBLIC_URL}` });






const style1 = { fill: 'grey', marginLeft: '10px' }

function ShowSent(props) {
    const [SenderList, setSenderList] = useState([]);

    useEffect(() => {
        console.log("Show Sent is called", localStorage.getItem('pid'))
        // console.log(process.env.REACT_APP_TEST)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "UserAddress": localStorage.getItem('pid')
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:4000/getSentMsg", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.Messages.MessageList)
                setSenderList(result.Messages.MessageList);
                //   if (result.AuthenticationStatus=="Verified"){
                //     //<Link to="chat"></Link>
                //     // navigate(`/chat/${publicKey}`)
                //       console.log("1111")
                //      window.location.href = `http://localhost:3000/chat`;

                //   }
            })
            .catch(error => console.log('error', error));
    }, []);


    return (
        <div>
            <Link to="/" activeClassName="active"><Button variant="contained">Back</Button></Link>
            <BackgroundSlider
                images={[background, background1, background2]}
                duration={8} transition={2} />
            <div>
                <h1 style={{ color: 'white', paddingLeft: '50px', paddingTop: '15px' }}>Secure Messaging Application</h1>
                <p style={{ color: 'whitesmoke', paddingLeft: '50px', fontSize: 20 }}>An End-to-End Secure Messaging Application which ensures that your data is
                    Encrypted and and is not altered by any third party.</p>


                <Card sx={{ marginLeft: '10px' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Display Sent Messages
                        </Typography>

                        {
                            SenderList.map((item, index) => (
                                <div key={index}>
                                    <span><h5>DataHash: {item.DataHash}</h5></span>
                                    <br />
                                    <span><h5>CurrentHash: {item.currentHash}</h5></span>
                                    <br />
                                    <span><h5>PrevHash:{item.prevHash}</h5></span>
                                    <br />
                                    <span><h5>Sender:{item.sender}</h5></span>
                                    <br />
                                    <span><h5>Receiver:{item.recv}</h5></span>
                                    <br />
                                    <span><h5>TimeStamp: {item.timeStamp}</h5></span>
                                    <br />
                                    <span><h5>SenderSignature: {item.SenderSignature}</h5></span>
                                </div>
                            ))

                        }
                    </CardContent>


                </Card>


            </div>
        </div>
    );
}

export default ShowSent;
