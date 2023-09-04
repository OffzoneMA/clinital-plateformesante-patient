import CONSTANTS from "../../constant/constant";

export const data = [
  {
    doc: "Lorem Isum Lorem Ipsum	",
    num: "493973",
    type: "Lorem Ipsum	",
    date: "14/04/2021	",
    added: "Lorem Ipsum",
  },
  {
    doc: "Lorem Ipsum Lo",
    num: "493973",
    type: "Lorem Ipsum	",
    date: "14/04/2021	",
    added: "Lorem Ipsum",
  },
  {
    doc: "Lorem Ipsorem Ipsum	",
    num: "493973",
    type: "Lorem Ipsum	",
    date: "14/04/2021	",
    added: "Lorem Ipsum",
  },
  {
    doc: "Lorem Lorem Ipsum	",
    num: "493973",
    type: "Lorem Ipsum	",
    date: "14/04/2021	",
    added: "Lorem Ipsum",
  },
  {
    doc: "Lorem Ipsum",
    num: "493973",
    type: "Lorem Ipsum	",
    date: "14/04/2021	",
    added: "Lorem Ipsum",
  },
];
export const rdv = [
  {
    name: "Lorem Ipsum",
    date: "14/07",
    time: "09:00",
  },
  {
    name: "Prem sum",
    date: "15/07",
    time: "16:00",
  },
  {
    name: "Lor psum",
    date: "19/06",
    time: "16:00",
  },
  {
    name: "Lor psum",
    date: "20/07",
    time: "20:00",
  },
  {
    name: "Lor psum",
    date: "19/07",
    time: "13:00",
  },
];

export const rdvAnnuleFromDoc = {
  id: 95,
  day: "FRIDAY",
  start: "2023-01-15T13:40:00",
  end: "2023-01-15T14:00:00",
  canceledAt: "2023-01-01T20:07:19.471",
  statut: CONSTANTS.RDV_STATE.ANNULE_DOC,
  motif: null,
  medecin: {
    id: 1,
    matricule_med: "51531515",
    inpe: "141060053",
    nom_med: "BIJJOU",
    prenom_med: "ABBAS",
    photo_med:
      "https://documentspatient.blob.core.windows.net/documentspatient/51531515-1-BIJJOU.png",
    photo_couverture_med: null,
    expertises_med: [],
    diplome_med: [],
    description_med: null,
    contact_urgence_med: 535604770,
    civilite_med: "Mr",
    experience_med: [],
    ville: {
      id_ville: 58,
      nom_ville: "Fès",
      pays: {
        id_pays: 1,
        nom_pays: "Maroc",
      },
    },
    specialite: {
      id_spec: 1,
      libelle: "Généraliste",
    },
    user: {
      id: 2,
      email: "medecin@gmail.com",
      telephone: "string",
      emailVerified: true,
      role: "ROLE_MEDECIN",
      provider: "LOCAL",
      creationDateTime: "2022-08-09T15:49:49.142+00:00",
      lastLogin: "2022-12-04T16:56:04.156+00:00",
      enabled: true,
    },
    isActive: null,
    followers: [],
    following: [],
    stepsValidation: 1,
  },
  patient: {
    id: 1,
    nom_pat: "Nom",
    prenom_pat: "pernom1",
    dateNaissance: null,
    adresse_pat: null,
    codePost_pat: null,
    matricule_pat: null,
    civilite_pat: null,
    patientEmail: null,
    patientTelephone: null,
    placeOfBirth: null,
    mutuelNumber: null,
    patient_type: "MOI",
    ville: {
      id_ville: 58,
      nom_ville: "Fès",
      pays: {
        id_pays: 1,
        nom_pays: "Maroc",
      },
    },
  },
  documents: [],
  modeConsultation: {
    id: 1,
    mode: "CABINET",
  },
};
