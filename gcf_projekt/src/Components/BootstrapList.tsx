/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { Button, Collapse, Dropdown, DropdownButton, Form, OverlayTrigger, Pagination, Tab, Table, Tabs, Tooltip } from 'react-bootstrap';
import { ProjektModel } from '../Helper/Models';
import styles from './BootstrapList.module.css';
import { GetContries, GetDisbursements, GetEntities, GetFunding, GetResultAreas, ModalCustom } from './MiniComponents';
import { ImEyePlus } from 'react-icons/im';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { VscFilter } from 'react-icons/vsc'
import { hasHTable } from '../Helper/Utility';

export interface IBootstrapListProps { Projects: ProjektModel[] }

export interface IBootstrapListState {
  hideTabs: hasHTable;
  hideProjectDetail: boolean;
  SelectedProj: ProjektModel;
  Projects: ProjektModel[];
  pageNumbers: number[]
  pageNum: number;
  currentNum: number;
  searchedPrjNum: { value: any, key: string };
  searchValue: string;
  showProjectSearc: boolean;
  showMore: boolean;
}

export default class BootstrapList extends React.Component<IBootstrapListProps, IBootstrapListState> {
  constructor(props: IBootstrapListProps) {
    super(props);
    this.state = {
      searchValue: "",
      SelectedProj: {} as any,
      showProjectSearc: false,
      hideTabs: {},
      hideProjectDetail: false,
      Projects: this.props.Projects,
      pageNumbers: [],
      pageNum: 0,
      showMore: false,
      searchedPrjNum: { value: null, key: "" },
      currentNum: 0
    }

  }
  public componentDidMount(): void {
    if (this.props.Projects && this.props.Projects.length === 0) setTimeout(() => { this.componentDidMount(); }, 500);
    this.setState({ Projects: this.props.Projects });

    setTimeout(() => { this.getPageNum(); }, 100);
  }
  public componentWillUpdate(nextProps: IBootstrapListProps, nextState: IBootstrapListState): void {
    if (this.state.searchedPrjNum["value"] !== nextState.searchedPrjNum["value"]) {
      setTimeout(() => { this.Filter(true); }, 100);
    }
  }

  public componentDidUpdate(prevProps: IBootstrapListProps, prevState: IBootstrapListState): void {
    if (this.state.searchedPrjNum["value"] !== prevState.searchedPrjNum["value"]) {
      setTimeout(() => { this.getPageNum(); }, 100);
    }

  }

  public render(): React.ReactElement<IBootstrapListProps> {
    return (
      <div>
        <ModalCustom
          showModal={this.state.hideProjectDetail}
          Title={`${this.state.SelectedProj.ProjectsID}'s detail`}
          body={() => {
            return <div>
              <p>
                <span className={styles.title}>Project Id:</span>
                <span className={styles.subTitle}>{this.state.SelectedProj.ProjectsID}</span>
              </p>
              <p>
                <span className={styles.title}>Project Name:</span>
                <span className={styles.subTitle}>{this.state.SelectedProj.ProjectName}</span>
              </p>
              <p>
                <span className={styles.title}>Project ApprovedRef:</span>
                <span className={styles.subTitle}>{this.state.SelectedProj.ApprovedRef}</span>
              </p>
              <a hidden={this.state.showMore} href='#' onClick={() => this.setState({ showMore: !this.state.showMore })}>Show more..</a>
              <Collapse in={this.state.showMore}>
                <div>
                  <p>
                    <span className={styles.title}>Project ApprovalDate:</span>
                    <span className={styles.subTitle}>{this.state.SelectedProj.ApprovalDate?.toString()}</span>
                  </p>
                  <p>
                    <span className={styles.title}>Project BoardMeeting:</span>
                    <span className={styles.subTitle}>{this.state.SelectedProj.BoardMeeting}</span>
                  </p>
                  <p>
                    <span className={styles.title}>Project DurationMonths:</span>
                    <span className={styles.subTitle}>{this.state.SelectedProj.DurationMonths}</span>
                  </p>
                  <p>
                    <span className={styles.title}>Project EndDate:</span>
                    <span className={styles.subTitle}>{this.state.SelectedProj.EndDate?.toString()}</span>
                  </p>
                  <p>
                    <span className={styles.title}>Project IndirectBeneficiaries:</span>
                    <span className={styles.subTitle}>{this.state.SelectedProj.IndirectBeneficiaries}</span>
                  </p>
                  <p>
                    <span className={styles.title}>Project LifeTimeCO2:</span>
                    <span className={styles.subTitle}>{this.state.SelectedProj.LifeTimeCO2}</span>
                  </p>
                  <p>
                    <span className={styles.title}>Project ProjectURL:</span>
                    <span className={styles.subTitle}> <a href={this.state.SelectedProj.ProjectURL} rel="noreferrer" target="_blank" > Click here</a> to visit website</span>
                  </p>
                  <p>
                    <span className={styles.title}>Project RiskCategory:</span>
                    <span className={styles.subTitle}>{this.state.SelectedProj.RiskCategory}</span>
                  </p>
                  <p>
                    <span className={styles.title}>Project Sector:</span>
                    <span className={styles.subTitle}>{this.state.SelectedProj.Sector}</span>
                  </p>
                  <p>
                    <span className={styles.title}>Project StartDate:</span>
                    <span className={styles.subTitle}>{this.state.SelectedProj.StartDate?.toString()}</span>
                  </p>
                  <p>
                    <span className={styles.title}>Project Theme:</span>
                    <span className={styles.subTitle}>{this.state.SelectedProj.Theme}</span>
                  </p>
                  <p>
                    <span className={styles.title}>Project TotalCoFinancing:</span>
                    <span className={styles.subTitle}>{this.state.SelectedProj.TotalCoFinancing}</span>
                  </p>
                  <p>
                    <span className={styles.title}>Project TotalGCFFunding:</span>
                    <span className={styles.subTitle}>{this.state.SelectedProj.TotalGCFFunding}</span>
                  </p>
                  <p>
                    <span className={styles.title}>Project TotalValue:</span>
                    <span className={styles.subTitle}>{this.state.SelectedProj.TotalValue}</span>
                  </p>
                  <a href='#' onClick={() => this.setState({ showMore: !this.state.showMore })}>Show less..</a>
                </div>
              </Collapse>
            </div>;
          }}
        />
        <p>Thus can my love excuse the slow offence Of my dull bearer when from thee I speed: From where thou art why should I haste me thence? Till I return, of posting is no need. </p>
        {this.props.Projects &&
          <Table key={"ffffff"} size="lg" style={{ maxWidth: "90%", margin: "auto" }}>
            <thead>
              <tr key={"f"}>
                <th key={"ProjectsID"}>
                  <Button style={{ fontWeight: 500, width: "100%", background: "#f5f9f5" }} variant="light" onClick={() => this.setState({ showProjectSearc: !this.state.showProjectSearc })}>ProjectsID <VscFilter /></Button>
                </th>
                <th key={"ProjectName"}>
                  <Button style={{ fontWeight: 500, width: "100%", background: "#f5f9f5" }} variant="light" onClick={() => this.setState({ showProjectSearc: !this.state.showProjectSearc })}>ProjectName <VscFilter /></Button>
                </th>
                <th key={"Sector"}><Button style={{ fontWeight: 500, width: "100%", background: "#f5f9f5" }} variant="light" onClick={() => this.setState({ showProjectSearc: !this.state.showProjectSearc })}>Sector <VscFilter /></Button></th>
                <th key={"TotalValue"}><Button style={{ fontWeight: 500, width: "100%", background: "#f5f9f5" }} variant="light" onClick={() => this.setState({ showProjectSearc: !this.state.showProjectSearc })}>TotalValue <VscFilter /></Button>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr hidden={!this.state.showProjectSearc}>
                <td><Form.Control
                  placeholder="Search by ID"
                  aria-label="Search by ID"
                  onChange={(e) => {
                    this.setState({ searchedPrjNum: { value: e.target.value, key: "ProjectsID" } });
                    this.Filter(true);
                    setTimeout(() => {
                      this.getPageNum();
                    }, 100);
                  }}
                /></td>
                <td><Form.Control
                  placeholder="Search by Project Name"
                  aria-label="Search by Project Name"
                  onChange={(e) => {
                    this.setState({ searchedPrjNum: { value: e.target.value, key: "ProjectName" } });
                    setTimeout(() => {
                      this.Filter(true);
                      this.getPageNum();

                    }, 100);
                  }}
                /></td>
                <td><DropdownButton id="dropdown-basic-button" title={this.state.searchedPrjNum["key"] === "Sector" ? this.state.searchedPrjNum.value : "Sector"}>
                  <Dropdown.Item href="#/action-2" onClick={() => {
                    this.setState({ searchedPrjNum: { value: "Public", key: "Sector" } });
                    this.Filter(true);
                    setTimeout(() => {
                      this.getPageNum();
                    }, 100);
                  }}>Public</Dropdown.Item>
                  <Dropdown.Item href="#/action-3" onClick={() => {
                    this.setState({ searchedPrjNum: { value: "Private", key: "Sector" } });
                    this.Filter(true);
                    setTimeout(() => {
                      this.getPageNum();
                    }, 100);
                  }}>Private</Dropdown.Item>
                </DropdownButton></td>
                <td><Form.Control
                  placeholder="Search by TotalValue"
                  aria-label="Search by TotalValue"
                  onChange={(e) => {
                    this.setState({ searchedPrjNum: { value: e.target.value, key: "TotalValue" } });
                    this.Filter(true);
                    setTimeout(() => {
                      this.getPageNum();
                    }, 100);
                  }}
                /></td>
                <td></td>
              </tr>
              {this.state.Projects.slice(this.state.pageNum === 50 ? 0 : this.state.pageNum, (this.state.pageNum + 50)).map((f, ix) =>
                <>
                  <tr key={ix} className={styles.Row} style={{ cursor: "pointer", boxShadow: "#00000017 2px 4px 4px 0px" }} >
                    <td key={"PrjID" + ix.toString()} style={{ width: "10%" }}>{f.ProjectsID}</td>

                    <td key={"Prj" + ix.toString()} style={{ width: "45%" }}>{f.ProjectName}</td>

                    <td key={"Sec" + ix.toString()}>{f.Sector}</td>

                    <td key={"Tot" + ix.toString()}>{f.TotalValue.toLocaleString("en-us", { style: "currency", currency: "USD" })}</td>

                    <td style={{ maxWidth: "10%" }}>
                      <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">See details!</Tooltip>}>
                        <Button className={styles.seeMoreBtn} variant='light'
                          onClick={() => {
                            this.setState({ SelectedProj: f, hideProjectDetail: !this.state.hideProjectDetail });
                            // this.ToggleHiddenProjectDetails(f.ProjectsID.toString());
                          }}
                        ><ImEyePlus /></Button>
                      </OverlayTrigger>
                      <OverlayTrigger overlay={<Tooltip id="tooltip-disabledExpand">Expand project externsions!</Tooltip>}>
                        <Button className={styles.seeMoreBtnExpand} variant='dark' onClick={() => this.ToggleHiddenTabs(f.ProjectsID.toString())}>{!this.state.hideTabs[f.ProjectsID] ? <AiOutlinePlus /> : <AiOutlineMinus />}</Button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                  <tr key={f.ProjectsID.toString() + ix}>
                    <td key={"fffffff"} colSpan={5} style={{ background: "#99ca971a" }}>
                      <Tabs
                        style={{ placeContent: "center", marginTop: "4px", fontWeight: 500 }}
                        hidden={!this.state.hideTabs[f.ProjectsID]}
                        defaultActiveKey="Countries"
                        id="##uncontrolled-tab-example"
                        className="mb-3"
                        fill
                      >
                        <Tab hidden={!this.state.hideTabs[f.ProjectsID]} eventKey="Countries"
                          title={<div>Countries ({f.Countries.length})</div>}>
                          <GetContries Country={f.Countries} />
                        </Tab>
                        <Tab hidden={!this.state.hideTabs[f.ProjectsID]} eventKey="Disbursements"
                          title={<div>Disbursements ({f.Disbursements && f.Disbursements.length})</div>}>
                          <GetDisbursements Disbursement={f.Disbursements} />
                        </Tab>
                        <Tab hidden={!this.state.hideTabs[f.ProjectsID]} eventKey="Entities"
                          title={<div>Entities ({f.Entities.length})</div>}>
                          <GetEntities Entity={f.Entities} />
                        </Tab>
                        <Tab hidden={!this.state.hideTabs[f.ProjectsID]} eventKey="contact"
                          title={<div>Funding ({f.Funding.length})</div>}>
                          <GetFunding Funding={f.Funding} />
                        </Tab>
                        <Tab hidden={!this.state.hideTabs[f.ProjectsID]} eventKey="eye"
                          title={<div>ResultAreas ({f.ResultAreas.length})</div>}>
                          <GetResultAreas ResultAreas={f.ResultAreas} />
                        </Tab>
                      </Tabs>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </Table>
        }
        <span style={{ color: "grey" }}>{this.state.Projects.length} Projects</span>
        <Pagination style={{ justifyContent: "center", margin: "10px" }}>
          <Pagination.Prev />
          {this.state.pageNumbers.map((num, ix) =>
            <Pagination.Item active={(this.state.currentNum) === ix} onClick={() => {
              this.setState({ pageNum: this.state.pageNumbers[ix === 0 ? ix : ix - 1], currentNum: ix });
            }}>{ix + 1}</Pagination.Item>
          )}
          <Pagination.Next />
        </Pagination>
      </div>
    );
  }

  private Filter(triggerPageNum = false) {
    if (this.state.searchedPrjNum["key"] !== "") {
      const filterProjects = this.props.Projects.filter((f: any) => f[this.state.searchedPrjNum.key].toString().startsWith(this.state.searchedPrjNum.value));
      this.setState({ Projects: filterProjects });
      if (triggerPageNum) {
        this.getPageNum();
      }
    } else {
      this.setState({ Projects: this.props.Projects });
      if (triggerPageNum) {
        this.getPageNum();
      }
    }
  }

  private ToggleHiddenTabs = (key: string) => {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.hideTabs[key] = !this.state.hideTabs[key];
    this.setState({ hideTabs: this.state.hideTabs });
  }

  // private ToggleHiddenProjectDetails = (key: string) => {
  //   // eslint-disable-next-line react/no-direct-mutation-state
  //   this.state.hideProjectDetail[key] = !this.state.hideProjectDetail[key];
  //   this.setState({ hideProjectDetail: this.state.hideProjectDetail });
  // }


  private getPageNum() {
    const pageNumbers = [];
    for (let ix = 1; ix < this.state.Projects.length / 50; ix++) {
      pageNumbers.push(ix * 50);
    }
    pageNumbers.push(this.state.Projects.length);
    if (pageNumbers.length !== this.state.pageNum) {
      this.setState({ pageNumbers });
    } else {
      setTimeout(() => {
        this.getPageNum();
      }, 250)
    }
  }
}
