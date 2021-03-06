//////////////////////////////////////
// CardUserActions component
// Display a user in account management view
/////////////////////////////////////

import React from 'react';
import {Card, CardActions, CardHeader,  CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { TextField, SelectField, MenuItem }from 'material-ui';
import Divider from 'material-ui/Divider';
import Axios from 'axios';
import Dialog from 'material-ui/Dialog';
import Api from '../../Actions/Api';

export default class CardUserActions extends React.Component{

    componentDidMount() {
    Axios.get('https://randomuser.me/api/?format=json&inc=picture&lego')
        .then((response) => {
          this.setState({
            picture: response.data.results[0].picture.thumbnail
          })
        })
        .catch((e) => {
          console.log(e);
        });

      Axios.get('http://localhost:23000/api/roles')
          .then((response) => {
              this.setState({
                  roles: response.data
              })
          })
          .catch((error) => {
              console.log(error);
          });

    this.setState({
      id: this.props.id,
      username: this.props.username,
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      role: this.props.role,
      email: this.props.email,
      password: this.props.password,
    });

  }

  state={
    expanded: false,
    picture : "",
    users: [],
    open: false,
      roles : [],
  };

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

  handleExpand = () => {
    this.setState({expanded: this.state.expanded ? false : true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };

  handleSubmit = () => {

  };

  handleDelete = () => {
        Api.deleteUser(this.state.id);
        // this.setState({open: false});
        this.props.handleChangement();

  };

  handleUsername = (e) => {
      this.setState({username: e.target.value}, (then) => {
              setTimeout(() => {
                  this.callApi();
              }, 500);
          }
      );
  };

    handleRole = (event, index, value) => {
       this.setState({role:value}, (then) => {
           setTimeout(() => {
               this.callApi();
           }, 500);

       });
    };

  callApi = () => {
      Api.postUser(
          this.state.id,
          this.state.username,
          this.state.firstname,
          this.state.lastname,
          this.state.role,
          this.state.email,
          this.state.password,
      ).then((r) => {
      }).catch((c) => {
          console.log("error create",c);
      });

  };

  handleLastname = (e) => {
      this.setState({lastname: e.target.value}, (then) => {
              this.callApi();
          }
      );
  };

  handleFirstname = (e) => {
      this.setState({firstname: e.target.value}, (then) => {
              this.callApi();
          }
      );
  };


  handleEmail = (e) => {
      this.setState({email: e.target.value}, (then) => {
              this.callApi();
          }
      );
  };

  render() {

    const iconStyles = {
      marginRight: 24,
    };

    const cardStyles ={
      margin: 20,
    };
    const role = this.state.role;

      const actions = [
          <FlatButton
              label="Non !"
              primary={true}
              onTouchTap={this.handleClose}
          />,
          <FlatButton
              label="Oui !"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.handleDelete}
          />,
      ];

    return (

      <div>
        <div key={this.state.id} style={cardStyles}>
          <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
            <CardHeader
              title={this.state.lastname + " " +  " " + this.state.firstname}
              subtitle={this.state.role}
              actAsExpander={true}
              showExpandableButton={true}
              avatar={this.state.picture}
            />
            <CardText expandable={true}>

              <form onSubmit={this.handleSubmit}>
                <TextField
                    ref="username"
                    name="username"
                    floatingLabelText="Nom d'utilisateur"
                    defaultValue={this.state.username}
                    underlineShow={false}
                    floatingLabelFixed={true}
                    onChange={this.handleUsername}
                />
                <Divider />
                <TextField
                    name="email"
                    floatingLabelText="Email"
                    type="email"
                    defaultValue={this.state.email}
                    underlineShow={false}
                    floatingLabelFixed={true}
                    onChange={this.handleEmail}

                />
                <Divider />
                <TextField
                    name="lastname"
                    floatingLabelText="Nom de famille"
                    type="text"
                    defaultValue={this.state.lastname}
                    underlineShow={false}
                    floatingLabelFixed={true}
                    onChange={this.handleLastname}

                />
                <Divider />
                <TextField
                    name="firstname"
                    floatingLabelText="Prénom"
                    type="text"
                    defaultValue={this.state.firstname}
                    underlineShow={false}
                    floatingLabelFixed={true}
                    onChange={this.handleFirstname}

                />
                  <Divider />
                  <SelectField
                      floatingLabelText="Role"
                      value={this.state.role}
                      onChange={this.handleRole}
                      ref="role"
                  >
                      {
                          this.state.roles.map((role) => {
                              return <MenuItem key={role} value={role} primaryText={role} />
                          })

                      }

                  </SelectField>
              </form>

            </CardText>
            <CardActions>
              <FlatButton label={this.state.expanded ? "Fermer" : "Modifier"} onTouchTap={this.handleExpand}/>
              <FlatButton label="Supprimer" onTouchTap={this.handleOpen} disabled={this.state.expanded ? true : false} secondary={true}/>
            </CardActions>

          </Card>
            <Dialog
                title="Voulez vous vraiment supprimer cet utilisateur ?"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                Définitif
            </Dialog>
        </div>
      </div>
    )

  }
}