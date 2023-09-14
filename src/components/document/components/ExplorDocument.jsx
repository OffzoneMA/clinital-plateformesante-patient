import React from 'react'
const ExplorDocument = (props) => {
  return (
    <div className="doc-container">
    <div className='row d-flex flex-wrap'>
        <div className="col-5 info-doc">
        <div className='p-3'>
        <div className='d-flex p-3'>
          <div className='col-6'><img src="/icons/down.svg"/>Télécharger</div>
          <div className='col-6'><img src="/icons/delete.svg"/>Supprimer</div>
          </div>
        <span></span>
        </div>
          
          
          <div className='p-2'>
          <h3>Nom du document</h3>
          <p className='info-file'>filename</p>
          <img src="/icons/update.svg" className='update-img'/>
          <span></span></div>
          
          <div  className='p-2'>
          <h3>Nom du document</h3>
          <p className='info-file'>filename</p>
          <span></span></div>
          
          <div  className='p-2'>
          <h3>Nom du document</h3>
          <p className='info-file'>filename</p>
          <img src="/icons/update.svg" className='update-img'/>
          <span></span></div>

          <div  className='p-2'>
          <h3>Nom du document</h3>
          <p className='info-file'>filename</p>
          <span></span></div>
          
          <div  className='p-2'>
          <h3>Nom du document</h3>
          <p className='info-file'>filename</p>
          <span></span></div>
          <div className='partage'>
          <h4>partager avec</h4>
          <div className='row d-flex'>
          <div className="col-3 d-flex">
          <img src="/icons/update.svg"/>
          <img src="/images/ProfilePicture.png" className='profile'/>
          </div>
          <div className="col-9">
          <div className='d-flex'><h3 className='doc-name'>doctor name</h3><span className='pill'>Medecin Generale</span></div>
          <div className='d-flex'><img src="/icons/localisation.svg"/>adresse of this doctor</div>
          </div>
          </div>
          <span></span></div>
          <div><span></span></div>
          <div><span></span></div>
        </div>
        <div className="col-7">
        <div>
            test
        </div>

        </div>
    </div>

    </div>
  )
}

export default ExplorDocument
