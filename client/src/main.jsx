import { createRoot } from "react-dom/client";
import { Router } from "./router/Router";
import store from "./toolkits/store/store.jsx";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<Router />
	</Provider>
);
