import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Rating from "react-rating";
import PlaceMap from "../Map/PlaceMap";
import {
  MdStar,
  MdStarBorder,
  MdDelete,
  MdFavorite,
  MdFavoriteBorder
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
  }

  componentDidMount() {
    const placeId = this.props.match.params.place_id;
    this.props.onLoad(placeId);
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

  render() {
    return (
      <div className="PlaceDetails">
        <div className="place-details-container">
          <div className="place-details-header">
            <div className="place-details-header-info">
              <h1 className="place-details-title">
                {this.props.placeDetails.title}
              </h1>
              <span>{this.props.placeDetails.address}</span>
              <span>
                {this.props.comments.length === 0 ? (
                  "평점이 없습니다."
                ) : (
                  <Rating initialRating={this.props.avgScore} readonly />
                )}
              </span>
              <span>{this.props.placeDetails.created_by}</span>
            </div>
            <div className="place-favorite">
              <MdFavoriteBorder onClick={this.submitFavoritePlace} />
            </div>
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
            {this.props.isAuthenticated ? (
              <div className="write-comments">
                <form>
                  <input
                    type="text"
                    name="content"
                    value={this.state.commentText}
                    onChange={event => this.handleCommentChange(event)}
                    placeholder="저작권 등 다른 사람의 권리를 침해하거나 명예를 훼손하는 게시물은 이용약관 및 관련 법률에 의해 제재를 받을 수 있습니다. 건전한 토론문화와 양질의 댓글 문화를 위해, 타인에게 불쾌감을 주는 욕설 또는 특정 계층/민족, 종교 등을 비하하는 단어들은 표시가 제한됩니다."
                  />
                  <div>
                    <Rating
                      emptySymbol={<MdStarBorder />}
                      fullSymbol={<MdStar />}
                      fractions={2}
                      onChange={rate => this.handleScoreClick(rate)}
                    />
                  </div>
                  <input
                    type="submit"
                    onClick={event => this.submitComment(event)}
                  />
                </form>
              </div>
            ) : (
              <div className="require-login">
                <div>로그인 후 댓글을 작성할 수 있습니다.</div>
                <NavLink exact to={"/signin"}>
                  <button>로그인</button>
                </NavLink>
              </div>
            )}
            <div className="show-comments">
              <ul>
                {this.props.comments.length !== 0 ? (
                  this.props.comments.map(comment => (
                    <li key={comment._id} className="comments-list">
                      <div className="comment-by">{comment.created_by}</div>
                      <div className="comment-text">{comment.comment_text}</div>
                      <div className="comment-date">
                        {comment.created_at.slice(0, 10)}
                      </div>
                    </li>
                  ))
                ) : (
                  <div>{this.props.commentErrorMsg}</div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlaceDetails;
