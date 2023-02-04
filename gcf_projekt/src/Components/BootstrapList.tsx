import * as React from 'react';
import { Badge, Button, Col, Form, InputGroup, Pagination, Row, Tab, Table, Tabs } from 'react-bootstrap';
import { ProjektModel } from '../Helper/Models';
import styles from './BootstrapList.module.css';
import { GetContries, GetDisbursements, GetEntities, GetFunding } from './MiniComponents';

export interface IBootstrapListProps { Projects: ProjektModel[] }

export interface IBootstrapListState {
  hideTabs: any;
  Projects: ProjektModel[];
  pageNumbers: number[]
  pageNum: number;
  currentNum: number;
  searchedPrjNum: string;
  searchValue: string;
}

export default class BootstrapList extends React.Component<IBootstrapListProps, IBootstrapListState> {
  constructor(props: IBootstrapListProps) {
    super(props);
    this.state = {
      searchValue: "",
      hideTabs: {},
      Projects: this.props.Projects,
      pageNumbers: [],
      pageNum: 0,
      searchedPrjNum: "",
      currentNum: 0
    }

  }
  public componentDidMount(): void {
    this.setState({Projects: this.props.Projects});
    this.getPageNum();
  }
  public componentWillUpdate(nextProps: IBootstrapListProps, nextState: IBootstrapListState): void {
    console.log({nextState});
    if(this.state.searchValue !== nextState.searchValue) {
      this.getPageNum();
    }
  }
  public render(): React.ReactElement<IBootstrapListProps> {
    return (
      <div>
        <p>Thus can my love excuse the slow offence Of my dull bearer when from thee I speed: From where thou art why should I haste me thence? Till I return, of posting is no need. </p>
        <InputGroup style={{ maxWidth: "400px", margin: "auto" }} className="mb-3">
          <Form.Control
            placeholder="Search by ProjectsID"
            aria-label="Search by ProjectsID"
            aria-describedby="basic-addon2"
            onChange={(e) => {
              this.setState({ searchedPrjNum: e.target.value });
              this.getPageNum();
            }}
          />
          <Button onClick={() => {
            this.setState({ searchValue: this.state.searchedPrjNum });
            this.getPageNum();
          }} variant="outline-secondary" id="button-addon2">
            Search
          </Button>
        </InputGroup>

        {this.state.Projects &&
          <Table key={"ffffff"} bordered size="lg" style={{ maxWidth: "90%", margin: "auto" }}>
            <thead>
              <tr key={"f"}>
                <th key={"ProjectsID"}>ProjectsID</th>
                <th key={"ProjectName"}>ProjectName</th>
                <th key={"Sector"}>Sector</th>
                <th key={"TotalValue"}>TotalValue</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Projects.filter(f => parseInt(this.state.searchValue) > 0 ? f.ProjectsID.toString().startsWith(this.state.searchValue) : true).slice(this.state.pageNum, (this.state.pageNum + 50)).map((f, ix) =>
                <>
                  <tr key={ix} className={styles.Row} style={{ cursor: "pointer" }} onClick={() =>
                    this.UPdateHiddenTabs(f.ProjectsID.toString())
                  }>
                    <td key={"PrjID" + ix.toString()} style={{ width: "10%" }}>{f.ProjectsID}</td>
                    <td key={"Prj" + ix.toString()} style={{ width: "45%" }}>{f.ProjectName}</td>
                    <td key={"Sec" + ix.toString()}>{f.Sector}</td>
                    <td key={"Tot" + ix.toString()}>{f.TotalValue}</td>
                  </tr>
                  <tr key={f.ProjectsID.toString() + ix}>
                    <td key={"fffffff"} colSpan={4}>
                      <Tabs
                        style={{ placeContent: "center", marginTop: "4px" }}
                        hidden={!this.state.hideTabs[f.ProjectsID]}
                        defaultActiveKey="##"
                        id="##uncontrolled-tab-example"
                        className="mb-3"
                        fill
                      >
                        <Tab hidden={!this.state.hideTabs[f.ProjectsID]} eventKey="Countries"
                          title={<div>Countries ({f.Countries.length})</div>}>
                          <GetContries Country={f.Countries} />
                        </Tab>
                        <Tab hidden={!this.state.hideTabs[f.ProjectsID]} eventKey="Disbursements"
                          title={<div>Disbursements ({f.Countries.length})</div>}>
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
                          title={"Show all fields"} />
                      </Tabs>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </Table>
        }
        <Pagination style={{ justifyContent: "center", margin: "10px" }}>
          <Pagination.Prev />
          {this.state.pageNumbers.map((num, ix) =>
            <Pagination.Item active={(this.state.currentNum) === ix} onClick={() => {
              console.log({ ix }, { num }, this.state.currentNum, this.state.pageNum, this.state.pageNumbers);
              this.setState({ pageNum: this.state.pageNumbers[ix === 0 ? ix : ix - 1], currentNum: ix });
            }}>{ix + 1}</Pagination.Item>
          )}
          <Pagination.Next />
        </Pagination>
      </div>
    );
  }

  private UPdateHiddenTabs(prop: string) {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.hideTabs[prop] = !this.state.hideTabs[prop];
    this.setState({ hideTabs: { ...this.state.hideTabs } })
  }


  private getPageNum() {
    const pageNumbers = [];
    for (let ix = 1; ix < this.state.Projects.filter(f => parseInt(this.state.searchValue) > 0 ? f.ProjectsID.toString().startsWith(this.state.searchValue) : true).length / 50; ix++) {
      pageNumbers.push(ix * 50);
      console.log({ ix }, { pageNumbers });

    }
    pageNumbers.push(this.state.Projects.length);
    this.setState({ pageNumbers });
  }
}
