import React, { useState } from 'react';
import SelectUser from "./selectUser.jsx";

function Poll() {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [creatorId, setCreatorId] = useState('');
    const [publishedAt, setPublishedAt] = useState('');
    const [validUntil, setValidUntil] = useState();

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const poll = {
            question: question,
            options: options.map((option, idx) => ({ caption: option, presentationOrder: idx })),
            creator: { id: creatorId }, // Assuming creatorId is available
            publishedAt: new Date().toISOString(), // Convert to ISO format
            validUntil: new Date(validUntil).toISOString() // Convert to ISO format
        };

        try {
            const response = await fetch('http://localhost:8080/poll', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(poll)
            });
            if (response.ok) {
                alert('Poll created successfully!');
            } else {
                alert('Failed to create poll.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="poll-container">
            <h2>Create a Poll</h2>
            <form onSubmit={handleSubmit} className="poll-form">
                <div className="form-group">
                <label>Creator</label>
                <SelectUser onUserSelect={setCreatorId}/>
                </div>
                <div className="form-group">
                <label>Question</label>
                <input
                type="text"
                placeholder="Enter your question"
                 value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
                />
                </div>
                {options.map((option, index) => (
                    <div key={index} className="form-group">
                    <label>Option {index + 1}</label>
                    <input
                        key={index}
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        required
                    />
                    </div>
                ))}
                <button type="button" onClick={handleAddOption} className="add-option-button">
                    + Add Option
                </button>
                <div className="form-group">
                <label>Creator ID</label>
                <input
                    type="text"
                    placeholder="Creator ID"
                    value={creatorId}
                    onChange={(e) => setCreatorId(e.target.value)}
                    required
                />
                </div>
                <div className="form-group">
                <label>Valid until</label>
                <input
                    type="datetime-local"
                    placeholder="Valid Until"
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    required
                />
                </div>
                <button type="submit">Create Poll</button>
            </form>
            <style>{`
                .poll-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 40px;
                    font-family: 'Arial', sans-serif;
                    background-color: #f0f2f5;
                    min-height: 100vh;
                }

                h2 {
                    color: #333;
                    margin-bottom: 20px;
                    font-size: 2rem;
                    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
                }

                .poll-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    width: 100%;
                    max-width: 500px;
                    background: #fff;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    transition: box-shadow 0.3s ease-in-out;
                }

                .poll-form:hover {
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                }

                .form-group label {
                    font-size: 1rem;
                    margin-bottom: 5px;
                    color: #555;
                }

                .poll-form input {
                    padding: 12px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    font-size: 1rem;
                    transition: border-color 0.3s;
                }

                .poll-form input:focus {
                    border-color: #007BFF;
                    outline: none;
                    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
                }

                .add-option-button,
                .submit-button {
                    padding: 12px;
                    border: none;
                    background-color: #007BFF;
                    color: white;
                    font-size: 1rem;
                    cursor: pointer;
                    border-radius: 5px;
                    transition: background-color 0.3s;
                    margin-top: 10px;
                }

                .add-option-button:hover,
                .submit-button:hover {
                    background-color: #0056b3;
                }

                .add-option-button {
                    background-color: #28a745;
                }

                .add-option-button:hover {
                    background-color: #218838;
                }
            `}</style>
        </div>
    );
}

export default Poll;
