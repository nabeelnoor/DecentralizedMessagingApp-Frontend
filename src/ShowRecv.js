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

function ShowRecv(props) {
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

        fetch("http://localhost:4000/getRecvMsg", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.Messages.MessageList)
                setSenderList(result.Messages.MessageList);
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

    const doSome = (val) => {
        navigator.clipboard.writeText(val)
        Popup.alert('Text has been copied');

    }
    return (
        <div>
            {/* <div className="App">
            <ClipboardCopy copyText="https://google.com" />
            <ClipboardCopy copyText="https://logrocket.com" />
            </div> */}

            {/* <Popup className="my-popup">
                <div style={{ color: "white", margin: "auto", background: "white" }}>Popup content here !!</div>
            </Popup> */}
            <Link to="/" className="active"><Button variant="contained">Back</Button></Link>
            <BackgroundSlider
                images={[background, background1, background2]}
                duration={8} transition={2} />
            <div>
                <h1 style={{ color: 'white', paddingLeft: '50px', paddingTop: '15px' }}>Secure Messaging Application</h1>
                <p style={{ color: 'whitesmoke', paddingLeft: '50px', fontSize: 20 }}>An End-to-End Secure Messaging Application which ensures that your data is
                    Encrypted and and is not altered by any third party.</p>
                <div style={mystyle}>

                    {
                        SenderList.map((item, index) => (
                            <div key={index}>
                                <Card sx={{ maxWidth: 345 }} style={{ margin: "5%" }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="body" component="div" style={{ display: "flex", flexDirection: "row" }}>
                                            <TextField label='Hash' style={{ height: '20px' }} value={item.currentHash}></TextField>
                                            <Tooltip title="Copy Text" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                                <button onClick={() => doSome(item.currentHash)}>
                                                    <ClipboardIcon
                                                        size={20}
                                                    />
                                                </button>
                                            </Tooltip>
                                        </Typography>
                                        <br></br>
                                        <br></br>
                                        <Typography gutterBottom variant="body" component="div" style={{ display: "flex", flexDirection: "row" }}>
                                            <TextField label='PrevHash' style={{ height: '20px' }} value={item.prevHash}></TextField>
                                            <Tooltip title="Copy Text" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                                <button onClick={() => doSome(item.prevHash)}>
                                                    <ClipboardIcon
                                                        size={20} />
                                                </button>
                                            </Tooltip>

                                        </Typography>
                                        <br></br>
                                        <br></br>
                                        <Typography gutterBottom variant="body" component="div" style={{ display: "flex", flexDirection: "row" }}>
                                            <TextField label='SenderAddress' style={{ height: '20px' }} value={item.sender}></TextField>
                                            <Tooltip title="Copy Text" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                                <button onClick={() => doSome(item.sender)}>
                                                    <ClipboardIcon
                                                        size={20}
                                                    />
                                                </button>
                                            </Tooltip>

                                        </Typography>
                                        <br></br>
                                        <br></br>
                                        <Typography gutterBottom variant="body" component="div" style={{ display: "flex", flexDirection: "row" }}>
                                            <TextField label='RecvAddress' style={{ height: '20px' }} value={item.recv}></TextField>
                                            <Tooltip title="Copy Text" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                                <button onClick={() => doSome(item.recv)}>
                                                    <ClipboardIcon
                                                        size={20}
                                                    />
                                                </button>
                                            </Tooltip>
                                        </Typography>
                                        <br></br>
                                        <br></br>
                                        <Typography gutterBottom variant="body" component="div" style={{ display: "flex", flexDirection: "row" }}>
                                            <TextField label='TimeStamp' placeholder='PrevHash' style={{ height: '20px' }} value={item.timeStamp}></TextField>
                                            <Tooltip title="Copy Text" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                                <button onClick={() => doSome(item.timeStamp)}>
                                                    <ClipboardIcon
                                                        size={20} />
                                                </button>
                                            </Tooltip>
                                        </Typography>
                                        <br></br>
                                        <br></br>
                                        <Typography gutterBottom variant="body" component="div" style={{ display: "flex", flexDirection: "row" }}>
                                            <TextField label='SenderSignature' placeholder='PrevHash' style={{ height: '20px' }} value={item.SenderSignature}></TextField>
                                            <Tooltip title="Copy Text" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                                <button onClick={() => doSome(item.SenderSignature)}>
                                                    <ClipboardIcon
                                                        size={20} />
                                                </button>
                                            </Tooltip>
                                        </Typography>
                                        <br></br>
                                        <br></br>
                                        <Link to="/showMsg">
                                            <Button variant="contained" onClick={() => {
                                                localStorage.setItem('SAddress',item.sender);
                                                localStorage.setItem('Edata',item.DataHash);
                                                localStorage.setItem('SSignature',item.SenderSignature);
                                            }} >
                                                Show Messages
                                            </Button>
                                        </Link>
                                    </CardContent>

                                </Card>
                            </div>
                        ))

                    }
                </div>
            </div>
        </div>
    );
}

export default ShowRecv;
