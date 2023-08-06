import {  RouterProvider, } from "react-router-dom";
import {router} from './routes/index';
import { Provider } from 'react-redux';
import { store } from './Store';


export function App() {
  return (<Provider store={store}>
      <RouterProvider router={router} />
  </Provider>
  );
}


