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
import { Link,useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import ClipboardIcon from 'react-clipboard-icon'
import {createBrowserHistory} from 'history';

import { useSelector,useDispatch } from 'react-redux'; //redux
import {StorePrivate,ClearPrivateData} from './actions/index' //redux


const history = createBrowserHistory({basename : `${process.env.PUBLIC_URL}`});






const style1 = { fill: 'grey',marginLeft:'10px' }

function Test(props) {
    const number=useSelector(state=>state.priv) //redux
    const dispatch =useDispatch(); //redux
//     const search = props.location.search; // returns the URL query String
// //     const params = new URLSearchParams(search); 
// //     const IdFromURL = params.get('id'); 
// //    // const queryParams = queryString.parse(props.location.search);
//     console.log("111111")
//     //console.log(queryParams)


//     //     console.log(window.location.pathname); //yields: "/js" (where snippets run)
//     // console.log(window.location.href);  

//     var url = window.location.href;

//     // console.log("Url : "+ url);

//     var str = url;
//     str = str.replace("/register", "");

//     const [privateKey, setPrivateKey] = useState("");
//     const [loginPass, setloginPass] = useState('');
//     // console.log(str)

// //     const location = useLocation()
// //   const { pid } = location.state

// //   console.log(pid)

//     const Reg = () => {
//         // console.log(process.env.REACT_APP_TEST)
//         fetch(process.env.REACT_APP_TEST+":4000/registeration")
//             .then(res => res.json())
//             .then(
//                 (result) => {
//                     // console.log("\n\nConsole log env::",process.env.REACT_APP_Test)
//                     console.log(result)
//                     setPrivateKey(result.PrivateKey)
//                     console.log(privateKey)
//                 },
//                 // Note: it's important to handle errors here
//                 // instead of a catch() block so that we don't swallow
//                 // exceptions from actual bugs in components.
//                 (error) => {
//                 }
//             )
//     }



//     const doSome = () => {
//         navigator.clipboard.writeText(document.getElementById("targetPrivateKey").value)
//         // e.preventDefault();
//         // console.log(e)
//     }

    return (
        <div>
            <p onClick={()=>dispatch(StorePrivate("adasd"))}>asd{number}</p>

            <p onClick={()=>dispatch(ClearPrivateData())}>clear Data</p>
            
            {/* <Link to="/" activeClassName="active"><Button variant="contained">Back</Button></Link>
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
                            Logged In
                        </Typography>
                    </CardContent>


                </Card>
            </div> */}
        </div>
    );
}

export default Test;
