/* eslint promise/always-return: "off" */
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.func.isRequired,
  parser: PropTypes.func,
  url: PropTypes.string.isRequired,
};

const defaultProps = {
  parser: json => json,
};

class DataProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, data: null };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { parser, url } = this.props;

    // eslint-disable-next-line compat/compat
    fetch(url, { method: 'GET', mode: 'cors' })
      .then(response =>
        response.json().then(json => {
          this.setState({
            loading: false,
            data: parser(json),
          });
        }),
      )
      .catch(e => {
        console.warn(e);
        this.setState({ loading: false, error: e.message });
      });
  }

  render() {
    const { loading, data, error } = this.state;
    const { children } = this.props;

    if (loading) return '✨ Loading ...';
    if (error) {
      return 'An error occurred, see console for details';
    }

    return children(data);
  }
}

DataProvider.propTypes = propTypes;
DataProvider.defaultProps = defaultProps;

export default DataProvider;
