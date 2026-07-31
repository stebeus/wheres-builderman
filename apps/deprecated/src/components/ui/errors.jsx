import errorImage from '#root/assets/error.webp';

export const ErrorFallback = ({ error: { status, message } }) => (
	<>
		<h2>Oops - you've reached this page in error.</h2>
		<p>
			{status} {message}
		</p>
		<img src={errorImage} alt="Noob poking bomb with stick" width={280} height={280} />
	</>
);
