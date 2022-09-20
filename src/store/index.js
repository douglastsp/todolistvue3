import axios from 'axios';
import { createStore } from 'vuex'

export default createStore({
  state: {
    todos: []
  },
  mutations: {
    storeTodos(state, payload) {
      state.todos = payload
    },

    storeTodo(state, payload) {
      //verifying if the payload id already exist to be edited
      const index = state.todos.findIndex(todo => todo.id === payload.id);

      if (index >= 0) {
        state.todos.splice(index, 1, payload);
      } else {
        state.todos.unshift(payload);
      }
    },

    deleteTodo(state, id){
      //verifying if the id already exist to be deleted
      const index = state.todos.findIndex(todo => todo.id === id);

      if (index >= 0) {
        state.todos.splice(index, 1);
      }
    }
  },
  actions: {
    getTodos({ commit }) {
      //This promisse and setTimeOut are only a way to test the loading on a development environment
      return new Promise((resolve) => {
        setTimeout(() => {
          return axios
            .get('http://localhost:3000/todos')
            .then((res) => {
              //using only commit
              commit('storeTodos', res.data);
              resolve();
            });
        }, 1000);
      });
    },

    addTodo(context, data) {
      return axios.post('http://localhost:3000/todos', data)
        .then((res) => {
          //using all the context
          context.commit('storeTodo', res.data);
        });
    },

    updateTodo({commit}, { id, data }) {
      return axios.put(`http://localhost:3000/todos/${id}`, data)
        .then((res) => {
          commit('storeTodo', res.data);
        });
    },

    deleteTodo({ commit }, id) {
      return axios.delete(`http://localhost:3000/todos/${id}`)
        .then(() => {
          commit('deleteTodo', id);
        });
    }
  },
  modules: {
  }
})
