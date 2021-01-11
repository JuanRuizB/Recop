import React, {useState} from 'react'
import styled from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom'
import routes from '../routes/routes'
import Asignatura from '../components/asignatura'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useFirebaseApp, useUser} from 'reactfire'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  accordion: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  list:{
    position: 'relative',
    overflow: 'auto',
    width: '100%',

  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const StyledCard = styled(Card)`
  
margin-top: 10px;
margin-bottom: 10px;
min-height: 150px;
height: 580px;
  
`

const Tercerocuarto = () => {
  const classes = useStyles();
  const [bool2, setBool2] = useState(true);
  const [bool, setBool] = useState(true);

  const [asignaturasCod, setAsignaturasCod] = useState<string[]>([""]);
  
  const [asignaturasNom, setAsignaturasNom] = useState<string[]>([""]);

  const [asignaturasCodTercero, setAsignaturasCodTercero] = useState<string[]>([""]);
  
  const [asignaturasNomTercero, setAsignaturasNomTercero] = useState<string[]>([""]);

  const firebase = useFirebaseApp();
  var userKey = useUser<firebase.User>();

  if(bool2 === true){

    setBool2(false)
    
    firebase.database().ref('users/' + userKey.uid + '/grado').once('value').then(function(snapshot)
    {
        var grado = snapshot.val() || '';


        firebase.database().ref('users/' + userKey.uid + '/universidad').once('value').then(function(snapshot)
    {
        var universidad = snapshot.val() || '';


        firebase.database().ref('asignaturas/'+ universidad + '/' + grado + '/codigos/').once('value').then(function(snapshot)
      {
       var cont = 0;
       var aux1 = [""]
       var aux2 = [""]

       
       
        snapshot.forEach(function(datasnapshot){
          
          if(datasnapshot.key != null){
            
            aux1[cont] = datasnapshot.key
            aux2[cont] = datasnapshot.val()
            cont += 1
            
          }
        })

        setAsignaturasCod(aux1)
        setAsignaturasNom(aux2) 

        firebase.database().ref('asignaturas/'+ universidad + '/' + grado + '/codigosTercero/').once('value').then(function(snapshot)
      {
       var cont = 0;
       var aux1 = [""]
       var aux2 = [""]

       
       
        snapshot.forEach(function(datasnapshot){
          
          if(datasnapshot.key != null){
            
            aux1[cont] = datasnapshot.key
            aux2[cont] = datasnapshot.val()
            cont += 1
            
          }
        })

        setAsignaturasCodTercero(aux1)
        setAsignaturasNomTercero(aux2) 
        setBool(false)
    });
        
    });

    
    
    });

    });


    
}


    

  return (
    <Grid container component="main" >
      <CssBaseline />
      <Grid container justify='center' alignItems='center'  >
      <StyledCard className={classes.list}>
        <CardContent>
        <Grid container justify="center" direction="column" alignItems="center">
  <Grid item >
    <Typography component="h1" variant="h5">
    Asignaturas de Tercero y Cuarto
  </Typography>
  </Grid>
  <Grid item >
  <Avatar className={classes.avatar}>
    <LockOutlinedIcon />
    </Avatar>
  </Grid>   

  <Grid item >
  <Typography  variant="h6" color="textSecondary" component="p">
              Por favor rellena todos los datos de las asignaturas que hayas cursado, 
              
              </Typography>
              <Typography  variant="h6" color="textSecondary" component="p">
              si hay algunas que no hayas cursado, pon los datos a 0 excepto las de las especialidades
              </Typography>
              <Typography  variant="h6" color="textSecondary" component="p">
              que si puedes dejarlas sin contestar.
              </Typography>
              </Grid>

      {(bool === true) &&
      <>
<Backdrop className={classes.backdrop} open={bool}>
        <CircularProgress color="inherit" />
      </Backdrop>

      </>
      }
       
       { (bool === false) && 
  <><Asignatura id={asignaturasCodTercero[0]} nombre={asignaturasNomTercero[0]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCodTercero[1]} nombre={asignaturasNomTercero[1]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCodTercero[2]} nombre={asignaturasNomTercero[2]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCodTercero[3]} nombre={asignaturasNomTercero[3]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCodTercero[4]} nombre={asignaturasNomTercero[4]} curso={"tercerocuarto"} />
  

  
  <Accordion className={classes.accordion}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      
    >
      <Typography component="h1" variant="h5">
        Computacion
        </Typography>
    </AccordionSummary>
    <AccordionDetails>
    <Grid container justify="center" direction="column" alignItems="center" >
    <Asignatura id={asignaturasCod[0]} nombre={asignaturasNom[0]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[1]} nombre={asignaturasNom[1]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[2]} nombre={asignaturasNom[2]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[3]} nombre={asignaturasNom[3]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[4]} nombre={asignaturasNom[4]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[5]} nombre={asignaturasNom[5]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[6]} nombre={asignaturasNom[6]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[7]} nombre={asignaturasNom[7]} curso={"tercerocuarto"} />
  
  </Grid>

    </AccordionDetails>
  </Accordion>

  <Accordion className={classes.accordion}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      
    >
      <Typography component="h1" variant="h5">
      Ingeniería de Computadores
        </Typography>
    </AccordionSummary>
    <AccordionDetails>
    <Grid container justify="center" direction="column" alignItems="center" >
    <Asignatura id={asignaturasCod[8]} nombre={asignaturasNom[8]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[9]} nombre={asignaturasNom[9]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[10]} nombre={asignaturasNom[10]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[11]} nombre={asignaturasNom[11]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[12]} nombre={asignaturasNom[12]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[13]} nombre={asignaturasNom[13]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[14]} nombre={asignaturasNom[14]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[15]} nombre={asignaturasNom[15]} curso={"tercerocuarto"} />
  
  </Grid>

    </AccordionDetails>
  </Accordion>


  <Accordion className={classes.accordion}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      
    >
      <Typography component="h1" variant="h5">
      Ingeniería del Software
        </Typography>
    </AccordionSummary>
    <AccordionDetails>
    <Grid container justify="center" direction="column" alignItems="center" >
    <Asignatura id={asignaturasCod[16]} nombre={asignaturasNom[16]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[17]} nombre={asignaturasNom[17]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[18]} nombre={asignaturasNom[18]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[19]} nombre={asignaturasNom[19]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[20]} nombre={asignaturasNom[20]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[21]} nombre={asignaturasNom[21]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[22]} nombre={asignaturasNom[22]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[23]} nombre={asignaturasNom[23]} curso={"tercerocuarto"} />
  
  </Grid>

    </AccordionDetails>
  </Accordion>

  <Accordion className={classes.accordion}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      
    >
      <Typography component="h1" variant="h5">
      Sistemas de Información
        </Typography>
    </AccordionSummary>
    <AccordionDetails>
    <Grid container justify="center" direction="column" alignItems="center" >
    <Asignatura id={asignaturasCod[24]} nombre={asignaturasNom[24]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[25]} nombre={asignaturasNom[25]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[26]} nombre={asignaturasNom[26]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[27]} nombre={asignaturasNom[27]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[28]} nombre={asignaturasNom[28]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[29]} nombre={asignaturasNom[29]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[30]} nombre={asignaturasNom[30]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[31]} nombre={asignaturasNom[31]} curso={"tercerocuarto"} />
  
  </Grid>

    </AccordionDetails>
  </Accordion>

  <Accordion className={classes.accordion}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      
    >
      <Typography component="h1" variant="h5">
      Tecnologías de la Información
        </Typography>
    </AccordionSummary>
    <AccordionDetails>
    <Grid container justify="center" direction="column" alignItems="center" >
    <Asignatura id={asignaturasCod[32]} nombre={asignaturasNom[32]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[33]} nombre={asignaturasNom[33]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[34]} nombre={asignaturasNom[34]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[35]} nombre={asignaturasNom[35]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[36]} nombre={asignaturasNom[36]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[37]} nombre={asignaturasNom[37]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[46]} nombre={asignaturasNom[46]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[43]} nombre={asignaturasNom[43]} curso={"tercerocuarto"} />
  
  </Grid>

    </AccordionDetails>
  </Accordion>


  <Accordion className={classes.accordion}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      
    >
      <Typography component="h1" variant="h5">
      Optativas
        </Typography>
    </AccordionSummary>
    <AccordionDetails>
    <Grid container justify="center" direction="column" alignItems="center" >
    <Asignatura id={asignaturasCod[38]} nombre={asignaturasNom[38]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[39]} nombre={asignaturasNom[39]} curso={"tercerocuarto"} />
    <Asignatura id={asignaturasCod[40]} nombre={asignaturasNom[40]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[41]} nombre={asignaturasNom[41]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[42]} nombre={asignaturasNom[42]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[44]} nombre={asignaturasNom[44]} curso={"tercerocuarto"} />
  <Asignatura id={asignaturasCod[45]} nombre={asignaturasNom[45]} curso={"tercerocuarto"} />
  
  
  

                      </Grid>

                    </AccordionDetails>
                  </Accordion></>
      
  }
      </Grid>
       
     <Grid container direction='row' justify="space-between" alignItems="center">     
    <Grid item xs>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="secondary"
      className={classes.submit}
      component={RouterLink} to={routes.data.path}
    >
          Volver

    </Button>
    </Grid>

    <Grid item xs>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
      component={RouterLink} to={routes.recomendaciones.path}
    >
          Continuar

    </Button>
    </Grid>
    </Grid>

        </CardContent>
      </StyledCard>
          
      </Grid>
      
    </Grid>
  );
}

export default Tercerocuarto

