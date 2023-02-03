import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Tab, Tabs } from 'react-bootstrap';
import { ProjektModel } from './Helper/Models';
import { FetchProjects } from './Helper/Utility';
import FluentUIList from './Components/FluentUIList';
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
        <Tabs
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
        </Tabs>
      </div>
    );
  }

  private async GetProjects() {
    try {
      const prjs = await FetchProjects();
      console.log({ prjs });
      this.setState({ Projekts: prjs });
    } catch (e) {
      console.log({ e });
      console.log({ DemoData });
      this.setState({ Projekts: DemoData as any });
    }
  }
}
