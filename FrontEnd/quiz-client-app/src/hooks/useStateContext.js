import React from 'react';

export const stateContext = React.createContext();

const defaultContextValues = () => {
	if (localStorage.getItem('userSession') == null) {
		localStorage.setItem(
			'userSession',
			JSON.stringify({
				participantId: 0,
				timeTaken: 0,
				selectedOptions: [],
			})
		);
	}
	return JSON.parse(localStorage.getItem('userSession'));
};

export const StateContextProvider = (props) => {
	const [contextValues, setContextValues] = React.useState(
		defaultContextValues()
	);

	React.useEffect(() => {
		localStorage.setItem('userSession', JSON.stringify(contextValues));
	}, [contextValues]);

	return (
		<stateContext.Provider value={{ contextValues, setContextValues }}>
			{props.children}
		</stateContext.Provider>
	);
};

const useStateContext = () => {
	const { contextValues, setContextValues } = React.useContext(stateContext);
	return {
		contextValues,
		setContextValues: (obj) => {
			setContextValues({ ...contextValues, ...obj });
		},
		resetContext: () => {
			localStorage.removeItem('userSession');
			setContextValues(defaultContextValues());
		},
	};
};

export default useStateContext;
