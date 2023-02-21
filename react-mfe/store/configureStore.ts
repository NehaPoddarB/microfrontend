import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

export default function configureStore(preloadedState?: any) { 

    const store = createStore(
        rootReducer,
        preloadedState,
        composeWithDevTools(
          applyMiddleware(thunk),
        ),
      );
    
      return store;
}