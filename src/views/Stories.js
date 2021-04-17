import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

import {
    Card, Button, Col, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody
} from 'reactstrap';
// reactstrap components
import {
    Container,
    Row,
} from "reactstrap";
import { firestore } from "../firebase";
import testStroy from "./testStroy";
class Stories extends React.Component {
    state = {
        loading: true,
        fetchData: testStroy,
    }

    // componentDidMount() {
    //     firestore.collection('stories').onSnapshot(snapshot => {
    //         if (!snapshot.empty) {
    //             let array = [];
    //             snapshot.forEach(doc => {
    //                 array.push({ ...doc.data(), id: doc.id })
    //             })
    //         }
    //         this.setState({
    //             fetchData: array,
    //             loading: false
    //         });
    //     })
    // }

    render() {
        const { fetchData } = this.state
        const { history } = this.props;
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
                                <h1 className="text-white">ТҮҮХҮҮД</h1>
                            </Row>
                        </Container>
                    </section>
                    <Container>
                        {fetchData.length && fetchData.map((report) => {
                            return (
                                <Card>
                                    <Row>
                                        <Col lg="4" style={{display:'flex', flexDirection: 'column' }}>
                                            <img
                                                className="story-image"
                                                xtop width="50px"
                                                src={report.image}
                                                alt="designed by freepik.com" />
                                                <a href="http://www.freepik.com">Designed by Freepik</a>
                                        </Col>
                                        
                                        <Col lg="8">
                                            <CardBody>
                                                <CardTitle tag="h5" > {report.name} </CardTitle>
                                                <CardTitle> {report.text} </CardTitle>
                                            </CardBody>
                                        </Col>
                                    </Row>
                                </Card>
                            );
                        })}
                    </Container>
                </main>
            </>
        )

    }
}

export default Stories;