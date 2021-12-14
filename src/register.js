import './App.css';
import BackgroundSlider from 'react-background-slider'
import background from "./c1.jpg"
import background1 from "./c2.jpg"
import background2 from "./c3.jpg"
import Button from '@mui/material/Button';
import { TextField,Input } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
//
function Register() {
  return (
    <div>
    <BackgroundSlider
  images={[background,background1,background2]}
  duration={8} transition={2} />
<div>
<h1 style={{color:'white',paddingLeft:'50px',paddingTop:'60px'}}>Secure Messaging Application</h1>
<p style={{color:'whitesmoke',paddingLeft:'50px',fontSize:20}}>An End-to-End Secure Messaging Application which ensures that your data is 
Encrypted and and is not altered by any third party.</p>
<Card sx={{ maxWidth: 345,marginLeft:'500px'}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Login with Your Private Key
          </Typography>
          <br />
          <TextField id="outlined-basic" label="Enter Your Private Key" variant="outlined" style={{color:'wheat',marginLeft:'20px',paddingBottom:'30px'}} />
          <Button variant="contained" style={{marginLeft:'80px',marginBottom:'30px'}}>Login</Button>
            <Button variant="contained" style={{marginLeft:'50px',paddingBottom:'10px'}}>Register Yourself</Button>
            <br />
        </CardContent>
      </CardActionArea>
    </Card>

{/* <TextField id="outlined-basic" label="Enter Your Private Key" variant="outlined" style={{color:'wheat'}} />
<Button variant="contained" style={{marginLeft:'50px'}}>Register Yourself</Button> */}
</div>
</div>
  );
}

export default Register;
