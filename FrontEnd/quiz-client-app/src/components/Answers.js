import React from 'react';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from '@mui/material';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { green, red } from '@mui/material/colors';

const Answers = (props) => {
	const { qn, index, expanded, setExpanded } = props;

	const color =
		qn.answer === qn.selected ? { color: green[500] } : { color: red[500] };

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	return (
		<Accordion
			expanded={expanded === index}
			onChange={handleChange(index)}
			key={index}
		>
			<AccordionSummary
				expandIcon={<ExpandCircleDownIcon sx={{ ...color }} />}
				aria-controls={`panel ${index}a-content`}
				id={`panel${index}a-header`}
			>
				<Typography>{qn.qnInWords}</Typography>
			</AccordionSummary>
			{qn.options.map((option, index) => (
				<AccordionDetails key={index}>
					<Typography
						color={
							qn.answer === index + 1
								? green[500]
								: qn.selected === index + 1
								? red[500]
								: 'white'
						}
					>
						<b>{`${String.fromCharCode(65 + index)} . `}</b>
						{option}
					</Typography>
				</AccordionDetails>
			))}
		</Accordion>
	);
};

export default Answers;
