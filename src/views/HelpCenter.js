import React, { useEffect, useState } from "react";
import {
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
        CardSubtitle
} from "reactstrap";
import {
Container,
        Row,
        } from "reactstrap";
        class HelpCenter extends React.Component {
        state = {
        exampleModal: false
        };
                toggleModal = state => {
                this.setState({
                [state]: !this.state[state]
                });
                };
                render() {
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
                <h1>Холбогдох байгууллагууд</h1>
            </Row>
        </Container>
    </section>
    <div>
        <CardDeck>
            <Card onClick={() => this.toggleModal("exampleModal")}>
            <CardImg top width="50px" src="https://bit.ly/3tnQtVP" alt="Card image cap" />
            <CardBody>
                <CardTitle tag="h5">Байгууллага</CardTitle>
            </CardBody>
            </Card>
            <Card onClick={() => this.toggleModal("exampleModal")}>
            <CardImg top width="50px" src="https://bit.ly/3tnQtVP" alt="Card image cap" />
            <CardBody>
                <CardTitle tag="h5">Байгууллага</CardTitle>
            </CardBody>
            </Card><Card onClick={() => this.toggleModal("exampleModal")}>
            <CardImg top width="50px" src="https://bit.ly/3tnQtVP" alt="Card image cap" />
            <CardBody>
                <CardTitle tag="h5">Байгууллага</CardTitle>
            </CardBody>
            </Card>
        </CardDeck>
        {/* Modal */}
        <Modal
            className="modal-dialog-centered"
            isOpen={this.state.exampleModal}
            toggle={() => this.toggleModal("exampleModal")}
            >
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                    Байгууллага
                </h5>
                <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => this.toggleModal("exampleModal")}
                    >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <div className="modal-body">
                <p>Утас: 90909090</p>
                <p>Фэйсбүүк: Тест</p>
            </div>
        </Modal>
    </div>
</main>
</>
);
}
}

export default HelpCenter;