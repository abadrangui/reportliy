import React, { useEffect, useState } from "react";

// reactstrap components
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
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import Uploader from 'components/Uploader.js';
import firebase, { firestore, auth } from '../../firebase';

const Login = () => {

  const [user, setUser] = useState({})

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // this.refs.main.scrollTop = 0;
    firestore.collection('test').doc('123').get().then((doc) => {
      console.log("test ", doc.data())
    })
  }, [])

  const handleAuthResult = (result) => {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;

    const data = {
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      uid: user.uid,
      token: token
    }

    window.localStorage.setItem('@user', JSON.stringify(data));
    setUser(data);

    console.log("user ", user, token);
  }

  const loginFacebook = () => {
    firebase.auth().useDeviceLanguage();
    var provider = new firebase.auth.FacebookAuthProvider();

    // provider.addScope('public_profile', 'email');
    console.log("")
    auth.signInWithPopup(provider).then((result) => {
      console.log("resutl ", result)
    }).catch(err => { console.log("err ", err) })
  }

  return (
    <>
      <DemoNavbar />
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
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white">
                    <div className="text-muted text-center mb-3">
                      <h2>Report нэмэх</h2>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form role="form">
                      <button className="loginBtn loginBtn--facebook" onClick={loginFacebook}>
                        Facebook-р нэвтрэх
                      </button>


                      <FormGroup className="mb-3">
                        <div style={{ textAlign: 'right', fontSize: 11, }}>Яаж линк хуулах вэ?</div>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Фэйсбүүк линк" type="text" />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-collection" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Тайлбар" type="textarea" />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <Uploader />
                      </FormGroup>
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id=" customCheckLogin"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor=" customCheckLogin"
                        >
                          <span>Өөрийн холбогдох мэдээллээ үлдээх</span>
                        </label>
                      </div>
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="primary"
                          type="button"
                        >
                          Илгээх
                          </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
                <Row className="mt-3">
                  <Col xs="6">
                    <a
                      className="text-light"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <small>Бид хэн бэ?</small>
                    </a>
                  </Col>
                  <Col className="text-right" xs="6">
                    <a
                      className="text-light"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <small>Ямар арга хэмжээ авах вэ?</small>
                    </a>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );

}

export default Login;
