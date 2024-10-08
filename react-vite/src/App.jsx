import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { thunkAuthenticate } from './redux/session';
import { ModalProvider, Modal } from './context/Modal';
import Navigation from './components/Navigation/Navigation';
import Splash from "./pages/Splash";
import RecipeTypePage from "./pages/RecipeTypePage";
import RecipePage from "./pages/RecipePage";
import CreateRecipeForm from "./pages/CreateRecipeForm";
import UserRecipes from "./pages/UserRecipes";
import UpdateRecipeForm from "./pages/UpdateRecipeForm";

const Layout = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <div className="page-container">
      <ModalProvider>
        <Navigation isLoaded={isLoaded} />
        <div className="content-wrap">
          {isLoaded && <Outlet />}
        </div>
        <Modal />
      </ModalProvider>
      </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Splash />,
      },
      {
        path: '/recipes/types/:recipeType',
        element: <RecipeTypePage />,
      },
      {
        path: '/recipes/:recipeId',
        element: <RecipePage />,
      },
      {
        path: '/recipes/new',
        element: <CreateRecipeForm />,
      },
      {
        path: '/recipes/personal',
        element: <UserRecipes />
      },
      {
        path: '/recipes/:recipeId/edit',
        element: <UpdateRecipeForm />
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
