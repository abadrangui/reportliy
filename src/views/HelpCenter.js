import React, { useEffect, useState } from "react";
import {
    Col,
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Modal,
    CardImg,
    CardTitle,
    CardText,
    CardDeck,
    CardSubtitle,
    Container,
    Row,
} from "reactstrap";
import helpCorp from "./helpCorp";
import {

} from "reactstrap";

class HelpCenter extends React.Component {
    state = {
        exampleModal: false,
        corp: helpCorp,
        cardIndex: 0,
    };
    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };
    render() {
        const { corp, cardIndex } = this.state
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
                    <Container>
                        <Row>
                            {corp.length && corp.map((report, index) => {
                                return (
                                    <Col lg="4">
                                        <Card style={{ height: '18rem', margin: '1rem' }} onClick={() => this.setState({ exampleModal: true, cardIndex: index })} >
                                            <CardImg className="help-image"
                                                xtop width="50px"
                                                src={report.image}
                                                alt="corporateimage" />
                                            <CardBody>
                                                <CardTitle tag="h5" > {report.name} </CardTitle>
                                            </CardBody> </Card> </Col>
                                );
                            })}
                        </Row>
                        <div>
                            <Modal className="modal-dialog-centered"
                                isOpen={this.state.exampleModal}
                                toggle={
                                    () => this.setState({ exampleModal: !this.state.exampleModal })} >
                                <div className="modal-header" >
                                    <h5 className="modal-title"
                                        id="exampleModalLabel" > {corp[cardIndex].name} </h5> <
                                            button aria-label="Close"
                                            className="close"
                                            data-dismiss="modal"
                                            type="button"
                                            onClick={() => this.setState({ exampleModal: false })} >
                                        <span aria-hidden={true} > × </span>
                                    </button> </div>
                                <div className="modal-body">
                                    <img className="help-image" src={corp[cardIndex].image} />
                                    <p><b>Үйл ажиллагааны чиглэл: </b> {corp[cardIndex].action}</p>
                                    <p><b>Фэйсбүүк хаяг: </b> {corp[cardIndex].facebook}</p>
                                    <p><b>Байгууллагын утас: </b> {corp[cardIndex].phoneNumber}</p>
                                    <p><b>Зөвлөгөөний утас: </b> {corp[cardIndex].advNumber}</p>
                                    <p><b>Шуудан хаяг: </b> {corp[cardIndex].email}</p>
                                    <p><b>Вэбсайт: </b> {corp[cardIndex].website}</p>
                                </div>
                            </Modal>
                        </div>
                    </Container>
                </main>
            </>
        );
    }
}

export default HelpCenter;