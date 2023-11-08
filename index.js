
const withdraw = (amount) => {
  return {
    type: "withdraw",
    payload: amount,
  };
};
const deposite = (amount) => {
  return {
    type: "deposite",
    payload: amount,
  };
};
const Add_product = (product) => {
  return {
    type: "Add_product",
    payload: product,
  };
};
const get_product = (product) => {
  return {
    type: "get_product",
    payload: product,
  };
};
const fetch_product = () => {
  return async (dispatch) => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    dispatch(get_product(data));
  };
};

const bankreducer = (state = 1000, action) => {
  switch (action.type) {
    case "withdraw":
      return state + action.payload;
    case "deposite":
      return  state - action.payload;
    default:
      return state;
  }
};
const productReducer = (state=[], action) => {
  switch (action.type) {
    case "get_product":
      return [... action.payload];
    case "Add_product":
      return [...state,action.payload];
    default:
      return state;
  }
};
const appReducer = Redux.combineReducers({
    bank:bankreducer,
    product:productReducer,
  }
)
const store = Redux.createStore(appReducer, Redux.applyMiddleware(ReduxThunk));

store.dispatch(Add_product({id:1,title:"product-1"}));
store.dispatch(fetch_product());

document.getElementById("btn1").addEventListener("click", function () {
  store.dispatch(withdraw(200));
});
document.getElementById("btn2").addEventListener("click", function () {
  store.dispatch(deposite(100));
});

store.subscribe(() => {
  document.getElementById("p_account").innerHTML = `${store.getState().bank} in your account`;
  console.log(store.getState());
});
