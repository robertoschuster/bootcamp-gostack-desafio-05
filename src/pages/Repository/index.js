import React, { Component } from 'react';
import { FaSpinner } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import {
  Loading,
  Owner,
  IssueList,
  NavButton,
  NavGroup,
  FilterGroup,
} from './styles';
import Container from '../../components/Container/index';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    page: 1,
    state: 'open',
  };

  componentDidMount() {
    this.loadIssues();
  }

  componentDidUpdate(_, prevState) {
    const { page, state } = this.state;

    if (prevState.page !== page || prevState.state !== state) {
      this.loadIssues();
    }
  }

  handlePrevPage = () => {
    console.log('PrevPage');
    const { page } = this.state;
    if (page > 1) {
      this.setState({ page: page - 1 });
    }
  };

  handleNextPage = () => {
    console.log('NextPage');
    const { page } = this.state;
    this.setState({ page: page + 1 });
  };

  handleFilterChange = (e) => {
    console.log('handleFilterChange', e.target.value);
    this.setState({ state: e.target.value });
  };

  async loadIssues() {
    const { match } = this.props;
    const { page, state } = this.state;
    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state,
          page,
          per_page: 5,
        },
      }),
    ]);

    console.log(issues);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { repository, issues, loading, page } = this.state;

    if (loading) {
      return (
        <Loading>
          <FaSpinner color="#FFF" />
          Carregando...
        </Loading>
      );
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar para os repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          <FilterGroup>
            <select onChange={this.handleFilterChange} defaultValue="open">
              <option value="all">Todas</option>
              <option value="open">Abertas</option>
              <option value="closed">Fechadas</option>
            </select>
          </FilterGroup>

          {issues.map((issue) => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map((label) => (
                    <span
                      key={String(label.id)}
                      style={{ backgroundColor: `#${label.color}` }}
                    >
                      {label.name}
                    </span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <NavGroup>
          <NavButton
            firstPage={page === 1}
            onClick={this.handlePrevPage}
          >{`< Voltar`}</NavButton>
          <NavButton onClick={this.handleNextPage}>{`Próximo >`}</NavButton>
        </NavGroup>
      </Container>
    );
  }
}
