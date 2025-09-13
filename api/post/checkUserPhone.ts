const checkUserPhone = async (phone: string) => {
  const res = await fetch("/api/verify/phone", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone }),
  });
  const jsonRes = await res.json()
  if (!res.ok) {
    throw jsonRes;
  }
  return true;
};

export default checkUserPhone;
