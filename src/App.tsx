import './App.css'
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
  Navigate,
  Link,
} from 'react-router-dom'
import { Chat } from './components/chat/chat'
import { Login } from './components/login/login'
import { Register } from './components/register/register'
import { SvgLoading } from '@assets/svg'
import Loading from '@components/utils/loading'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Chat />,
//     errorElement: <h1>Errror chat</h1>,

//     // children: [
//     //   {
//     //     path: 'conversation/:conversationId',
//     //     element: (
//     //       <h1>
//     //         Feed <p>msg</p>
//     //       </h1>
//     //     ),
//     //     errorElement: <h1>Error conversation</h1>,
//     //   },
//     // ],
//   },
//   {
//     path: '/login',
//     element: <Login />,
//     errorElement: <h1>Error login</h1>,
//   },
//   {
//     path: '/register',
//     element: <Register />,
//     errorElement: <h1>Error register</h1>,
//   },
// ])

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />

        <Route path='chat' element={<Chat />}>
          <Route path=':conversationId' element={<h1>conversation id</h1>} />
          {/* <Route path='/:conversationId' element={<h1>Lukitras intern</h1>} /> */}
        </Route>

        <Route path='/login' element={<Login />} />

        <Route path='/register' element={<Register />} />
        <Route
          path='/lucas'
          element={
            <>
              <h1>soy lucas</h1> <Navigate to={'/login'}></Navigate>
            </>
          }
        />

        <Route
          path='*'
          element={
            <h1>
              ^ <br />
              ^^^ <br /> || <br /> || <br />
              <br /> la ruta no es valuda por favor revice la url
            </h1>
          }
        />
      </Routes>
    </>
  )
}

export default App
