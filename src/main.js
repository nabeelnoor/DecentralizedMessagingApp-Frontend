import logo from './logo.svg';
import './App.css';
import BackgroundSlider from 'react-background-slider'
import background from "./c1.jpg"
import background1 from "./c2.jpg"
import background2 from "./c3.jpg"
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
//
function Main() {
  return (
    <div>
    <BackgroundSlider
  images={[background,background1,background2]}
  duration={8} transition={2} />
<div>
<h1 style={{color:'white',paddingLeft:'50px',paddingTop:'60px'}}>Secure Messaging Application</h1>
<p style={{color:'whitesmoke',paddingLeft:'50px',fontSize:20}}>An End-to-End Secure Messaging Application which ensures that your data is 
Encrypted and and is not altered by any third party.</p>
<Button variant="contained" style={{marginLeft:'50px'}}>Start Chat</Button>
{/* <TextField id="outlined-basic" label="Outlined" variant="outlined" />
<TextField id="filled-basic" label="Filled" variant="filled" />
<TextField id="standard-basic" label="Standard" variant="standard" /> */}
</div>
</div>
  );
}

export default Main;
