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

const store=$redux.createStore(bankreducer);
store.dispatch(withdraw(200));
store.dispatch(deposite(900));
console.log(store.getState());

document.getElementById("btn1").addEventListener("click", function () {
  store.dispatch(withdraw(200));
});
document.getElementById("btn2").addEventListener("click", function () {
  store.dispatch(deposite(100));
});

store.subscribe(() => {
  document.getElementById("p_account").innerHTML = `${store.getState()} in your account`;
  console.log(store.getState());
});
