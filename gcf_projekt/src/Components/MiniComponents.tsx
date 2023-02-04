import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { TbZoomMoney } from "react-icons/tb";
import { Country, Disbursement, Entity, Funding, ResultArea } from "../Helper/Models";
import { hasHTable } from "../Helper/Utility";


export function GetContries(porps: { Country: Country[] }) {
    const [showFinance, toggleFinance] = useState({} as hasHTable);
    const localHashCurrentExchange: hasHTable = {};
    return <Table key={"Countries#"} size="lg" style={{ maxWidth: "80%", margin: "auto" }}>
        <thead>
            <tr style={{ background: "#add8e640" }}>
                <th style={{ fontWeight: 500 }}>CountryID</th>
                <th style={{ fontWeight: 500 }}>CountryName</th>
                <th style={{ fontWeight: 500 }}>ISO3</th>
                <th style={{ fontWeight: 500 }}>LDCs</th>
                <th style={{ fontWeight: 500 }}>Region</th>
                <th style={{ fontWeight: 500 }}>SIDS</th>
                <th style={{ fontWeight: 500 }}>Financing</th>
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
                            <Button variant="light" style={{ padding: "5px" }} onClick={() => {
                                localHashCurrentExchange[ctry.CountryID] = !showFinance[ctry.CountryID];
                                toggleFinance(localHashCurrentExchange);
                            }}><TbZoomMoney style={{fontSize: "22px"}} /></Button>
                            {/* <Button variant="light" style={{ padding: 0 }} onClick={() => toggleFinance(!showFinance)}><TbZoomMoney style={{fontSize: "22px"}} /> ({ctry.Financing.length})</Button> */}
                        </td>
                    </tr>
                    {/* <tr hidden={!showFinance}>
                        {ctry.Financing.map(f => {
                            return <td colSpan={7}>
                                <p><strong>CoFinancing:</strong>: {f.CoFinancing} <strong>GCF:</strong>:{f.GCF.toLocaleString("en-us", { style: "currency", currency: f.Currency })} <strong>Total:</strong>{f.Total.toLocaleString("en-us", { style: "currency", currency: f.Currency })}</p>
                            </td>
                        })}
                    </tr> */}
                    <ModalCustom
                        Title="Exchange Rate"
                        showModal={showFinance[ctry.CountryID]}
                        // JsxEl={<TbZoomMoney style={{fontSize: "22px"}} />}
                        body={() => {
                            return <Table striped style={{ maxWidth: "80%", margin: "auto" }}>
                                <thead>
                                    <tr>
                                        <th colSpan={2}>CoFinancing</th>
                                        <th colSpan={2}>GCF</th>
                                        <th colSpan={2}>Total</th>
                                        {/* <th colSpan={2}>Source</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {ctry.Financing.map(f => {
                                        return <td colSpan={7}>
                                            <p><strong>CoFinancing:</strong>: {f.CoFinancing} <strong>
                                            GCF:</strong>:{f.GCF.toLocaleString("en-us", { style: "currency", currency: f.Currency })} <strong>
                                            Total:</strong>{f.Total.toLocaleString("en-us", { style: "currency", currency: f.Currency })}</p>
                                        </td>
                                    })} */}
                                    {ctry.Financing.map(f => {
                                        return <tr>
                                            <td colSpan={2}> {f.CoFinancing} </td>
                                            <td colSpan={2}>{f.GCF.toLocaleString("en-us", { style: "currency", currency: f.Currency })}</td>
                                            <td colSpan={2}>{f.Total.toLocaleString("en-us", { style: "currency", currency: f.Currency })}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </ Table>
                        }
                        } />
                </>
            )}
        </tbody>
    </Table>;
}


export function GetDisbursements(props: { Disbursement: Disbursement[] }) {
    const [showCurrentExchangeRate, toggleCurrentExchangeRate] = useState({} as hasHTable);
    const localHashCurrentExchange: hasHTable = {};

    if (props.Disbursement && props.Disbursement.length > 0) {
        return <Table key={"Disbursement#"} size="lg" style={{ maxWidth: "80%", margin: "auto" }}>
            <thead>
                <tr style={{ background: "#add8e640" }}>
                    <th style={{ fontWeight: 500 }}>ProjectDisbursementID</th>
                    <th style={{ fontWeight: 500 }}>AmountDisbursed</th>
                    <th style={{ fontWeight: 500 }}>DateEffective</th>
                    <th style={{ fontWeight: 500 }}>Entity</th>
                    {/* <th style={{ fontWeight: 500 }}>Currency</th> */}
                    {/* <th style={{ fontWeight: 500 }}>AmountDisbursed</th> */}
                    <th style={{ fontWeight: 500 }}>ExchangeRate</th>
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
                                {dis.AmountDisbursed.toLocaleString("en-us", { style: "currency", currency: dis.Currency })}
                            </td>

                            <td>
                                {new Date(dis.DateEffective).toLocaleDateString()}
                            </td>
                            <td>
                                {dis.Entity}
                            </td>
                            {/* <td>
                                {dis.Currency}
                            </td> */}
                            {/* <td>
                                {dis.AmountDisbursed}
                            </td> */}
                            <td>
                                <Button variant="light" style={{ padding: "5px" }} onClick={() => {
                                    localHashCurrentExchange[dis.ProjectDisbursementID] = !showCurrentExchangeRate[dis.ProjectDisbursementID];
                                    toggleCurrentExchangeRate(localHashCurrentExchange);
                                }}><TbZoomMoney style={{fontSize: "22px"}} /></Button>
                            </td>
                        </tr>
                        <ModalCustom
                            Title="Exchange Rate"
                            showModal={showCurrentExchangeRate[dis.ProjectDisbursementID]}
                            // JsxEl={<TbZoomMoney style={{fontSize: "22px"}} />}
                            body={() => {
                                return <Table striped style={{ maxWidth: "80%", margin: "auto" }}>
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
                                            <td colSpan={2}> {dis.CurrentExchangeRate.CurrencyCode}</td>
                                            <td colSpan={2}>{dis.CurrentExchangeRate.EffectiveDate}</td>
                                            <td colSpan={1}>{dis.CurrentExchangeRate.ExchangeRate}</td>
                                            <td colSpan={2}>{dis.CurrentExchangeRate.Source}</td>
                                        </tr>
                                    </tbody>
                                </ Table>
                            }
                            } />
                        {/* <tr hidden={!showCurrentExchangeRate[dis.ProjectDisbursementID]}>
                            <td colSpan={6}>
                                {dis.CurrentExchangeRate.CurrencyCode}
                                {dis.CurrentExchangeRate.EffectiveDate}
                                {dis.CurrentExchangeRate.ExchangeRate}
                                {dis.CurrentExchangeRate.Source}
                            </td>
                        </tr> */}
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
                <tr style={{ background: "#add8e640" }}>
                    <th style={{ fontWeight: 500 }}>EntityID</th>
                    <th style={{ fontWeight: 500 }}>Name</th>
                    <th style={{ fontWeight: 500 }}>Access</th>
                    <th style={{ fontWeight: 500 }}>Acronym</th>
                    <th style={{ fontWeight: 500 }}>ESS</th>
                    <th style={{ fontWeight: 500 }}>Sector</th>
                    <th style={{ fontWeight: 500 }}>Type</th>
                    <th style={{ fontWeight: 500 }}>ExchangeRate</th>
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
                                <Button variant="light" style={{ padding: "5px" }} onClick={() => {
                                    localHashCurrentExchange[dis.EntityID] = !showEntityCurrentExchangeRate[dis.EntityID];
                                    toggleEntity(localHashCurrentExchange);
                                }}><TbZoomMoney style={{fontSize: "22px"}} /></Button>
                            </td>
                        </tr>
                        {/* {dis.FiduciaryStandards.map(f => {
                            return <tr hidden={!showEntityCurrentExchangeRate[dis.EntityID]}>
                                <td colSpan={7}>
                                    <span><strong>FiduciaryStandard:</strong>: {f.FiduciaryStandard} <strong>Size:</strong>: {f.Size}</span>
                                </td>
                            </tr>
                        })} */}
                        <ModalCustom
                            Title="Exchange Rate"
                            showModal={showEntityCurrentExchangeRate[dis.EntityID]}
                            body={() => {
                                return <Table striped style={{ maxWidth: "80%", margin: "auto" }}>
                                    <thead>
                                        <tr>
                                            <th colSpan={2}>FiduciaryStandard</th>
                                            <th colSpan={2}>Size</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dis.FiduciaryStandards.map(f => {
                                            return <tr>
                                                <td colSpan={2}>{f.FiduciaryStandard}</td>
                                                <td colSpan={2}>{f.Size}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </ Table>
                            }
                            } />
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
        return <Table style={{ maxWidth: "80%", margin: "auto" }}>
            <thead>
                <tr style={{ background: "#add8e640" }}>
                    <th style={{ fontWeight: 500 }}>ProjectBudgetID</th>
                    <th style={{ fontWeight: 500 }}>BM</th>
                    <th style={{ fontWeight: 500 }}>Budget</th>
                    {/* <th style={{ fontWeight: 500 }}>BudgetUSDeq</th> */}
                    {/* <th style={{ fontWeight: 500 }}>Currency</th> */}
                    <th style={{ fontWeight: 500 }}>Instrument</th>
                    <th style={{ fontWeight: 500 }}>Source</th>
                    <th style={{ fontWeight: 500 }}>SourceID</th>
                    <th style={{ fontWeight: 500 }}>ExchangeRate</th>
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
                                    <TbZoomMoney style={{fontSize: "22px"}} />
                                </Button>
                            </td>
                        </tr>
                        <ModalCustom
                            Title="Exchange Rate"
                            showModal={showFunding[dis.ProjectBudgetID]}
                            // JsxEl={<TbZoomMoney style={{fontSize: "22px"}} />}
                            body={() => {
                                return <Table striped style={{ maxWidth: "80%", margin: "auto" }}>
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
                            }
                            } />
                        {/* <tr hidden={!showFunding[dis.ProjectBudgetID]}>
                            <td colSpan={2}>CurrencyCode</td>
                            <td colSpan={2}>EffectiveDate</td>
                            <td colSpan={1}>ExchangeRate</td>
                            <td colSpan={2}>Source</td>
                        </tr>
                        <tr hidden={!showFunding[dis.ProjectBudgetID]}>
                            <td colSpan={2}>{dis.CurrentExchangeRate.CurrencyCode}</td>
                            <td colSpan={2}>{dis.CurrentExchangeRate.EffectiveDate}</td>
                            <td colSpan={1}>{dis.CurrentExchangeRate.ExchangeRate}</td>
                            <td colSpan={2}>{dis.CurrentExchangeRate.Source}</td>
                        </tr> */}
                    </>
                )}
            </tbody>

        </Table>;
    }

    return <div></div>;
}

export function GetResultAreas(props: { ResultAreas: ResultArea[] }) {
    if (props.ResultAreas && props.ResultAreas.length > 0) {
        return <Table key={"ResultAreas#"} style={{ maxWidth: "80%", margin: "auto" }}>
            <thead>
                <tr style={{ background: "#add8e640" }}>
                    <th style={{ fontWeight: 500 }}>Area</th>
                    <th style={{ fontWeight: 500 }}>Type</th>
                    <th style={{ fontWeight: 500 }}>Value</th>
                </tr>
            </thead>
            <tbody>
                {props.ResultAreas.sort((a, b) => parseInt(b.Value) - parseInt(a.Value)).map(dis =>
                    <>
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
                    </>
                )}
            </tbody>
        </Table>;

    }
    return <div></div>;
}


export function ModalCustom(props: { Title: string, body: () => JSX.Element, showModal: boolean }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    useEffect(() => {
        // if(props.showModal !== show) {
        setShow(props.showModal);
        // }
        console.log(props.showModal);
    }, [props.showModal]);
    return (
        <>
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.Title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.body()}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}