import * as React from 'react';
import { Tab, Table, Tabs } from 'react-bootstrap';
import { ProjektModel } from '../Helper/Models';
import styles from './BootstrapList.module.css';

export interface IBootstrapListProps { Projects: ProjektModel[] }

export interface IBootstrapListState {
  hideTabs: any;
}

export default class BootstrapList extends React.Component<IBootstrapListProps, IBootstrapListState> {
  constructor(props: IBootstrapListProps) {
    super(props);
    this.state = {
      hideTabs: {}
    }

  }

  public render(): React.ReactElement<IBootstrapListProps> {
    return (
      <div>
        <p>Thus can my love excuse the slow offence Of my dull bearer when from thee I speed: From where thou art why should I haste me thence? Till I return, of posting is no need. </p>
        {this.props.Projects &&
          <Table bordered size="lg" style={{ maxWidth: "90%", margin: "auto" }}>
            <thead>
              <tr>
                <th>ProjectsID</th>
                <th>ProjectName</th>
                <th>Sector</th>
                <th>TotalValue</th>
              </tr>
            </thead>
            <tbody>
              {this.props.Projects.map(f =>
                <>
                  <tr className={styles.Row} style={{ cursor: "pointer" }} onClick={() =>
                    this.UPdateHiddenTabs(f.ProjectsID.toString())
                  }>
                    <td style={{ width: "10%" }}>{f.ProjectsID}</td>
                    <td style={{ width: "45%" }}>{f.ProjectName}</td>
                    <td>{f.Sector}</td>
                    <td>{f.TotalValue}</td>
                  </tr>
                  <tr>
                    <td colSpan={4}>
                      <Tabs
                        style={{ placeContent: "center", marginTop: "4px" }}
                        hidden={!this.state.hideTabs[f.ProjectsID]}
                        defaultActiveKey="##"
                        id="##uncontrolled-tab-example"
                        className="mb-3"
                      >
                        <Tab hidden={!this.state.hideTabs[f.ProjectsID]} eventKey="Countries" title="Countries">
                          Countries
                        </Tab>
                        <Tab hidden={!this.state.hideTabs[f.ProjectsID]} eventKey="Disbursements" title="Disbursements">
                          Disbursements
                        </Tab>
                        <Tab hidden={!this.state.hideTabs[f.ProjectsID]} eventKey="Entities" title="Entities">
                          Entities
                        </Tab>
                        <Tab hidden={!this.state.hideTabs[f.ProjectsID]} eventKey="contact" title="Contact" disabled>
                          Funding
                        </Tab>
                      </Tabs>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </Table>
        }
      </div>
    );
  }

  private UPdateHiddenTabs(prop: string) {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.hideTabs[prop] = !this.state.hideTabs[prop];
    this.setState({ hideTabs: { ...this.state.hideTabs } })
  }
}
