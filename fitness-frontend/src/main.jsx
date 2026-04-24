
import ReactDOM from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux'
import store from './store/store'

import App from './App'
import { AuthProvider } from 'react-oauth2-code-pkce'
import { authConfig } from './authConfig'


// As of React 18
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AuthProvider authConfig={authConfig}
                loadingComponent={
                  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-gray-950 to-gray-900 p-6">
                    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur-md">
                      <div className="animate-pulse space-y-4">
                        <div className="h-6 w-40 rounded bg-white/10"></div>
                        <div className="h-4 w-full rounded bg-white/10"></div>
                        <div className="h-4 w-5/6 rounded bg-white/10"></div>
                      </div>
                    </div>
                  </div>
                }>
  <Provider store={store}>
    <App />
  </Provider>
  </AuthProvider>,
)