import {
	Card,
	CardContent,
	Typography,
	Box,
	CardMedia,
	Button,
	Stack,
	Alert,
	Snackbar,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createAPIEndpoints, ENDPOINTS } from '../api';
import useStateContext from '../hooks/useStateContext';
import Answers from './Answers';

const Result = () => {
	const { contextValues } = useStateContext();
	const [qna, setQna] = React.useState([]);
	const [open, setOpen] = React.useState(false);
	const [expanded, setExpanded] = React.useState(false);
	const navigate = useNavigate();

	React.useEffect(() => {
		const qnIds = contextValues.selectedOptions.map((x) => x.qnId);

		const endpoints = createAPIEndpoints(ENDPOINTS.getAnswers);
		endpoints
			.post(qnIds)
			.then((res) => {
				//combine the received response with selectedOptions
				const qna = contextValues.selectedOptions.map((so) => ({
					...so,
					...res.data.find((q) => q.qnId === so.qnId),
				}));
				setQna(qna);
			})
			.catch((error) => console.log(error));
	}, [contextValues.selectedOptions]);

	const score = React.useMemo(() => {
		return qna.reduce(
			(acc, curr) => (curr.answer === curr.selected ? acc + 1 : acc),
			0
		);
	}, [qna]);

	const handleSubmit = () => {
		const endpoint = createAPIEndpoints(ENDPOINTS.participant);
		endpoint
			.put(contextValues.participantId, {
				participantId: contextValues.participantId,
				score,
				timeTaken: contextValues.timeTaken,
			})
			.then((res) => {
				setOpen(true);
			})
			.catch((err) => console.log(err));
	};

	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	return (
		<>
			<Card
				sx={{
					display: 'flex',
					justifyContent: 'space-evenly',
					mx: 'auto',
				}}
			>
				<Box
					sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}
				>
					<CardContent sx={{ flex: '1 0 auto' }}>
						<Typography variant='h4'>Congratulations!</Typography>
						<Typography variant='h6'>Your Score</Typography>
						<Typography variant='h5'>{score}</Typography>
						<Typography variant='subtitle1' color='text.secondary'>
							Time Taken : {contextValues.timeTaken}
						</Typography>
						<Stack
							direction={'row'}
							spacing={2}
							justifyContent={'center'}
							sx={{ mt: 2 }}
						>
							<Button variant='contained' onClick={handleSubmit}>
								Submit
							</Button>
							<Button
								variant='outlined'
								onClick={() => {
									navigate('/quiz');
								}}
							>
								Re-Try
							</Button>
						</Stack>
						<Snackbar
							open={open}
							autoHideDuration={4000}
							onClose={handleCloseSnackbar}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
						>
							<Alert
								severity='success'
								sx={{ width: '100%' }}
								onClose={handleCloseSnackbar}
							>
								Your score has submitted <strong>successfully!</strong>
							</Alert>
						</Snackbar>
					</CardContent>
				</Box>
				<CardMedia
					component='img'
					sx={{ width: 216, height: 213 }}
					image='/images/win-cup.png'
					alt='winnig cup'
				/>
			</Card>
			<Box>
				{qna.map((qn, index) => (
					<Answers
						qn={qn}
						key={index}
						index={index}
						expanded={expanded}
						setExpanded={setExpanded}
					/>
				))}
			</Box>
		</>
	);
};

export default Result;
