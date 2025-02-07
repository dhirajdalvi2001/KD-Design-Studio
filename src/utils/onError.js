export default function onError(error, setError) {
  const errors = error.response.data.errors;
  errors.forEach((error) => {
    setError('name', { message: error?.detail });
  });
}
