/**
* @param {org.healthcare.CreateDoctorBasicMedicalInformation} args - the CreateBasicMedicalInformation transaction arguments * @transaction
*/
async function CreateDoctorBasicMedicalInformation(args) {
	
  return getAssetRegistry('org.healthcare.BasicMedicalInformation').then(function(basicMedicalInformationRegistry) {
    
    return getParticipantRegistry('org.healthcare.Doctor').then(function(doctorRegistry) {
      
      var factory = getFactory();
      var newBasicMedicalRecord = factory.newResource('org.healthcare', 'BasicMedicalRecord', args.basicID); 

      // Relationship
      newBasicMedicalRecord.doctor = args.doctor;
      // Attribute
      newBasicMedicalRecord.bloodType = args.bloodType ;
      newBasicMedicalRecord.height = args.height ;
      newBasicMedicalRecord.weight = args.weight;
      newBasicMedicalRecord.allergies = args.allergies;
      newBasicMedicalRecord.disabilities = args.disabilities;

      basicMedicalInformationRegistry.add(newBasicMedicalRecord);
      
      args.person.basicMedicalInformation = newBasicMedicalRecord;
      personRegistry.update(args.doctor);
    });
    
  });
}

/**
* @param {org.healthcare.CreatePatientBasicMedicalInformation} args - the CreateBasicMedicalInformation transaction arguments * @transaction
*/
async function CreatePatientBasicMedicalInformation(args) {
	
  return getAssetRegistry('org.healthcare.BasicMedicalInformation').then(function(basicMedicalInformationRegistry) {
    
    return getParticipantRegistry('org.healthcare.Patient').then(function(patientRegistry) {
      
      var factory = getFactory();
      var newBasicMedicalRecord = factory.newResource('org.healthcare', 'BasicMedicalRecord', args.basicID); 

      // Relationship
      newBasicMedicalRecord.patient = args.patient;
      // Attribute
      newBasicMedicalRecord.bloodType = args.bloodType ;
      newBasicMedicalRecord.height = args.height ;
      newBasicMedicalRecord.weight = args.weight;
      newBasicMedicalRecord.allergies = args.allergies;
      newBasicMedicalRecord.disabilities = args.disabilities;

      basicMedicalInformationRegistry.add(newBasicMedicalRecord);
      
      args.person.basicMedicalInformation = newBasicMedicalRecord;
      personRegistry.update(args.patient);
    });
    
  });
}


/**
* @param {org.healthcare.UpdatePrescription} args - the UpdatePrescription transaction arguments * @transaction
*/
async function UpdatePrescription(args) {
  
  return getAssetRegistry('org.healthcare.Prescription').then(function(prescriptionRegistry) {
    
      args.medicalRecord.quantity = args.quantity;
      args.medicalRecord.unitType = args.unitType;
      args.medicalRecord.dosage = args.dosage;
      args.medicalRecord.duration = args.duration;
      args.medicalRecord.lastModified = args.lastModified;
	  
      return prescriptionRegistry.update(args.prescription);
  });
}

/**
* @param {org.healthcare.UpdateMedicalRecord} args - the UpdateMedicalRecord transaction arguments * @transaction
*/
async function UpdateMedicalRecord(args) {
  
  return getAssetRegistry('org.healthcare.MedicalRecord').then(function(medicalRecordRegistry) {
    
      args.medicalRecord.date = args.date;
      args.medicalRecord.diagnosis = args.diagnosis;
      args.medicalRecord.wardInfo.level = args.wardInfo.level;
      args.medicalRecord.wardInfo.roomNum = args.wardInfo.roomNum;
      args.medicalRecord.wardInfo.bedNum = args.wardInfo.bedNum;
	  
      return medicalRecordRegistry.update(args.medicalRecord);
  });
}

/**
* @param {org.healthcare.AddPatientHospital} args - the AddPatientHospital transaction arguments
* @transaction
*/

async function AddPatientHospital(args) {
  	return getParticipantRegistry('org.healthcare.Patient').then(function(patientRegistry) {
      args.patient.currentHospitals.push(args.hospital);
      patientRegistry.update(args.patient);
    });
}

/**
* @param {org.healthcare.RemovePatientHospital} args - the RemovePatientHospital transaction arguments
* @transaction
*/

async function RemovePatientHospital(args) {

  // A list of hospital
  let hospitalList = args.patient.currentHospitals;
  let selectedHospital = args.hospital;
  
  for(i = 0; i < hospitalList.length; i++) {
    
    if ( hospitalList[i].registrationID == selectedHospital.registrationID ) {
    	args.patient.currentHospitals.splice(args.patient.currentHospitals[i], 1);
      	break;
    }
  }
  
  return getParticipantRegistry('org.healthcare.Patient').then(function(patientRegistry) {
    patientRegistry.update(args.patient);
  });
}


/**
* @param {org.healthcare.UpdatePatientPersonalInfo} args - the UpdatePersonalInfo transaction arguments
* @transaction
*/

async function UpdatePatientPersonalInfo(args) {
  args.patient.firstName = args.firstName;
  args.patient.lastName = args.lastName;
  args.patient.dateOfBirth = args.dateOfBirth;
  args.patient.address = args.address;
  args.patient.phoneNum = args.phoneNum;
  args.patient.nationality = args.nationality;
  args.patient.race = args.race;
  args.patient.gender = args.gender;

  return getParticipantRegistry('org.healthcare.Patient').then(function(patientRegistry) {
	  patientRegistry.update(args.patient);
  });
}

/**
* @param {org.healthcare.UpdateDoctorPersonalInfo} args - the UpdatePersonalInfo transaction arguments
* @transaction
*/

