import React from 'react'
import styled from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import terms from '../assets/img/terms.svg'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px #212121',
    opacity: 1,
    color: 'white',
    padding: '0 30px',
  },
  letras: {
    color: theme.palette.primary.dark,
  }
  
}));

const StyledCard = styled(Card)`
  
  margin-top: 10px;
  min-height: 150px;
  width: 900px;
  height: 430px;
`

const Terminos = () => {
  const classes = useStyles();

  return (
    <Grid container component="main" >
      <CssBaseline />
      <Grid container justify='center' alignItems='center'  >
      <StyledCard className={classes.root}>
      <CardContent>
            <Grid container spacing={7 } justify="space-around" direction="column" alignItems="flex-start">
                <Grid container direction="row" justify="space-between" alignItems="center">
                  <Grid item xs={6}>
                    <Typography className={classes.letras} gutterBottom variant="h4" component="h2">
                      {"Esta es la seccion de Terminos y Condiciones de nuestra web. " }
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <img src={terms} alt="Sidebar media" width='80%'/>
                  </Grid>
                </Grid>
              <Typography variant="h6" color="textSecondary" component="p">
                {"Los terminos para utilizar nuestra web es formar parte de la comunidad universitaria española"}
              </Typography>
          
          
          </Grid>
        </CardContent>
        </StyledCard>
      </Grid>
      
    </Grid>
  );
}

export default Terminos
