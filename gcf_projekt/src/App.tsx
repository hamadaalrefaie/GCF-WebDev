import React from 'react';
import './App.css';
import { ProjektModel } from './Helper/Models';
import { FetchProjects } from './Helper/Utility';
import BootstrapList from './Components/BootstrapList';
import DemoData from './Helper/DemoData.json';

export interface IAppProps { }

export default class App extends React.Component<IAppProps, { Projekts: ProjektModel[] }> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      Projekts: []
    }

  }

  public componentDidMount(): void {
    this.GetProjects();
  }
  public render(): React.ReactNode {
    return (
      <div className="App">
        <h1>Projects</h1>
        <BootstrapList Projects={this.state.Projekts} />

        {/* <Tabs
          style={{ placeContent: "center", marginTop: "10px" }}
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="fluentUi" title="Fluent Ui">
            <FluentUIList Projects={this.state.Projekts} />
          </Tab>
          <Tab eventKey="Bootstrap" title="Bootstrap">
            <BootstrapList Projects={this.state.Projekts} />
          </Tab>
        </Tabs> */}
      </div>
    );
  }

  private async GetProjects() {
    try {
      const prjs = await FetchProjects();
      this.setState({ Projekts: prjs });
    } catch (e) {
      console.log({ e });
      this.setState({ Projekts: DemoData as any });
    }
  }
}
