import React, { useEffect, useState } from "react";
import SelectUser from "./selectUser.jsx";

function VoteComponent() {
    const [polls, setPolls] = useState([]);
    const [selectedPoll, setSelectedPoll] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [voter, setVoter] = useState("");

    // Fetch polls from the backend when the component is mounted
    useEffect(() => {
        const fetchPolls = async () => {
            try {
                const response = await fetch("http://localhost:8080/polls");
                if(response.ok) {
                    const data = await response.json();
                    setPolls(data)
                } else {
                    console.error('Failed to fetch polls')
                }


            } catch (error) {
                console.error('Error: ', error)
            }


        };

        fetchPolls();
    }, []);

    // Handler for poll selection
    const handlePollSelection = (poll) => {
        setSelectedPoll(poll);
        setSelectedOption(null); // Reset selected option when switching polls
    };

    // Handler for option selection
    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    // Handler for voter input
    const handleVoterChange = (e) => {
        setVoter(e.target.value);
    };

    // Function to handle vote submission
    const handleVote = async () => {
        if (!selectedPoll || !selectedOption || !voter) {
            alert("Please select a poll, an option, and enter your voter name.");
            return;
        }

        // Constructing the vote data
        const voteData = {
            publishedAt: new Date().toISOString(), // Current timestamp
            voteOption: {
                caption: selectedOption.caption,
                presentationOrder: selectedOption.presentationOrder,
            },
            poll: {id: selectedPoll.id},
            voter: {id: voter},
        };

        // POST the vote data to the backend API
        const response = await fetch(`http://localhost:8080/vote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(voteData),
        });

        if (response.ok) {
            alert("Vote submitted successfully!");
        } else {
            alert("Error submitting vote.");
        }
    };

    return (
        <div className="vote-container">
            <h2>Vote on a Poll</h2>
            <div>
                <label>Select voter</label>
                <SelectUser onUserSelect={setVoter} />
                <label>Select Poll:</label>
                <select onChange={(e) => handlePollSelection(polls[e.target.value])}>
                    <option value="">-- Select a Poll --</option>
                    {polls.map((poll, index) => (
                        <option key={poll.id} value={index}>
                            {poll.question}
                        </option>
                    ))}
                </select>
            </div>

            {selectedPoll && (
                <div>
                    <h3>{selectedPoll.question}</h3>
                    <div>
                        {selectedPoll.options.map((option, index) => (
                            <div key={index}>
                                <label>
                                    <input
                                        type="radio"
                                        name="option"
                                        value={option.caption}
                                        onChange={() => handleOptionChange(option)}
                                    />
                                    {option.caption}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {selectedPoll && (
                <div>
                    <label>Voter Name:</label>
                    <input
                        type="text"
                        value={voter}
                        onChange={handleVoterChange}
                        required
                    />
                </div>
            )}

            {selectedPoll && selectedOption && (
                <button onClick={handleVote}>Submit Vote</button>
            )}
        </div>
    );
}

export default VoteComponent;
