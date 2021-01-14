import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://simple-todo-nest.herokuapp.com/todos',
});

export default Axios;
