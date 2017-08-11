import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GamesList from './GamesList';
import fetchGames from './actions/fetchGames';
import deleteGame from './actions/deleteGame';

class GamesPage extends React.Component {
    componentDidMount() {
        this.props.fetchGames();
    }

    render() {
        return(
            <div>
                <h1>Games List</h1>
                <GamesList games={this.props.games} deleteGame={this.props.deleteGame}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        games: state.games
    }
}

GamesPage.PropTypes = {
    games: PropTypes.array.isRequired,
    fetchGames: PropTypes.func.isRequired,
    deleteGame: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { fetchGames, deleteGame })(GamesPage);