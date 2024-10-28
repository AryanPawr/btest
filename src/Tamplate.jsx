// src/PDFGenerator.js
import React, { useRef, useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './App.css'; // Import your CSS file


const PDFGenerator = () => {
  const pdfRef = useRef();
  const [properties, setProperties] = useState([
    {
      place: '',
      propertyName: '',
      images: [],
      specifications: [
        { srNo: 1, particulars: 'Offered Unit', offers: '' },
        { srNo: 2, particulars: 'Level', offers: '' },
        { srNo: 3, particulars: 'Type of Agreement', offers: '' },
        { srNo: 4, particulars: 'Carpet Area', offers: '' },
        { srNo: 5, particulars: 'Chargable Area', offers: '' },
        { srNo: 6, particulars: 'Rent/Month ', offers: '' },
        { srNo: 7, particulars: 'Licence Term ', offers: '' },
        { srNo: 8, particulars: 'Lock In', offers: '' },
        { srNo: 9, particulars: 'Intrest Free Security Deposite', offers: '' },
        { srNo: 10, particulars: 'Car Park', offers: '' },
        { srNo: 11, particulars: 'Two wheeleer Park', offers: '' },
        { srNo: 12, particulars: 'Maintainance', offers: '' },
        { srNo: 13, particulars: 'Escalation', offers: '' },
        { srNo: 14, particulars: 'Stamp Duty', offers: '' },
        { srNo: 15, particulars: 'Property Type', offers: '' },
        { srNo: 16, particulars: 'Goods And Services Tax', offers: '' },
        { srNo: 17, particulars: 'Condition', offers: '' },
        { srNo: 18, particulars: 'Handover', offers: '' },
      ],
    },
  ]);

  const handleImageChange = (index, e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    const newProperties = [...properties];
    newProperties[index].images = imageUrls;
    setProperties(newProperties);
  };

  const handleSpecificationChange = (propertyIndex, specIndex, value) => {
    const newProperties = [...properties];
    newProperties[propertyIndex].specifications[specIndex].offers = value;
    setProperties(newProperties);
  };

  const handlePlaceChange = (index, value) => {
    const newProperties = [...properties];
    newProperties[index].place = value;
    setProperties(newProperties);
  };

  const handlePropertyNameChange = (index, value) => {
    const newProperties = [...properties];
    newProperties[index].propertyName = value;
    setProperties(newProperties);
  };

  const addProperty = () => {
    setProperties([
      ...properties,
      {
        place: '',
        propertyName: '',
        images: [],
        specifications: [
          { srNo: 1, particulars: 'Offered Unit', offers: '' },
          { srNo: 2, particulars: 'Level', offers: '' },
          { srNo: 3, particulars: 'Type of Agreement', offers: '' },
          { srNo: 4, particulars: 'Carpet Area', offers: '' },
          { srNo: 5, particulars: 'Chargable Area', offers: '' },
          { srNo: 6, particulars: 'Rent/Month ', offers: '' },
          { srNo: 7, particulars: 'Licence Term ', offers: '' },
          { srNo: 8, particulars: 'Lock In', offers: '' },
          { srNo: 9, particulars: 'Intrest Free Security Deposite', offers: '' },
          { srNo: 10, particulars: 'Car Park', offers: '' },
          { srNo: 11, particulars: 'Two wheeleer Park', offers: '' },
          { srNo: 12, particulars: 'Maintainance', offers: '' },
          { srNo: 13, particulars: 'Escalation', offers: '' },
          { srNo: 14, particulars: 'Stamp Duty', offers: '' },
          { srNo: 15, particulars: 'Property Type', offers: '' },
          { srNo: 16, particulars: 'Goods And Services Tax', offers: '' },
          { srNo: 17, particulars: 'Condition', offers: '' },
          { srNo: 18, particulars: 'Handover', offers: '' },
        ],
      },
    ]);
  };

  const generatePDF = () => {
    html2canvas(pdfRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190; // width of the image in PDF
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('real-estate-template.pdf');
    });
  };

  return (
    <div className="container">
      <h2>Real Estate PDF Template</h2>

      {properties.map((property, index) => (
        <div key={index} className="property-container">
          <div className="input-group">
            <label>
              Place:
              <input
                type="text"
                value={property.place}
                onChange={(e) => handlePlaceChange(index, e.target.value)}
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              Name of Property:
              <input
                type="text"
                value={property.propertyName}
                onChange={(e) => handlePropertyNameChange(index, e.target.value)}
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              Upload Images (select multiple):
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageChange(index, e)}
              />
            </label>
          </div>

          <div className="images-preview">
            {property.images.map((url, imgIndex) => (
              <img
                key={imgIndex}
                src={url}
                alt={`Property ${index + 1} Image ${imgIndex + 1}`}
              />
            ))}
          </div>

          <h3>Specifications</h3>
          <table className="specifications-table">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Particulars</th>
                <th>Offers</th>
              </tr>
            </thead>
            <tbody>
              {property.specifications.map((spec, specIndex) => (
                <tr key={spec.srNo}>
                  <td>{spec.srNo}</td>
                  <td>{spec.particulars}</td>
                  <td>
                    <input
                      type="text"
                      value={spec.offers}
                      onChange={(e) =>
                        handleSpecificationChange(index, specIndex, e.target.value)
                      }
                      placeholder="Enter offer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
        </div>
      ))}

      <button className="add-property-btn" onClick={addProperty}>
        Add Another Property
      </button>

      <div ref={pdfRef} style={{ padding: '20px', position: 'relative' }}>
  <h3>Here Are The Shortlisted Properties for You</h3>
  
  {properties.map((property, index) => (
    <div key={index}>
      <p>Place: {property.place}</p>
      <p>Name of Property: {property.propertyName}</p>
      <div className="images-preview">
        {property.images.map((url, imgIndex) => (
          <img key={imgIndex} src={url} alt={`Property ${index + 1}`} />
        ))}
      </div>

      <h3>Specifications</h3>
      <div className="specifications-container">
        {(() => {
          const midIndex = Math.ceil(property.specifications.length / 2);
          const firstHalf = property.specifications.slice(0, midIndex);
          const secondHalf = property.specifications.slice(midIndex);

          return (
            <>
              <table className="specifications-table">
                <thead>
                  <tr>
                    <th>Sr. No</th>
                    <th>Particulars</th>
                    <th>Offers</th>
                  </tr>
                </thead>
                <tbody>
                  {firstHalf.map((spec) => (
                    <tr key={spec.srNo}>
                      <td>{spec.srNo}</td>
                      <td>{spec.particulars}</td>
                      <td>{spec.offers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table className="specifications-table">
                <thead>
                  <tr>
                    <th>Sr. No</th>
                    <th>Particulars</th>
                    <th>Offers</th>
                  </tr>
                </thead>
                <tbody>
                  {secondHalf.map((spec) => (
                    <tr key={spec.srNo}>
                      <td>{spec.srNo}</td>
                      <td>{spec.particulars}</td>
                      <td>{spec.offers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          );
        })()}
      </div>

      {/* Empty space for aesthetics */}
      <div style={{ height: '300px' }}></div>
    </div>
  ))}
</div>


      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default PDFGenerator;
