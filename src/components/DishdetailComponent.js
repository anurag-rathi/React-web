import React , { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle }  from 'reactstrap';

class Dishdetail extends Component {
   
    constructor(props){
        super(props);
        this.state = {

        }
    }
    
    render(){   
        
        if(this.props.dish!=null){

            const renderComments = this.props.dish.comments.map((comment) => {
                return(
                    <div key={comment.id}>
                         <ul className="list-unstyled">
                            <li>{comment.comment}</li>
                            <li>--{comment.author}</li>
                         </ul>
                    </div>
                   
                );
            });

            return(
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                            <Card>
                                <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                                <CardBody>
                                    <CardTitle>{this.props.dish.name}</CardTitle>
                                    <CardText>{this.props.dish.description}</CardText>
                                </CardBody>
                        </Card>
                    </div>
                    <div className="col col-md-5 mt-1">
                        <h4>Comments</h4>
                        {renderComments}
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
}

export default Dishdetail;