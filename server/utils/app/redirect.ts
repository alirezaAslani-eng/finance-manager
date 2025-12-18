

interface Options {
  destination: string;
  permanent?: boolean;
}
function redirect(bool: boolean, { destination, permanent }: Options) {
  if (bool) {
    return {
      redirect: {
        destination,
        permanent: !!permanent,
      },
    };
  }
}

export default redirect;
