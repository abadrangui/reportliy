import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom'
import {
Card, Button, CardImg, CardTitle, CardText, CardDeck,
        CardSubtitle, CardBody
        } from 'reactstrap';
// reactstrap components
import {
Container,
        Row,
        } from "reactstrap";
class StoriesDetail extends React.Component {

    render() {
        const {history}
        = this.props;

            return (
                    <>
<main>
    <section className="section section-shaped section-lg">
        <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
        </div>
    </section>
    <CardDeck>
        <Card>
        <CardBody>
            <CardTitle tag="h5">
            {this.props.location.state.title}</CardTitle>
            <CardText>{this.props.location.state.text}</CardText>
        </CardBody>
        </Card>
    </CardDeck>
</main>
</>
)

}
}

export default StoriesDetail;