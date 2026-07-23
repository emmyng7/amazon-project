export const paystackConfig = (email, amount) => {
  return {
    reference: new Date().getTime().toString(),
    email,
    amount: amount * 100, // Paystack expects Kobo, not Naira
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  };
};