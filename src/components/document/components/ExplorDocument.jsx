import React, { useEffect, useState } from "react";
import FilePreview from "../../../utils/FilePreview";
import { Document, Page, pdfjs } from "react-pdf";
import PdfViewerComponent from "../../../utils/FilePreview";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const ExplorDocument = ({doc}) => {
const [file,setFile]=useState({})
const [numPages, setNumPages] = useState(null);
const [pageNumber, setPageNumber] = useState(1);


const url =`/textura.pdf`;
//const url =`https://www.africau.edu/images/default/sample.pdf`;
function onDocumentLoadSuccess({ numPages }) {
  setNumPages(numPages); // <== here is the issue #1 - we save page number of file, but in case it's changed, we know about new number only after it's loaded, before doc is loaded, this value is wrong
}

function changePage(offset) {
  setPageNumber(prevPageNumber => prevPageNumber + offset);
}

function previousPage() {
  changePage(-1);
}

function nextPage() {
  changePage(1);
}
  return (
    
    <div className="doc-container">
      <div className="row d-flex flex-wrap">
        <div className="col-5 info-doc">
          <div className="p-3">
            <div className="d-flex p-3">
              <div className="col-6">
              {console.log(doc)}
                <img src="/icons/down.svg" />
                Télécharger
              </div>
              <div className="col-6">
                <img src="/icons/delete.svg" />
                Supprimer
              </div>
            </div>
            <span></span>
          </div>

          <div className="p-2">
            <h3>Nom du document</h3>
            <p className="info-file">{doc.titre_doc}</p>
            <img src="/icons/update.svg" className="update-img" />
            <span></span>
          </div>

          <div className="p-2">
            <h3>Numéro du document</h3>
            <p className="info-file">{doc.id_doc}</p>
            <span></span>
          </div>

          <div className="p-2">
            <h3>Type du document</h3>
            <p className="info-file">{doc.typeDoc.docType}</p>
            <img src="/icons/update.svg" className="update-img" />
            <span></span>
          </div>

          <div className="p-2">
            <h3>Date d’ajout</h3>
            <p className="info-file">{doc.date_ajout_doc}</p>
            <span></span>
          </div>

          <div className="p-2">
            <h3>Ajouté par</h3>
            <p className="info-file">{doc.auteur}</p>
            <span></span>
          </div>
          <div className="partage">
            <h4>partager avec</h4>
            <div className="row d-flex flex-wrap mx-1">
              <div className="col-3 d-flex justify-content-between">
                <img src="/icons/checked.svg" className="align-self-start" />
                <img src="/images/ProfilePicture.png" className="profile" />
              </div>
              <div className="col-9">
                <div className="d-flex justify-content-between">
                  <h3 className="doc-name">Dr Louis Bellefeuille</h3>
                  <div className="pill">Medecin Generale</div>
                </div>
                <div className="d-flex">
                  <img src="/icons/localisation.svg" />
                  <p className="adresse">33 Rue Najib Mahfoud, Casablanca 20000, Morocco</p>
                </div>
              </div>
            </div>
            <span></span>
            <div className="row d-flex flex-wrap mx-1">
              <div className="col-3 d-flex justify-content-between">
                <img src="/icons/checked.svg" className="align-self-start" />
                <img src="/images/ProfilePicture.png" className="profile" />
              </div>
              <div className="col-9">
                <div className="d-flex justify-content-between">
                  <h3 className="doc-name">Dr Louis Bellefeuille</h3>
                  <div className="pill">Medecin Generale</div>
                </div>
                <div className="d-flex">
                  <img src="/icons/localisation.svg" />
                  <p className="adresse">33 Rue Najib Mahfoud, Casablanca 20000, Morocco</p>
                </div>
              </div>
            </div>
            <button className="send">envoyer</button>
            <span></span>
          </div>
          <div>
          
            <span></span>
          </div>
          <div>
            <span></span>
          </div>
        </div>
        <div className="col-7" >
        <div className="PDF-viewer">
				<PdfViewerComponent document={url} />
			  </div>
        
        {/* <Document 
        file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          error={"لطفا منتظر بمانید"}
          loading={"wait for load"}
          className={"PDFDoc"}
          //onSourceError={onLoadError}
          //onLoadError={onLoadError}
          renderMode={"canvas"}
          //onItemClick={goToPage}
          options={{ cMapUrl: "cmaps/", cMapPacked: true }}>
      <Page pageNumber={1} 
       width={400}
            height={900}
     // Set the width of the page
            />
    </Document>
    <div>
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div> */}
          {/* <div><FilePreview fileUrl={url}/></div> */}
        </div>
      </div>
    </div>
  );
};

export default ExplorDocument;
