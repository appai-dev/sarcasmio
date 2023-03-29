// pages/index.js

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post('/api/sarcastic-response', { question });
      console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);
      setResponse(result.data.sarcasticResponse);
    } catch (error) {
      setResponse('Error fetching sarcastic response');
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          <textarea
            className="input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question and get a sarcastic response"
          />
        </label>
        <button className="button" type="submit">Ask</button>
      </form>
      {response && <p className="response">{response}</p>}
      <style jsx>{`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .form {
    display: flex;
    flex-direction: column;
    border: 1px solid lightgray;
    padding: 30px;
    border-radius: 10px;
    background-color: #f5f5f5;
    width: 50%;
  }

  .label {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .input {
    font-size: 24px;
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
    margin-bottom: 20px;
    height: 150px;
    width: 100%;
  }

  .button {
    font-size: 24px;
    padding: 10px;
    border: 1px solid #4caf50;
    border-radius: 5px;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
  }

  .button:hover {
    background-color: #45a049;
  }

  .response {
    color: #4caf50;
    font-size: 24px;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
    width: 50%;
    text-align: center;
  }

  @media only screen and (max-width: 600px) {
    .form {
      width: 90%;
      padding: 20px;
    }

    .label {
      font-size: 20px;
    }

    .input {
      font-size: 20px;
      height: 100px;
    }

    .button {
      font-size: 20px;
      padding: 10px;
    }

    .response {
      font-size: 20px;
    }
  }
`}</style>

    </div>
  );
}
