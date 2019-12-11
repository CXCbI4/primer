import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import {Div, Panel, Alert, Group, Button, PanelHeader} from "@vkontakte/vkui"

                    //<Div>
                      //  <Button size="l" stretched={true} onClick={() => this.openPopout()}>Открыть алерт</Button>
                    //</Div>

class HomePanelBase extends React.Component {


    render() {
        const {id, setPage, withoutEpic} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Дари подарки друзьям!</PanelHeader>
                <Group>
                    <Div>
                        <Button size="l" stretched={true} onClick={() => setPage('home', 'groups')}>Список друзей</Button>
                    </Div>
                    
                </Group>
            </Panel>
        );
    }

}

const mapDispatchToProps = {
    setPage,
    goBack,
    openPopout,
    closePopout,
    openModal
};

export default connect(null, mapDispatchToProps)(HomePanelBase);