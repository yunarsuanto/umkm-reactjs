export const generateBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64.'));
      }
    };

    reader.onerror = (error) => reject(error);
  });
};

export function removeBase64Prefix(base64String: string): string {
  return base64String.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');
}