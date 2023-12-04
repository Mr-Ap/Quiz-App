import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Result from './components/Result';
import Quiz from './components/Quiz';
import EmptyState from './components/EmptyState';
import AppBarQuiz from './components/common/AppBarQuiz';
import Authenticate from './components/Authenticate';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route element={<Authenticate />}>
					<Route path='/' element={<AppBarQuiz />}>
						<Route path='/quiz' element={<Quiz />} />
						<Route path='/result' element={<Result />} />
					</Route>
				</Route>
				<Route path='*' element={<EmptyState />} />
			</Routes>
		</Router>
	);
};

export default App;
