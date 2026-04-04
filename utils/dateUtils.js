/**
 * Chuyển đổi ngày tháng giữa các định dạng khác nhau.
 * @param {string} dateStr - Chuỗi ngày đầu vào.
 * @param {string} inputFormat - Định dạng của ngày đầu vào (VD: "YYYY-MM-DD", "DD/MM/YYYY").
 * @param {string} outputFormat - Định dạng mong muốn đầu ra.
 * @returns {string} Chuỗi ngày đã được định dạng lại.
 */
function formatDate(dateStr, inputFormat, outputFormat) {
    if (!dateStr || !inputFormat || !outputFormat) return "";

    // Tách các thành phần ngày/tháng/năm từ chuỗi gốc
    const tokens = inputFormat.split(/[-\/. ]/);
    const values = dateStr.split(/[-\/. ]/);
    
    if (tokens.length !== values.length) return "Invalid Format";

    let year = 0, month = 0, day = 0;

    tokens.forEach((token, index) => {
        const val = parseInt(values[index], 10);
        if (token.toUpperCase().includes('Y')) year = val;
        else if (token.toUpperCase().includes('M')) month = val;
        else if (token.toUpperCase().includes('D')) day = val;
    });

    if (year < 100) year += 2000; // Xử lý năm dạng 2 chữ số

    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) return "Invalid Date";

    // Map các thành phần cho output
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return outputFormat
        .replace('YYYY', yyyy)
        .replace('MM', mm)
        .replace('DD', dd)
        .replace('YY', String(yyyy).slice(-2));
}

module.exports = { formatDate };
