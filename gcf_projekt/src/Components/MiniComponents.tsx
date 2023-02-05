import React from "react";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { TbZoomMoney } from "react-icons/tb";
import { Country, Disbursement, Entity, Funding, ResultArea } from "../Helper/Models";
import { hasHTable } from "../Helper/Utility";


export function GetContries(porps: { Country: Country[] }) {
    const [showFinance, toggleFinance] = useState({} as hasHTable);
    const localHashCurrentExchange: hasHTable = {};
    return <Table size="lg" style={{ maxWidth: "90%", margin: "auto" }}>
        <thead>
            <tr style={{ background: "#add8e640" }}>
                <th style={{ fontWeight: 500 }}>Country's ID</th>
                <th style={{ fontWeight: 500 }}>CountryName</th>
                <th style={{ fontWeight: 500 }}>ISO3</th>
                <th style={{ fontWeight: 500 }}>LDCs</th>
                <th style={{ fontWeight: 500 }}>Region</th>
                <th style={{ fontWeight: 500 }}>SIDS</th>
                <th style={{ fontWeight: 500 }}>Financing</th>
            </tr>
        </thead>
        <tbody>
            {porps.Country.map((ctry, ix) =>
                <React.Fragment key={Math.random() + ctry.CountryID}>
                    <tr key={ix}>
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
                            <Button variant="light" style={{ padding: "5px" }} onClick={() => {
                                localHashCurrentExchange[ctry.CountryID] = !showFinance[ctry.CountryID];
                                toggleFinance(localHashCurrentExchange);
                            }}><TbZoomMoney style={{ fontSize: "22px" }} /></Button>
                            {/* <Button variant="light" style={{ padding: 0 }} onClick={() => toggleFinance(!showFinance)}><TbZoomMoney style={{fontSize: "22px"}} /> ({ctry.Financing.length})</Button> */}
                        </td>
                        <ModalCustom
                            Title="Financing"
                            showModal={showFinance[ctry.CountryID]}
                            key={Math.random().toString()}
                            onDissmis={(show) => {
                                localHashCurrentExchange[ctry.CountryID] = show;
                                toggleFinance(localHashCurrentExchange);
                            }}
                            // JsxEl={<TbZoomMoney style={{fontSize: "22px"}} />}
                            body={ <Table striped style={{ maxWidth: "80%", margin: "auto" }}>
                                    <thead>
                                        <tr>
                                            <th colSpan={2}>CoFinancing</th>
                                            <th colSpan={2}>GCF</th>
                                            <th colSpan={2}>Total</th>
                                            {/* <th colSpan={2}>Source</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ctry.Financing.map((f, ix) => {
                                            return <tr key={Math.random()}>
                                                <td key={f.CoFinancing + ix} colSpan={2}> {f.CoFinancing} </td>
                                                <td key={f.GCF + ix} colSpan={2}>{f.GCF.toLocaleString("en-us", { style: "currency", currency: f.Currency })}</td>
                                                <td key={f.Total + ix} colSpan={2}>{f.Total.toLocaleString("en-us", { style: "currency", currency: f.Currency })}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </ Table>
                            } />
                    </tr>
                </React.Fragment>
            )}
        </tbody>
    </Table>;
}


export function GetDisbursements(props: { Disbursement: Disbursement[] }) {
    const [showCurrentExchangeRate, toggleCurrentExchangeRate] = useState({} as hasHTable);
    const localHashCurrentExchange: hasHTable = {};

    if (props.Disbursement && props.Disbursement.length > 0) {
        return <Table key={"Disbursement#"} size="lg" style={{ maxWidth: "90%", margin: "auto" }}>
            <thead>
                <tr style={{ background: "#add8e640" }}>
                    <th style={{ fontWeight: 500 }}>Disbursement's ID</th>
                    <th style={{ fontWeight: 500 }}>Amount Disbursed</th>
                    <th style={{ fontWeight: 500 }}>Date Effective</th>
                    <th style={{ fontWeight: 500 }}>Entity</th>
                    {/* <th style={{ fontWeight: 500 }}>Currency</th> */}
                    {/* <th style={{ fontWeight: 500 }}>AmountDisbursed</th> */}
                    <th style={{ fontWeight: 500 }}>Current exchange rate</th>
                </tr>
            </thead>
            <tbody>
                {props.Disbursement.map((dis, ix) =>
                    <React.Fragment key={ix}>
                        <tr key={dis.ProjectDisbursementID}>
                            <td>
                                {dis.ProjectDisbursementID}
                            </td>
                            <td>
                                {dis.AmountDisbursed.toLocaleString("en-us", { style: "currency", currency: dis.Currency })}
                            </td>

                            <td>
                                {new Date(dis.DateEffective).toLocaleDateString()}
                            </td>
                            <td>
                                {dis.Entity}
                            </td>
                            {/* <td key={dis.ProjectDisbursementID}>
                                {dis.Currency}
                            </td> */}
                            {/* <td key={dis.ProjectDisbursementID}>
                                {dis.AmountDisbursed}
                            </td> */}
                            <td>
                                <Button variant="light" style={{ padding: "5px" }} onClick={() => {
                                    localHashCurrentExchange[dis.ProjectDisbursementID] = !showCurrentExchangeRate[dis.ProjectDisbursementID];
                                    toggleCurrentExchangeRate(localHashCurrentExchange);
                                }}><TbZoomMoney style={{ fontSize: "22px" }} /></Button>
                            </td>
                            <ModalCustom
                                Title="Current exchange rate"
                                showModal={showCurrentExchangeRate[dis.ProjectDisbursementID]}
                                onDissmis={(show) => {
                                    localHashCurrentExchange[dis.ProjectDisbursementID] = show;
                                    toggleCurrentExchangeRate(localHashCurrentExchange);
                                }}
                                // JsxEl={<TbZoomMoney style={{fontSize: "22px"}} />}
                                body={ <Table striped style={{ maxWidth: "80%", margin: "auto" }}>
                                        <thead>
                                            <tr>
                                                <th colSpan={2}>CurrencyCode</th>
                                                <th colSpan={2}>EffectiveDate</th>
                                                <th colSpan={1}>ExchangeRate</th>
                                                <th colSpan={2}>Source</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr key={Math.random()}>
                                                <td colSpan={2}> {dis.CurrentExchangeRate.CurrencyCode}</td>
                                                <td colSpan={2}>{dis.CurrentExchangeRate.EffectiveDate}</td>
                                                <td colSpan={1}>{dis.CurrentExchangeRate.ExchangeRate}</td>
                                                <td colSpan={2}>{dis.CurrentExchangeRate.Source}</td>
                                            </tr>
                                        </tbody>
                                    </ Table>
                                } />
                        </tr>
                    </React.Fragment>
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
        return <Table key={"Entity#"} size="lg" style={{ maxWidth: "90%", margin: "auto" }}>
            <thead>
                <tr style={{ background: "#add8e640" }}>
                    <th style={{ fontWeight: 500 }}>Entity's ID</th>
                    <th style={{ fontWeight: 500 }}>Name</th>
                    <th style={{ fontWeight: 500 }}>Access</th>
                    <th style={{ fontWeight: 500 }}>Acronym</th>
                    <th style={{ fontWeight: 500 }}>ESS</th>
                    <th style={{ fontWeight: 500 }}>Sector</th>
                    <th style={{ fontWeight: 500 }}>Type</th>
                    <th style={{ fontWeight: 500 }}>Fiduciary standards</th>
                </tr>
            </thead>
            <tbody>
                {props.Entity.map((dis, ix) =>
                    <React.Fragment key={ix}>
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
                                <Button variant="light" style={{ padding: "5px" }} onClick={() => {
                                    localHashCurrentExchange[dis.EntityID] = !showEntityCurrentExchangeRate[dis.EntityID];
                                    toggleEntity(localHashCurrentExchange);
                                }}><TbZoomMoney style={{ fontSize: "22px" }} /></Button>
                            </td>
                            <ModalCustom
                                Title="Fiduciary standards"
                                showModal={showEntityCurrentExchangeRate[dis.EntityID]}
                                onDissmis={(show) => {
                                    localHashCurrentExchange[dis.EntityID] = show;
                                    toggleEntity(localHashCurrentExchange);
                                }}
                                body={ <Table striped style={{ maxWidth: "80%", margin: "auto" }}>
                                        <thead>
                                            <tr>
                                                <th colSpan={2}>FiduciaryStandard</th>
                                                <th colSpan={2}>Size</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dis.FiduciaryStandards.map((f,ix) => {
                                                return <tr key={ix}>
                                                    <td colSpan={2}>{f.FiduciaryStandard}</td>
                                                    <td colSpan={2}>{f.Size}</td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </ Table>
                                } />
                        </tr>
                    </React.Fragment>
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
        return <Table style={{ maxWidth: "90%", margin: "auto" }}>
            <thead>
                <tr style={{ background: "#add8e640" }}>
                    <th style={{ fontWeight: 500 }}>Budget's ID</th>
                    <th style={{ fontWeight: 500 }}>BM</th>
                    <th style={{ fontWeight: 500 }}>Budget</th>
                    {/* <th style={{ fontWeight: 500 }}>BudgetUSDeq</th> */}
                    {/* <th style={{ fontWeight: 500 }}>Currency</th> */}
                    <th style={{ fontWeight: 500 }}>Instrument</th>
                    <th style={{ fontWeight: 500 }}>Source</th>
                    <th style={{ fontWeight: 500 }}>Source's ID</th>
                    <th style={{ fontWeight: 500 }}>Current exchange rate</th>
                </tr>
            </thead>
            <tbody>
                {props.Funding.map((dis, ix) =>
                    <React.Fragment key={ix}>
                        <tr key={dis.ProjectBudgetID}>
                            <td>
                                {dis.ProjectBudgetID}
                            </td>
                            <td>
                                {dis.BM}
                            </td>

                            {/* <td>
                                {dis.Budget}
                            </td> */}
                            <td>
                                {dis.BudgetUSDeq.toLocaleString("en-us", { style: "currency", currency: dis.Currency })}
                            </td>
                            {/* <td>
                                {dis.Currency}
                            </td> */}
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
                                <Button variant="light" style={{ padding: "5px" }} onClick={() => {
                                    localHashCurrentExchange[dis.ProjectBudgetID] = !showFunding[dis.ProjectBudgetID];
                                    toggleFunding(localHashCurrentExchange);
                                }}>
                                    <TbZoomMoney style={{ fontSize: "22px" }} />
                                </Button>
                            </td>
                            <ModalCustom
                                Title="Current ExchangeRate"
                                showModal={showFunding[dis.ProjectBudgetID]}
                                onDissmis={(show) => {
                                    localHashCurrentExchange[dis.ProjectBudgetID] = show;
                                    toggleFunding(localHashCurrentExchange);
                                }}
                                // JsxEl={<TbZoomMoney style={{fontSize: "22px"}} />}
                                body={
                                     <Table striped style={{ maxWidth: "80%", margin: "auto" }}>
                                        <thead>
                                            <tr>
                                                <th colSpan={2}>CurrencyCode</th>
                                                <th colSpan={2}>EffectiveDate</th>
                                                <th colSpan={1}>ExchangeRate</th>
                                                <th colSpan={2}>Source</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td colSpan={2}>{dis.CurrentExchangeRate.CurrencyCode}</td>
                                                <td colSpan={2}>{dis.CurrentExchangeRate.EffectiveDate}</td>
                                                <td colSpan={1}>{dis.CurrentExchangeRate.ExchangeRate}</td>
                                                <td colSpan={2}>{dis.CurrentExchangeRate.Source}</td>
                                            </tr>
                                        </tbody>
                                    </ Table>
                                } />
                        </tr>
                    </React.Fragment>
                )}
            </tbody>

        </Table>;
    }

    return <div></div>;
}

export function GetResultAreas(props: { ResultAreas: ResultArea[] }) {
    if (props.ResultAreas && props.ResultAreas.length > 0) {
        return <Table key={"ResultAreas#"} style={{ maxWidth: "90%", margin: "auto" }}>
            <thead>
                <tr style={{ background: "#add8e640" }}>
                    <th style={{ fontWeight: 500 }}>Area</th>
                    <th style={{ fontWeight: 500 }}>Type</th>
                    <th style={{ fontWeight: 500 }}>Value</th>
                </tr>
            </thead>
            <tbody>
                {props.ResultAreas.sort((a, b) => parseInt(b.Value) - parseInt(a.Value)).map((dis, ix) =>
                    <tr key={dis.Area}>
                        <td>
                            {dis.Area}
                        </td>
                        <td>
                            {dis.Type}
                        </td>

                        <td>
                            {dis.Value}
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>;

    }
    return <div></div>;
}


export function ModalCustom(props: { Title: string, body: JSX.Element, showModal: boolean, onDissmis: (statedShow: boolean) => void }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    useEffect(() => {
        // if(props.showModal !== show) {
        setShow(props.showModal);
        // }
    }, [props.showModal]);
    return (<Modal key={Math.random()} size="lg" show={show} onHide={() => { handleClose(); props.onDissmis(!show); }}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.Title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { handleClose(); props.onDissmis(!show); }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
    );
}