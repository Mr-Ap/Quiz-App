import React from 'react';
import { createAPIEndpoints, ENDPOINTS } from '../api';
import {
	Card,
	CardContent,
	CardHeader,
	List,
	ListItem,
	ListItemButton,
	Typography,
} from '@mui/material';
import { GetTimeInMMSS } from '../utils/helpers';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import useStateContext from '../hooks/useStateContext';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
	const { contextValues, setContextValues } = useStateContext();
	const navigate = useNavigate();

	const [questions, setQuestions] = React.useState([]);
	const [qnIndex, setQnIndex] = React.useState(0);
	const [timeTaken, setTimeTaken] = React.useState(0);

	let quizTimer;

	const startTimer = () => {
		quizTimer = setInterval(() => {
			setTimeTaken((prev) => prev + 1);
		}, [1000]);
	};

	React.useEffect(() => {
		//reset context on page refresh
		setContextValues({
			timeTaken: 0,
			selectedOptions: [],
		});
		createAPIEndpoints(ENDPOINTS.question)
			.get()
			.then((res) => {
				setQuestions(res.data);
				startTimer();
			})
			.catch((err) => console.log(err));
		return () => {
			clearInterval(quizTimer);
		};
	}, []);

	const handleClick = (qnId, optionIndex) => {
		const selectedOptions = [...contextValues.selectedOptions];
		selectedOptions.push({ qnId, selected: optionIndex });
		if (qnIndex < questions.length - 1) {
			setContextValues({
				selectedOptions: [...selectedOptions],
			});
			setQnIndex(qnIndex + 1);
		} else {
			//last qn ,so route to result
			setContextValues({
				selectedOptions: [...selectedOptions],
				timeTaken,
			});
			navigate('/Result');
		}
	};

	return (
		<>
			{questions.length > 0 && qnIndex < questions.length ? (
				<Card sx={{ maxWidth: '50%', mx: 'auto', mt: '5rem' }}>
					<CardHeader
						title={`Question ${qnIndex + 1} of ${questions.length}`}
						action={
							<Typography variant='subtitle1'>
								{'Time Elapsed :'}
								{GetTimeInMMSS(timeTaken)}
							</Typography>
						}
					/>
					<Box sx={{ width: '100%' }}>
						<LinearProgress
							variant='determinate'
							value={((qnIndex + 1) / questions.length) * 100}
						/>
					</Box>
					<CardContent>
						<Typography variant='h5'>{questions[qnIndex].qnInWords}</Typography>
						<List>
							{questions[qnIndex].options.map((option, index) => {
								return (
									<ListItem key={index}>
										<ListItemButton
											onClick={() =>
												handleClick(questions[qnIndex].qnId, index + 1)
											}
										>
											<div>
												<b>{`${String.fromCharCode(65 + index)} . `}</b>
												{option}
											</div>
										</ListItemButton>
									</ListItem>
								);
							})}
						</List>
					</CardContent>
				</Card>
			) : null}
		</>
	);
};

export default Quiz;
