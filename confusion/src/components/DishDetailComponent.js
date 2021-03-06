import React from "react";
import {
	Card, CardText, CardBody, CardLink,
	CardTitle, CardSubtitle, CardImg
} from 'reactstrap';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentFormComponent'
import LoadingComponent from './LoadingComponent'
import baseUrl from '../shared/baseUrl'
import FadeIn from 'react-fade-in';

function DishDetail(props) {

	const comments = props.comments.map((comment) => {
		var d = new Date(comment.date);
		return (
			
				<div className="mt-2" key={comment.id}>
					<ListGroupItem >
						<ListGroupItemHeading>{comment.comment}</ListGroupItemHeading>
						<ListGroupItemText>
							--{comment.author} , {d.toUTCString()}
						</ListGroupItemText>
					</ListGroupItem>
				</div>
			

		)
	});
	
	function renderDish() {

		if (props.isDishLoading) {
			return (
				<div>
					<LoadingComponent></LoadingComponent>
				</div>
			);
		} else if (props.dishErr != null) {
			return (
				<div>
					<h4>{props.dishErr}</h4>
				</div>
			);
		} else {
			return (
				<div className="col-12 col-md-6 ">
					<Card body inverse color="danger">
						<CardImg top width="100%" src={baseUrl + props.dish.image} alt={props.dish.name} />
						<CardBody>
							<CardTitle tag="h5">
								{props.dish.name}
							</CardTitle>
							<CardText>
								{props.dish.description}
							</CardText>
						</CardBody>
					</Card>
				</div>
			);
		}
	}

	function renderComments() {
		if (props.isCommentLoading) {
			return (
				<div>
					<LoadingComponent></LoadingComponent>
				</div>
			);
		} else if (props.commentErr != null) {
			return (
				<div>
					<h4>{props.commentErr}</h4>
				</div>
			);
		} else {


			comments.push(<CommentForm dishId={props.dish.id}
				addComment={props.addComment} />)


			return (
				<div className="col-12 col-md-6">
					<h4> Comments </h4>
					<FadeIn>
						{comments}
					</FadeIn>
				</div>
			);

		}

	}



	return (
		<div className="container">
			<div className="row mt-5">
				<Breadcrumb>
					<BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
					<BreadcrumbItem active>{props.dish ? props.dish.name : ""}</BreadcrumbItem>
				</Breadcrumb>
				<div className="col-12">
					<h3>{props.dish ? props.dish.name : ""}</h3>
					<hr />
				</div>
			</div>
			<div className="row mt-5">
				{renderDish()}
				{renderComments()}
			</div>
		</div>
	);


}

export default DishDetail;