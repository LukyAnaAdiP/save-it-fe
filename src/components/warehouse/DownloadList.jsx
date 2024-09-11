import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { IconDownload } from '@tabler/icons-react';

const DownloadList = ({ data }) => {
  const [showMenu, setShowMenu] = useState(false);

  const getOrderStatus = (status) => {
    const statusMap = {
      'CONFIRMED': 'Confirmed',
      'SHIPPED': 'Shipped',
      'OUT_FOR_DELIVERY': 'Out for Delivery',
      'DELIVERED': 'Delivered',
      'PLACED': 'Placed'
    };
    return statusMap[status] || status;
  };

  const handleDownload = (format) => {
    if (format === 'pdf') {
      downloadPDF(data);
    } else if (format === 'excel') {
      downloadExcel(data);
    }
    setShowMenu(false);
  };

  const downloadPDF = (data) => {
    const doc = new jsPDF();

    const title = "DATA REPORT";
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);

    const x = (pageWidth - textWidth) / 2;
    const y = 16; 

    doc.text(title, x, y);

    const tableStartY = 30;

    const columns = [
      { title: 'Product Name', dataKey: 'product_name' },
      { title: 'Order Date', dataKey: 'order_date' },
      { title: 'Order Total', dataKey: 'order_total' },
      { title: 'Order Status', dataKey: 'current_order_status' }
    ];

    const formattedData = data.map(order => ({
      product_name: order.product_name,
      order_date: order.order_date,
      order_total: order.order_total,
      current_order_status: getOrderStatus(order.current_order_status)
    }));

    const tableColumn = [columns.map(col => col.title)];
    const tableRows = formattedData.map(item => columns.map(col => item[col.dataKey]));

    doc.autoTable({
      startY: tableStartY,
      head: tableColumn,
      body: tableRows,
      theme: 'grid',
     
    });

    doc.save('data.pdf');
  };

  const downloadExcel = (data) => {
    // Exclude `id` and `product_id` from the data
    const formattedData = data.map(({ id, product_id, ...rest }) => ({
      ...rest,
      'Order Status': getOrderStatus(rest.current_order_status)
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    XLSX.writeFile(workbook, 'data.xlsx');
  };


  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Download
        <IconDownload className="ml-2 mb-1" />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
          <button
            onClick={() => handleDownload('pdf')}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Download PDF
          </button>
          <button
            onClick={() => handleDownload('excel')}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Download Excel
          </button>
        </div>
      )}
    </div>
  );
};

export default DownloadList;
