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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// import DeleteIcon from '@mui/icons-material/Delete';
import Popup from 'react-popup';
const history = createBrowserHistory({ basename: `${process.env.PUBLIC_URL}` });






const style1 = { fill: 'grey', marginLeft: '10px' }
// const popStyle = { color:'white',background:'white' }

function ShowMsg(props) {
    const [Msg, setMsg] = useState({});

    useEffect(() => {
        console.log("Show Sent is called", localStorage.getItem('pid'))
        // console.log(process.env.REACT_APP_TEST)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "EncryptedData": localStorage.getItem('Edata'),
            "SenderAddress": localStorage.getItem('SAddress'),
            "RecvAddress": localStorage.getItem('pid'),
            "SenderSignature": localStorage.getItem('SSginature')
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:4000/decryptMsg", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.Response.Msg)
                setMsg(result.Response.Msg);
            })
            .catch(error => console.log('error', error));
    }, []);

    const mystyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",


    };

    const contentStyle = { background: '#000' };
    const overlayStyle = { background: 'rgba(0,0,0,0.5)' };


    return (
        <div>
            <Link to="/" className="active"><Button variant="contained">Back</Button></Link>
            <BackgroundSlider
                images={[background, background1, background2]}
                duration={8} transition={2} />
            <div>
                <h1 style={{ color: 'white', paddingLeft: '50px', paddingTop: '15px' }}>Secure Messaging Application</h1>
                <p style={{ color: 'whitesmoke', paddingLeft: '50px', fontSize: 20 }}>An End-to-End Secure Messaging Application which ensures that your data is
                    Encrypted and and is not altered by any third party.</p>
                <div style={mystyle}>

                    <Card sx={{ maxWidth: 345, marginLeft: '10px' }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Decrypted Message Details: -
                            </Typography>
                            <Typography gutterBottom variant="body" component="div" style={{ display: "flex", flexDirection: "row" }}>
                                <TextField label='Sender Detail' style={{ height: '20px' }} value={Msg.Sender}></TextField>
                            </Typography>
                            <br />
                            <br />
                            <Typography gutterBottom variant="body" component="div" style={{ display: "flex", flexDirection: "row" }}>
                                <TextField label='Recv Detail' style={{ height: '20px' }} value={Msg.Recv}></TextField>
                            </Typography>
                            <br />
                            <br />
                            <Typography gutterBottom variant="body" component="div" style={{ display: "flex", flexDirection: "row" }}>
                                <TextField label='Message Content' style={{ height: '20px' }} value={Msg.Content}></TextField>
                            </Typography>
                            <br />
                            <br />
                            {/* <Button variant="contained" style={{ marginLeft: '50px', paddingBottom: '15px' }} onClick={showGet}>Show Messages Received</Button> */}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default ShowMsg;
