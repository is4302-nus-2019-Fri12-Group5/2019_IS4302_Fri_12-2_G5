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
 * @param {org.healthcare.CreateDoctorBasicMedicalInformation} args - the CreateBasicMedicalInformation transaction arguments
 * @transaction
 */
async function CreateDoctorBasicMedicalInformation(args) {
    return getAssetRegistry('org.healthcare.BasicMedicalInformation').then(function(basicMedicalInformationRegistry) {
        return getParticipantRegistry('org.healthcare.Doctor').then(function(doctorRegistry) {
            var factory = getFactory();
            var newBasicMedicalRecord = factory.newResource('org.healthcare', 'BasicMedicalInformation', args.doctorBasicMedicalInformation.basicID); 

            // Relationship
            newBasicMedicalRecord.person = args.doctorBasicMedicalInformation.person;
            // Attribute
            newBasicMedicalRecord.bloodType = args.doctorBasicMedicalInformation.bloodType ;
            newBasicMedicalRecord.height = args.doctorBasicMedicalInformation.height;
            newBasicMedicalRecord.weight = args.doctorBasicMedicalInformation.weight;
            newBasicMedicalRecord.allergies = args.doctorBasicMedicalInformation.allergies;
            newBasicMedicalRecord.disabilities = args.doctorBasicMedicalInformation.disabilities;

            basicMedicalInformationRegistry.add(newBasicMedicalRecord);
            args.doctorBasicMedicalInformation.person.basicMedicalInformation = newBasicMedicalRecord;

            doctorRegistry.update(args.doctorBasicMedicalInformation.person);
        });
    });
}

/**
 * @param {org.healthcare.CreatePatientBasicMedicalInformation} args - the CreateBasicMedicalInformation transaction arguments
 * @transaction
 */
async function createPatientBasicMedicalInformation(args) {
    const basicMedicalInformationRegistry = await getAssetRegistry('org.healthcare.BasicMedicalInformation');
    const patientRegistry = await getParticipantRegistry('org.healthcare.Patient');

    var factory = getFactory();
    var newBasicMedicalInformation = factory.newResource('org.healthcare', 'BasicMedicalInformation', args.basicID); 

    // Relationship
    newBasicMedicalInformation.person = args.patient;
    // Attribute
    newBasicMedicalInformation.bloodType = args.bloodType;
    newBasicMedicalInformation.height = args.height;
    newBasicMedicalInformation.weight = args.weight;
    newBasicMedicalInformation.allergies = args.allergies;
    newBasicMedicalInformation.disabilities = args.disabilities;

    await basicMedicalInformationRegistry.add(newBasicMedicalInformation);
    
    args.patient.basicMedicalInformation = newBasicMedicalInformation;
    await patientRegistry.update(args.patient);
}

/**
 * @param {org.healthcare.UpdatePrescription} args - the UpdatePrescription transaction arguments
 * @transaction
 */
async function UpdatePrescription(args) {
    return getAssetRegistry('org.healthcare.Prescription').then(function(prescriptionRegistry) {
        args.prescription.quantity = args.quantity;
        args.prescription.unitType = args.unitType;
        args.prescription.dosage = args.dosage;
        args.prescription.duration = args.duration;
        args.prescription.lastModified = args.lastModified;

        return prescriptionRegistry.update(args.prescription);
    });
}

/**
 * @param {org.healthcare.UpdateMedicalRecord} args - the UpdateMedicalRecord transaction arguments
 * @transaction
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
    // A list of hospitals
    let hospitalList = args.patient.currentHospitals;
    let selectedHospital = args.hospital;

    for (i = 0; i < hospitalList.length; i++) {
        if (hospitalList[i].registrationID == selectedHospital.registrationID) {
            args.patient.currentHospitals.splice(i, 1);
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
        return getParticipantRegistry('org.healthcare.Doctor').then(function(doctorRegistry) {
            args.doctor.hospital = args.hospital;
            args.hospital.doctors.push(args.doctor);

            doctorRegistry.update(args.doctor);
            hospitalRegistry.update(args.hospital);
        });
    });
}

/**
 * @param {org.healthcare.RemoveDocFromHospital} args - the RemoveDocFromHospital transaction arguments
 * @transaction 
 */
async function RemoveDocFromHospital(args) {
    let doctorList = args.hospital.doctors;
    let selectedDoctor = args.doctor;

    args.doctor.hospital = args.dummyHospital;

    for (i = 0; i < doctorList.length; i++) {
        if (doctorList[i].NRIC == selectedDoctor.NRIC) {
            args.hospital.doctors.splice(i, 1);
            break;
        }
    }

    return getParticipantRegistry('org.healthcare.Hospital').then(function(hospitalRegistry) {
        return getParticipantRegistry('org.healthcare.Doctor').then(function(doctorRegistry) {
            doctorRegistry.update(args.doctor);
            hospitalRegistry.update(args.hospital);
        });
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
            newMedicalRecord.prescriptions = currentMedicalRecord.prescriptions;

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
            newPrescription.lastModified = passedInPrescription.lastModified;

            // Add the new prescription to list of asset
            prescriptionRegistry.add(newPrescription);

            // Add the new prescription into the medical record's prescription array
            passedInPrescription.medicalRecord.prescriptions.push(newPrescription);

            // Update the medical record after the prescription has been added into the medicalRecord's prescription array
            medicalRecordRegistry.update(passedInPrescription.medicalRecord);
        });
    });
}

/**
 * @param {org.healthcare.TopUpWalletBalance} args - the TopUpWalletBalance transaction arguments
 * @transaction
 */
async function topUpWalletBalance(args) {
    args.patient.walletBalance += args.topUpAmount;
    const patientRegistry = await getParticipantRegistry('org.healthcare.Patient');
    await patientRegistry.update(args.patient);
}
 
 
function RemovePatientHospital(args) {
  
  for (i in args.hospital) {
	  if (args.patient.currentHospitals.indexOf(i) > -1) {
		  args.patient.currentHospitals.splice(args.patient.currentHospitals.indexOf(i), 1)
	  }
  }

/**
 * @param {org.healthcare.PayFees} args - the PayFees transaction arguments
 * @transaction
 */
async function PayFees(args) {
    if (args.patient.walletBalance < args.doctor.fee) {
        throw new Error("Insufficient funds. Please top up!");
    } else {
        args.patient.walletBalance -= args.doctor.fee;
        const patientRegistry = await getParticipantRegistry('org.healthcare.Patient');
        await patientRegistry.update(args.patient);

        args.doctor.walletBalance += args.doctor.fee;
        const doctorRegistry = await getParticipantRegistry('org.healthcare.Doctor');
        await doctorRegistry.update(args.doctor);
    }
}
