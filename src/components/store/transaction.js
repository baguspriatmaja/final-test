import axios from "axios";

export default {
    namespaced: true,
    state() {
        return {
            transaction: [],
        }
    },
    getters: {},
    mutations: {
        setTransactionData(state, payload) {
            state.transaction = payload
        },
        setNewTransaction(state, payload) {
            state.transaction.push(payload);
        },
    },
    actions: {
        async getTransactionData({commit}) {
            try {
                const { data } = await axios.get (
                    "https://final-test-f15a5-default-rtdb.firebaseio.com/transactions.json")

                const arr = []
                for( let key in data ) {
                    arr.push({id: key, ...data[key]})
                }
                
                commit("setTransactionData", arr)
            } catch (err) {
                console.log(err)
            }
        },
        async addNewTransaction({ commit, rootState }, payload) {
            const newData = {
                ...payload,
                username: rootState.auth.userLogin.username,
                createdAt: Date.now(),
                likes: ["null"],
                userId: rootState.auth.userLogin.userId,
            };

            try {
                const { data } = await axios.post(`https://final-test-f15a5-default-rtdb.firebaseio.com/transactions.json?auth=${rootState.auth.token}`, newData);
                commit("setNewTransaction", { id: data.name, ...newData });
            } catch (err) {
                console.log(err)
            }
        }
    }
}