import React from 'react';
import { useSelector } from 'react-redux';

function VoterList() {
    const voters = useSelector((state) => state.voter.voters);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Voter List</h2>
            {voters.length === 0 ? (
                <p className="text-center">No voters added yet.</p>
            ) : (
                <ul className="list-group">
                    {voters.map((voter, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>Name:</strong> {voter.name} <br />
                                <strong>Email:</strong> {voter.email} <br />
                                <strong>Age:</strong> {voter.age}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default VoterList;