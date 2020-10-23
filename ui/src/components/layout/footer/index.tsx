import React from 'react'
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import {Typography, makeStyles, Container, CssBaseline, Button} from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import routes from '../../../routes/routes'

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'white',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px #212121',
    opacity: 1,
    color: 'white',
    padding: '0 30px',
  },
  
  buttBLUE: {
    background: theme.palette.primary.main,
    border: 0,
    borderRadius: 3,
    height: 40,
    boxShadow: '0 3px 5px 2px #212121',
    color: 'white',
    padding: '0 30px',
  },
  letras: {
    color: theme.palette.primary.dark,
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    
    <>
  <CssBaseline />
      <Grid container direction="row"  justify="space-around"
  alignItems="center" className={classes.root}>
        <Grid item >
          <Typography className={classes.letras} variant="h6" component="h2">
            Recop
          </Typography>

          <Typography className={classes.letras} variant="subtitle1" color="textSecondary" component="p" >
                Te agradecemos por visitar nuestra web. 
          </Typography>
        </Grid>

        
        <Grid item >
          <Button
                variant="contained"
                className={classes.buttBLUE}
                to={routes.ayuda.path}
                component={RouterLink}
              >
                 Ayuda

              </Button>
        </Grid>

        <Grid item >
          <Button
                variant="contained"
                className={classes.buttBLUE}
                to={routes.terminos.path}
                component={RouterLink}
              >
                 Terminos y condiciones

              </Button>
        </Grid>

        <Grid item >
          
          <Button
                variant="contained"
                className={classes.buttBLUE}
                to={routes.contacto.path}
                component={RouterLink}
              >
                 Contacto

              </Button>
        </Grid>


      </Grid>
     
    </>
  )
}

export default Footer
