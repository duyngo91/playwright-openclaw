/**
 * Chuyển đổi định dạng ngày tháng.
 * @param {string} dateString - Chuỗi ngày gốc (VD: "2026-04-04")
 * @param {string} inputFormat - Định dạng ngày gốc (VD: "YYYY-MM-DD")
 * @param {string} outputFormat - Định dạng ngày mong muốn (VD: "DD/MM/YYYY")
 */
function formatDate(dateString, inputFormat, outputFormat) {
    if (!dateString || !inputFormat || !outputFormat) return "";

    // Tách các ký tự phân cách
    const separators = inputFormat.match(/[^A-Za-z]/g) || [];
    const delimiter = separators.length > 0 ? separators[0] : '';
    
    // Tách chuỗi ngày gốc thành mảng
    const parts = dateString.split(delimiter);
    const tokens = inputFormat.split(delimiter);
    
    let year, month, day;

    // Map tokens sang giá trị
    tokens.forEach((token, index) => {
        const val = parseInt(parts[index]);
        if (token.includes('Y')) year = val;
        else if (token.includes('M')) month = val;
        else if (token.includes('D')) day = val;
    });

    // Xử lý năm 2 chữ số
    if (year < 100) year += 2000;

    // Validate ngày tháng
    if (month < 1 || month > 12 || day < 1 || day > 31) {
        return "Invalid Date";
    }

    // Tạo đối tượng Date để validate tiếp
    const dateObj = new Date(year, month - 1, day);
    if (isNaN(dateObj.getTime())) {
        return "Invalid Date";
    }
    // Check xem ngày có bị cuộn (overflow) không (VD: 32/01 -> 01/02)
    if (dateObj.getDate() !== day) {
        return "Invalid Date";
    }

    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');

    // Trả về theo định dạng đích
    return outputFormat
        .replace('YYYY', y)
        .replace('YY', String(y).substr(-2))
        .replace('MM', m)
        .replace('DD', d);
}

module.exports = { formatDate };
