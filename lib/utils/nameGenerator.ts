export function generateImageName(category: string, count: number): string {
  if (category === 'nail_menu') {
    return `Mẫu Nail #${count + 1}`;
  } else if (category === 'brow_lamination') {
    return `Chân Mày #${count + 1}`;
  } else if (category === 'lash_lift') {
    return `Uốn Mi #${count + 1}`;
  } else if (category === 'student_work') {
    return `Tác Phẩm #${count + 1}`;
  } else {
    return `Lớp Học #${count + 1}`;
  }
}
