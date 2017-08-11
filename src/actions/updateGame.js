import { GAME_UPDATED } from './types';

export function gameUpdated(game) {
    return {
        type: GAME_UPDATED,
        game
    };
}

function handleResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export default function updateGame(data) {
    return dispatch => {
        return fetch(`/api/games/${data._id}`, {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(handleResponse)
            .then(data => dispatch(gameUpdated(data.game)));
    };
}