import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import PlaceMap from "../Map/PlaceMap";
import "./PlaceDetails.scss";

class PlaceDetails extends Component {
  componentDidMount() {
    this.props.onLoad(this.props.match.params.place_id);
  }

  render() {
    console.log("플레이스 디테일 프랍스: ", this.props.placeDetails);
    return (
      <div className="PlaceDetails">
        <div className="place-details-container">
          <div className="place-details-header">
            <h1 className="place-details-title">
              {this.props.placeDetails.title}
            </h1>
            <span>{this.props.placeDetails.address}</span>
            {/* <span>{this.props.placeDetails.evaluation}</span> */}
            <span>{this.props.placeDetails.created_by}</span>
          </div>

          <div className="place-details-main">
            <div className="place-details-picture">
              <img
                src={this.props.placeDetails.place_picture}
                alt="place detail pic"
              />
            </div>
            <div className="place-details-descriptoin">
              <ReactMarkdown source={this.props.placeDetails.description} />
            </div>
            <div className="place-details-tags">
              {this.props.placeDetails.tag
                ? this.props.placeDetails.tag.map((tag, index) => (
                    <span className="tag" key={index}>
                      {tag}
                    </span>
                  ))
                : ""}
            </div>
            <div className="place-details-map">
              <PlaceMap
                location={this.props.placeDetails.location}
                address={this.props.placeDetails.address}
              />
            </div>
          </div>

          <div className="place-details-comments">
            <form>
              <input type="text" />
              <input type="submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PlaceDetails;
