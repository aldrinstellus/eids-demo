// Patient records data for Veteran's Support Program demo
// This is de-identified sample data for demonstration purposes
// Source pattern: CMS de-identified datasets structure

export interface PatientRecord {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  ssn: string;
  serviceNumber: string;
  branch: "Army" | "Navy" | "Air Force" | "Marines" | "Coast Guard" | "Space Force";
  rank: string;
  status: "Active" | "Veteran" | "Retired";
  facility: string;
  primaryCondition: string;
  appointmentDate: string;
  provider: string;
  insuranceId: string;
  phoneNumber: string;
  email: string;
  address: string;
  // Additional fields for card view
  gender: "Male" | "Female";
  city: string;
  lastVisit: string;
}

// De-identified sample patient records (847 total in actual system)
// Showing representative sample for demo
export const patientRecords: PatientRecord[] = [
  {
    id: "VET-001",
    firstName: "James",
    lastName: "Mitchell",
    dateOfBirth: "1985-03-15",
    ssn: "123-45-6789",
    serviceNumber: "US-12345678",
    branch: "Army",
    rank: "Sergeant First Class (Ret.)",
    status: "Veteran",
    facility: "Walter Reed NMMC",
    primaryCondition: "PTSD - Combat Related",
    appointmentDate: "2025-12-15",
    provider: "Dr. Sarah Williams",
    insuranceId: "TRIC-847291",
    phoneNumber: "(301) 555-0147",
    email: "j.mitchell@veteranmail.gov",
    address: "1234 Oak Street, Bethesda, MD 20814",
    gender: "Male",
    city: "Bethesda",
    lastVisit: "2025-11-20",
  },
  {
    id: "VET-002",
    firstName: "Maria",
    lastName: "Rodriguez",
    dateOfBirth: "1990-07-22",
    ssn: "234-56-7890",
    serviceNumber: "US-23456789",
    branch: "Navy",
    rank: "Petty Officer 1st Class",
    status: "Active",
    facility: "Naval Medical Center San Diego",
    primaryCondition: "Traumatic Brain Injury",
    appointmentDate: "2025-12-16",
    provider: "Dr. Michael Chen",
    insuranceId: "TRIC-847292",
    phoneNumber: "(619) 555-0238",
    email: "m.rodriguez@navy.mil",
    address: "5678 Harbor View Rd, San Diego, CA 92134",
    gender: "Female",
    city: "San Diego",
    lastVisit: "2025-11-18",
  },
  {
    id: "VET-003",
    firstName: "Robert",
    lastName: "Thompson",
    dateOfBirth: "1978-11-30",
    ssn: "345-67-8901",
    serviceNumber: "US-34567890",
    branch: "Marines",
    rank: "Master Sergeant (Ret.)",
    status: "Retired",
    facility: "VA Medical Center - Phoenix",
    primaryCondition: "Orthopedic - Knee Replacement",
    appointmentDate: "2025-12-14",
    provider: "Dr. Amanda Foster",
    insuranceId: "TRIC-847293",
    phoneNumber: "(602) 555-0391",
    email: "r.thompson@veteranmail.gov",
    address: "9012 Desert Rose Ln, Phoenix, AZ 85016",
    gender: "Male",
    city: "Phoenix",
    lastVisit: "2025-11-15",
  },
  {
    id: "VET-004",
    firstName: "Angela",
    lastName: "Williams",
    dateOfBirth: "1992-04-08",
    ssn: "456-78-9012",
    serviceNumber: "US-45678901",
    branch: "Air Force",
    rank: "Technical Sergeant",
    status: "Active",
    facility: "Lackland AFB Medical",
    primaryCondition: "Hearing Loss - Occupational",
    appointmentDate: "2025-12-17",
    provider: "Dr. Kevin Park",
    insuranceId: "TRIC-847294",
    phoneNumber: "(210) 555-0472",
    email: "a.williams@usaf.mil",
    address: "3456 Aviation Blvd, San Antonio, TX 78236",
    gender: "Female",
    city: "San Antonio",
    lastVisit: "2025-11-22",
  },
  {
    id: "VET-005",
    firstName: "David",
    lastName: "Chen",
    dateOfBirth: "1981-09-12",
    ssn: "567-89-0123",
    serviceNumber: "US-56789012",
    branch: "Coast Guard",
    rank: "Chief Petty Officer",
    status: "Veteran",
    facility: "VA Medical Center - Seattle",
    primaryCondition: "Respiratory - Burn Pit Exposure",
    appointmentDate: "2025-12-18",
    provider: "Dr. Lisa Johnson",
    insuranceId: "TRIC-847295",
    phoneNumber: "(206) 555-0583",
    email: "d.chen@veteranmail.gov",
    address: "7890 Puget Sound Way, Seattle, WA 98101",
    gender: "Male",
    city: "Seattle",
    lastVisit: "2025-11-10",
  },
  {
    id: "VET-006",
    firstName: "Patricia",
    lastName: "Johnson",
    dateOfBirth: "1975-02-28",
    ssn: "678-90-1234",
    serviceNumber: "US-67890123",
    branch: "Army",
    rank: "Colonel (Ret.)",
    status: "Retired",
    facility: "Brooke Army Medical Center",
    primaryCondition: "Cardiac - Hypertension Management",
    appointmentDate: "2025-12-19",
    provider: "Dr. Robert Martinez",
    insuranceId: "TRIC-847296",
    phoneNumber: "(210) 555-0694",
    email: "p.johnson@veteranmail.gov",
    address: "2345 Fort Sam Houston, San Antonio, TX 78234",
    gender: "Female",
    city: "San Antonio",
    lastVisit: "2025-11-05",
  },
  {
    id: "VET-007",
    firstName: "Michael",
    lastName: "Davis",
    dateOfBirth: "1988-06-19",
    ssn: "789-01-2345",
    serviceNumber: "US-78901234",
    branch: "Marines",
    rank: "Staff Sergeant",
    status: "Active",
    facility: "Camp Pendleton Naval Hospital",
    primaryCondition: "Mental Health - Anxiety Disorder",
    appointmentDate: "2025-12-20",
    provider: "Dr. Emily Carter",
    insuranceId: "TRIC-847297",
    phoneNumber: "(760) 555-0705",
    email: "m.davis@usmc.mil",
    address: "4567 Pacific Coast Hwy, Oceanside, CA 92058",
    gender: "Male",
    city: "Oceanside",
    lastVisit: "2025-11-28",
  },
  {
    id: "VET-008",
    firstName: "Jennifer",
    lastName: "Martinez",
    dateOfBirth: "1995-12-05",
    ssn: "890-12-3456",
    serviceNumber: "US-89012345",
    branch: "Navy",
    rank: "Lieutenant",
    status: "Active",
    facility: "Portsmouth Naval Medical Center",
    primaryCondition: "Musculoskeletal - Back Pain",
    appointmentDate: "2025-12-21",
    provider: "Dr. James Wilson",
    insuranceId: "TRIC-847298",
    phoneNumber: "(757) 555-0816",
    email: "j.martinez@navy.mil",
    address: "6789 Hampton Roads Blvd, Norfolk, VA 23511",
    gender: "Female",
    city: "Norfolk",
    lastVisit: "2025-12-01",
  },
];

