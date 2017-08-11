import { GAME_DELETED } from './types';

export function gameDeleted(gameId) {
    return {
        type: GAME_DELETED,
        gameId
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

export default function deleteGame(gameId) {
    return dispatch => {
        return fetch(`/api/games/${gameId}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(handleResponse)
            .then(data => dispatch(gameDeleted(gameId)));
    };
}