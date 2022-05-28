import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { persistor, store } from "../redux/store"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Login } from "../pages";
import ProtectingRoute from "./protectingRoute";

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
                                    <Home />
                                </ProtectingRoute>
                            }
                        />
                        <Route path="login" element={<Login />} />
                    </Routes>
                </Router>
            </PersistGate>
        </Provider>
    )
}

export default Routers;