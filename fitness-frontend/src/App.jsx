import { BrowserRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom'
import { useContext, useEffect ,useState} from 'react'
import { useDispatch} from 'react-redux';
import {  setCredentials } from './store/authSlice';
import { AuthContext } from "react-oauth2-code-pkce";
import ActivityList from './components/ActivityList';
import ActivityForm from './components/ActivityForm';
import ActivityDetails from './components/ActivityDetails';
import DashboardPage from './pages/DashboardPage';
import InsightsPage from './pages/InsightsPage';

const ActivityPage = ()=>{
  return(
    <div className="mx-auto w-full max-w-6xl rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/30 backdrop-blur-md md:p-6">
      <ActivityForm onActivityAdded = {()=> window.location.reload()} />
      <ActivityList />
    </div>
  )
}

function App() {

  const  {token,tokenData,logIn,logOut,isAuthenticated} = useContext(AuthContext); 
  const dispatch = useDispatch();
  const [authReady,setAuthReady] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') return false;
    if (savedTheme === 'dark') return true;
    return true;
  });

  useEffect(() =>{
        if(token){
          dispatch(setCredentials({token,user:tokenData}));
          setAuthReady(true);
        }
  },[token,tokenData,dispatch])

  useEffect(() => {
    const nextTheme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  }, [isDarkMode]);

  const navItemClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-blue-500/20 text-[var(--color-accent)] border border-blue-400/40'
        : 'text-[var(--color-muted)] hover:bg-white/10 hover:text-[var(--color-text)] border border-transparent'
    }`;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            !token ? (
              <div className="app-theme app-background flex min-h-screen items-center justify-center p-6">
                <button
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-900/30 transition duration-300 hover:scale-[1.02] hover:from-blue-500 hover:to-purple-500"
                  onClick={() => {
                    logIn();
                  }}
                >
                  Login
                </button>
              </div>
            ) : (
              <div className="app-theme app-background relative min-h-screen">
                <div className="pointer-events-none absolute left-10 top-10 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="pointer-events-none absolute bottom-10 right-10 h-56 w-56 rounded-full bg-purple-500/20 blur-3xl" />
                <section className="mx-auto w-full max-w-7xl space-y-6 p-4 md:p-8">
                  <header className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xl shadow-black/20 backdrop-blur-md">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white shadow-lg shadow-blue-900/30">
                        F
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">Logo</p>
                        <h1 className="text-lg font-semibold tracking-tight text-[var(--color-text)] md:text-xl">FitPulse</h1>
                      </div>
                    </div>
                    <nav className="flex flex-wrap items-center gap-2">
                      <NavLink to="/dashboard" className={navItemClass}>
                        Overview
                      </NavLink>
                      <NavLink to="/activities" className={navItemClass}>
                        Activities
                      </NavLink>
                      <NavLink to="/insights" className={navItemClass}>
                        Insights
                      </NavLink>
                    </nav>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition hover:scale-[1.01]"
                        onClick={() => {
                          setIsDarkMode((prevTheme) => !prevTheme);
                        }}
                      >
                        {isDarkMode ? 'Switch to Light' : 'Switch to Dark'}
                      </button>
                      <button
                        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition hover:border-blue-400/50 hover:bg-blue-500/10"
                        onClick={() => {
                          logOut();
                        }}
                      >
                        Logout
                      </button>
                    </div>
                    </div>
                  </header>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 shadow-xl shadow-black/20 backdrop-blur-md md:px-6">
                      <p className="text-sm text-[var(--color-muted)]">Track your activities, analyze progress, and improve performance.</p>
                    </div>
                    <Routes>
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/activities" element={<ActivityPage />} />
                      <Route path="/activities/:id" element={<ActivityDetails />} />
                      <Route path="/insights" element={<InsightsPage />} />
                      <Route
                        path="/"
                        element={
                          token ? (
                            <Navigate to="/dashboard" replace />
                          ) : (
                            <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-gray-200 backdrop-blur-md">
                              Please log in to view activities
                            </div>
                          )
                        }
                      />
                    </Routes>
                  </div>
                </section>
              </div>
            )
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
