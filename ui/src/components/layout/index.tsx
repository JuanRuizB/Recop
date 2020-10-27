import { Grid, CssBaseline} from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import MyMenu from './menu'
import Footer from './footer'
import { makeStyles } from '@material-ui/core/styles'


interface LayoutProps {
  children: React.ReactNode
}
const Container = styled(Grid)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  flex: 1;
  
`

const useStyles = makeStyles((theme) => ({
  
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    
  },
}));

const Layout = ({ children }: LayoutProps) => {
  const classes = useStyles();
  
  return(
  <>
  <CssBaseline/>
  
  <Container  container alignItems="center"  direction="column" justify="space-between"
   className={classes.image}>

    

    <MyMenu />

  

        <Grid item >
          {children}
          </Grid>
        


        <Footer />


    </Container>
  </>
  )
}

export default Layout
