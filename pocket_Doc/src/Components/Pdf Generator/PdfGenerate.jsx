import {jsPDF} from 'jspdf';
import { applyPlugin } from 'jspdf-autotable'
import Ingredients from '../ingredientsList/ingredientsList';

function generatePdf(checkedValues) {
  let fileName = "Grocery List";
  applyPlugin(jsPDF);
  const doc = new jsPDF("l", "pt", "a3");
  doc.setFontSize(16);
  doc.text("Grocery List", doc.internal.pageSize.getWidth() / 2, 30, {
    align: "center",
  }); 

  const tableRows = checkedValues.map((row) =>
    Object.keys(row).map(() => {
        const value = row;
        return value;
    })
);

  doc.autoTable({
    startY: 30,
    head: [['Ingredients']], 
    body: tableRows,
    margin: { left: 20, right: 20 },
    styles: { fontSize: 10, cellPadding: 5 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    theme: "striped",
  });

  doc.save(`${fileName}.pdf`);

};

export default generatePdf; 