// Masking utilities for RBAC
export function maskSSN(ssn: string): string {
  return `***-**-${ssn.slice(-4)}`;
}

export function maskDOB(dob: string): string {
  const year = dob.split("-")[0];
  return `**/**/${year}`;
}

export function maskPhone(phone: string): string {
  return phone.replace(/\d(?=\d{4})/g, "*");
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  const maskedLocal = local.slice(0, 2) + "***";
  return `${maskedLocal}@${domain}`;
}

export function maskAddress(address: string): string {
  const parts = address.split(",");
  if (parts.length >= 2) {
    return `******, ${parts.slice(-2).join(",").trim()}`;
  }
  return "******";
}

export function maskServiceNumber(num: string): string {
  return `US-****${num.slice(-4)}`;
}

export function maskInsuranceId(id: string): string {
  return `****-${id.slice(-4)}`;
}

// Apply full masking to a patient record
export function maskPatientRecord(record: PatientRecord): PatientRecord {
  return {
    ...record,
    ssn: maskSSN(record.ssn),
    dateOfBirth: maskDOB(record.dateOfBirth),
    phoneNumber: maskPhone(record.phoneNumber),
    email: maskEmail(record.email),
    address: maskAddress(record.address),
    serviceNumber: maskServiceNumber(record.serviceNumber),
    insuranceId: maskInsuranceId(record.insuranceId),
  };
}
