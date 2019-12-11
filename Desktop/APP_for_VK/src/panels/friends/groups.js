import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {goBack, openPopout, closePopout, openModal} from "../../store/router/actions";
import * as VK from '../../services/VK';

import {renderGroupsList} from '../../services/renderers';

import {Div, List, Panel, Group, Button, PanelHeader, PanelSpinner, PanelHeaderBack} from "@vkontakte/vkui";

class HomePanelGroups extends React.Component {

    state = {
        friends: {
            other: []
        },
        loading: true,
        errorGetAuthToken: false
    };

    componentDidMount() {
        if (this.props.accessToken === undefined) {
            console.log(this.getAuthToken());
        } else {
            this.getGroupsList();
        }
    }

    getAuthToken() {
        this.props.dispatch(VK.getAuthToken(['friends']));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props !== prevProps) {
            if (this.props.accessToken === null) {
                this.setState({
                    loading: false,
                    errorGetAuthToken: true
                });
            } else {
                this.setState({
                    loading: true,
                    errorGetAuthToken: false
                });

                this.getGroupsList();
            }
        }
    }

    async getGroupsList() {

       // if (localStorage.getItem('userFriends')) {

         //   this.setState({
        //        friends: {
                //    other: JSON.parse(localStorage.getItem('userFriends'))
               // },  
               // loading: false
           // });

           // return;
      //  }

        let friends = await VK.friendsGet();
        

       
        let otherGroups = friends.items;
        console.log(otherGroups);

        localStorage.setItem('userFriends', JSON.stringify(otherGroups));

        this.setState({
           friends: {

                other: otherGroups
            },
            loading: false
        });
    }

    render() {
        const {id, goBack} = this.props;

        //var friendsu = VK.friendsGet();


        let otherGroupsList = renderGroupsList(this.state.friends.other);
       // console.log(VK.friendsGet());

        //console.log(this.state.friends);

        console.log(this.state.friends.other);

        return (
            <Panel id={id}>
                <PanelHeader
                    left={<PanelHeaderBack onClick={() => goBack()}/>}
                >
                    Друзья
                </PanelHeader>
                {this.state.loading && <PanelSpinner/>}
                {!this.state.loading && this.state.errorGetAuthToken && <Group>
                    <Div>Возникла ошибка при получении данных.</Div>
                    <Div>
                        <Button size="l" stretched={true} onClick={() => this.getAuthToken()}>Запросить
                            повторно</Button>
                    </Div>
                </Group>}
                
                {!this.state.loading && !this.state.errorGetAuthToken && otherGroupsList &&
                <Group title="Ваши друзья">
                    <List>
                        {otherGroupsList}
                    </List>
                </Group>}
            </Panel>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({goBack, openPopout, closePopout, openModal}, dispatch)
    }
}

const mapStateToProps = (state) => {
    return {
        accessToken: state.vkui.accessToken
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePanelGroups);