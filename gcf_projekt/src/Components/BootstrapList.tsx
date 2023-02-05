/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { Button, Collapse, Dropdown, DropdownButton, Form, OverlayTrigger, Pagination, Spinner, Tab, Table, Tabs, Tooltip } from 'react-bootstrap';
import { ProjektModel } from '../Helper/Models';
import styles from './BootstrapList.module.css';
import { GetContries, GetDisbursements, GetEntities, GetFunding, GetResultAreas, ModalCustom } from './MiniComponents';
import { ImEyePlus } from 'react-icons/im';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { VscFilter } from 'react-icons/vsc';
import { MdOutlineClear } from 'react-icons/md';
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
    if (this.props.Projects.length > 0) {
      return (
        <div>
          <ModalCustom
            showModal={this.state.hideProjectDetail}
            onDissmis={(show) => this.setState({ hideProjectDetail: show })}
            Title={`${this.state.SelectedProj.ProjectsID}'s detail`}
            key={Math.random()}
            body={<div>
              <p>
                <span className={styles.title}>Project Id:</span>
                <span className={styles.subTitle}>{this.state.SelectedProj.ProjectsID}</span>
              </p>
              <p>
                <span className={styles.title}>Project Name:</span>
                <span className={styles.subTitle}>{this.state.SelectedProj.ProjectName}</span>
              </p>
              <p>
                <span className={styles.title}>Project Sector:</span>
                <span className={styles.subTitle}>{this.state.SelectedProj.Sector}</span>
              </p>
              <a hidden={this.state.showMore} href='#' onClick={() => this.setState({ showMore: !this.state.showMore })}>Show more..</a>
              <Collapse in={this.state.showMore}>
                <div>
                  <p>
                    <span className={styles.title}>Project ApprovalDate:</span>
                    <span className={styles.subTitle}> {this.state.SelectedProj.ApprovalDate && new Date(this.state.SelectedProj.ApprovalDate).toLocaleDateString()}</span>
                  </p>
                  <p>
                    <span className={styles.title}>Project BoardMeeting:</span>
                    <span className={styles.subTitle}> {this.state.SelectedProj.BoardMeeting}</span>
                  </p>
                  <p>
                    <span className={styles.title}>Project DurationMonths:</span>
                    <span className={styles.subTitle}> {this.state.SelectedProj.DurationMonths}</span>
                  </p>
                  <p>
                    <span className={styles.title}>Project EndDate:</span>
                    <span className={styles.subTitle}> {this.state.SelectedProj.EndDate && new Date(this.state.SelectedProj.EndDate).toLocaleDateString()}</span>
                  </p>
                  <p>
                    <span className={styles.title}>Project IndirectBeneficiaries:</span>
                    <span className={styles.subTitle}> {this.state.SelectedProj.IndirectBeneficiaries}</span>
                  </p>
                  <p>
                    <span className={styles.title}>Project LifeTimeCO2:</span>
                    <span className={styles.subTitle}> {this.state.SelectedProj.LifeTimeCO2}</span>
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
                    <span className={styles.title}>Project ApprovedRef:</span>
                    <span className={styles.subTitle}>{this.state.SelectedProj.ApprovedRef}</span>
                  </p>
                  <p>
                    <span className={styles.title}>Project StartDate:</span>
                    <span className={styles.subTitle}> {this.state.SelectedProj.StartDate && new Date(this.state.SelectedProj.StartDate).toLocaleDateString()}</span>
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
                    <span className={styles.subTitle}> {this.state.SelectedProj.TotalGCFFunding}</span>
                  </p>
                  <p>
                    <span className={styles.title}>Project TotalValue:</span>
                    <span className={styles.subTitle}> {this.state.SelectedProj.TotalValue}</span>
                  </p>
                  <a href='#' onClick={() => this.setState({ showMore: !this.state.showMore })}>Show less..</a>
                </div>
              </Collapse>
            </div>}
          />
          <p>This table is displaying all projects in pages, every page has 50 projects. You can search/filter projects by clicking on columns head eg.(ProjectID) and search row will pop.
            on actions column, there are two buttons: 1. to show project detail 2. to expand project and show all project extensions.
          </p>
          <Table size="lg" style={{ maxWidth: "90%", margin: "auto" }}>
            <thead>
              <tr>
                <th key={"ProjectsID"}>
                  <Button style={{ fontWeight: 500, width: "100%", background: "#f5f9f5" }} variant="light" onClick={() => this.setState({ showProjectSearc: !this.state.showProjectSearc })}>ProjectsID <VscFilter /></Button>
                </th>
                <th key={"ProjectName"}>
                  <Button style={{ fontWeight: 500, width: "100%", background: "#f5f9f5" }} variant="light" onClick={() => this.setState({ showProjectSearc: !this.state.showProjectSearc })}>ProjectName <VscFilter /></Button>
                </th>
                <th key={"Sector"}><Button style={{ fontWeight: 500, width: "100%", background: "#f5f9f5" }} variant="light" onClick={() => this.setState({ showProjectSearc: !this.state.showProjectSearc })}>Sector <VscFilter /></Button></th>
                <th key={"TotalValue"}><Button style={{ fontWeight: 500, width: "100%", background: "#f5f9f5" }} variant="light" onClick={() => this.setState({ showProjectSearc: !this.state.showProjectSearc })}>TotalValue <VscFilter /></Button>
                </th>
                <th key={"Actions"}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr hidden={!this.state.showProjectSearc}>
                <td key={"Search by ID"}><Form.Control
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
                <td key={"Search by Name"}><Form.Control
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
                <td key={"Search by Sector"}><DropdownButton id="dropdown-basic-button"
                  title={this.state.searchedPrjNum["key"] === "Sector" ? this.state.searchedPrjNum.value || "Clear" : "Sector"}>
                  <Dropdown.Item href="#/action-3" onClick={() => {
                    this.setState({ searchedPrjNum: { value: "", key: "Sector" } });
                    this.Filter(true);
                    setTimeout(() => {
                      this.getPageNum();
                    }, 100);
                  }}>Clear <MdOutlineClear /></Dropdown.Item>
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
                <td key={"Search by TotalValue"}><Form.Control
                  placeholder="Search by TotalValue"
                  aria-label="Search by TotalValue"
                  onChange={(e) => {
                    this.setState({ searchedPrjNum: { value: e.target.value, key: "TotalValue" } });
                    setTimeout(() => {
                      this.Filter(true);
                      this.getPageNum();
                    }, 100);
                  }}
                /></td>
                <td key={"#"}></td>
              </tr>
              {this.state.Projects.slice(this.state.pageNum === 50 ? 0 : this.state.pageNum, (this.state.pageNum + 50)).map((f, ix) =>
                <React.Fragment key={ix}>
                  <tr key={Math.random()} className={styles.Row} style={{ cursor: "pointer", boxShadow: "#00000017 2px 4px 4px 0px" }} >
                    <td style={{ width: "10%" }}>{f.ProjectsID}</td>

                    <td style={{ width: "45%" }}>{f.ProjectName}</td>

                    <td>{f.Sector}</td>

                    <td>{f.TotalValue.toLocaleString("en-us", { style: "currency", currency: "USD" })}</td>

                    <td style={{ maxWidth: "10%" }}>
                      <OverlayTrigger key={Math.random()} overlay={<Tooltip id="tooltip-disabled">See details!</Tooltip>}>
                        <Button className={styles.seeMoreBtn} variant='light'
                          onClick={() => {
                            this.setState({ SelectedProj: f, hideProjectDetail: !this.state.hideProjectDetail });
                            // this.ToggleHiddenProjectDetails(f.ProjectsID.toString());
                          }}
                        ><ImEyePlus /></Button>
                      </OverlayTrigger>
                      <OverlayTrigger key={Math.random()} overlay={<Tooltip id="tooltip-disabledExpand">Expand project externsions!</Tooltip>}>
                        <Button className={styles.seeMoreBtnExpand} variant='dark' onClick={() => this.ToggleHiddenTabs(f.ProjectsID.toString())}>{!this.state.hideTabs[f.ProjectsID] ? <AiOutlinePlus /> : <AiOutlineMinus />}</Button>
                      </OverlayTrigger>
                    </td>
                  </tr>

                  {this.renderTabs(f)}
                </React.Fragment>
              )}
            </tbody>
          </Table>
          <span style={{ color: "grey" }}>{this.state.Projects.length} Projects</span>
          <Pagination style={{ justifyContent: "center", margin: "10px" }}>
            <Pagination.Prev />
            {this.state.pageNumbers.map((num, ix) =>
              <Pagination.Item key={ix} active={(this.state.currentNum) === ix} onClick={() => {
                this.setState({ pageNum: this.state.pageNumbers[ix === 0 ? ix : ix - 1], currentNum: ix });
              }}>{ix + 1}</Pagination.Item>
            )}
            <Pagination.Next />
          </Pagination>
        </div >
      );
    }
    return (
      <div>
        <p>This table is displaying all projects in pages, every page has 50 projects. You can search/filter projects by clicking on columns head eg.(ProjectID) and search row will pop.
          on actions column, there are two buttons: 1. to show project detail 2. to expand project and show all project extensions.
        </p>
        <Spinner animation="grow" />;
      </div>
    );
  }

  private renderTabs(f: ProjektModel) {
    if (this.state.hideTabs[f.ProjectsID]) {
      return <tr key={Math.random()}>
        <td colSpan={5} style={{ background: "#99ca971a" }}>
          <Tabs
            style={{ placeContent: "center", marginTop: "4px", fontWeight: 500 }}
            hidden={!this.state.hideTabs[f.ProjectsID]}
            defaultActiveKey="Countries"
            // id="##uncontrolled-tab-example"
            className="mb-3"
            fill
            key={Math.random()}
          >
            <Tab hidden={!this.state.hideTabs[f.ProjectsID]} eventKey="Countries"
              title={<span>Countries ({f.Countries.length})</span>}>
              <GetContries Country={f.Countries} />
            </Tab>
            <Tab hidden={!this.state.hideTabs[f.ProjectsID]} eventKey="Disbursements"
              title={<span>Disbursements ({f.Disbursements && f.Disbursements.length})</span>}>
              <GetDisbursements Disbursement={f.Disbursements} />
            </Tab>
            <Tab hidden={!this.state.hideTabs[f.ProjectsID]} eventKey="Entities"
              title={<span>Entities ({f.Entities.length})</span>}>
              <GetEntities Entity={f.Entities} />
            </Tab>
            <Tab hidden={!this.state.hideTabs[f.ProjectsID]} eventKey="contact"
              title={<span>Funding ({f.Funding.length})</span>}>
              <GetFunding Funding={f.Funding} />
            </Tab>
            <Tab hidden={!this.state.hideTabs[f.ProjectsID]} eventKey="eye"
              title={<span>ResultAreas ({f.ResultAreas.length})</span>}>
              <GetResultAreas ResultAreas={f.ResultAreas} />
            </Tab>
          </Tabs>
        </td>
      </tr>;
    }
    return null;
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
    this.setState({ hideTabs: {} });
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
