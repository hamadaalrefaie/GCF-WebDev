export interface Financing {
    Currency: string;
    GCF: number;
    CoFinancing: number;
    Total: number;
}

export interface Country {
    CountryID: number;
    CountryName: string;
    ISO3: string;
    Region: string;
    LDCs: boolean;
    SIDS: boolean;
    Financing: Financing[];
}

export interface FiduciaryStandard {
    FiduciaryStandard: string;
    Size: string;
}

export interface Entity {
    EntityID: number;
    Name: string;
    Acronym: string;
    Access: string;
    Type: string;
    AccreditationDate: string;
    Sector: string;
    ESS: string;
    FiduciaryStandards: FiduciaryStandard[];
}

export interface CurrentExchangeRate {
    ExchangeRate: number;
    CurrencyCode: string;
    Source: string;
    EffectiveDate: string;
}

export interface Disbursement {
    ProjectDisbursementID: number;
    AmountDisbursed: number;
    AmountDisbursedUSDeq: number;
    Currency: string;
    DateEffective: string;
    Entity: string;
    CurrentExchangeRate: CurrentExchangeRate;
}

export interface CurrentExchangeRate2 {
    ExchangeRate: number;
    CurrencyCode: string;
    Source: string;
    EffectiveDate: string;
}

export interface Funding {
    ProjectBudgetID: number;
    BM: string;
    SourceID: number;
    Source: string;
    Instrument: string;
    Budget: number;
    BudgetUSDeq: number;
    Currency: string;
    CurrentExchangeRate: CurrentExchangeRate2;
}

export interface ResultArea {
    Area: string;
    Type: string;
    Value: string;
}

export interface ProjektModel {
    ProjectsID: number;
    ApprovedRef: string;
    BoardMeeting: string;
    ProjectName: string;
    StartDate: Date;
    EndDate: Date;
    ApprovalDate: Date;
    DurationMonths: number;
    Theme: string;
    Sector: string;
    LifeTimeCO2: number;
    Size: string;
    RiskCategory: string;
    DirectBeneficiaries: number;
    IndirectBeneficiaries: number;
    TotalGCFFunding: number;
    TotalCoFinancing: number;
    TotalValue: number;
    ProjectURL: string;
    Countries: Country[];
    Entities: Entity[];
    Disbursements: Disbursement[];
    Funding: Funding[];
    ResultAreas: ResultArea[];
}


