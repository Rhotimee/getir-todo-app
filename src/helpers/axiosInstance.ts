import axios from 'axios';

// baseURL: 'https://simple-todo-nest.herokuapp.com/todos',
const Axios = axios.create({
  baseURL: 'https://simple-todo-nest.herokuapp.com/todos',
});

export default Axios;
