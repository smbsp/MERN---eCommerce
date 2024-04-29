import './App.css';

function App() {

  const loadScript = () => {
    return new Promise((resolve, reject)=>{
      const script = document.createElement('script');
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  async function loginUser() {
    const url = 'http://localhost:9090/api/auth/login';
    const requestBody = {
        email: "bam@email.com",
        password: "bam@1234"
    };

    try {
        const response = await fetch(url, {
            method: 'POST', // Set the method to POST
            headers: {
                'Content-Type': 'application/json' // Set the content type header so that the server knows to expect JSON
            },
            body: JSON.stringify(requestBody) // Convert the JavaScript object to a JSON string
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Parse JSON response into native JavaScript objects
        console.log('Login successful:', data);
        // localStorage.setItem('jwt', data.token); // Store the token
        return data;
    } catch (error) {
        console.error('Error during fetch:', error);
    }
  }

  const dispalyRazorpay = async() => {
    await loadScript();

    console.log('Checkout.js script loaded');
    const productId = '662b97aa990b9f036cebab1a';
    // Call the function to execute the fetch request
    await loginUser();
    // const token = localStorage.getItem('jwt'); // Retrieve the token
    const resp = await fetch(`http://localhost:9090/api/booking/${productId}`, {method: 'POST', credentials: 'include', headers: {
      'Content-Type': 'application/json' // Ensure that you have this header
    }, body: JSON.stringify({
      // Other necessary data you might want to send
      priceAtThatTime: 80
    })});
    const respJSON = await resp.json();
    console.log(respJSON.message);

    const {id, currency, amount } = respJSON.message;

    console.log(id);

        var options = {
          "key": import.meta.env.VITE_PUBLIC_KEY, // Enter the Key ID generated from the razorpay Dashboard
          "amount": amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          "currency":currency,
          "name": "Acme Corp", //your business name
          "description": "Test Transaction",
          "image": "https://example.com/your_logo",
          "order_id": id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          "handler": function (response){
             alert(response.razorpay_payment_id);
              alert(response.razorpay_order_id);
              alert(response.razorpay_signature); 
          },
          "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
              "name": import.meta.env.VITE_NAME, //your customer's name
              "email": import.meta.env.VITE_EMAIL,
              "contact": import.meta.env.VITE_CONTACT //Provide the customer's phone number for better conversion rates 
          },
          "notes": {
              "address": "Razorpay Corporate Office"
          },
          "theme": {
              "color": "#3399cc"
          }
        };

        const rzpInstance = new Razorpay(options);
        rzpInstance.open();

}
  return (
    <>
     <button 
     onClick={dispalyRazorpay}>
      Pay
     </button>
    </>
  )
}

export default App
