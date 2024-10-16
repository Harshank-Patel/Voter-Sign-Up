import { jsPDF } from 'jspdf';
import { useDispatch } from 'react-redux';
import { uploadToS3 } from '../aws/s3Uploader';
import { addVoter } from '../redux/voterSlice';
import React, { useRef, useState } from 'react';


function VoterForm() {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [county, setCounty] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
    const [id, setId] = useState('');
    const [social1, setSocial1] = useState('');
    const [social2, setSocial2] = useState('');
    const [social3, setSocial3] = useState('');
    const [social4, setSocial4] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const canvasRef = useRef(null);
    const dispatch = useDispatch();  // Hook to dispatch actions

    const handleClear = () => {
        setLastName('');
        setFirstName('');
        setMiddleName('');
        setAddress('');
        setCity('');
        setCounty('');
        setZipCode('');
        setMonth('');
        setDay('');
        setYear('');
        setId('');
        setSocial1('');
        setSocial2('');
        setSocial3('');
        setSocial4('');
        setEmail('');
    };


    // Function to handle the change for each box
    const handleSocialChange = (setter, value) => {
        if (value.length <= 1 && /^[0-9]*$/.test(value)) {  // Only allow numbers
            setter(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Dispatch the voter data to Redux store
        dispatch(addVoter({ lastName, firstName, address, city }));

        // Get the canvas and its context
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear the canvas before drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Load the background image
        const img = new Image();
        img.src = '/Blank-Form.png';  // Ensure the path is correct

        img.onload = () => {
            console.info("Image loaded successfully");

            // Ensure the canvas dimensions match the image dimensions
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the background image first
            ctx.drawImage(img, 0, 0, img.width, img.height);
            console.info("Background image drawn on canvas");

            // Add text fields at the correct coordinates
            ctx.font = '70px Arial';
            ctx.fillStyle = 'black';



            // DEFAULT FIELDS //
            ctx.fillText("X", 290, 1170);  // Coordinates for NEW Application
            ctx.fillText("X", 1020, 1300);  // Coordinates for CITIZEN
            ctx.fillText("X", 2850, 1300);  // Coordinates for 18 years or older



            // NAME RELATED FIELDS //
            ctx.fillText(`${lastName}`, 253, 1750);  // Coordinates for lastName
            ctx.fillText(`${firstName}`, 1316, 1750); // Coordinates for firstName
            ctx.fillText(`${middleName}`, 2179, 1768); // Coordinates for middleName


            // ADDRESS RELATED FIELDS //
            ctx.fillText(`${address}`, 253, 2050);   // Coordinates for address
            ctx.fillText(`${city}`, 2266, 1900);   // Coordinates for city
            ctx.fillText(`${county}`, 2386, 2050);   // Coordinates for county
            ctx.fillText(`${zipCode}`, 3486, 2050);  // Coordinates for zip code

            ctx.fillText(`${address}`, 253, 2350);   // Coordinates for MAILING address
            ctx.fillText(`${city}`, 2288, 2298);   // Coordinates for MAILING city
            ctx.fillText("Texas", 3407, 2200);   // Coordinates for MAILING state
            ctx.fillText(`${zipCode}`, 3452, 2361);  // Coordinates for MAILING zip code


            // DATE OF BIRTH RELATED FIELDS //
            ctx.fillText(`${month.split("")[0]}`, 313, 2793);     // Coordinates for month
            ctx.fillText(`${month.split("")[1]}`, 460, 2793);     // Coordinates for month

            day.toString().padStart(2, '0');
            ctx.fillText(`${day.split("")[0]}`, 683, 2793);     // Coordinates for day
            ctx.fillText(`${day.split("")[1]}`, 840, 2793);     // Coordinates for day

            ctx.fillText(`${year.split("")[0]}`, 1036, 2793);     // Coordinates for year
            ctx.fillText(`${year.split("")[1]}`, 1190, 2793);     // Coordinates for year
            ctx.fillText(`${year.split("")[2]}`, 1351, 2793);     // Coordinates for year
            ctx.fillText(`${year.split("")[3]}`, 1509, 2793);     // Coordinates for year


            // ID OR SOCIAL RELATED FIELDS //
            //State Issued ID/Driving License
            ctx.fillText(`${id.split("")[0]}`, 332, 3150);     // Coordinates for ID - 1
            ctx.fillText(`${id.split("")[1]}`, 486, 3150);     // Coordinates for ID - 2
            ctx.fillText(`${id.split("")[2]}`, 640, 3150);     // Coordinates for ID - 3
            ctx.fillText(`${id.split("")[3]}`, 786, 3150);     // Coordinates for ID - 4
            ctx.fillText(`${id.split("")[4]}`, 932, 3150);     // Coordinates for ID - 5
            ctx.fillText(`${id.split("")[5]}`, 1078, 3150);     // Coordinates for ID - 6
            ctx.fillText(`${id.split("")[6]}`, 1244, 3150);     // Coordinates for ID - 7
            ctx.fillText(`${id.split("")[7]}`, 1390, 3150);     // Coordinates for ID - 8

            //SSN Field
            ctx.fillText(`${social1}`, 2860, 3154);     // Coordinates for Social
            ctx.fillText(`${social2}`, 3012, 3154);     // Coordinates for Social
            ctx.fillText(`${social3}`, 3155, 3154);     // Coordinates for Social
            ctx.fillText(`${social4}`, 3300, 3154);     // Coordinates for Social


            // CURRENT DATE RELATED FIELD //
            const today = new Date();
            const formattedDate = today.toLocaleDateString(); // e.g., "10/13/2024"
            ctx.fillText(`${formattedDate}`, 3396, 4100);    //First Todays Date
            ctx.fillText(`${formattedDate}`, 2919, 4531);    //Middle Todays Date
            ctx.fillText(`${formattedDate}`, 3234, 5245);    //Last Todays Date


            // SETTING VDR FIELDS NOW! //
            ctx.fillText("Harshank Patel", 847, 4516);    //VDR Full Name
            ctx.fillText("Harshank Patel", 1106, 5068);    //VDR Full Name
            ctx.fillText("Harshank Patel", 1117, 5245);    //VDR Full Name

            ctx.fillText(`${firstName} ${lastName}`, 1308, 4888);    //Applicant Full Name
            ctx.fillText(`${firstName} ${lastName}`, 464, 4058);    //Applicant Full Name

            //VDR Number based on the County
            var VDRNumber = "";
            if (county.toLowerCase() === "williamson") {
                // williamson
                VDRNumber = "24552"
            }
            else if (county.toLowerCase() === "travis") {
                // travis
                VDRNumber = "T-5425"
            }
            else {
                //hays
                VDRNumber = "23479"
            }

            ctx.fillText(`${VDRNumber}`, 182, 4524);    //VDR Number
            ctx.fillText(`${VDRNumber}`, 3355, 5087);    //VDR Number



            setLoading(false);
            savePDF();
        };

        img.onerror = () => {
            alert("Failed to load image.");
            setLoading(false);
        };
    };

    // Function to download the canvas content as a PDF
    const savePDF = async () => {
        const canvas = canvasRef.current;

        // Convert canvas to image data
        const imgData = canvas.toDataURL('image/png');

        // Create a new jsPDF instance
        const pdf = new jsPDF('portrait', 'pt', [canvas.width, canvas.height]);

        // Add the canvas image to the PDF
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);

        // Convert the PDF to a Blob for uploading
        const pdfBlob = new Blob([pdf.output('blob')], { type: 'application/pdf' });

        // Generate a file name based on the form data
        const fileName = `${firstName}-${lastName}_${id}.pdf`;

        // Save the PDF locally
        // pdf.save(fileName);

        // Start S3 upload
        try {
            handleClear();
            const s3Url = await uploadToS3(pdfBlob, fileName, county);
        } catch (error) {
            console.error("Error uploading file: " + error.message);
        }
    };

    return (
        <div className="container mt-5">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Texas_flag_map.svg/1228px-Texas_flag_map.svg.png"
                alt="Texas Flag Map"
                className="img-small"
            />
            <h1 className="text-center mb-4">Texas Voter Registration Form</h1>
            <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
                <div className="row">
                    <div className="col-md-4 mb-3">  {/* Use col-md-4 to fit three fields in one row */}
                        <label>First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            //placeholder="Enter your first name"
                            required
                        />
                    </div>
                    <div className="col-md-4 mb-3">  {/* Use col-md-4 for Last Name */}
                        <label>Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            //placeholder="Enter your last name"
                            required
                        />
                    </div>
                    <div className="col-md-4 mb-3">  {/* Use col-md-4 for Middle Name */}
                        <label>Middle Name (Optional)</label>
                        <input
                            type="text"
                            className="form-control"
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                        //placeholder="Enter your middle name"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 mb-3">
                        <label>Address</label>
                        <input
                            type="text"
                            className="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            //placeholder="Enter your address"
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label>City</label>
                        <input
                            type="text"
                            className="form-control"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            //placeholder="Enter your city"
                            required
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>County</label>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="county"
                                id="williamson"
                                value="Williamson"
                                checked={county === 'Williamson'}
                                onChange={(e) => setCounty(e.target.value)}
                                required
                            />
                            <label className="form-check-label" htmlFor="williamson">
                                Williamson
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="county"
                                id="hays"
                                value="Hays"
                                checked={county === 'Hays'}
                                onChange={(e) => setCounty(e.target.value)}
                                required
                            />
                            <label className="form-check-label" htmlFor="hays">
                                Hays
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="county"
                                id="travis"
                                value="Travis"
                                checked={county === 'Travis'}
                                onChange={(e) => setCounty(e.target.value)}
                                required
                            />
                            <label className="form-check-label" htmlFor="travis">
                                Travis
                            </label>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>Zip Code</label>
                        <input
                            type="text"
                            className="form-control"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            //placeholder="Enter your zip code"
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label>Month of Birth</label>
                        <select
                            className="form-control"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            required
                        >
                            <option value="">-- Select a Month --</option>
                            <option value="01">January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>Date of Birth</label>
                        <select
                            className="form-control"
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            required
                        >
                            <option value="">-- Select a Day --</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                        </select>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>Year of Birth</label>
                        <input
                            type="number"
                            className="form-control"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            //placeholder="Enter your year of birth"
                            required
                        />
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label>ID / Driving License Number </label>
                        <input
                            type="number"
                            className="form-control"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            //placeholder="Enter your State ID or Driving Licence Number"
                            required
                        />
                    </div>



                    <div className="col-md-4 mb-3">
                        <label>Last-4 Digits of Social Security</label>
                        <div className="d-flex">
                            <input
                                type="text"
                                maxLength="1"
                                className="form-control me-1 text-center"
                                value={social1}
                                onChange={(e) => handleSocialChange(setSocial1, e.target.value)}
                                required
                                style={{ width: '50px', height: '40px' }}  // Smaller square style
                            />
                            <input
                                type="text"
                                maxLength="1"
                                className="form-control me-1 text-center"
                                value={social2}
                                onChange={(e) => handleSocialChange(setSocial2, e.target.value)}
                                required
                                style={{ width: '50px', height: '40px' }}  // Smaller square style
                            />
                            <input
                                type="text"
                                maxLength="1"
                                className="form-control me-1 text-center"
                                value={social3}
                                onChange={(e) => handleSocialChange(setSocial3, e.target.value)}
                                required
                                style={{ width: '50px', height: '40px' }}  // Smaller square style
                            />
                            <input
                                type="text"
                                maxLength="1"
                                className="form-control text-center"
                                value={social4}
                                onChange={(e) => handleSocialChange(setSocial4, e.target.value)}
                                required
                                style={{ width: '50px', height: '40px' }}  // Smaller square style
                            />
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <label>Email </label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            //placeholder="Enter your email address"
                            required
                        />
                    </div>
                </div>


                {/* Buttons: Submit and Clear side by side */}
                <div className="d-flex justify-content-center mt-3">
                    <button type="submit" className="btn btn-success me-3 px-5" disabled={loading}>
                        {loading ? 'Uploading PDF' : 'Submit'}
                    </button>

                    <button type="button" className="btn btn-danger px-5" onClick={handleClear} disabled={loading}>
                        Clear
                    </button>
                </div>


            </form>

            {/* Hidden canvas */}
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
    );
}

export default VoterForm;