import React from "react";

export default (Header, Context) => {
  return class extends React.Component {
    render() {
      return (
        <React.Fragment>
          <Header {...this.props} />
          <Context {...this.props} />
        </React.Fragment>
      );
    }
  };
};
