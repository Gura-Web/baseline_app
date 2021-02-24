import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { topInfo } from '../actions/usecase/Top/top';
import { Top } from '../components/Pages';
import { TopInfoState } from '../reducers/topInfo';
import { TopInfo } from '../services/models';

interface StateProps {
  topInformation: TopInfo;
  isLoading: boolean;
}

interface DispatchProps {
  getTopInfoStart: () => void;
}

type EnhancedTopInfoProps = StateProps & DispatchProps;

const mapStateToProps = (state: { topInfo: TopInfoState }): StateProps => ({
  topInformation: state.topInfo.topInfo,
  isLoading: state.topInfo.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators({ getTopInfoStart: () => topInfo.getStart() }, dispatch);

const TopPageContainer: FC<EnhancedTopInfoProps> = ({
  isLoading,
  topInformation,
  getTopInfoStart,
}) => {
  useEffect(() => {
    getTopInfoStart();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Top isLoading={isLoading} topInfo={topInformation} />;
};

export const TopPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopPageContainer);
