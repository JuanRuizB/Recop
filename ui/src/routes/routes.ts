import Home from '../Screens/Home'
import Register from '../Screens/Register'
import Data from '../Screens/Data'
import RegisterCont from '../Screens/RegisterCont'
import Contacto from '../Screens/Contacto'
import Ayuda from '../Screens/Ayuda'
import Terminos from '../Screens/Terminos'
import Primero from '../Screens/Primero'
import Perfil from '../Screens/Perfil'
import Segundo from '../Screens/Segundo'
import Tercerocuarto from '../Screens/Tercerocuarto'
import Recomendaciones from '../Screens/Recomendaciones'

export interface RouteType {
  component: React.ReactNode
  name: string
  path: string
}

interface RoutesType {
  baseUrl: RouteType
  register: RouteType
  data: RouteType
  registerCont: RouteType
  ayuda: RouteType
  contacto: RouteType
  terminos: RouteType
  primero: RouteType
  segundo: RouteType
  tercerocuarto: RouteType
  perfil: RouteType
  recomendaciones: RouteType
}

const routes: RoutesType = {
  baseUrl: {
    component: Home,
    name: 'Home',
    path: '/',
  },
  register: {
    component: Register,
    name: 'Register',
    path: '/register',
  },
  data: {
    component: Data,
    name: 'Data',
    path: '/data',
  },
  registerCont:{
    component: RegisterCont,
    name: 'RegisterCont',
    path: '/registerCont',
  },
  ayuda:{
    component: Ayuda,
    name: 'Ayuda',
    path: '/ayuda',
  },
  contacto:{
    component: Contacto,
    name: 'Contacto',
    path: '/contacto',
  },
  terminos:{
    component: Terminos,
    name: 'Terminos',
    path: '/terminos',
  },
  primero:{
    component: Primero,
    name: 'Primero',
    path: '/primero',
  },
  segundo:{
    component: Segundo,
    name: 'Segundo',
    path: '/segundo',
  },
  tercerocuarto:{
    component: Tercerocuarto,
    name: 'Tercerocuarto',
    path: '/tercerocuarto',
  },
  perfil:{
    component: Perfil,
    name: 'Perfil',
    path: '/perfil',
  },
  recomendaciones:{
    component: Recomendaciones,
    name: 'Recomendaciones',
    path: '/recomendaciones',
  },

}

export default routes
