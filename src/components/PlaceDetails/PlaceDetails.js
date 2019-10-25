import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Rating from "react-rating";
import PlaceMap from "../Map/PlaceMap";
import {
  MdStar,
  MdStarBorder,
  MdFavorite,
  MdFavoriteBorder,
  MdLocationOn,
  MdPerson,
  MdPoll,
  MdDateRange
} from "react-icons/md";
import "./PlaceDetails.scss";

class PlaceDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentText: "",
      score: 0
    };

    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleScoreClick = this.handleScoreClick.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.submitFavoritePlace = this.submitFavoritePlace.bind(this);
    this.removeFavoritePlace = this.removeFavoritePlace.bind(this);
  }

  componentDidMount() {
    const placeId = this.props.match.params.place_id;
    this.props.onLoad(placeId);
    this.props.onLoadComment(placeId);
  }

  componentDidUpdate() {
    const placeId = this.props.match.params.place_id;
    this.props.onLoadComment(placeId);
  }

  handleCommentChange = event => {
    this.setState({
      commentText: event.target.value
    });
  };

  handleScoreClick = rate => {
    this.setState({
      score: rate
    });
  };

  submitComment = event => {
    event.preventDefault();

    const placeId = this.props.match.params.place_id;
    const text = this.state.commentText;
    const score = this.state.score;

    this.props.onSubmit(placeId, text, score);

    this.setState({
      commentText: "",
      score: 0
    });
  };

  submitFavoritePlace = event => {
    event.preventDefault();

    const placeId = this.props.match.params.place_id;
    this.props.registerFavoritePlace(placeId);
  };

  removeFavoritePlace = event => {
    event.preventDefault();

    const placeId = this.props.match.params.place_id;
    this.props.deleteFavoritePlace(placeId);
  };

  render() {
    return (
      <div className="PlaceDetails">
        <div className="place-details-container">
          <div className="place-details-header">
            <div className="place-details-header-info">
              <h1 className="place-details-title">
                {this.props.placeDetails.title}
              </h1>
              <span className="place-details-location">
                <MdLocationOn className="MdLocationOn" />
                {this.props.placeDetails.address}
              </span>
              <span className="place-details-author">
                <MdPerson className="MdPerson" />
                {this.props.placeDetails.created_by}
              </span>
              <span className="place-details-rate">
                {this.props.comments.length === 0 ? (
                  <span className="place-details-no-rate">
                    <MdPoll className="MdPoll" />
                    평점이 없습니다 -
                  </span>
                ) : (
                  <Rating
                    emptySymbol={<MdStarBorder className="MdStarBorder" />}
                    fullSymbol={<MdStar className="MdStar" />}
                    initialRating={this.props.avgScore}
                    className="place-details-rate-image"
                    readonly
                  />
                )}
              </span>
              <span className="place-details-score">
                {this.props.avgScore}점
              </span>
            </div>

            <div className="place-favorite">
              {this.props.favoritePlace.length !== 0 ? (
                this.props.favoritePlace.find(
                  place => place === this.props.placeDetails._id
                ) ? (
                  <MdFavorite
                    onClick={this.removeFavoritePlace}
                    className="MdFavorite"
                  />
                ) : (
                  <MdFavoriteBorder
                    onClick={this.submitFavoritePlace}
                    className="MdFavoriteBorder"
                  />
                )
              ) : (
                <MdFavoriteBorder onClick={this.submitFavoritePlace} />
              )}
            </div>
          </div>

          <div className="place-details-main">
            <div className="place-details-main-left-container">
              <div className="place-details-picture">
                <img
                  src={this.props.placeDetails.place_picture}
                  alt="place detail pic"
                />
              </div>

              <div className="place-details-map">
                <PlaceMap
                  location={this.props.placeDetails.location}
                  address={this.props.placeDetails.address}
                />
              </div>
            </div>

            <div className="place-details-main-right-container">
              <div className="place-details-descriptoin">
                <ReactMarkdown source={this.props.placeDetails.description} />
              </div>

              <div className="place-details-tags">
                {this.props.placeDetails.tag
                  ? this.props.placeDetails.tag.map((tag, index) => (
                      <li key={index}>
                        <span>#{tag}</span>
                      </li>
                    ))
                  : ""}
              </div>

              <div className="place-details-comments">
                {this.props.isAuthenticated ? (
                  <div className="write-comments">
                    <form>
                      <div className="write-comments-rate">
                        <Rating
                          initialRating={this.state.score}
                          emptySymbol={
                            <MdStarBorder className="MdStarBorder" />
                          }
                          fullSymbol={<MdStar className="MdStar" />}
                          fractions={2}
                          className="place-details-rate-image"
                          onClick={rate => this.handleScoreClick(rate)}
                        />
                      </div>
                      <input
                        type="text"
                        name="content"
                        value={this.state.commentText}
                        className="write-comments-text"
                        onChange={event => this.handleCommentChange(event)}
                        placeholder="저작권 등 다른 사람의 권리를 침해하거나 명예를 훼손하는 게시물은 제재를 받을 수 있습니다."
                      />
                      <input
                        type="submit"
                        className="write-comments-submit"
                        onClick={event => this.submitComment(event)}
                      />
                    </form>
                  </div>
                ) : (
                  <div className="require-login">
                    <NavLink exact to={"/signin"}>
                      <button>인</button>
                    </NavLink>
                    <span> 후 댓글을 작성할 수 있습니다.</span>
                  </div>
                )}
                <div className="show-comments">
                  <ul>
                    {this.props.comments.length !== 0 ? (
                      this.props.comments.map(comment => (
                        <li key={comment._id} className="comments-list">
                          <div className="comment-by">
                            <MdPerson className="MdPerson" />
                            {comment.created_by}
                          </div>
                          <div className="comment-text">
                            {comment.comment_text}
                          </div>
                          <div className="comment-date">
                            <MdDateRange className="MdDateRange" />
                            {comment.created_at.slice(0, 10)}
                          </div>
                        </li>
                      ))
                    ) : (
                      <div className="comment-error-msg">
                        {this.props.commentErrorMsg}
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlaceDetails;
