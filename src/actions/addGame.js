import { ADD_GAME } from './types'

export default function addGame (game) {
    return {
        type: ADD_GAME,
        game
    };
}