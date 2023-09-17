import React, { useState } from 'react';
import { Document,pdfjs, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const FilePreview = ({ fileUrl }) => {
  const [pdfString, setPdfString] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [PDFBlob, setPDFBlob] = useState();

  const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/',
  };


  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

return (    
    <div className={classes.main}>
    <div className={classes.pdf_Container}>
          <Document file={pdfString} onLoadSuccess={onDocumentLoadSuccess} error={"لطفا منتظر بمانید"} loading={"wait for load"} onLoadError={console.error} options={options}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page wrap scale={0.65}  className={classes.page}  key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
    </div>
    </div>
  );
};

export default FilePreview;
