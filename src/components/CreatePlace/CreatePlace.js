import React, { Component } from "react";
import SimpleMDE from "react-simplemde-editor";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import "./CreatePlace.scss";
import "easymde/dist/easymde.min.css";

class CreatePlace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placeInfoGroup: {
        title: "",
        description: "",
        address: "",
        latlng: "",
        imgfile: ""
      },
      tags: [],
      inputTag: "",
      imagePreviewUrl: ""
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.handleInputTagChange = this.handleInputTagChange.bind(this);
    this.handleTagKeyDown = this.handleTagKeyDown.bind(this);
    this.handleTagRemove = this.handleTagRemove.bind(this);

    this.submitPlaceForm = this.submitPlaceForm.bind(this);
  }

  handleTitleChange = event => {
    const placeInfoGroup = this.state.placeInfoGroup;
    placeInfoGroup[event.target.name] = event.target.value;

    this.setState({
      placeInfoGroup
    });
  };

  handleImageChange = event => {
    event.preventDefault();

    const reader = new FileReader();
    const file = event.target.files[0];
    const placeInfoGroup = this.state.placeInfoGroup;
    placeInfoGroup[event.target.name] = file;

    reader.onloadend = () => {
      this.setState({
        placeInfoGroup,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  handleDescriptionChange = description => {
    const placeInfoGroup = this.state.placeInfoGroup;
    placeInfoGroup["description"] = description;

    this.setState({
      placeInfoGroup
    });
  };

  handleAddressChange = address => {
    const placeInfoGroup = this.state.placeInfoGroup;
    placeInfoGroup["address"] = address;

    this.setState({
      placeInfoGroup
    });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        const placeInfoGroup = this.state.placeInfoGroup;
        placeInfoGroup["latlng"] = latLng;
        this.setState({
          placeInfoGroup
        });
      })
      .catch(error => console.error("Error", error));
  };

  handleInputTagChange(event) {
    this.setState({ inputTag: event.target.value });
  }

  handleTagKeyDown(event) {
    if (event.keyCode === 13) {
      const { value } = event.target;
      event.preventDefault();

      this.setState(state => ({
        tags: [...state.tags, value],
        inputTag: ""
      }));
    }

    if (
      this.state.tags.length &&
      event.keyCode === 8 &&
      !this.state.inputTag.length
    ) {
      this.setState(state => ({
        tags: state.tags.slice(0, state.tags.length - 1)
      }));
    }
  }

  handleTagRemove(index) {
    return () => {
      this.setState(state => ({
        tags: state.tags.filter((tag, i) => i !== index)
      }));
    };
  }

  submitPlaceForm = event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("imgfile", this.state.placeInfoGroup.imgfile);

    const placeInfo = this.state.placeInfoGroup;
    const tags = this.state.tags;
    this.props.onSubmit(formData, tags, placeInfo);

    const placeInfoGroup = {};
    placeInfoGroup["title"] = "";
    placeInfoGroup["description"] = "";
    placeInfoGroup["address"] = "";
    placeInfoGroup["latlng"] = "";
    placeInfoGroup["imgfile"] = "";

    this.setState({
      placeInfoGroup,
      tags: [],
      imagePreviewUrl: ""
    });
  };

  render() {
    let { imagePreviewUrl } = this.state;
    let imgfilePreview = null;
    if (imagePreviewUrl) {
      imgfilePreview = (
        <img className="previewImg" src={imagePreviewUrl} alt="Selected file" />
      );
    } else {
      imgfilePreview = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }

    return (
      <div className="CreatePlace">
        <div className="place-container">
          <div className="imgPreview">{imgfilePreview}</div>
          <form onSubmit={event => this.submitPlaceForm(event)}>
            <input
              type="file"
              name="imgfile"
              onChange={event => this.handleImageChange(event)}
            />

            <div className="place-title-wrapper">
              <label>제목</label>
              <input
                type="text"
                className="place-title"
                name="title"
                placeholder="제목을 입력하세요."
                onChange={event => this.handleTitleChange(event)}
              />
            </div>
            <SimpleMDE
              label="내용"
              value={this.state.placeInfoGroup.description}
              onChange={this.handleDescriptionChange}
              options={{
                autofocus: true,
                spellChecker: false
              }}
            />

            <PlacesAutocomplete
              value={this.state.placeInfoGroup.address}
              onChange={this.handleAddressChange}
              onSelect={this.handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "장소를 입력하세요.",
                      className: "location-search-input"
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: "#fafafa", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>

            <div className="tag-container">
              <ul className="tag-list">
                {this.state.tags.map((tag, index) => (
                  <li
                    key={index}
                    className="tag"
                    onClick={this.handleTagRemove(index)}
                  >
                    {tag}
                    <span>(x)</span>
                  </li>
                ))}
                <input
                  value={this.state.inputTag}
                  onChange={this.handleInputTagChange}
                  onKeyDown={this.handleTagKeyDown}
                  placeholder="태그를 입력하세요."
                />
              </ul>
            </div>

            <button type="submit" className="submit-place-button">
              제출
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreatePlace;
