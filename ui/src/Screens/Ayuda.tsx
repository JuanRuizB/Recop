import React from 'react'
import styled from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import help from '../assets/img/help.svg'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'


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
  letras: {
    color: theme.palette.primary.dark,
  }
  
}));

const StyledCard = styled(Card)`
  
  margin-top: 10px;
  min-height: 150px;
  width: 900px;
  height: 450px;
`

const Ayuda = () => {
  const classes = useStyles();

  return (
    <Grid container component="main" >
      <CssBaseline />
      <Grid container justify='center' alignItems='center'  >
      <StyledCard className={classes.root}>
      <CardContent>
            <Grid container spacing={3} justify="space-around" direction="column" alignItems="flex-start">
                <Grid container direction="row" justify="space-between" alignItems="center">
                  <Grid item xs={6}>
                    <Typography className={classes.letras} gutterBottom variant="h4" component="h2">
                      {"Esta es la seccion de Ayuda de nuestra web. " }
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <img src={help} alt="Sidebar media" width='100%'/>
                  </Grid>
                </Grid>
              <Typography variant="h6" color="textSecondary" component="p">
                {"Si tiene algun problema para registrarse o para visualizar sus resultados contactenos"}
              </Typography>
          
          
          </Grid>
        </CardContent>
        </StyledCard>
      </Grid>
      
    </Grid>
  );
}

export default Ayuda
