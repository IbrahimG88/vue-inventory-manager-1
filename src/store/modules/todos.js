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
    ],
    inventory:[
        {
            id:1,
            name: "TSH",
            brand: "Vidas",
            category: "Endocrinology",
            testsPerUnit: "60",
            testsUsedPerDay: "20",
            get daysTillDepletion () {
                return this.testsPerUnit/this.testsUsedPerDay;
        }
        
         
        },
        {
            id:2,
            name: "B-HCG",
            brand: "Tosoh",
            category: "Endocrinology",
            testsPerUnit: "30",
            testsUsedPerDay: "10",
            daysTillDepletion: "600"
        }
    ]
};

// returns the state or part of it
const getters = {
    allTodos: state => state.todos,
    allInventory: state => state.inventory
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