import { SET_GAMES } from './types';

function setGames (games) {
    return {
        type: SET_GAMES,
        games
    };
}

export default function fetchGames () {
    return dispatch => {
        fetch('/api/games')
            .then(res => res.json())
            .then(data => dispatch(setGames(data.games)));
    }
}