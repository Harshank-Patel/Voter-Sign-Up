import React from 'react';
import { useSelector } from 'react-redux';

const VoterList = () => {
    const voterList = useSelector((state) => state.voters.voterList);

    return (
        <div className="container mt-5">
            <h4 className="text-center mb-4">Voter List</h4>
            <ul className="list-group">
                {voterList.map((voter, index) => (
                    <li key={index} className="list-group-item">
                        <strong>Last Name:</strong> {voter.lastName} | <strong>First Name:</strong> {voter.firstName} | <strong>Address:</strong> {voter.address}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VoterList;