// src/pages/index.js

import { useEffect, useState } from 'react';
import axios from 'axios';
import { firestore } from '../firebase';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [responses, setResponses] = useState([]);
  const [temperature, setTemperature] = useState(5);

  useEffect(() => {
    const fetchResponses = async () => {
      const snapshot = await firestore.collection('responses').get();
      const fetchedResponses = snapshot.docs.map(doc => doc.data().response);
      setResponses(fetchedResponses);
    };

    fetchResponses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post('/api/sarcastic-response', { question, temperature });
      const newResponse = result.data.sarcasticResponse;
      setResponse(newResponse);

      await firestore.collection('responses').add({ response: newResponse });

      setResponses([...responses, newResponse]);
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
        <label className="label">
          Hallucination Level?
          <input
            type="range"
            min="1"
            max="10"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            className="slider"
          />
          {temperature / 10}
        </label>
        <button className="button" type="submit">Ask</button>
      </form>
      {response && <p className="response">{response}</p>}
      {/* Add the title for the Firebase responses */}
      <h3 className="responses-title">All the Sarcastic Responses</h3>
      <div className="responses">
        {responses.map((response, index) => (
          <p key={index} className="firebase-response">
            {response}
          </p>
        ))}
      </div>
      {/* Add slider styles */}
      <style jsx>{`
        // Other styles ...
        .slider {
          width: 100%;
          height: 25px;
          background: #4caf50;
          outline: none;
          opacity: 0.7;
          -webkit-transition: .2s;
          transition: opacity .2s;
          margin-bottom: 20px;
        }
        .responses-title {
          padding-top: 10px;
          color: #979797;
        }
        .firebase-response {
          color: #979797;
          width: 500px;
          padding-bottom: 5px;
          padding-top: 20px;
          font-style: italic;
      }
        .slider:hover {
          opacity: 1;
        }
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
          color: #808080;
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
