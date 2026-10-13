export const exportToCSV = (data, filename = 'speech_emotion_history.csv') => {
  if (!data || !data.length) return;
  
  const headers = ['ID', 'File Name', 'Predicted Emotion', 'Confidence (%)', 'Duration (s)', 'Timestamp', 'Status'];
  const rows = data.map(item => [
    item.id,
    `"${item.filename}"`,
    item.emotion,
    (item.confidence * 100).toFixed(1),
    item.duration,
    `"${item.timestamp}"`,
    item.status || 'Completed'
  ]);
  
  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToJSON = (data, filename = 'speech_emotion_report.json') => {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  downloadAnchor.setAttribute('download', filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};
