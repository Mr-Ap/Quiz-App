import { useState } from 'react';

export default function useForm(formValues) {
	const [values, setValues] = useState(formValues());
	const [errors, setErrors] = useState({});

	const handleFormInputChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	return {
		values,
		setValues,
		errors,
		setErrors,
		formValues,
		handleFormInputChange,
	};
}
