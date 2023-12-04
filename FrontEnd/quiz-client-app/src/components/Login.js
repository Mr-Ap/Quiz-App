import React from 'react';
import UseForm from '../hooks/useForm';
import {
	Box,
	Card,
	CardContent,
	Button,
	TextField,
	Typography,
} from '@mui/material';
import Center from './Center';
import { createAPIEndpoints, ENDPOINTS } from '../api';
import useStateContext from '../hooks/useStateContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const getFormValues = () => {
		return { Name: '', Email: '' };
	};
	const { values, errors, setErrors, handleFormInputChange } =
		UseForm(getFormValues);

	const { setContextValues, resetContext } = useStateContext();
	const navigate = useNavigate();

	React.useEffect(() => {
		resetContext();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			//post API call
			const endpoints = createAPIEndpoints(ENDPOINTS.participant);
			endpoints
				.post(values)
				.then((res) => {
					setContextValues({
						participantId: res.data.participantId,
					});
					navigate('/quiz');
				})
				.catch((error) => console.log(error));
		}
	};

	const validateForm = () => {
		let inputData = {};
		inputData.Email = /\S+@\S+\.\S+/.test(values.Email)
			? ''
			: 'Email is not valid!';
		inputData.Name = values.Name !== '' ? '' : 'This is required field!';
		setErrors(inputData);
		return Object.values(inputData).every((ele) => ele === '');
	};

	return (
		<Center>
			<Card sx={{ minWidth: 500 }}>
				<CardContent sx={{ textAlign: 'center' }}>
					<Typography variant='h3' my={2}>
						Quiz App
					</Typography>
					<Box sx={{ '& .MuiFormControl-root': { width: '90%', m: 1 } }}>
						<form noValidate onSubmit={handleSubmit}>
							<TextField
								label='Name'
								name='Name'
								variant='outlined'
								type={'text'}
								value={values.Name}
								onChange={handleFormInputChange}
								{...(errors.Name && { error: true, helperText: errors.Name })}
							/>
							<TextField
								label='Email'
								name='Email'
								variant='outlined'
								type={'email'}
								value={values.Email}
								onChange={handleFormInputChange}
								{...(errors.Email && { error: true, helperText: errors.Email })}
							/>
							<Button
								type='submit'
								size='large'
								variant='outlined'
								sx={{ width: '90%', m: 1 }}
							>
								Submit
							</Button>
						</form>
					</Box>
				</CardContent>
			</Card>
		</Center>
	);
};

export default Login;
