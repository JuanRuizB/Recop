import { Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import routes from '../routes/routes'
import CssBaseline from '@material-ui/core/CssBaseline';
import uca from '../assets/img/uca(1).svg'
import { Link as RouterLink } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import {useUser} from 'reactfire'

const StyledCard = styled(Card)`
margin-top: 10px;
  min-height: 150px;
  width: 900px;
  height: 520px;
`


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
  letras: {
    color: theme.palette.primary.dark,
  }

}));

const Home = () => {
  const user = useUser();
  const classes = useStyles();
  return (
    <Grid container component="main" >
      <CssBaseline />
      <Grid container justify='center' alignItems='center' >
          
          <Grid item >
          <StyledCard className={classes.root}>
        <CardContent >
            <Grid container spacing={5} justify="space-around" direction="column" alignItems="flex-start" >
                <Grid container spacing={5} direction="row" justify="space-between" alignItems="center">
                  <Grid item xs={6}>
                    <Typography className={classes.letras} gutterBottom variant="h4" component="h2">
                    Bienvenido a Recop la app que te ayudara a elegir las optativas que más se adapten a ti.
                    </Typography>
                  </Grid>
                  <Grid item xs={6} >
                    <img src={uca} alt="Sidebar media" width='80%'/>
                  </Grid>
                </Grid>
                
              <Typography  variant="h6" color="textSecondary" component="p">
              Para poder empezar, basta con registrarse e introducir tus datos académicos de los cursos pasados para así, poder crear un perfil de tus gustos y
            habilidades. Gracias a este perfil podremos recomendarte las mejores optativas según tu perfil.
              </Typography>
          
              {!user &&
          <Grid item xs>
            <Button component={RouterLink} to={routes.registerCont.path} type="submit" variant="contained"
              className={classes.buttRED}>
                Registrarse
            </Button>
          </Grid>
          
          }
         
          </Grid>
        </CardContent>
      </StyledCard>
          </Grid>
      </Grid>
      
    </Grid>
  );

}

export default Home
