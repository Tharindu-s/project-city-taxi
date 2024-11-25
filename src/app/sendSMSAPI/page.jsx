import { useState } from 'react';

export default function Home() {
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendSms = async () => {
    try {
      const res = await fetch('/testPageSMS/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, message }),
      });

      const data = await res.json();
      setResponse(data.message);
    } catch (error) {
      setResponse('Error sending SMS');
    }
  };

  return (
    <div>
      <h1>Send SMS</h1>
      <input
        type="text"
        placeholder="Recipient Number"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendSms}>Send SMS</button>
      <p>{response}</p>
    </div>
  );
}
