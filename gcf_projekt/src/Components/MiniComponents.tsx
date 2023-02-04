import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Country, Disbursement, Entity, Funding } from "../Helper/Models";


export function GetContries(porps: { Country: Country[] }) {
    const [showFinance, toggleFinance] = useState(false);
    return <Table key={"Countries#"} size="lg" style={{ maxWidth: "80%", margin: "auto" }}>
        <thead>
            <tr>
                <th style={{ fontWeight: 400 }}>CountryID</th>
                <th style={{ fontWeight: 400 }}>CountryName</th>
                <th style={{ fontWeight: 400 }}>ISO3</th>
                <th style={{ fontWeight: 400 }}>LDCs</th>
                <th style={{ fontWeight: 400 }}>Region</th>
                <th style={{ fontWeight: 400 }}>SIDS</th>
                <th style={{ fontWeight: 400 }}>Financing</th>
            </tr>
        </thead>
        <tbody>
            {porps.Country.map(ctry =>
                <>
                    <tr key={ctry.CountryID}>
                        <td>
                            {ctry.CountryID}
                        </td>
                        <td>
                            {ctry.CountryName}
                        </td>

                        <td>
                            {ctry.ISO3}
                        </td>
                        <td>
                            {String(ctry.LDCs)}
                        </td>
                        <td>
                            {ctry.Region}
                        </td>
                        <td>
                            {String(ctry.SIDS)}
                        </td>
                        <td>
                            <Button variant="light" onClick={() => toggleFinance(!showFinance)}>Show ({ctry.Financing.length})</Button>
                        </td>
                    </tr>
                    <tr hidden={!showFinance}>
                        {ctry.Financing.map(f => {
                            return <td colSpan={7}>
                                <p><strong>CoFinancing:</strong>: {f.CoFinancing} <strong>Currency:</strong>: {f.Currency} <strong>Total:</strong>:{f.GCF} <strong>Total:</strong>{f.Total}</p>
                            </td>
                        })}
                    </tr>
                </>
            )}
        </tbody>
    </Table>;
}

interface hasHTable {
    [key: string]: any; // 👈️ variable key
};
export function GetDisbursements(props: { Disbursement: Disbursement[] }) {
    const [showCurrentExchangeRate, toggleCurrentExchangeRate] = useState({} as hasHTable);
    const localHashCurrentExchange: hasHTable = {};

    if (props.Disbursement && props.Disbursement.length > 0) {
        return <Table key={"Disbursement#"} size="lg" style={{ maxWidth: "80%", margin: "auto" }}>
            <thead>
                <tr>
                    <th style={{ fontWeight: 400 }}>ProjectDisbursementID</th>
                    <th style={{ fontWeight: 400 }}>AmountDisbursedUSDeq</th>
                    <th style={{ fontWeight: 400 }}>DateEffective</th>
                    <th style={{ fontWeight: 400 }}>Entity</th>
                    <th style={{ fontWeight: 400 }}>Currency</th>
                    <th style={{ fontWeight: 400 }}>AmountDisbursed</th>
                    <th style={{ fontWeight: 400 }}>ExchangeRate</th>
                </tr>
            </thead>
            <tbody>
                {props.Disbursement.map(dis =>
                    <>
                        <tr key={dis.ProjectDisbursementID}>
                            <td>
                                {dis.ProjectDisbursementID}
                            </td>
                            <td>
                                {dis.AmountDisbursedUSDeq}
                            </td>

                            <td>
                                {dis.DateEffective}
                            </td>
                            <td>
                                {dis.Entity}
                            </td>
                            <td>
                                {dis.Currency}
                            </td>
                            <td>
                                {dis.AmountDisbursed}
                            </td>
                            <td>
                                <Button variant="light" onClick={() => {
                                    localHashCurrentExchange[dis.ProjectDisbursementID] = !showCurrentExchangeRate[dis.ProjectDisbursementID];
                                    toggleCurrentExchangeRate(localHashCurrentExchange);
                                }}>Show</Button>
                            </td>
                        </tr>
                        <tr hidden={!showCurrentExchangeRate[dis.ProjectDisbursementID]}>
                            <td colSpan={6}>
                                {dis.CurrentExchangeRate.CurrencyCode}
                                {dis.CurrentExchangeRate.EffectiveDate}
                                {dis.CurrentExchangeRate.ExchangeRate}
                                {dis.CurrentExchangeRate.Source}
                            </td>
                        </tr>
                    </>
                )}
            </tbody>
        </Table>;

    }
    return <div></div>;
}

