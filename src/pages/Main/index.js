import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Form, SubmitButton, List } from './styles';
import Container from '../../components/Container';

import api from '../../services/api';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
  };

  // Carrega do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Salva no localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = (e) => {
    this.setState({ newRepo: e.target.value, error: false });
  };

  handleSubmit = async (e) => {
    try {
      e.preventDefault();
      this.setState({ loading: true, error: false });
      const { repositories, newRepo } = this.state;

      /**
       * Check duplicated repository
       */
      if (repositories.some((repository) => repository.name === newRepo)) {
        throw new Error('Repositório duplicado');
      }

      /**
       * Get repository from API
       */
      const response = await api.get(`/repos/${newRepo}`);
      const data = {
        name: response.data.full_name,
        description: response.data.description,
      };

      /**
       * Add to state
       */
      return this.setState({
        newRepo: '',
        repositories: [...repositories, data],
        loading: false,
        error: false,
      });
    } catch (err) {
      this.setState({ loading: false, error: true });
    }
  };

  render() {
    const { newRepo, repositories, loading, error } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} error={error ? 1 : 0}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map((repo) => (
            <li key={repo.name}>
              <span>{repo.name}</span>
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
