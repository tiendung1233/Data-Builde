import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { TableData } from '@shopify/polaris';

export const getArrObjectFromData = (array: string[]) => {
    const newArray = array.map(item => {
        const capitalized = item.replace(/([A-Z])/g, ' $1').trim();
        // Chuyển đổi chữ cái đầu của chuỗi thành chữ in hoa
        const titleCase = capitalized.charAt(0).toUpperCase() + capitalized.slice(1).toLowerCase();
        return {
            value: item, label: titleCase
        };
    });
    return newArray
}

export const convertTimeToString = (dateString: string) => {
    const date = new Date(dateString);
    if (dateString == "") {
        return ""
    }
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    // Tạo chuỗi định dạng "dd/mm/yy"
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate

}

const checkCreatedAtInDateTime = (since: string, until: string, createdAt: string) => {
    const dateSince = new Date(since);
    const dateUntil = new Date(until);
    const dateCreatedAt = new Date(createdAt);
    if (since === until) {
        return dateCreatedAt === dateSince
    }
    else {
        return dateCreatedAt <= dateUntil && dateSince <= dateCreatedAt
    }
}

export const filterDefaultData = (data: any[], filters: any[]) => {
    return data?.filter((item) => {
        return filters?.every((filter) => {
            const { filter: condition, field, val } = filter;
            switch (condition) {
                case 'begins_with':
                    return item[field].startsWith(val);
                case 'not_blank':
                    return item[field] !== '';
                case 'blank':
                    return item[field] === '';
                case 'is_not':
                    return item[field] !== val;
                case 'is':
                    return item[field] == val;
                case 'contains':
                    return item[field]?.includes(val);
                case 'not_contains':
                    return !item[field]?.includes(val);
                case 'end_with':
                    return item[field].endsWith(val);
                case 'equal':
                    return item[field] === Number(val);
                case 'not_equal':
                    return item[field] !== Number(val);
                case 'greater_than':
                    return item[field] > Number(val);
                case 'lesser_than':
                    return item[field] < Number(val);
                case 'greater_than_or_equal':
                    return item[field] >= Number(val);
                case 'lesser_than_or_equal':
                    return item[field] <= Number(val);
                default:
                    return true;
            }
        });
    });
};

export const filterData = (dataTable: any[], filter: any[], headingFields: any[], { since, until }: { since: string, until: string }) => {
    const filteredData = dataTable?.filter(row => {
        let checkDateTime = true;

        const createdAtIndex = headingFields.findIndex(item => item.type === 'createdAt');
        if (createdAtIndex !== -1) {
            const createdAt = row[createdAtIndex];
            checkDateTime = checkCreatedAtInDateTime(since, until, createdAt)
        } else {
            // Nếu không phải trường 'createdAt', trả về true
            checkDateTime = true;
        }
        // Kiểm tra xem mỗi hàng có thoả mãn tất cả các điều kiện trong mảng filter không
        if (filter?.length === 0) return true && checkDateTime
        return filter.every(({ filter, field, val }) => {
            // Lấy chỉ số của trường tương ứng trong mảng headingFields
            const fieldIndex = headingFields.findIndex(item => item.type === field);

            // Nếu không tìm thấy trường, trả về false (không thoả mãn điều kiện)
            if (fieldIndex === -1) return false;

            // Lấy giá trị của trường tương ứng trong hàng
            const value = row[fieldIndex];
            // Kiểm tra các loại điều kiện
            switch (filter) {
                case 'begins_with':
                    return value.startsWith(val) && checkDateTime;
                case 'not_blank':
                    return value !== '' && checkDateTime;
                case 'blank':
                    return value === '' && checkDateTime;
                case 'is_not':
                    return value !== val && checkDateTime;
                case 'is':
                    return value == val && checkDateTime;
                case 'contains':
                    return value?.includes(val) && checkDateTime;
                case 'not_contains':
                    return !value?.includes(val) && checkDateTime;
                case 'end_with':
                    return value.endsWith(val) && checkDateTime;
                case 'equal':
                    return value === Number(val) && checkDateTime;
                case 'not_equal':
                    return value !== Number(val) && checkDateTime;
                case 'greater_than':
                    return value > Number(val) && checkDateTime;
                case 'lesser_than':
                    return value < Number(val) && checkDateTime;
                case 'greater_than_or_equal':
                    return value >= Number(val) && checkDateTime;
                case 'lesser_than_or_equal':
                    return value <= Number(val) && checkDateTime;
                default:
                    return true && checkDateTime;
            }
        });
    });

    return filteredData || []
}

export const exportToExcel = (
    data: any[],
    filename: string,
    sheetName: string,
    columnHeaders: string[]
) => {
    const worksheetData = [columnHeaders, ...data.map(row => columnHeaders.map((header, i) => row[i]))];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(excelData, filename);
};

export const exportToCSV = (
    data: any[],
    filename: string,
    columnHeaders: string[]
) => {
    // Convert column headers and data to CSV format
    const csvContent = [
        columnHeaders.join(','),
        ...data.map(row => columnHeaders.map((header,i) => `"${row[i]}"`).join(','))
    ].join('\n');

    // Create a Blob containing the CSV data
    const csvData = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

    // Save the Blob as a file using FileSaver.js
    saveAs(csvData, filename);
};



