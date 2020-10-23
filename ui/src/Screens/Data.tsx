import React from 'react'
import styled from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import routes from '../routes/routes'




const useStyles = makeStyles((theme) => ({
    buttRED: {
        background: theme.palette.secondary.main,
        border: 0,
        borderRadius: 3,
        height: 120,
        boxShadow: '0 3px 5px 2px #212121',
        color: 'white',
        padding: '0 30px',
      },
      buttBLUE: {
        background: theme.palette.primary.main,
        border: 0,
        borderRadius: 3,
        height: 120,
        boxShadow: '0 3px 5px 2px #212121',
        color: 'white',
        padding: '0 30px',
      },
      green: {
        background: theme.palette.primary.dark,
        border: 0,
        borderRadius: 3,
        height: 120,
        boxShadow: '0 3px 5px 2px #212121',
        color: 'white',
        padding: '0 30px',

      },
    
  }));
  
  const StyledCard = styled(Card)`
  
  margin-top: 10px;
  min-height: 150px;
  width: 900px;
  height: 230px;
`

const Data = () => {
    const classes = useStyles();

  return (
    
    <Grid container component="main" >
      <CssBaseline />
      

        
      <Grid container justify='center' alignItems='center'  >
      <StyledCard >
      <CardContent>
            <Grid container spacing={2} justify="center" direction="column" alignItems="center">
                
                  <Grid item >
                    <Typography gutterBottom variant="h4" component="h2">
                      {"¿Que curso quieres cambiar o añadir datos? " }
                    </Typography>
                  </Grid>

                  

            <Grid container spacing={3} justify="center" alignItems="center" direction="row" >
                  <Grid item xs>
                  <Button
                variant="contained"
                className={classes.buttRED}
                fullWidth
                component={RouterLink} to={routes.primero.path}
              >
                 Primero

              </Button>
            </Grid>
            <Grid item xs >
              <Button
                variant="contained"
                className={classes.buttBLUE}
                fullWidth
                component={RouterLink} to={routes.segundo.path}
              >
                 Segundo

              </Button>
                </Grid>
                <Grid item xs>
              <Button
                variant="contained"
                className={classes.green}
                fullWidth
                component={RouterLink} to={routes.tercerocuarto.path}
              >
                 Tercero o Cuarto

              </Button>
              </Grid>
          
              </Grid>
          </Grid>
        </CardContent>
        </StyledCard>
      </Grid>
      
    </Grid>
  );
}

export default Data
