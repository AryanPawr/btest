import React, { useRef, useState } from "react";
import "./App.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PropertySelector from "./PropertySelector";

// InputField component for modular form inputs
const InputField = ({ label, value, onChange }) => (
  <label>
    {label}
    <input type="number" value={value} onChange={onChange} />
  </label>
);

const Retail = () => {
    // Define state for inputs and calculated value
  const pdfRef = useRef(null); // Ref for the PDF export
  const [area, setArea] = useState(0);
  const [rate, setRate] = useState(0);
  const [rate2, setRate2] = useState(0);
  const [commonCharges, setCommonCharges] = useState(0);
  const [parkingCharges, setParkingCharges] = useState(0);
  const [registration, setRegistration] = useState(0);
  const [Rent, setRent] = useState(0);
  const [exitrate, setexitrate] = useState(0);
  const [exitspan, setexitspan] = useState(0);
  const [gsts, setgsts] = useState(0);
  const [stmpduty, setstmpduty] = useState(0);
  const [Loading, setLoading] = useState(0);
  const [propertyType, setPropertyType] = useState("Office"); // New state for property type


  // Dropdown states
  const [showCalculatedValues, setShowCalculatedValues] = useState(false);
  const [showROICalculations, setShowROICalculations] = useState(false);

  // Number formatting for large values
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN").format(num.toFixed(2));
  };

  // Input validation to allow only non-negative numbers
  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    if (value >= 0 || value === "") {
      setter(value);
    }
  };
  const Loadings = 1+(Loading/100);

  const SlableArea = area * Loadings;

  // Derived values
  const basicValue = SlableArea * rate;
  const basicValue2 = SlableArea * rate2;
  const extraVal =  Number(commonCharges) + Number(parkingCharges)  ;
  const agrValue = basicValue + extraVal;
  const agrValue2 = basicValue2 + extraVal;

  console.log (Loadings)

  const gst = agrValue * (gsts/100);
  const gst2 = agrValue2 * (gsts/100);

  const stampDuty = agrValue * (stmpduty/100);
  const stampDuty2 = agrValue2 * (stmpduty/100);

  console.log(agrValue)
  console.log(gst)
  console.log(stampDuty)
  console.log(agrValue)


  const total = Number(agrValue) + Number(gst ) + Number(stampDuty) + Number(registration);
  const total2 = Number(agrValue2) + Number(gst2 ) + Number(stampDuty2) + Number(registration);

  const aqCost = total / SlableArea;
  const aqCost2 = total2 / SlableArea;

  const MnthRent = Rent * area;
  const YrlyRent = MnthRent * 12;
  const Roi = YrlyRent / total;
  const Roii2 = YrlyRent / total2;

  const ROIPrc = Roi * 100;
  const ROIPrc2 = Roii2 * 100;

  const Deposit = MnthRent * 6;
  const secyear = (MnthRent * 0.05 + MnthRent) * 12;
  const thisrdyear = secyear * 0.05 + secyear;
  const fouryear = thisrdyear * 0.05 + thisrdyear;
  const fiveyear = fouryear * 0.05 + fouryear;

  const secyear2 = (MnthRent * 0.05 + MnthRent) * 12;
  const thisrdyear2 = secyear2 * 0.05 + secyear2;
  const fouryear2 = thisrdyear2 * 0.05 + thisrdyear2;
  const fiveyear2 = fouryear2 * 0.05 + fouryear2;

  const roisec = (secyear / total) * 100;
  const roithird = (thisrdyear / total) * 100;
  const roifourth = (fouryear / total) * 100;
  const roififth = (fiveyear / total) * 100;

  const roisec2 = (secyear / total2) * 100;
  const roithird2 = (thisrdyear / total2) * 100;
  const roifourth2 = (fouryear / total2) * 100;
  const roififth2 = (fiveyear / total2) * 100;

  const roittl = ROIPrc + roisec + roithird + roifourth + roififth;
  const roittl2 = ROIPrc2 + roisec2 + roithird2 + roifourth2 + roififth2;

  const roiavg = roittl / 5;
  const roiavg2 = roittl2 / 5;

  const ttlInvestment = total - Deposit;
  const ttlInvestment2 = total2 - Deposit;

  const FYcumrent = YrlyRent;
  const sYcumrent = secyear + YrlyRent;
  const tYcumrent = sYcumrent + thisrdyear;
  const FiYcumrent = tYcumrent + fouryear;
  const FivYcumrent = FiYcumrent + fiveyear;

  const FYcumrent2 = YrlyRent;
  const sYcumrent2 = secyear2 + YrlyRent;
  const tYcumrent2 = sYcumrent2 + thisrdyear2;
  const FiYcumrent2 = tYcumrent2 + fouryear2;
  const FivYcumrent2 = FiYcumrent2 + fiveyear2;

  const ROI1 = (FYcumrent / total) * 100;
  const ROI2 = ((sYcumrent / total) * 100) / 2;
  const ROI3 = ((tYcumrent / total) * 100) / 3;
  const ROI4 = ((FiYcumrent / total) * 100) / 4;
  const ROI5 = ((FivYcumrent / total) * 100) / 5;

  const ROI12 = (FYcumrent / total2) * 100;
  const ROI22 = ((sYcumrent / total2) * 100) / 2;
  const ROI32 = ((tYcumrent / total2) * 100) / 3;
  const ROI42 = ((FiYcumrent / total2) * 100) / 4;
  const ROI52 = ((FivYcumrent / total2) * 100) / 5;

  const ROIavg = (ROI1 + ROI2 + ROI3 + ROI4 + ROI5) / 5;
  const ROIavg2 = (ROI12 + ROI22 + ROI32 + ROI42 + ROI52) / 5;

  const Salesprocede = exitrate * SlableArea;

  // Calculate inflow based on exitspan logic

  const inflow = Salesprocede + FYcumrent;
  const inflow2 = Salesprocede + sYcumrent;
  const inflow3 = Salesprocede + tYcumrent;
  const inflow4 = Salesprocede + FiYcumrent;
  const inflow5 = Salesprocede + FivYcumrent;

  const inflows = Salesprocede + FYcumrent2;
  const inflow2s = Salesprocede + sYcumrent2;
  const inflow3s = Salesprocede + tYcumrent2;
  const inflow4s = Salesprocede + FiYcumrent2;
  const inflow5s = Salesprocede + FivYcumrent2;
 
  // 3 years
  const capitalGain = inflow3 - total;
  const capitalGain2 = inflow3s - total2;

  const capitalGainPer = (capitalGain / total) * 100;
  const capitalGainPer2 = (capitalGain2 / total2) * 100;

  const IRRthree = (capitalGain / total / 3) * 100;
  const IRRthree2 = (capitalGain2 / total2 / 3) * 100;

  //5 years

  const capitalGain5 = inflow5 - total;
  const capitalGain25 = inflow5s - total2;

  const capitalGainPer5 = (capitalGain5 / total) * 100;
  const capitalGainPer25 = (capitalGain25 / total2) * 100;

  const IRRthree5 = (capitalGain5 / total / 5) * 100;
  const IRRthree25 = (capitalGain25 / total2 / 5) * 100;

  // Toggle Calculated Values
  const toggleCalculatedValues = () => {
    setShowCalculatedValues(!showCalculatedValues);
  };

  // Toggle ROI Calculations
  const toggleROICalculations = () => {
    setShowROICalculations(!showROICalculations);
  };

  const generatePDF = () => {
    const input = pdfRef.current;
    
    // Verify the ref is correctly set
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("calculated-values.pdf");
      });
    } else {
      console.error("pdfRef.current is null or undefined");
    }
  };

  return (

    <div className="real-estate-calculator-container">
      <h1>Potential ROI Calculator(Retail)</h1>
      <div className="form-section">
        <div className="input-container">
        <div className="input-column">
          <InputField
            label="Area (sq ft):"
            value={area}
            onChange={handleInputChange(setArea)}
          />
          <InputField
            label="Loading:"
            value={Loading}
            onChange={handleInputChange(setLoading)}
          />
          <InputField
            label="Rate (per sq ft):"
            value={rate}
            onChange={handleInputChange(setRate)}
          />
          <InputField
            label="Common Charges:"
            value={commonCharges}
            onChange={handleInputChange(setCommonCharges)}
          />
          <InputField
            label="Registration:"
            value={registration}
            onChange={handleInputChange(setRegistration)}
          />
          <InputField
            label="GST:"
            value={gsts}
            onChange={handleInputChange(setgsts)}
          />
        </div>
        <div className="input-column">
          <InputField
            label="Rate 2 (per sq ft):"
            value={rate2}
            onChange={handleInputChange(setRate2)}
          />
          <InputField
            label="Parking Charges:"
            value={parkingCharges}
            onChange={handleInputChange(setParkingCharges)}
          />
          <InputField
            label="Exit rate:"
            value={exitrate}
            onChange={handleInputChange(setexitrate)}
          />
          <InputField
            label="Rent/sq.ft:"
            value={Rent}
            onChange={handleInputChange(setRent)}
          />
          <InputField
            label="stamp duty:"
            value={stmpduty}
            onChange={handleInputChange(setstmpduty)}
          />
        </div>
      </div>
      </div>

      <div className="financial-overview-section"  ref={pdfRef}>
        <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Seller's Offering  (₹)</th>
                  <th>Our Offering   (₹)</th>
              </tr>
            </thead>
            <tbody>

            <tr>
                
                <td>Salable Area</td>
                    <td>{formatNumber(SlableArea)}</td>
                    <td>{formatNumber(SlableArea)}</td>{" "}
                </tr>
                <tr style={{ backgroundColor: '#f9f9f9', borderBottom: '1px solid #ddd' }}>
  <td style={{ padding: '10px', fontWeight: 'bold', color: 'Green' }}>Total Cost</td>
  <td style={{ padding: '10px', color: 'Green' }}>{formatNumber(total)}</td>
  <td style={{ padding: '10px', color: 'Green' }}>{formatNumber(total2)}</td>
</tr>
            <tr>
                  <td>Basic Value</td>
                  <td>{formatNumber(basicValue)}</td>
                  <td>{formatNumber(basicValue2)}</td>{" "}
                  {/* Assuming you have a second basicValue for Rate 2 */}
                </tr>

            
            <tr style={{ backgroundColor: '#f9f9f9', borderBottom: '1px solid #ddd' }}>
  <td style={{ padding: '10px', fontWeight: 'bold', color: 'Green' }}>ROI</td>
  <td style={{ padding: '10px', color: 'Green' }}>{formatNumber(ROIPrc)}</td>
  <td style={{ padding: '10px', color: 'Green' }}>{formatNumber(ROIPrc2)}</td>
</tr>

              <tr>
                <td>Acquisition Cost (Per Sq. Ft.)</td>
                  <td>{formatNumber(aqCost)}</td>
                  <td>{formatNumber(aqCost2)}</td>{" "}
              </tr>
              <tr>
                  <td>GST </td>
                  <td>{formatNumber(gst)}</td>
                  <td>{formatNumber(gst2)}</td>{" "}
                  {/* Assuming you have a second gst for Rate 2 */}
                </tr>
                <tr>
                  <td>Stamp Duty </td>
                  <td>{formatNumber(stampDuty)}</td>
                  <td>{formatNumber(stampDuty2)}</td>{" "}
                  {/* Assuming you have a second stampDuty for Rate 2 */}
                </tr>

              
              
</tbody>
              </table>

        <div className="financial-three-year-overview" >
          <h2>3 Years</h2>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Seller's Offering  (₹)</th>
                  <th>Our Offering   (₹)</th>
              </tr>
            </thead>
            <tbody>

              <tr>
                
              <td>Acquisition Cost (Per Sq. Ft.)</td>
                  <td>{formatNumber(aqCost)}</td>
                  <td>{formatNumber(aqCost2)}</td>{" "}
              </tr>
              
              <tr>
                <td>Capital Gain</td>
                <td>{capitalGain.toFixed(2)}</td>
                <td>{capitalGain2.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Capital Gain Percentage</td>
                <td>{capitalGainPer.toFixed(2)} %</td>
                <td>{capitalGainPer2.toFixed(2)} %</td>
              </tr>
              <tr style={{ backgroundColor: '#f9f9f9', borderBottom: '1px solid #ddd' }}>
  <td style={{ padding: '10px', fontWeight: 'bold', color: 'Green' }}>IRR (3 years)</td>
  <td style={{ padding: '10px', color: 'Green' }}>{IRRthree.toFixed(2)} %</td>
  <td style={{ padding: '10px', color: 'Green' }}>{IRRthree2.toFixed(2)} %</td>
</tr>


<tr style={{ backgroundColor: '#f9f9f9', borderBottom: '1px solid #ddd' }}>
  <td style={{ padding: '10px', fontWeight: 'bold', color: 'Green' }}>ROI</td>
  <td style={{ padding: '10px', color: 'Green' }}>{formatNumber(roisec)}</td>
  <td style={{ padding: '10px', color: 'Green' }}>{formatNumber(roisec2)}</td>
</tr>

            </tbody>
          </table>
        </div>
        <div className="financial-five-year-overview"  >
          <h2>5 Years</h2>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Seller's Offering  (₹)</th>
                  <th>Our Offering   (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Acquisition Cost (Per Sq. Ft.)</td>
                  <td>{formatNumber(aqCost)}</td>
                  <td>{formatNumber(aqCost2)}</td>{" "}
              </tr>
              
               
              <tr>
                <td>Capital Gain</td>
                <td>{capitalGain5.toFixed(2)}</td>
                <td>{capitalGain25.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Capital Gain Percentage</td>
                <td>{capitalGainPer5.toFixed(2)} %</td>
                <td>{capitalGainPer25.toFixed(2)} %</td>
              </tr>
              <tr>
                <td>IRR (5 years)</td>
                <td>{IRRthree5.toFixed(2)} %</td>
                <td>{IRRthree25.toFixed(2)} %</td>
              </tr>
              <tr>
                <td> ROI</td>
                <td>{formatNumber(roiavg)}</td>
                <td>{formatNumber(roiavg2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
      <div className="PDF finacial overview">
      <button onClick={generatePDF} style={{ marginTop: '20px' }}>
        Generate PDF
      </button>
      </div>
      


      <h2
        onClick={toggleCalculatedValues}
        style={{ cursor: "pointer", color: "#007BFF" }}
      >
        Calculated Values {showCalculatedValues ? "▲" : "▼"}
      </h2>

      {showCalculatedValues && (
        <div className="calculated-values-section" >
          <h2>Cost Overview</h2>
          <div className="cost-overview-section">
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Seller's Offering  (₹)</th>
                  <th>Our Offering   (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Basic Value</td>
                  <td>{formatNumber(basicValue)}</td>
                  <td>{formatNumber(basicValue2)}</td>{" "}
                  {/* Assuming you have a second basicValue for Rate 2 */}
                </tr>
                <tr>
                  <td>Extra Value</td>
                  <td>{formatNumber(extraVal)}</td>
                  <td>{formatNumber(extraVal)}</td>{" "}
                  {/* Assuming you have a second extraVal for Rate 2 */}
                </tr>
                <tr>
                  <td>Agreement Value</td>
                  <td>{formatNumber(agrValue)}</td>
                  <td>{formatNumber(agrValue2)}</td>{" "}
                  {/* Assuming you have a second agrValue for Rate 2 */}
                </tr>
                <tr>
                  <td>GST (12%)</td>
                  <td>{formatNumber(gst)}</td>
                  <td>{formatNumber(gst2)}</td>{" "}
                  {/* Assuming you have a second gst for Rate 2 */}
                </tr>
                <tr>
                  <td>Stamp Duty (7%)</td>
                  <td>{formatNumber(stampDuty)}</td>
                  <td>{formatNumber(stampDuty2)}</td>{" "}
                  {/* Assuming you have a second stampDuty for Rate 2 */}
                </tr>
                <tr>
                  <td>Total Cost</td>
                  <td>{formatNumber(total)}</td>
                  <td>{formatNumber(total2)}</td>{" "}
                  {/* Assuming you have a second total for Rate 2 */}
                </tr>
                <tr>
                  <td>Acquisition Cost (Per Sq. Ft.)</td>
                  <td>{formatNumber(aqCost)}</td>
                  <td>{formatNumber(aqCost2)}</td>{" "}
                  {/* Assuming you have a second aqCost for Rate 2 */}
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Rent Overview</h2>
          <div className="rent-overview-section" >
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Seller's Offering  (₹)</th>
                  <th>Our Offering   (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Monthly Rent (Per Sq. Ft.)</td>
                  <td>{formatNumber(MnthRent)}</td>
                  <td>{formatNumber(MnthRent)}</td>{" "}
                  {/* Assuming you have a second MnthRent for Rate 2 */}
                </tr>
                <tr>
                  <td>Yearly Rent (Per Sq. Ft.)</td>
                  <td>{formatNumber(YrlyRent)}</td>
                  <td>{formatNumber(YrlyRent)}</td>{" "}
                  {/* Assuming you have a second YrlyRent for Rate 2 */}
                </tr>
                <tr>
                  <td>Deposit</td>
                  <td>{formatNumber(Deposit)}</td>
                  <td>{formatNumber(Deposit)}</td>{" "}
                  {/* Assuming you have a second Deposit for Rate 2 */}
                </tr>
                <tr>
                  <td>Total Investment</td>
                  <td>{formatNumber(ttlInvestment)}</td>
                  <td>{formatNumber(ttlInvestment2)}</td>{" "}
                  {/* Assuming you have a second ttlInvestment for Rate 2 */}

                </tr>
                <tr>
                <td>Total Inflow</td>
                <td>{inflow3.toFixed(2)}</td>
                <td>{inflow3s.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <h2
        onClick={toggleROICalculations}
        style={{ cursor: "pointer", color: "#007BFF" }}
      >
        ROI Calculations {showROICalculations ? "▲" : "▼"}
      </h2>

      {showROICalculations && (
        <div className="roi-calculations-section" >
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Seller's Offering  (₹)</th>
                  <th>Our Offering   (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Initial ROI</td>
                <td>{formatNumber(ROIPrc)}</td>
                <td>{formatNumber(ROIPrc2)}</td>
              </tr>
              <tr>
                <td>2nd Year ROI</td>
                <td>{formatNumber(roisec)}</td>
                <td>{formatNumber(roisec2)}</td>
              </tr>
              <tr>
                <td>3rd Year ROI</td>
                <td>{formatNumber(roithird)}</td>
                <td>{formatNumber(roithird2)}</td>
              </tr>
              <tr>
                <td>4th Year ROI</td>
                <td>{formatNumber(roifourth)}</td>
                <td>{formatNumber(roifourth2)}</td>
              </tr>
              <tr>
                <td>5th Year ROI</td>
                <td>{formatNumber(roififth)}</td>
                <td>{formatNumber(roififth2)}</td>
              </tr>
              <tr>
                <td>Average ROI</td>
                <td>{formatNumber(roiavg)}</td>
                <td>{formatNumber(roiavg2)}</td>
              </tr>
            </tbody>
          </table>

          <h2>Yearly Rent and Cumulative Rent</h2>
          <div className="yearly-rent-section" >
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th> Rent (₹)</th>
                  <th>Cumulative Rent (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1 Year Rent (Per Sq. Ft.)</td>
                  <td>{YrlyRent.toFixed(2)}</td>
                  <td>{FYcumrent.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>2 Year Rent</td>
                  <td>{secyear.toFixed(2)}</td>
                  <td>{sYcumrent.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>3 Year Rent</td>
                  <td>{thisrdyear.toFixed(2)}</td>
                  <td>{tYcumrent.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>4 Year Rent</td>
                  <td>{fouryear.toFixed(2)}</td>
                  <td>{FiYcumrent.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>5 Year Rent</td>
                  <td>{fiveyear.toFixed(2)}</td>
                  <td>{FivYcumrent.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
  
    
          </div>
          
        </div>
        
      )}
      

    </div>
  );
};



export default Retail;
