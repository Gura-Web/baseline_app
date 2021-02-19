import axios from 'axios';
import { motion } from 'framer-motion';
import React from 'react';
import { useLocation } from 'react-router';
import { searchCompany } from '../../assets/script/index';
import { pageTransitionNormal } from '../../assets/script/pageTransition';
import { ActionBtn } from '../Atoms/Btn/index';
import { Sort } from '../Atoms/Input';
import { Company } from '../Molecules/Card';
import { Pagenation } from '../Organisms/Header';

import { CompanySearch } from '../Organisms/Window';

interface Props {
  homeFreeWord: any | undefined;
}

class SearchCompany extends React.Component<Props, any> {
  constructor(props: any) {
    // console.log(props.location);
    super(props);
    this.state = {
      companies: [],
      data: [],
      query: {},
      homeFreeWord: this.props.homeFreeWord,
    };
  }
  renderLength = 5; // １ページあたりのデータ件数
  page = 1;

  componentWillMount() {
    searchCompany().then((getData: any) => {
      this.setState({
        data: getData.data,
        companies: getData.data.data,
      });
      console.log(getData.data);
    });
  }

  searchCompanyWithParam = (param: any) => {
    console.log(param);
    // クエリの保存
    this.setState({
      query: {
        ...this.state.query,
        ...param,
      },
    });
    // クエリを使って検索
    searchCompany({ ...this.state.query, ...param }).then((getData: any) => {
      this.setState({
        data: getData.data,
        companies: getData.data.data,
      });
    });
  };

  componentDidMount() {
    const url = './database/companies.json';
    axios.get(url).then(res => {
      this.setState({
        data: res.data,
        companiesLength: res.data.length,
        totalPage: Math.ceil(res.data.length / this.renderLength),
      });
    });
  }

  render() {
    return (
      <motion.section
        className="app-main searchCompany"
        initial="out"
        animate="in"
        exit="out"
        variants={pageTransitionNormal}
      >
        <h2 className="heading1">企業を探す</h2>

        <div className="app-main__container">
          <CompanySearch
            className={'left-col'}
            searchFunc={this.searchCompanyWithParam}
            homeFreeWord={this.state.homeFreeWord}
          />
          <div className="right-col">
            <div className="right-col__header">
              <Sort searchFunc={this.searchCompanyWithParam} />
              <ActionBtn
                type="button"
                txt="企業を新規掲載"
                isPlus={true}
                linkUrl="company-insert/register"
              />
            </div>
            <div className="company-list">
              {this.state.companies.map((data: any) => (
                <Company
                  companyId={data.id}
                  class={'item'}
                  name={data.company_name}
                  business={data.business_description}
                  pref={data.prefectures}
                  registerTime={data.created_at}
                  img={data.logo_image_url}
                />
              ))}
            </div>
          </div>
        </div>
        {this.state.companies.length > 0 ? (
          <Pagenation
            searchFunc={this.searchCompanyWithParam}
            lastPage={this.state.data.last_page}
          />
        ) : (
          ''
        )}
      </motion.section>
    );
  }
}

export default SearchCompany;
