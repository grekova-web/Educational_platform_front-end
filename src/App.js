import './App.css';
import React from 'react';
import {Route} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import AuthPageContainer from "./components/AuthPage/AuthPageContainer";
import CatalogPage from "./components/CatalogPage/CatalogPage";
import ProfilePageContainer from "./components/ProfilePage/ProfilePageContainer";
import AdminAuthPageContainer from "./admin/AdminAuthPage/AdminAuthPageContainer";

class App extends React.Component {
    render() {
        return (
            <div>
                <NavbarContainer/>
                <Route
                    exact path='/'
                    render={() => <MainPage/>}
                />
                <Route
                    exact path='/auth'
                    render={() => <AuthPageContainer/>}
                />
                <Route
                    exact path='/catalog'
                    render={() => <CatalogPage/>}
                />
                <Route
                    exact path='/profile'
                    render={() => <ProfilePageContainer/>}
                />
                <Route
                    exact path='/admin/login'
                    render={() => <AdminAuthPageContainer/>}
                />
            </div>
        )
    }
}

export default App;
