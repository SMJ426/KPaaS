// ${process.env.NEXT_PUBLIC_API_URL}
// ${process.env.NEXT_PUBLIC_SERVER_URL}

export async function memberPay(accessToken, paymentData) {
  //  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/member/payments`, {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/member/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `${accessToken}`
      },
      body: JSON.stringify(
        paymentData
      )
    });
    return response.json();
  }
  
  export async function completePay(accessToken, paymentData) {
  //  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/payments/complete`, {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `${accessToken}`
      },
      body: JSON.stringify(paymentData)
    });
    return response.json();
  }