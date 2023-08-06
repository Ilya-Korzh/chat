export function promiseReducer(state = {}, { promiseName, type, status, payload, error }) {
  if (type === 'PROMISE') {
    return {
      ...state, [promiseName]: { status, payload, error }
    };
  }
  return state;
}
const actionPending = (promiseName) => ({ type: 'PROMISE', promiseName, status: 'PENDING' });
const actionFulfilled = (promiseName, payload) => ({ type: 'PROMISE', promiseName, status: 'FULFILLED', payload });
const actionRejected = (promiseName, error) => ({ type: 'PROMISE', promiseName, status: 'REJECTED', error });



export const actionPromise = (promiseName, promise) => async dispatch => {
  dispatch(actionPending(promiseName));
  try {
    const payload = await promise;
    dispatch(actionFulfilled(promiseName, payload));
    return payload;
  } catch (error) {
    dispatch(actionRejected(promiseName, error));
  }
};

