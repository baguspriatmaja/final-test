import HomePage from "./components/pages/HomePage.vue";
import LoginPage from "./components/pages/LoginPage.vue";
import SignupPage from "./components/pages/SignUpPage.vue";
import PersonalInfo from "./components/user/PersonalInfo.vue";
import Cookies from "js-cookie"
import { store } from "./components/store";
import ChangePassword from "./components/user/ChangePassword.vue";
import MyProducts from "./components/user/MyProducts.vue";
import TransactionHistory from "./components/user/TransactionHistory.vue";
import DetailPage from "./components/pages/DetailPage.vue";
import NewProductPage from "./components/pages/NewProductPage.vue";
import EditProductPage from "./components/pages/EditProductPage.vue";
import AllProduct from "./components/product/AllProduct.vue";
import CartDetail from "./components/cart/CartDetail.vue";
import OrderDetail from "./components/order/OrderDetail.vue";

const checkAuth = () => {
    const jwtCookie = Cookies.get("jwt");
    const expirationDate = Cookies.get("tokenExpirationDate");
    const userId = Cookies.get("UID");

    if (jwtCookie) {
        if (new Date().getTime() < +expirationDate) {
            store.commit("auth/setToken", {
                idToken: jwtCookie,
                expiresIn: expirationDate,
            });
            store.dispatch("auth/getUser", userId);
            return true;
        } else {
            store.commit("auth/setUserLogout");
            return false;
        }
    } else {
        return false;
    }    
}

export const routes = [
    { path: "/", name: "homePage", component: HomePage, beforeEnter: () => { checkAuth(); }, },
    { path: "/signup", name: "signup", component: SignupPage, meta: { hideFooter: true } },
    { path: "/login", name: "login", component: LoginPage, meta: { hideFooter: true }},
    { path: "/personal-info", name: "personalInfo", component: PersonalInfo },
    { path: "/change-password", name: "changePassword", component: ChangePassword },
    { path: "/transaction", name: "transactionHistory", component: TransactionHistory },
    { path: "/my-products", name: "myProducts", component: MyProducts },
    { path: "/product/:id", name: "detailPage", component: DetailPage },
    { path: "/new-product", name: "newProductPage", component: NewProductPage, beforeEnter: (to, from, next) => { checkAuth() ? next() : next({ name: "login" }); }, },
    { path: "/product/edit/:id", name: "editProductPage", component: EditProductPage, beforeEnter: (to, from, next) => { checkAuth() ? next() : next({ name: "login" }); }, },
    { path: "/all-product", name: "allProduct", component: AllProduct },
    { path: "/cart", name: "cartDetail", component: CartDetail },
    { path: "/order", name: "orderDetail", component: OrderDetail },
];
