import { createStore } from "vuex";
import product from "./product";
import auth from "./auth";
import cart from "./cart";
import transaction from "./transaction";


export const store = createStore({
    modules: {
        product,
        auth,
        cart,
        transaction
    }
})