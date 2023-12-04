import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useStateContext from '../hooks/useStateContext';

const Authenticate = () => {
	const { contextValues } = useStateContext();
	return contextValues.participantId === 0 ? <Navigate to={'/'} /> : <Outlet />;
};

export default Authenticate;
