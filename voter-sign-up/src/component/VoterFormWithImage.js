import React, { useRef, useState } from 'react';
import { jsPDF } from 'jspdf';  // Import jsPDF

function VoterFormWithImage() {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDownloadEnabled, setIsDownloadEnabled] = useState(false);  // State to manage the download button
    const [voterList, setVoterList] = useState([]);  // State to store the list of voters

    const canvasRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Add the user to the voter list
        setVoterList([...voterList, { lastName, firstName, address }]);

        // Get the canvas and its context
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear the canvas before drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Load the background image
        const img = new Image();
        img.src = '/background-image.png';  // Ensure the path is correct

        img.onload = () => {
            console.log("Image loaded successfully");

            // Ensure the canvas dimensions match the image dimensions
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the background image first
            ctx.drawImage(img, 0, 0, img.width, img.height);
            console.log("Background image drawn on canvas");

            // Add text fields at the correct coordinates
            ctx.font = '70px Arial';
            ctx.fillStyle = 'black';

            // Draw text on canvas (adjust coordinates as needed)
            ctx.fillText(`${lastName}`, 253, 1750);  // Coordinates for lastName
            ctx.fillText(`${firstName}`, 1316, 1750); // Coordinates for firstName
            ctx.fillText(`${address}`, 515, 438);   // Coordinates for Age

            ctx.font = '240px Arial';
            ctx.fillStyle = 'black';

            setLoading(false);

            // Enable the download button after the image is generated
            setIsDownloadEnabled(true);
        };

        img.onerror = () => {
            alert("Failed to load image.");
            setLoading(false);
        };
    };

    // Function to download the canvas content as a PDF
    const downloadPDF = () => {
        const canvas = canvasRef.current;

        // Convert canvas to image data
        const imgData = canvas.toDataURL('image/png');

        // Create a new jsPDF instance
        const pdf = new jsPDF('portrait', 'pt', [canvas.width, canvas.height]);

        // Add the canvas image to the PDF
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);

        // Save the PDF
        pdf.save('filled-form.pdf');

        // Disable the download button after download is triggered
        setIsDownloadEnabled(false);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Voter Sign-Up Form</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
                <div className="form-group mb-3">
                    <label>Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter your last name"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter your first name"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Address</label>
                    <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your address"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? 'Generating Image...' : 'Submit'}
                </button>
            </form>

            {/* Hidden canvas */}
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

            <div className="text-center mt-4">
                <button
                    className="btn btn-success"
                    onClick={downloadPDF}
                    disabled={!isDownloadEnabled || loading}  // Disable when loading or until Submit is clicked
                >
                    Download as PDF
                </button>
            </div>

            {/* Voter List */}
            <div className="mt-5">
                <h4>Voter List</h4>
                <ul className="list-group">
                    {voterList.map((voter, index) => (
                        <li key={index} className="list-group-item">
                            <strong>Last Name: </strong> {voter.lastName}     |     <strong>First Name: </strong> {voter.firstName}     |     <strong>Address:</strong> {voter.address}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default VoterFormWithImage;