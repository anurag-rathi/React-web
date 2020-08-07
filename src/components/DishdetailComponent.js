import React , { Component } from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Col, Row, Label }  from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom'

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
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
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
                                   <Label htmlFor='name'>Your Name</Label>
                                   <Control.text model='.name' name='name' className='form-control' 
                                    validators = {{
                                        required, minLength: minLength(3) , maxLength: maxLength(15)
                                    }}
                                   />
                                   <Errors
                                        className="text-danger"
                                        model=".name"
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

   function RenderComments({comments}){
       
        if(comments!=null){
            return(
                <div className="col col-md-5 mt-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments.map( (comment) => {
                            return(
                                <li key={comment.id}>
                                   <p>{comment.comment}</p> 
                                   <p>--{comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                            );
                        })}
                    </ul>
                    <CommentForm />
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
              <Card>
                  <CardImg top src={dish.image} alt={dish.name} />
                  <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                   </CardBody>
               </Card>
            </div>
        );
    }
    
  const DishDetail = (props) => {      
        if(props.dish!=null){
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
                      <RenderComments comments = {props.comments} />
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