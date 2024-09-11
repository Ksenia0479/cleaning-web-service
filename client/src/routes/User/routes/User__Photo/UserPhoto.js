import React, { Component } from "react";
import { connect } from "react-redux";

// components
import { Form, Button, Fieldset, Legend } from "components";

// components - User
import { UserPhotoBox } from "./components";

// fields
import { AvatarField } from "fields";

// utils
import { appendFormData } from "utils";

// actions
import { fetchImage, updateImage, updatePreviewImage } from "store/actions";

class UserPhoto extends Component {
  componentDidMount() {
    this.props.fetchImage();
  }

  onFormSubmit = values => {
    const data = appendFormData(values);
    this.props.updateImage(data);
  };

  renderSubmitButton = () => {
    return <Button type="submit" value="Save image" className="btn-action" />;
  };

  render() {
    const { url, updatePreviewImage } = this.props;
    return (
      <Form
        form="UserPhotoEdit"
        onFormSubmit={this.onFormSubmit}
        submitButton={this.renderSubmitButton}
        destroyOnUnmount={false}
        className="user__form"
      >
        <Fieldset>
          <Legend>Add a nice photo of yourselft for your profile</Legend>
          <UserPhotoBox url={url} />
          <AvatarField updatePreviewImage={updatePreviewImage} />
        </Fieldset>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  let {
    images: {
      previewImage: { data: url }
    }
  } = state;

  return { url };
};
const mapDispatchToProps = { fetchImage, updateImage, updatePreviewImage };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPhoto);
