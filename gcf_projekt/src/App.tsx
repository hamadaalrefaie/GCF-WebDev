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
