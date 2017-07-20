import request from 'superagent';

export const GET_LISTS_START = 'GET_LISTS_START';
export const GET_LISTS = 'GET_LISTS';
export const MOVE_CARD = 'MOVE_CARD';
export const MOVE_LIST = 'MOVE_LIST';
export const SAVE_BOARD = 'SAVE_BOARD';
export const TOGGLE_DRAGGING = 'TOGGLE_DRAGGING';

export function getLists() {
  
  return (dispatch) => {
    request
      .get('http://localhost:3001/dummy')
      .end((err, res) => {
        const result = res.body;
        const quantity = result.length;
        const lists = [];
        for (let i = 0; i < quantity; i++) {
          const cards = [];
          const cardsNumber = result[i].tickets.length;
          for (let ic = 0; ic < cardsNumber; ic++) {
            cards.push(result[i].tickets[ic]);
          }
          lists.push({
            id: i,
            name: result[i].phase.name,
            cards
          });
        }
        dispatch({ type: GET_LISTS, lists, isFetching: true });
      })
  };
}

export function moveList(lastX, nextX) {
  return (dispatch) => {
    dispatch({ type: MOVE_LIST, lastX, nextX });
  };
}

export function moveCard(lastX, lastY, nextX, nextY) {
  return (dispatch) => {
    dispatch({ type: MOVE_CARD, lastX, lastY, nextX, nextY });
  };
}

export function toggleDragging(isDragging) {
  return (dispatch) => {
    dispatch({ type: TOGGLE_DRAGGING, isDragging });
  };
}

export function saveBoard(lists) {
  return (dispatch) => {
    dispatch({type: SAVE_BOARD, lists});
  }
}