export function GetEntities(props: { Entity: Entity[] }) {
    const [showEntityCurrentExchangeRate, toggleEntity] = useState({} as hasHTable);
    const localHashCurrentExchange: hasHTable = {};

    if (props.Entity && props.Entity.length > 0) {
        return <Table key={"Entity#"} size="lg" style={{ maxWidth: "80%", margin: "auto" }}>
            <thead>
                <tr>
                    <th style={{ fontWeight: 400 }}>EntityID</th>
                    <th style={{ fontWeight: 400 }}>Name</th>
                    <th style={{ fontWeight: 400 }}>Access</th>
                    <th style={{ fontWeight: 400 }}>Acronym</th>
                    <th style={{ fontWeight: 400 }}>ESS</th>
                    <th style={{ fontWeight: 400 }}>Sector</th>
                    <th style={{ fontWeight: 400 }}>Type</th>
                    <th style={{ fontWeight: 400 }}>ExchangeRate</th>
                </tr>
            </thead>
            <tbody>
                {props.Entity.map(dis =>
                    <>
                        <tr key={dis.EntityID}>
                            <td>
                                {dis.EntityID}
                            </td>
                            <td>
                                {dis.Name}
                            </td>

                            <td>
                                {dis.Access}
                            </td>
                            <td>
                                {dis.Acronym}
                            </td>
                            <td>
                                {dis.ESS}
                            </td>
                            <td>
                                {dis.Sector}
                            </td>
                            <td>
                                {dis.Type}
                            </td>
                            <td>
                                <Button variant="light" onClick={() => {
                                    localHashCurrentExchange[dis.EntityID] = !showEntityCurrentExchangeRate[dis.EntityID];
                                    toggleEntity(localHashCurrentExchange);
                                }}>Show</Button>
                            </td>
                        </tr>
                        {dis.FiduciaryStandards.map(f => {
                            return <tr hidden={!showEntityCurrentExchangeRate[dis.EntityID]}>
                                <td colSpan={7}>
                                    <span><strong>FiduciaryStandard:</strong>: {f.FiduciaryStandard} <strong>Size:</strong>: {f.Size}</span>
                                </td>
                            </tr>
                        })}
                    </>
                )}
            </tbody>
        </Table>;

    }
    return <div></div>;
}

export function GetFunding(props: { Funding: Funding[] }) {
    const [showFunding, toggleFunding] = useState({} as hasHTable);
    const localHashCurrentExchange: hasHTable = {};

    if (props.Funding && props.Funding.length > 0) {
        return <Table key={"Funding#"} size="lg" style={{ maxWidth: "80%", margin: "auto" }}>
            <thead>
                <tr>
                    <th style={{ fontWeight: 400 }}>ProjectBudgetID</th>
                    <th style={{ fontWeight: 400 }}>BM</th>
                    <th style={{ fontWeight: 400 }}>Budget</th>
                    <th style={{ fontWeight: 400 }}>BudgetUSDeq</th>
                    <th style={{ fontWeight: 400 }}>Currency</th>
                    <th style={{ fontWeight: 400 }}>Instrument</th>
                    <th style={{ fontWeight: 400 }}>Source</th>
                    <th style={{ fontWeight: 400 }}>SourceID</th>
                    <th style={{ fontWeight: 400 }}>ExchangeRate</th>
                </tr>
            </thead>
            <tbody>
                {props.Funding.map(dis =>
                    <>
                        <tr key={dis.ProjectBudgetID}>
                            <td>
                                {dis.ProjectBudgetID}
                            </td>
                            <td>
                                {dis.BM}
                            </td>

                            <td>
                                {dis.Budget}
                            </td>
                            <td>
                                {dis.BudgetUSDeq}
                            </td>
                            <td>
                                {dis.Currency}
                            </td>
                            <td>
                                {dis.Instrument}
                            </td>
                            <td>
                                {dis.Source}
                            </td>
                            <td>
                                {dis.SourceID}
                            </td>
                            <td>
                                <Button variant="light" onClick={() => {
                                    localHashCurrentExchange[dis.ProjectBudgetID] = !showFunding[dis.ProjectBudgetID];
                                    toggleFunding(localHashCurrentExchange);
                                }}>Show</Button>
                            </td>
                        </tr>
                        <tr hidden={!showFunding[dis.ProjectBudgetID]}>
                            <td colSpan={3}>CurrencyCode</td>
                            <td colSpan={2}>EffectiveDate</td>
                            <td colSpan={2}>ExchangeRate</td>
                            <td colSpan={2}>Source</td>
                        </tr>
                        <tr hidden={!showFunding[dis.ProjectBudgetID]}>
                            <td colSpan={3}>{dis.CurrentExchangeRate.CurrencyCode}</td>
                            <td colSpan={2}>{dis.CurrentExchangeRate.EffectiveDate}</td>
                            <td colSpan={2}>{dis.CurrentExchangeRate.ExchangeRate}</td>
                            <td colSpan={2}>{dis.CurrentExchangeRate.Source}</td>
                        </tr>
                    </>
                )}
            </tbody>
        </Table>;

    }
    return <div></div>;
}