import * as React from 'react';
import { ProjektModel } from '../Helper/Models';
import styles from './FluentUIList.module.scss';

export interface IFluentUIListProps {Projects: ProjektModel[]}

export interface IFluentUIListState {}

export default class FluentUIList extends React.Component<IFluentUIListProps, IFluentUIListState> {
  public render(): React.ReactElement<IFluentUIListProps> {
    return (
      <div>
        <p>Thus can my love excuse the slow offence Of my dull bearer when from thee I speed: From where thou art why should I haste me thence? Till I return, of posting is no need. </p>
      </div>
    );
  }
}
