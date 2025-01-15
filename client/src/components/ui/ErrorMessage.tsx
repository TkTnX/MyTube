const ErrorMessage = ({ error }: { error: string | undefined }) => {
  if (!error) return null;
  return <p className="text-red-500">{error}</p>;
};

export default ErrorMessage;
