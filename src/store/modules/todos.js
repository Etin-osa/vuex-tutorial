
const state = {
  todos: [
    {
      id: 1,
      title: 'Todo One'
    },
    {
      id: 2,
      title: 'Todo Two'
    }
  ]
}

const getters = {
  allTodos: state => state.todos
}

const actions = {
  async fetchTodos({ commit }) {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data = await response.json()

    commit('setTodos', data)
  },

  async addTodo({ commit }, title) {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({ 
        title, 
        completed: false, 
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' } 
    })
    const data = await response.json()
    commit('newTodo', data)
  },

  async deleteTodo({ commit }, id) {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    })
    commit('removeTodo', id)
  },

  async filterTodo({ commit }, e) {
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    )
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
    const data = await response.json()
    commit('setTodos', data)
  },

  async updateTodo({ commit }, updTodo) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, {
      method: 'PUT',
      body: JSON.stringify(updTodo),
      headers: { 'Content-type': 'application/json; charset=UTF-8' } 
    })
    const data = await response.json()
    commit('updateTodo', data)
  }
}

const mutations = {
  setTodos: (state, todos) => state.todos = todos,
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
  updateTodo: (state, updTodo) => {
    const ind = state.todos.findIndex(todo => todo.id === updTodo.id);
    if (ind !== -1) {
      state.todos.splice(ind, 1, updTodo)
    }
  } 
}

export default {
  // We are suppose to do state: state, meaning state as a property and state as the value of the property but in js ES6 you can just write 'state' representing the name of both the property and value, since they have the same name

  state,
  getters,
  actions,
  mutations
}