import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Chat } from './components/chat/chat'
import { Login } from './components/login/login'
import { Register } from './components/register/register'

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
  return <h1>hola</h1>
  // return <RouterProvider router={router} />
}

export default App
