import React from "react";
export default function ExportFile({expenses}){
    function downloadCSV(csvContent) {
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'expenses.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }

      function convertToCSV(data) {
        let csv = 'amount,budget,category,date,description,location,month,paymentmethod,remaining,user,year\n';
    
        data.forEach(item => {
          const {amount,budget,category,date,description,location,month,paymentmethod,remaining,user,year} = item;
    
          const formattedDate = new Date(date).toISOString().split('T')[0];
          const line = `${amount},${budget},${category},"${formattedDate}","${description}","${location}",${month},"${paymentmethod}",${remaining},"${user}",${year}\n`;
          csv += line;
        });
    
        return csv;
    }
    const handleDownloadClick = () => {
        
        const csvContent = convertToCSV(expenses);
        downloadCSV(csvContent);
      }
    return(
        <div>
            <button onClick={handleDownloadClick}>Download CSV</button>
        </div>
    );
}