export const getCategoriesInit = () => ({
  type: 'DEST_FETCH_INIT',
});

export const getCategoriesInit = data => ({
  type: 'DEST_FETCH_SUCCESS',
  payload: data,
});

export const getCategoriesInit = () => ({
  type: 'DEST_FETCH_FAILURE',
});