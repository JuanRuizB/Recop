import React, {useState} from 'react'
import Grid from '@material-ui/core/Grid';
import {Typography, FormControl, RadioGroup, FormControlLabel, Radio, FormLabel } from '@material-ui/core'
import { useUser} from 'reactfire'
import firebase from 'firebase'


interface AsignaturaProps {
    id: string
    nombre: string
    curso: string
}

const Asignatura = ({ id, nombre, curso }: AsignaturaProps) => {

    const [bool, setBool] = useState(false);
    const [a1, setA1] = useState(''); 
    const [a2, setA2] = useState('');
    const [a3, setA3] = useState('');
    const [a4, setA4] = useState('');
    
    

    var user  = useUser<firebase.User>();
    
    if(bool === false){
     firebase.database().ref('users/' + user.uid + '/' + curso + '/' + id).once('value').then(function(snapshot)
     {
        var cadena = snapshot.val() || '';
        setA1(cadena.charAt((0)) + cadena.charAt((1)))
        setA2(cadena.charAt((2)))
        setA3(cadena.charAt((3)))
        setA4(cadena.charAt((4))) 
        setBool(true);
     });
    }
           
     if(bool){
        firebase.database().ref('users/' + user.uid + '/' + curso + '/' + id).set(
            (a1 + a2 + a3 + a4)
        )
        
     }


        return (
            <>
            <Grid container justify="center" direction="column" alignItems="center">
                <Grid container justify="center">
                    <Typography variant="h6">
                    {nombre + "(" + id + ")"}
                    </Typography>
                </Grid>

                <FormControl component="fieldset">
            
                    <RadioGroup value={a1} onChange={(ev) => setA1(ev.target.value)}>
                        <FormLabel component="legend">Nota</FormLabel>
                        <Grid container direction="row">
                            <FormControlLabel value="00" control={<Radio />} label="0" />
                            <FormControlLabel value="01" control={<Radio />} label="1" />
                            <FormControlLabel value="02" control={<Radio />} label="2" />
                            <FormControlLabel value="03" control={<Radio />} label="3" />
                            <FormControlLabel value="04" control={<Radio />} label="4" />
                            <FormControlLabel value="05" control={<Radio />} label="5" />
                            <FormControlLabel value="06" control={<Radio />} label="6" />
                            <FormControlLabel value="07" control={<Radio />} label="7" />
                            <FormControlLabel value="08" control={<Radio />} label="8" />
                            <FormControlLabel value="09" control={<Radio />} label="9" />
                            <FormControlLabel value="10" control={<Radio />} label="10" />
                        </Grid>
                    </RadioGroup>
                    <RadioGroup value={a2} onChange={(ev) => setA2(ev.target.value)}>
                        <FormLabel component="legend">Utilidad</FormLabel>
                        <Grid container direction="row">
                            <FormControlLabel value="0" control={<Radio />} label="0" />
                            <FormControlLabel value="1" control={<Radio />} label="1" />
                            <FormControlLabel value="2" control={<Radio />} label="2" />
                            <FormControlLabel value="3" control={<Radio />} label="3" />
                            <FormControlLabel value="4" control={<Radio />} label="4" />
                            <FormControlLabel value="5" control={<Radio />} label="5" />
            
                        </Grid>
                    </RadioGroup>
            
                    <RadioGroup value={a3} onChange={(ev) => setA3(ev.target.value)}>
                        <FormLabel component="legend">Te ha gustado</FormLabel>
                        <Grid container direction="row">
                            <FormControlLabel value="0" control={<Radio />} label="0" />
                            <FormControlLabel value="1" control={<Radio />} label="1" />
                            <FormControlLabel value="2" control={<Radio />} label="2" />
                            <FormControlLabel value="3" control={<Radio />} label="3" />
                            <FormControlLabel value="4" control={<Radio />} label="4" />
                            <FormControlLabel value="5" control={<Radio />} label="5" />
            
                        </Grid>
                    </RadioGroup>
            
                    <RadioGroup value={a4} onChange={(ev) => setA4(ev.target.value)}>
                        <FormLabel component="legend">Suspensos</FormLabel>
                        <Grid container direction="row">
                            <FormControlLabel value="0" control={<Radio />} label="0" />
                            <FormControlLabel value="1" control={<Radio />} label="1" />
                            <FormControlLabel value="2" control={<Radio />} label="2" />
                            <FormControlLabel value="3" control={<Radio />} label="3" />
                            <FormControlLabel value="4" control={<Radio />} label="4" />
                            <FormControlLabel value="5" control={<Radio />} label="5" />
            
                        </Grid>
                    </RadioGroup>
                </FormControl>
            </Grid>
        
        </>
        );
    
}

export default Asignatura

