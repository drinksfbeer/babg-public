const crudState = () => ({
  list: {
    _list: [],
    loading: false,
    error: false,
    success: false,
  },
  form: {
    loading: false,
    error: false,
    success: false,
  },
  update: {
    loading: false,
    error: false,
    success: false,
  },
  delete: {
    loading: false,
    error: false,
    success: false,
  },
});

const initialState = () => ({
  development: null,
  currentChapter: null,
  chapters: crudState(),
  members: crudState(),
  pages: crudState(),
  blogPosts: crudState(),
  events: crudState(),
  locations: crudState(),
  settings: crudState(),
  users: {
    ...crudState(),
    ...{
      auth: {
        user: null,
        authorized: false,
        loading: false,
        error: false,
      },
    },
  },

});

export default initialState;
