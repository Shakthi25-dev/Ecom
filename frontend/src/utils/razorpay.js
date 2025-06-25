export const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const initiatePayment = async (orderDetails, callback) => {
  const res = await fetch('/api/payment/create-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(orderDetails),
  });

  const data = await res.json();

  const options = {
    key: data.key, // Razorpay public key from backend
    amount: data.amount,
    currency: 'INR',
    name: 'Desi HandMade Products',
    description: 'Order Payment',
    order_id: data.order_id,
    handler: callback,
    prefill: {
      name: data.user.name,
      email: data.user.email,
    },
    theme: {
      color: '#1d4ed8', // Tailwind blue-700
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
