/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getAssetRegistry getFactory emit */


/**
* @param {org.healthcare.UpdateMedicalRecord} args - the UpdateMedicalRecord transaction arguments * @transaction
*/
function UpdateMedicalRecord(args) {

  args.medicalrecord.date = args.date
  args.medicalrecord.diagnosis = args.diagnosis
  args.medicalrecord.wardInfo.setPropertyValue(args.medicalrecord.wardInfo, args.wardInfo.level)
  //args.medicalrecord.wardInfo.setPropertyValue(args.medicalrecord.wardInfo.roomNum, args.wardInfo.roomNum)
  //args.medicalrecord.wardInfo.setPropertyValue(args.medicalrecord.wardInfo.bedNum, args.wardInfo.bedNum)

  return getAssetRegistry('org.healthcare.MedicalRecord').then(function(medicalRecordRegistry) {
	  return medicalRecordRegistry.update(args.MedicalRecord);
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

function RemovePatientHospital(args) {

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

/* function RemovePatientHospital(args) {
  
  for (i in args.hospital) {
	  if (args.patient.currentHospitals.indexOf(i) > -1) {
		  args.patient.currentHospitals.splice(args.patient.currentHospitals.indexOf(i), 1)
	  }
  }

  return getParticipantRegistry('org.healthcare.Patient').then(function(patientRegistry) {
	  return patientRegistry.update(args.patient);
  });
} */

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

function AddDocToHospital(args) {
  return getParticipantRegistry('org.healthcare.Hospital').then(function(hospitalRegistry) {
      args.hospital.doctors.push(args.doctor);
	  return hospitalRegistry.update(args.hospital);
  });
}



/**
* @param {org.healthcare.RemoveDocFromHospital} args - the RemoveDocFromHospital transaction arguments
* @transaction
*/

function RemoveDocFromHospital(args) {
  
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
    
   	let currentMedicalRecord = CreateMedicalRecord.medicalrecord;
 
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
	  CreateMedicalRecord.medicalrecord.recordID); 
	  newAsset.person = CreateMedicalRecord.medicalrecord.person
	  newAsset.date = CreateMedicalRecord.medicalrecord.date
	  newAsset.doctor = CreateMedicalRecord.medicalrecord.doctor
	  newAsset.diagnosis = CreateMedicalRecord.medicalrecord.diagnosis
	  newAsset.wardInfo = CreateMedicalRecord.medicalrecord.wardInfo
	  newAsset.medication = CreateMedicalRecord.medicalrecord.medication
	  return result.add(newAsset);
   });
}

*/