async function UpdateDoctorPersonalInfo(args) {
  args.doctor.firstName = args.firstName;
  args.doctor.lastName = args.lastName;
  args.doctor.dateOfBirth = args.dateOfBirth;
  args.doctor.address = args.address;
  args.doctor.phoneNum = args.phoneNum;
  args.doctor.nationality = args.nationality;
  args.doctor.race = args.race;
  args.doctor.gender = args.gender;

  return getParticipantRegistry('org.healthcare.Doctor').then(function(doctorRegistry) {
	  doctorRegistry.update(args.doctor);
  });
}

/**
* @param {org.healthcare.AddDocToHospital} args - the AddDocToHospital transaction arguments
* @transaction
*/

async function AddDocToHospital(args) {
  return getParticipantRegistry('org.healthcare.Hospital').then(function(hospitalRegistry) {
      args.hospital.doctors.push(args.doctor);
	  return hospitalRegistry.update(args.hospital);
  });
}

/**
* @param {org.healthcare.RemoveDocFromHospital} args - the RemoveDocFromHospital transaction arguments
* @transaction 
*/

async function RemoveDocFromHospital(args) {
  
  let doctorList = args.hospital.doctors;
  let selectedDoctor = args.doctor;
  
  for(i = 0; i < doctorList.length; i++) {
    
    if ( doctorList[i].registrationID == selectedDoctor.registrationID ) {
    	args.hospital.doctors.splice(args.hospital.doctors[i], 1);
      	break;
    }
  }

  return getParticipantRegistry('org.healthcare.Hospital').then(function(hospitalRegistry) {
	  return hospitalRegistry.update(args.hospital);
  });

}

/**
* @param {org.healthcare.CreateMedicalRecord} CreateMedicalRecord - the CreateMedicalRecord transaction arguments
* @transaction
*/
async function CreateMedicalRecord(CreateMedicalRecord) {
  	
  return getAssetRegistry('org.healthcare.MedicalRecord').then(function(medicalRecordRegistry) {
    
    return getParticipantRegistry('org.healthcare.Patient').then(function(participantRegistry) {
    
   	let currentMedicalRecord = CreateMedicalRecord.medicalRecord;
 
 	var factory = getFactory();
 	var newMedicalRecord = factory.newResource('org.healthcare', 'MedicalRecord', currentMedicalRecord.recordID); 
	// Attribute      
    newMedicalRecord.date = currentMedicalRecord.date;
    newMedicalRecord.diagnosis = currentMedicalRecord.diagnosis;
    newMedicalRecord.wardInfo = currentMedicalRecord.wardInfo;
    newMedicalRecord.lastModified = currentMedicalRecord.lastModified;
    // Relationship
  	newMedicalRecord.patient = currentMedicalRecord.patient; 
  	newMedicalRecord.doctor = currentMedicalRecord.doctor;
  	newMedicalRecord.hospital = currentMedicalRecord.hospital;
  	
    medicalRecordRegistry.add(newMedicalRecord);
  	currentMedicalRecord.patient.medicalRecords.push(newMedicalRecord);
  	participantRegistry.update(currentMedicalRecord.patient);
      
    });
  }); 	
}

/**
* @param {org.healthcare.CreatePrescription} args - the CreateMedicalRecord transaction arguments
* @transaction
*/
async function CreatePrescription(args) {
  	
  return getAssetRegistry('org.healthcare.Prescription').then(function(prescriptionRegistry) {
    
    return getAssetRegistry('org.healthcare.MedicalRecord').then(function(medicalRecordRegistry) {
    
   	let passedInPrescription = args.prescription;
 
 	var factory = getFactory();
 	var newPrescription = factory.newResource('org.healthcare', 'Prescription', passedInPrescription.presID); 
	// Attribute      
    newPrescription.drugName = passedInPrescription.drugName;
    newPrescription.quantity = passedInPrescription.quantity;
    newPrescription.unitType = passedInPrescription.unitType;
    newPrescription.dosage = passedInPrescription.dosage;
    newPrescription.duration = passedInPrescription.duration;
    // Relationship
  	newPrescription.medicalRecord = passedInPrescription.medicalRecord;
    
    // Add the new prescription to list of asset
    prescriptionRegistry.add(newPrescription);
    
    // Add the new prescription into the medical record's prescription array
    passedInPrescription.medicalRecord.prescriptions.push(newPrescription);
      
    // Update the medical record after the prescription has been added into the medicalRecord's prescription array
    medicalRecordRegistry.update(passedInPrescription.medicalRecord);
    });
  }); 	
}

/*
async function CreateMedicalRecord(CreateMedicalRecord) {
  return getAssetRegistry('org.healthcare.MedicalRecord')
  .then(function(result) {
	  var factory = getFactory();
	  var newAsset = factory.newResource(
	  'org.healthcare', 
	  'MedicalRecord', 
	  CreateMedicalRecord.medicalRecord.recordID); 
	  newAsset.person = CreateMedicalRecord.medicalRecord.person
	  newAsset.date = CreateMedicalRecord.medicalRecord.date
	  newAsset.doctor = CreateMedicalRecord.medicalRecord.doctor
	  newAsset.diagnosis = CreateMedicalRecord.medicalRecord.diagnosis
	  newAsset.wardInfo = CreateMedicalRecord.medicalRecord.wardInfo
	  newAsset.medication = CreateMedicalRecord.medicalRecord.medication
	  return result.add(newAsset);
   });
}
 
 
function RemovePatientHospital(args) {
  
  for (i in args.hospital) {
	  if (args.patient.currentHospitals.indexOf(i) > -1) {
		  args.patient.currentHospitals.splice(args.patient.currentHospitals.indexOf(i), 1)
	  }
  }

  return getParticipantRegistry('org.healthcare.Patient').then(function(patientRegistry) {
	  return patientRegistry.update(args.patient);
  });
} */

