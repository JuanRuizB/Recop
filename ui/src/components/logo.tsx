import { IconButton, Link } from '@material-ui/core'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import uca from '../assets/img/uca-6.svg'
import routes from '../routes/routes'


const Logo = () => {


  return (
    <IconButton>
      <Link component={RouterLink} to={routes.baseUrl.path}>
        <div>
          <img src={uca} alt="uca Logo" width='70%'/>
        </div>
      </Link>
    </IconButton>
  )
}

export default Logo
