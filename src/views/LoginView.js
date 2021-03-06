import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import zapatillaLogin from '../assets/zapatillaLogin.jpg'
import { session } from '../services/personalService';
import '../css/login1.css'
import { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
let rpta

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
 
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginView() {
  const classes = useStyles();
    const [sesion, setSesion]=useState({
        usuario:'',
        contrasena:''
    })
    //obtiene la info de los imputs
    const handleChange=(e)=>{
        setSesion({
            ...sesion,
            [e.target.name]:e.target.value,
        })
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        
            rpta=await session(sesion)
            if(rpta.message){
              console.log(rpta.statusCode)
              alert(rpta.message+", Error: "+rpta.statusCode)
            }
            else{
              alert("Bienvenido a la intranet: "+rpta.nombre+" "+rpta.apellido)
              console.log(rpta.nombre)
              window.location = '/menu';
            }
            
    }



  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} >
        <img src={zapatillaLogin} className="estiloI" style={{width:'100%', height:'100%'}}/>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login 
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Usuario"
              name="usuario"
              autoComplete="email"
              autoFocus
              onChange={(e)=>{
                  handleChange(e)
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="contrasena"
              label="Contrase??a"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>{
                handleChange(e)
            }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordar contrase??a"
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
               className={classes.submit}
               onClick={(e)=>{handleSubmit(e)}}
            >
              INICIAR SESION
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  No te acuerdas tu contrase??a?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"  "}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}