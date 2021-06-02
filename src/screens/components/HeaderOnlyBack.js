import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

const HeaderOnlyBack = ({ navigation }) => {

    return (
        <View style={{ marginTop: 30 }}>
            <Appbar.Header
                style={{
                    elevation: 0,
                }}
                theme={{ colors: { primary: 'transparent' } }}>
                <Appbar.Action
                    icon="arrow-left"
                    color={'black'}
                    onPress={() => navigation.goBack()}
                />
            </Appbar.Header>
        </View>
    );
};

export default HeaderOnlyBack;