/**
 * Sắp xếp mảng số theo thứ tự giảm dần
 * @param arr Mảng các số cần sắp xếp
 * @returns Mảng đã được sắp xếp giảm dần
 */
export function sortDescending(arr: number[]): number[] {
    // Sử dụng spread operator [...] để tạo bản sao, tránh làm thay đổi mảng gốc
    return [...arr].sort((a, b) => b - a);
}

// Ví dụ sử dụng:
// const numbers = [5, 1, 8, 3, 9, 2];
// console.log(sortDescending(numbers)); // Output: [9, 8, 5, 3, 2, 1]
