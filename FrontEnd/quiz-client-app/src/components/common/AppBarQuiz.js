import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useStateContext from '../../hooks/useStateContext';
import { Outlet, useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';

const AppBarQuiz = () => {
	const { resetContext } = useStateContext();
	const navigate = useNavigate();
	const logOut = () => {
		resetContext();
		navigate('/');
	};
	return (
		<Container>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position='static'>
					<Toolbar>
						<Typography variant='h3' sx={{ flexGrow: 1 }} align='center'>
							Quiz App
						</Typography>
						<Button color='inherit' onClick={logOut}>
							LogOut
						</Button>
					</Toolbar>
				</AppBar>
			</Box>

			<Outlet />
		</Container>
	);
};

export default AppBarQuiz;
