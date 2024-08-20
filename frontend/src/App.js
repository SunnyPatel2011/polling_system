import './App.css';
import Header from './components/header';
import Login from './log/login';
import SignUp from './log/signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Btn from './log/btns';
import QuestionVote from './components/questionVote'; 
import Inside from './components/inside';
import ViewQuestionBtn from './pages/viewQuestionBtn.js';
import ViewQuestion from './pages/viewQuestion.js';
import EditFile from './pages/Editfile.js';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/signup",
      element: <SignUp />
    },
    {
      path: '/header',
      element: <Header />
    },
    {
      path: '/btn',
      element: <Btn />
    },
    {
      path: '/inside',
      element: <Inside />
    },
    {
      path: '/questions/:questionId',
      element: <QuestionVote />
    },
    {
      path: '/view',
      element: <ViewQuestionBtn />
    },
    {
      path: '/viewquestion',
      element: <ViewQuestion />
    },
    {
      path: '/questions/:questionId/edit',
      element: <EditFile />
    }

  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
