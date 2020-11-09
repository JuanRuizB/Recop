import React from 'react'
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

  }
}));

const StyledCard = styled(Card)`
  
margin-top: 10px;
margin-bottom: 10px;
min-height: 150px;
height: 580px;
  
`

const Tercerocuarto = () => {
  const classes = useStyles();

    

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
       
       
    
      
      <Asignatura id={"21714018"} nombre={"Proyectos Informaticos"} curso={"tercerocuarto"}/>
      <Asignatura id={"21714020"} nombre={"Programacion Concurrente y de Tiempo Real"} curso={"tercerocuarto"} />
      <Asignatura id={"21714015"} nombre={"Diseño de Algoritmos"} curso={"tercerocuarto"} />

      
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
        <Asignatura id={"21714031"} nombre={"Sistemas Inteligentes"} curso={"tercerocuarto"} />
      <Asignatura id={"21714030"} nombre={"Reconocimiento de Patrones"} curso={"tercerocuarto"} />
      <Asignatura id={"21714027"} nombre={"Teoría de Autómatas y Lenguajes Formales"} curso={"tercerocuarto"} />
      <Asignatura id={"21714026"} nombre={"Procesadores de Lenguajes"} curso={"tercerocuarto"} />
      <Asignatura id={"21714029"} nombre={"Percepción"} curso={"tercerocuarto"} />
      <Asignatura id={"21714028"} nombre={"Aprendizaje Computacional"} curso={"tercerocuarto"} />
      <Asignatura id={"21714024"} nombre={"Complejidad Computacional"} curso={"tercerocuarto"} />
      <Asignatura id={"21714025"} nombre={"Modelos de Computación"} curso={"tercerocuarto"} />
      
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
        <Asignatura id={"21714035"} nombre={"Diseño Basado en Microprocesadores"} curso={"tercerocuarto"} />
      <Asignatura id={"21714036"} nombre={"Diseño de Computadores Empotrados"} curso={"tercerocuarto"} />
      <Asignatura id={"21714039"} nombre={"Diseño de Redes de Computadores"} curso={"tercerocuarto"} />
      <Asignatura id={"21714037"} nombre={"Técnicas de Diseño de Computadores "} curso={"tercerocuarto"} />
      <Asignatura id={"21714038"} nombre={"Administración y Seguridad de Redes de Computadores"} curso={"tercerocuarto"} />
      <Asignatura id={"21714032"} nombre={"Arquitectura de Computadores Paralelos y Distribuidos"} curso={"tercerocuarto"} />
      <Asignatura id={"21714034"} nombre={"Diseño Avanzado de Arquitectura de Computadores"} curso={"tercerocuarto"} />
      <Asignatura id={"21714033"} nombre={"Programación Paralela y Distribuida"} curso={"tercerocuarto"} />
      
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
        <Asignatura id={"21714040"} nombre={"Diseño de Sistemas Software"} curso={"tercerocuarto"} />
      <Asignatura id={"21714047"} nombre={"Implementación e Implantación de Sistemas Software"} curso={"tercerocuarto"} />
      <Asignatura id={"21714043"} nombre={"Calidad del Software"} curso={"tercerocuarto"} />
      <Asignatura id={"21714044"} nombre={"Dirección y Gestión de Proyectos Software"} curso={"tercerocuarto"} />
      <Asignatura id={"21714041"} nombre={"Ingeniería de Requisitos"} curso={"tercerocuarto"} />
      <Asignatura id={"21714046"} nombre={"Evolución del Software"} curso={"tercerocuarto"} />
      <Asignatura id={"21714042"} nombre={"Verificación y Validación de Software"} curso={"tercerocuarto"} />
      <Asignatura id={"21714045"} nombre={"Metodologías y Procesos Software"} curso={"tercerocuarto"} />
      
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
        <Asignatura id={"21714048"} nombre={"Desarrollo de Sistemas Hipermedia"} curso={"tercerocuarto"} />
      <Asignatura id={"21714053"} nombre={"Administración de Bases de Datos"} curso={"tercerocuarto"} />
      <Asignatura id={"21714049"} nombre={"Programación en Internet"} curso={"tercerocuarto"} />
      <Asignatura id={"21714051"} nombre={"Ingeniería de Sistemas de Información"} curso={"tercerocuarto"} />
      <Asignatura id={"21714052"} nombre={"Sistemas de Información en la Empresa"} curso={"tercerocuarto"} />
      <Asignatura id={"21714050"} nombre={"Recuperación de la Información"} curso={"tercerocuarto"} />
      <Asignatura id={"21714054"} nombre={"Tecnologías Avanzadas de Bases de Datos"} curso={"tercerocuarto"} />
      <Asignatura id={"21714055"} nombre={"Tecnologías de Inteligencia de Negocio"} curso={"tercerocuarto"} />
      
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
        <Asignatura id={"21714056"} nombre={"Administración de Servidores"} curso={"tercerocuarto"} />
      <Asignatura id={"21714058"} nombre={"Calidad de los Sistemas Informáticos"} curso={"tercerocuarto"} />
      <Asignatura id={"21714080"} nombre={"Interacción Persona-Ordenador"} curso={"tercerocuarto"} />
      <Asignatura id={"21714061"} nombre={"Ingeniería Web"} curso={"tercerocuarto"} />
      <Asignatura id={"21714057"} nombre={"Interconexión de Redes"} curso={"tercerocuarto"} />
      <Asignatura id={"21714063"} nombre={"Programación Web"} curso={"tercerocuarto"} />
      <Asignatura id={"21714085"} nombre={"Virtualización de Sistemas"} curso={"tercerocuarto"} />
      <Asignatura id={"21714059"} nombre={"Seguridad en los Sistemas Informáticos"} curso={"tercerocuarto"} />
      
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
        <Asignatura id={"21714075"} nombre={"Ampliación de Lógica Matemática"} curso={"tercerocuarto"} />
      <Asignatura id={"21714076"} nombre={"Control Estadístico de Calidad y Fiabilidad"} curso={"tercerocuarto"} />
      <Asignatura id={"21714077"} nombre={"Control por Computador"} curso={"tercerocuarto"} />
      <Asignatura id={"21714078"} nombre={"Diseño de Videojuegos"} curso={"tercerocuarto"} />
      <Asignatura id={"21714079"} nombre={"Inglés Técnico"} curso={"tercerocuarto"} />
      <Asignatura id={"21714081"} nombre={"Métodos Numéricos para la Ingeniería Informática"} curso={"tercerocuarto"} />
      <Asignatura id={"21714082"} nombre={"Técnicas Avanzadas de Optimización"} curso={"tercerocuarto"} />
      
      
      </Grid>

        </AccordionDetails>
      </Accordion>
      
      
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
