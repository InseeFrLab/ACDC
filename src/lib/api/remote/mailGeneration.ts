export default function generateMailFromXml(xmlString: string) {
  return fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/external/mail/generate/fo`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml',
      },
      body: xmlString,
    }
  ).then((response) => {
    console.log('Response', response);
    return response.blob();
  });
}
