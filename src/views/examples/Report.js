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
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';

// core components
import DemoNavbar from "components/Navbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import Uploader from 'components/Uploader.js';
import firebase, { firestore, auth } from '../../firebase';

const Login = ({ user, loading }) => {
  const [link, setLink] = useState('');
  const [reason, setReason] = useState('');
  const [photos, setPhotos] = useState([]);
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [checking, setChecking] = useState(false);
  const [title, setTitle] = useState('');
  const [fbid, setfbid] = useState('');
  const [checkErr, setCheckErr] = useState(false);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // this.refs.main.scrollTop = 0;
    firestore.collection('test').doc('123').get().then((doc) => {
      console.log("test ", doc.data())
    })
  }, [])

  const handleUploadPhoto = (link) => {
    setPhotos(photos => ([...photos, link]));
  }


  const loginFacebook = (e) => {
    e.preventDefault();
    firebase.auth().useDeviceLanguage();
    var provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithRedirect(provider)
  }

  const sendReportClick = e => {
    e.preventDefault();
    setSending(true);
    const newReport = firestore.collection('reports').doc();
    newReport.set({
      link: link,
      reason: reason,
      photos: photos,
      uid: user.uid,
    }).then(() => {
      setSuccess(true)
    })
  }

  const handleError = () => {
    setCheckErr(true);
    setChecking(false);
  }

  const setCheckAccount = ({ id, name }) => {
    setTitle(name);
    setfbid(id);
    setChecking('success');
  }

  const getFacebookAPIdata = ({ userId }) => {
    axios.get(`https://graph.facebook.com/v10.0/${userId}?fields=id,name,picture&access_token=${user.token}`).then(res => {
      console.log("data ", res)
      setCheckAccount({ id: res.data.id, name: res.data.name })
    }).catch(err => handleError())
  }

  const checkReport = e => {
    e.preventDefault();
    setCheckErr(false);
    setChecking('loading');

    const idStatus = link.search('profile.php')
    console.log("idStauts ", idStatus)

    if (idStatus === -1) {
      console.log("username tei account ", idStatus)
      axios.get(`https://api.scraperapi.com?api_key=b0f4180e29632eb95bade518ddcdbce6&url=${link}`).then(res => {

        const profilePos = res.data.search('fb://profile/')
        const sfbid = res.data.slice(profilePos + 13, profilePos + 28)
        console.log("scrapttin ", sfbid)
        getFacebookAPIdata({ userId: sfbid })
      }).catch(err => handleError())
    } else {
      const idSplit = link.split('=');
      const sfbid = idSplit[1];
      console.log('to api ', sfbid);
      getFacebookAPIdata({ userId: sfbid })
    }
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
                    {loading ? (<ClipLoader size={25} />) : (
                      <>
                        {success ? (<>
                          <div>Амжилттай илгээлээ.</div>
                        </>) : (
                          <Form role="form">
                            {
                              !user ? (
                                <button className="loginBtn loginBtn--facebook" onClick={loginFacebook}>
                                  Facebook-р нэвтрэх
                                </button>
                              ) : (
                                <div> hi, {user && user.displayName ? user.displayName : null}</div>
                              )
                            }

                            {success ? (<div>Амжилттай бүртгэж авлаа</div>) : null}
                            <FormGroup className="mb-1">
                              {console.log("ruser ", link)}
                              <div style={{ textAlign: 'right', fontSize: 11, }}>Яаж линк хуулах вэ?</div>
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-single-02" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  disabled={!user || success || checking === 'success'}
                                  placeholder="Фэйсбүүк линк"
                                  type="text"
                                  onChange={e => setLink(e.target.value)}
                                />
                                <InputGroupAddon addonType="append">
                                  <Button
                                    disabled={checking === 'loading' || checking === 'success'}
                                    color="success"
                                    onClick={checkReport}
                                  >
                                    {checking === 'loading' ? <ClipLoader size={25} /> : 'Шалгах'}
                                  </Button>
                                </InputGroupAddon>

                              </InputGroup>
                            </FormGroup><div className="mb-3">
                              {checking === 'success' ? <>
                                <span className="fb-account-detail">Нэр: {title} || </span>
                                <span className="fb-account-detail">Фэйсбүүк ID: {fbid}</span>
                              </> : null}
                              {checkErr ? <>
                                <span>Алдаа гарлаа та дахин оролдоод үзээрэй</span>
                              </> : null}
                            </div>
                            <FormGroup className="mb-3">
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-collection" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  disabled={!user || success}
                                  placeholder="Тайлбар"
                                  type="textarea"
                                  onChange={e => setReason(e.target.value)}
                                />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <span style={{ fontSize: 10 }}>Бэлэн болсон зураг: {photos.length}/10</span>
                              <Uploader handleUploadPhoto={handleUploadPhoto} />
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
                                disabled={sending}
                                color="primary"
                                type="button"
                                onClick={sendReportClick}
                              >
                                {sending ? <ClipLoader size={25} /> : 'Илгээх'}
                              </Button>
                            </div>
                          </Form>

                        )}
                      </>
                    )}
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
