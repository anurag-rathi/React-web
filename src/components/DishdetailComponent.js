import React , { Component } from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Col, Row, Label }  from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom'
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform , Fade, Stagger } from 'react-animation-components';

  const required = (val) => val && val.length;
  const maxLength = (len) => (val) => !(val) || (val.length <= len);
  const minLength = (len) => (val) => val && (val.length >= len); 

 class CommentForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            isModelOpen : false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModelOpen : !this.state.isModelOpen
        })
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
    }

    render() {
        return(
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span>Submit Comment</Button>
                <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=> this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor='rating'>Rating</Label>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                   <Label htmlFor='author'>Your Name</Label>
                                   <Control.text model='.author' name='author' className='form-control' 
                                    validators = {{
                                        required, minLength: minLength(3) , maxLength: maxLength(15)
                                    }}
                                   />
                                   <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            maxLength: 'Must be 15 characters or less',
                                            minLength: 'Must be greater than 2 characters'
                                        }}
                                   />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col>
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model='.comment' name='comment' rows='6' className='form-control' />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col>
                                    <Button type='submit' color='primary'>Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
 }

   function RenderComments({comments, postComment , dishId}){
       
        if(comments!=null){
            return(
                <div className="col col-md-5 mt-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        <Stagger in >
                            {comments.map( (comment) => {
                                return(
                                  <Fade in >
                                    <li key={comment.id}>
                                    <p>{comment.comment}</p> 
                                    <p>--{comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                    </li>
                                  </Fade> 
                                );
                            })}
                        </Stagger>
                    </ul>
                    <CommentForm postComment={postComment} dishId={dishId} />
                </div>
            );
        }else{
            return(
                <div></div>
            );
        }
    }

   function RenderDish({dish}){
        return(
            <div className="col-12 col-md-5 m-1">
                <FadeTransform in 
                transformProps ={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}
                >
                    <Card>
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
              </FadeTransform>
            </div>
        );
    }
    
  const DishDetail = (props) => { 
      
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }

        else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }

        else if(props.dish!=null){
            return(
                <div className="container">
                   <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                      <RenderDish dish= {props.dish} />
                      <RenderComments comments = {props.comments} 
                         postComment = {props.postComment}
                         dishId = {props.dish.id}

                      />
                    </div>
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }

export default DishDetail;