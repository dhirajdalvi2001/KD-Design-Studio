export default function onError(error, setError) {
  const errors = error.response.data;
  Object.entries(errors)?.forEach(([key,value]) => {
    setError(key, { message: value });
  });
}
