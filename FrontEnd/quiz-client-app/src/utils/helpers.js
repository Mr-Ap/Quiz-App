export const GetTimeInMMSS = (time) => {
	return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
};
