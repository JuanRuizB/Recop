import { Grid, CssBaseline, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import routes from '../../../routes/routes'
import Logo from '../../logo'
import SignIn from '../../login'
import Button from '@material-ui/core/Button';
import 'firebase/auth'
import {useFirebaseApp, useUser} from 'reactfire'
import { Link as RouterLink } from 'react-router-dom'

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
  buttRED: {
    background: theme.palette.secondary.main,
    border: 0,
    borderRadius: 3,
    height: 48,
    boxShadow: '0 3px 5px 2px #212121',
    color: 'white',
    padding: '0 30px',
  },
  buttBLUE: {
    background: theme.palette.primary.main,
    border: 0,
    borderRadius: 3,
    height: 48,
    boxShadow: '0 3px 5px 2px #212121',
    color: 'white',
    padding: '0 30px',
  },
  letras: {
    color: theme.palette.primary.dark,
  }
}));

const MyMenu = () => {
  const classes = useStyles();
  const firebase = useFirebaseApp();
  var user  = useUser<firebase.User>();


  const logout = async () => {
    await firebase.auth().signOut();
}



  return (
    <>
     <CssBaseline />
    
        <Grid container direction="row"  justify="space-between" alignItems="center" className={classes.root}>
          
          <Grid item xs={4} >
            <Logo />

          </Grid>
          <Grid item />
          
          
          
          <Grid item xs={8}>

            {!user &&
            
            <Grid container direction="row-reverse" justify="space-around" alignItems="center" spacing={3}>
            <SignIn/>
            </Grid>
            
            }
            

            
            {user &&
              <Grid container direction="row"  justify="space-around" alignItems="center">
            <Grid item >
            <Button
                variant="contained"
                className={classes.buttBLUE}
                to={routes.data.path}
                component={RouterLink}
              >
                 Asignaturas

              </Button>
          </Grid>
          <Grid item >
          <Button
                variant="contained"
                className={classes.buttBLUE}
                to={routes.perfil.path}
                component={RouterLink}
              >
                 Perfil

              </Button>
          </Grid>
          <Grid item >
          <Button
                variant="contained"
                className={classes.buttBLUE}
                to={routes.recomendaciones.path}
                component={RouterLink}
              >
                 Recomendaciones

              </Button>
          </Grid>
              
          <Grid item spacing={0} >
              <Button
                type="submit"
                variant="contained"
                className={classes.buttRED}
                onClick={logout}
                component={RouterLink} to={routes.baseUrl.path}
              >
                 Cerrar Sesion

              </Button>
              </Grid>
            </Grid>

            }

          </Grid>
        </Grid>
        
    </>
  )
}

export default MyMenu
