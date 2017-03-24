// Router de l'app
// Les routes avec les paramètres sont définies ici

import React from 'react';
import {Router, Route, IndexRoute, History} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Dashboard from './../Components/Dashboard/Dashboard';
import Accounts from './../Components/Accounts/Accounts';
import Projects from './../Components/Projects/Projects';
import Login from './../Components/Login/Login';
import PageNotFound from './../Components/PageNotFound/PageNotFound';
import NotAuthorized from './../Components/NotAuthorized/NotAuthorized';
import Wrapper from './../Components/Wrapper/Wrapper';
import Index from '../Components/Index/Index';
import TrelloComponent from '../Components/TrelloComponent/TrelloComponent';

import {}  from 'material-ui/svg-icons/device/airplanemode-active';

export default class RouterComponent extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                {/*
                - Définition des routes avec
                 le path : url de la route,
                 component : composant à appeler,
                 name : nom de la route pour le menu,
                 authorizedRoles : gestion des droits,

                 - Le droit guest est pour les visiteur

                 - On fais passer toute les routes dans le wrapper, sont role sera d'afficher le template, la structure visuel,
                  puis l'état de l'application comme connecté/déconnecté

                */}
                <Router history={createBrowserHistory()} >
                    <Route path="/" component={Wrapper}  >
                        <IndexRoute component={Dashboard} />
                        <Route path="/projects" component={Dashboard} name="Projets"/>
                        <Route path="/trello" component={TrelloComponent} name="Trello"/>
                        <Route path="/projectsManagement" authorizedRoles={['Project Manager']} component={Projects} name="Gérer mes projets "/>
                        <Route path="/accountsManagement" authorizedRoles={['Administrator','Project Manager']} component={Accounts} name="Gérer les comptes"/>
                        <Route path="/login" component={Login} authorizedRoles={['guest']} handler={this.handleLogged} name="Se connecter" />
                        <Route path="/noAccess" component={NotAuthorized}/>
                        <Route path="*" component={PageNotFound}/>
                    </Route>
                </Router>
            </div>
        );
    }
}