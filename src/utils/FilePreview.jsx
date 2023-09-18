import { useEffect, useRef } from 'react';

export default function PdfViewerComponent(props) {
	const containerRef = useRef(null);

  async function loadProtectedPDF(documentUrl,container) {
    // Base64-encode your credentials and set them as an `Authorization` header.
    const headers = new Headers();
    //const encodedCredentials = btoa(`${username}:${password}`);
    //headers.set("Authorization", `Basic ${encodedCredentials}`);
    headers.set("Authorization");
    // Fetch the PDF and read the response as an `ArrayBuffer`.
    const pdfResponse = await fetch(documentUrl, { headers });
    const documentBuffer = await pdfResponse.arrayBuffer();
  
    // Pass the `ArrayBuffer` as a PDF option instead of a URL.
    return PSPDFKit.load({
      container,
      document: documentBuffer,
      toolbarItems: PSPDFKit.defaultToolbarItems.filter(item => item.type !== "print"),
      initialViewState: new PSPDFKit.ViewState({
        sidebarMode: PSPDFKit.SidebarMode.THUMBNAILS
      })
    })
  }

	useEffect(() => {
		const container = containerRef.current;
		let instance, PSPDFKit;
		(async function () {
			PSPDFKit = await import('pspdfkit');

			PSPDFKit.unload(container); // Ensure that there's only one PSPDFKit instance.

			instance = await PSPDFKit.load({
				// Container where PSPDFKit should be mounted.
				container,
				// The document to open.
				document: props.document,
				// Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
				baseUrl: `${window.location.protocol}//${window.location.host}/${import.meta.env.BASE_URL}`,
			});
		})();

		return () => PSPDFKit && PSPDFKit.unload(container);
	}, []);

	return (
		<div
			ref={containerRef}
			style={{ width: '100%', height: '100vh' }}
		/>
	);
}