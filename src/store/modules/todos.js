//import axios from 'axios';

const state = {
	todos: [
		{
			id:1,
			title: 'Todo One'
		},
		{
			id:2,
			title: 'Todo Two'
		}
	]
};

// returns the state or part of it
const getters = {
    allTodos: state => state.todos
};

const actions = {};

const mutations = {};

// state is the same as state: state, getters: getters
export default {
	state,
	getters,
	actions,
	mutations
}