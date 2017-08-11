import { GAME_FETCHED } from './types';

export function gameFetched(game) {
    return {
        type: GAME_FETCHED,
        game
    }
}

export default function fetchGame (id) {
    return dispatch => {
        fetch(`/api/games/${id}`)
            .then(res => res.json())
            .then(data => dispatch(gameFetched(data.game)));
    }
}