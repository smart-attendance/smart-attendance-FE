import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { persistor, store } from "../redux/store"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AdminDash, Attendances, Home, Landing, Schedules, Users } from "../pages";
import ProtectingRoute from "./protectingRoute";
import { LoginAdmin } from "../components";

const Routers = () => {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectingRoute>
                    <Landing />
                  </ProtectingRoute>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectingRoute>
                    <AdminDash />
                  </ProtectingRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectingRoute>
                    <Users />
                  </ProtectingRoute>
                }
              />
              <Route
                path="/admin/attendances"
                element={
                  <ProtectingRoute>
                    <Attendances />
                  </ProtectingRoute>
                }
              />
              <Route
                path="/admin/schedules"
                element={
                  <ProtectingRoute>
                    <Schedules />
                  </ProtectingRoute>
                }
              />
              <Route
                path="/user"
                element={
                  <ProtectingRoute>
                    <Home />
                  </ProtectingRoute>
                }
              />

              <Route path="admin" element={<LoginAdmin />} />
              <Route
                path="*"
                element={
                  <div className="bg-slate-700 h-screen p-16 items-center text-white text-3xl">
                    Error 404: Page not Found
                  </div>
                }
              />
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    );
}

export default Routers;