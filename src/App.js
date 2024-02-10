import React from "react";
import Routes from './routes/Routes';
import { AuthContextProvider } from './context/AuthContext';

function App() {
    return (
		<div className="App">
			<AuthContextProvider>
				<Routes />
			</AuthContextProvider>
		</div>
    );
}

export default App;
