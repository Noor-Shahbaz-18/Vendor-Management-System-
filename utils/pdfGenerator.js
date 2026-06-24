const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.generateQuotationPDF = (quotation, vendor) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const filename = `quotation_${quotation._id}.pdf`;
      const filePath = path.join(__dirname, '../temp', filename);
      
      // Ensure temp directory exists
      if (!fs.existsSync(path.join(__dirname, '../temp'))) {
        fs.mkdirSync(path.join(__dirname, '../temp'));
      }

      const writeStream = fs.createWriteStream(filePath);
      doc.pipe(writeStream);

      // Header
      doc.fontSize(20).text('Quotation Details', { align: 'center' });
      doc.moveDown();

      // Quotation Info
      doc.fontSize(12);
      doc.text(`Quotation ID: ${quotation._id}`);
      doc.text(`Title: ${quotation.title}`);
      doc.text(`Description: ${quotation.description}`);
      doc.text(`Amount: $${quotation.quotationAmount.toFixed(2)}`);
      doc.text(`Status: ${quotation.status}`);
      doc.text(`Submission Date: ${new Date(quotation.submissionDate).toLocaleDateString()}`);
      doc.text(`Vendor Reference: ${quotation.vendorReference || 'N/A'}`);
      doc.moveDown();

      // Vendor Info
      doc.fontSize(14).text('Vendor Information', { underline: true });
      doc.fontSize(12);
      doc.text(`Vendor Name: ${vendor.vendorName}`);
      doc.text(`Company: ${vendor.companyName}`);
      doc.text(`Email: ${vendor.email}`);
      doc.text(`Contact: ${vendor.contactNumber}`);
      doc.text(`Address: ${vendor.businessAddress}`);

      doc.end();

      writeStream.on('finish', () => {
        resolve(filePath);
      });

      writeStream.on('error', (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};