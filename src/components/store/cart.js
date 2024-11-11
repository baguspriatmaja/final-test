import axios from "axios";

export default {
    namespaced: true,
    state() {
        return {
            cartProducts: [],
        }
    },
    getters: {},
    mutations: {
        setCartProducts(state, payload) {
            state.cartProducts = payload;
        },
        addProductToCart(state, payload) {
            state.cartProducts.push(payload);
        },
        updateProductQuantity(state, { productId, qty }) {
            const product = state.cartProducts.find(item => item.id === productId);
            if (product) {
                product.qty = qty;
            }
        },
        removeProductFromCart(state, productId) {
            state.cartProducts = state.cartProducts.filter(item => item.id !== productId);
        }
    },
    actions: {
        async getCartProducts({ commit }) {
            try {
                const { data } = await axios.get("https://final-test-f15a5-default-rtdb.firebaseio.com/cart.json");
                const cartArray = [];
                for (let key in data) {
                    cartArray.push({ id: key, ...data[key] });
                }
                commit("setCartProducts", cartArray);
            } catch (err) {
                console.error(err);
            }
        },
        async addToCart({ commit, rootState }, product) {
            try {
                const cartItem = {
                    ...product,
                    qty: 1,
                    addedAt: Date.now(),
                    userId: rootState.auth.userLogin.userId,
                };
                const { data } = await axios.post(`https://final-test-f15a5-default-rtdb.firebaseio.com/cart.json?auth=${rootState.auth.token}`, cartItem);
                commit("addProductToCart", { id: data.name, ...cartItem });
            } catch (err) {
                console.error(err);
            }
        },
        async increaseQuantity({ commit, rootState }, { productId, currentQty }) {
            try {
                const newQty = currentQty + 1;
                await axios.patch(`https://final-test-f15a5-default-rtdb.firebaseio.com/cart/${productId}.json?auth=${rootState.auth.token}`, {
                    qty: newQty
                });
                commit("updateProductQuantity", { productId, qty: newQty });
            } catch (err) {
                console.error(err);
            }
        },
        async decreaseQuantity({ commit, rootState }, { productId, currentQty }) {
            if (currentQty > 1) {
                try {
                    const newQty = currentQty - 1;
                    await axios.patch(`https://final-test-f15a5-default-rtdb.firebaseio.com/cart/${productId}.json?auth=${rootState.auth.token}`, {
                        qty: newQty
                    });
                    commit("updateProductQuantity", { productId, qty: newQty });
                } catch (err) {
                    console.error(err);
                }
            } else {
                await this.dispatch('cart/removeFromCart', productId);
            }
        },
        async removeFromCart({ commit, rootState }, productId) {
            try {
                await axios.delete(`https://final-test-f15a5-default-rtdb.firebaseio.com/cart/${productId}.json?auth=${rootState.auth.token}`);
                commit("removeProductFromCart", productId);
            } catch (err) {
                console.error(err);
            }
        }
    }
}
