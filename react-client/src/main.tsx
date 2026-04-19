import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import App from './App.tsx'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}> {/* WRAPPING THE ENTIRE APP WITH REDUX STORE */}
      <App />
      <ToastContainer />
    </Provider>
  </StrictMode>,
)
