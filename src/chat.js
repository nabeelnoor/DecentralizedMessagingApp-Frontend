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

function Chat(props) {

    const cookies = new Cookies();

    const [privateKey, setPrivateKey] = useState("");
    // setPrivateKey(cookies.get('pid'))
    // setPrivateKey(localStorage.getItem('pid'))
    var pid = localStorage.getItem('pid')
    console.log(pid)


    // const queryParams = queryString.parse(props.location.search);
    // console.log("111111")
    //console.log(queryParams)


    //     console.log(window.location.pathname); //yields: "/js" (where snippets run)
    // console.log(window.location.href);  

    var url = window.location.href;

    // console.log("Url : "+ url);

    var str = url;
    str = str.replace("/register", "");

    const [loginPass, setloginPass] = useState('');

    const [content, setContent] = useState('');
    const [Sender, setSender] = useState('');
    const [Recv, setRecv] = useState('');
    const [RecvAddress, setRecvAdd] = useState('');
    const [SenderList, setSenderList] = useState([]);
    const [RecvList,setRecvList]= useState([]);
    // console.log(str)

    //     const location = useLocation()
    //   const { pid } = location.state

    //   console.log(pid)

    




    const showGet = () => {
        // console.log(process.env.REACT_APP_TEST)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "UserAddress": pid
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
                console.log("Test:\n",localStorage.getItem('pid'))
                console.log(result)
                setRecvList(result.Messages.MessageList);
                //   if (result.AuthenticationStatus=="Verified"){
                //     //<Link to="chat"></Link>
                //     // navigate(`/chat/${publicKey}`)
                //       console.log("1111")
                //      window.location.href = `http://localhost:3000/chat`;

                //   }
            })
            .catch(error => console.log('error', error));


    }



    const send = () => {
        // console.log(process.env.REACT_APP_TEST)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "Content": content,
            "Sender": Sender,
            "Recv": Recv,
            "SenderAddress":  localStorage.getItem('pid'),
            "RecvAddress": RecvAddress
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:4000/storeMsg", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                console.log(raw)
                //   if (result.AuthenticationStatus=="Verified"){
                //     //<Link to="chat"></Link>
                //     // navigate(`/chat/${publicKey}`)
                //       console.log("1111")
                //      window.location.href = `http://localhost:3000/chat`;

                //   }
            })
            .catch(error => console.log('error', error));


    }


    const doSome = () => {
        navigator.clipboard.writeText(document.getElementById("targetPrivateKey").value)
        // e.preventDefault();
        // console.log(e)
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

                <Card sx={{ maxWidth: 345, marginLeft: '10px' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Logged In
                        </Typography>
                        <br></br>
                        <Link to="/showsent">
                        <Button variant="contained" style={{ marginLeft: '50px', paddingBottom: '15px' }} >Show Sent Messages</Button>
                        </Link>
                        <br />
                        <br />
                        <Link to="/showRecv">
                        <Button variant="contained" style={{ marginLeft: '50px', paddingBottom: '15px' }} >Show Recv Messages</Button>
                        </Link>
                        {/* <Button variant="contained" style={{ marginLeft: '50px', paddingBottom: '15px' }} onClick={showGet}>Show Messages Received</Button> */}
                    </CardContent>


                </Card>

                
                <Card sx={{ maxWidth: 345, marginLeft: '750px' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Display Received Messages
                        </Typography>
                        {
                            RecvList.map((item, index) => (
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
                <Card sx={{ maxWidth: 345, marginLeft: '1100px' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Sent Someone a Message
                        </Typography>
                        <TextField id="outlined-basic" label="Enter Content" variant="outlined" style={{ color: 'wheat', marginLeft: '20px', paddingBottom: '30px' }}
                            onChange={(e) => { setContent(e.target.value) }}
                        />
                        <TextField id="outlined-basic" label="Enter Sender Info" variant="outlined" style={{ color: 'wheat', marginLeft: '20px', paddingBottom: '30px' }}
                            onChange={(e) => { setSender(e.target.value) }}
                        />
                        <TextField id="outlined-basic" label="Enter Recv Info" variant="outlined" style={{ color: 'wheat', marginLeft: '20px', paddingBottom: '30px' }}
                            onChange={(e) => { setRecv(e.target.value) }}
                        />
                        <TextField id="outlined-basic" label="Enter Address of Recv" variant="outlined" style={{ color: 'wheat', marginLeft: '20px', paddingBottom: '30px' }}
                            onChange={(e) => { setRecvAdd(e.target.value) }}
                        />
                        <Button variant="contained" style={{ marginLeft: '50px', paddingBottom: '15px' }} onClick={send}>send Message</Button>
                    </CardContent>


                </Card>
            </div>
        </div>
    );
}

export default Chat;
