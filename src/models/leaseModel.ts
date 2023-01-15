export interface LeaseForm {
  machineData: MachineData;
  supplier: Supplier;
  rental: Rental;
  LeaseDetails: LeaseDetails;
  VATfinancing: VATFinancing;
  milage: Milage
}

export interface MachineData {
  merk: string;
  model: string;
  jaar: number;
  waarde: number;
  conditie: MachineConditionStatus;
  leasevorm: MachineLeaseForm;
}

export enum MachineConditionStatus {
  Gebruikt,
  Nieuw,
}

export enum MachineLeaseForm {
  Financial,
  Operational,
  SaleLeaseBack,
}

export interface Milage {
    presentMilage: boolean;
    milage: number;
}

export interface Supplier {
    supplierName: string;
}

export interface Rental {
    ableToRent: boolean;
}

export interface LeaseDetails {
    deposit: number;
    finalTerm: number;
    duration: number;
}

export interface VATFinancing {
    SpreadPayments: boolean;
}

