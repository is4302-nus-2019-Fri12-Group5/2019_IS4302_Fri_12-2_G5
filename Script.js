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
* @param {org.healthcare.AddPatientHospital} args - the AddPatientHospital transaction arguments
* @transaction
*/

async function AddPatientHospital(args) {
	
	let patient = args.patient;
	let hospital = args.hospital;
  
  patient.currentHospitals.push(hospital);

  const patientRegistry =  await getParticipantRegistry('org.healthcare.Patient');
  await patientRegistry.update(patient);
}

/*function AddPatientHospital(args) {
  args.patient.currentHospitals.push(args.hospital)

  return getAssetRegistry('org.healthcare.Patient').then(function(patientRegistry) {
	  return patientRegistry.update(args.patient);
  });
} 
*/


/**
* @param {org.healthcare.UpdatePersonalInfo} args - the UpdatePersonalInfo transaction arguments
* @transaction
*/

function UpdatePersonalInfo(args) {
  args.person.firstName = args.firstName;
  args.person.lastName = args.lastName;
  args.person.dateOfBirth = args.dateOfBirth;
  args.person.address = args.address;
  args.person.phoneNum = args.phoneNum;
  args.person.nationality = args.nationality;
  args.person.race = args.race;
  args.person.gender = args.gender;

  return getParticipantRegistry('org.healthcare.Person').then(function(personRegistry) {
	  personRegistry.update(args.person);
  });
}



/**
* @param {org.healthcare.AddDocToHospital} args - the AddDocToHospital transaction arguments
* @transaction
*/

function AddDocToHospital(args) {
  args.hospital.doctors.push(args.doctor);

  return getParticipantRegistry('org.healthcare.Hospital').then(function(hospitalRegistry) {
	  return hospitalRegistry.update(args.hospital);
  });
}



/**
* @param {org.healthcare.RemoveDocFromHospital} args - the RemoveDocFromHospital transaction arguments
* @transaction
*/

function RemoveDocFromHospital(args) {
  for (i in args.doctor) {
	  if (args.hospital.doctors.indexOf(i) > -1) {
		  args.hospital.doctors.splice(args.hospital.doctors.indexOf(i), 1)
	  }
  }

  return getParticipantRegistry('org.healthcare.Hospital').then(function(hospitalRegistry) {
	  return hospitalRegistry.update(args.hospital);
  });

}




/**
* @param {org.healthcare.RemovePatientHospital} args - the RemovePatientHospital transaction arguments
* @transaction
*/

function RemovePatientHospital(args) {
  for (i in args.hospital) {
	  if (args.patient.currentHospitals.indexOf(i) > -1) {
		  args.patient.currentHospitals.splice(args.patient.currentHospitals.indexOf(i), 1)
	  }
  }

  return getParticipantRegistry('org.healthcare.Patient').then(function(patientRegistry) {
	  return patientRegistry.update(args.patient);
  });
}



/**
* @param {org.healthcare.UpdateMedicalRecord} args - the UpdateMedicalRecord transaction arguments * @transaction
*/
function UpdateMedicalRecord(args) {

  args.MedicalRecord.doctor = args.doctor
  args.MedicalRecord.date = args.date
  args.MedicalRecord.diagnosis = args.diagonsis
  args.MedicalRecord.wardInfo = args.wardInfo
  args.MedicalRecord.medication = args.medication

  return getAssetRegistry('org.healthcare.MedicalRecord').then(function(MedicalRecordRegistry){
	  return MedicalRecordRegistry.update(args.MedicalRecord);
  });
}

/**
* @param {org.healthcare.CreateMedicalRecord} args - the CreateMedicalRecord transaction arguments
* @transaction
*/
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

