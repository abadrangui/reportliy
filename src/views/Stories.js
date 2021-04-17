import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody
} from 'reactstrap';
// reactstrap components
import {
    Container,
    Row,
} from "reactstrap";
import { firestore } from "../firebase";

class Stories extends React.Component {
    state = {
        loading: true,
        fetchData: [],

    }

    componentDidMount() {
        firestore.collection('stories').onSnapshot(snapshot => {
            if (!snapshot.empty) {
                let array = [];
                snapshot.forEach(doc => {
                    array.push({ ...doc.data(), id: doc.id })
                })
            }
            this.setState({ fetchData: array, loading: false });
        })
    }

    render() {
        const { history } = this.props;
        const json = '{"title":"Жишээ", "image":"https://bit.ly/3tnQtVP", "text": "sample"}';
        const obj = JSON.parse(json);
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
                        <Container className="pt-lg-7">
                            <Row className="justify-content-center">
                                <h1>ТҮҮХҮҮД</h1>
                            </Row>
                        </Container>
                    </section>
                    <CardDeck>
                        <Card>
                            <CardImg top width="100%" src={obj.image} alt="Card image cap" />
                            <CardBody>
                                <CardTitle tag="h5">{obj.title}</CardTitle>
                                <CardText>{obj.text}</CardText>
                                <Link to={{ pathname: '/storiesdetail', state: { title: obj.title, text: obj.text } }}>
                                    <Button>
                                        Цааш унших
            </Button>
                                </Link>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardImg top width="100%" src={obj.image} alt="Card image cap" />
                            <CardBody>
                                <CardTitle tag="h5">{obj.title}</CardTitle>
                                <CardText>{obj.text}</CardText>
                                <Link to={{ pathname: '/storiesdetail', state: { title: obj.title, text: obj.text } }}>
                                    <Button>
                                        Цааш унших
            </Button>
                                </Link>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardImg top width="100%" src={obj.image} alt="Card image cap" />
                            <CardBody>
                                <CardTitle tag="h5">{obj.title}</CardTitle>
                                <CardText>{obj.text}</CardText>
                                <Link to={{ pathname: '/storiesdetail', state: { title: obj.title, text: obj.text } }}>
                                    <Button>
                                        Цааш унших
            </Button>
                                </Link>
                            </CardBody>
                        </Card>
                    </CardDeck>
                </main>
            </>
        )

    }
}

export default Stories;