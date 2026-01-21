export default function analyzeDataWithProgress(
  file: File,
  query: string,
  onProgress: (percent: number) => void
): Promise<any> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("query", query);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8000/api/analyze");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error("Upload failed"));
      }
    };

    xhr.onerror = () => reject(new Error("Network error"));

    xhr.send(formData);
  });
}
