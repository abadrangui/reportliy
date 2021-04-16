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
  Col,
  Label,
} from "reactstrap";
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Collapse } from 'react-collapse';

import { FaSearch } from "react-icons/fa";

// core components
import Uploader from 'components/Uploader.js';
import firebase, { firestore, auth } from '../firebase';
import questionData from "./moreQuestions";
const qanswers = Object.assign({}, questionData)

const Login = ({ user, loading, handleLogOut }) => {
  const [link, setLink] = useState('');
  const [reason, setReason] = useState('');
  const [photos, setPhotos] = useState([]);
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [checking, setChecking] = useState(false);
  const [title, setTitle] = useState('');
  const [fbid, setfbid] = useState('');
  const [checkErr, setCheckErr] = useState(false);
  const [timer, setTimer] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [answers, setAnswers] = useState(qanswers);
  const [searchValue, setSearchValue] = useState('');

  const history = useHistory();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // this.refs.main.scrollTop = 0;
    // firestore.collection('test').doc('123').get().then((doc) => {
    //   console.log("test ", doc.data())
    // })
    const overtime = setTimeout(() => {
      setTimer(true);
    }, 5000);

    return () => {
      clearTimeout(overtime);
    }
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
    if (checking !== 'success') {
      window.alert("Фэйсбүүкийн линк буруу");
      return
    }
    if (/^ *$/.test(reason)) {
      window.alert("Та коммент бичээгүй байна.")
      return
    }
    if (photos.length === 0) {
      window.alert("Зураг оруулна уу?");
      return
    }
    setSending(true);
    const newReport = firestore.collection('reports').doc();
    newReport.set({
      link: link,
      reason: reason,
      photos: photos,
      uid: user.uid,
      name: title,
      fbid: fbid,
      moreQ: collapsed,
      answers: collapsed ? { answers } : null
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
      // console.log("data ", res)
      setCheckAccount({ id: res.data.id, name: res.data.name })
    }).catch(err => handleError())
  }

  const checkReport = e => {
    e.preventDefault();
    setCheckErr(false);
    setChecking('loading');

    const idStatus = link.search('profile.php')
    // console.log("idStauts ", idStatus)

    if (idStatus === -1) {
      // console.log("username tei account ", idStatus)
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

  const answerClick = ({ qindex, index, value }) => {
    setAnswers(answers => ({ ...answers, [qindex]: { ...answers[qindex], [`answer${index}`]: value } }))
  }

  const searchReport = () => {

  }

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
          <Container className="">
            <Row className="justify-content-center">
              <Col lg="6" className="" style={{ display: 'flex' }}>

                <div className='w-100 my-5 py-5'>

                  <h4 className="text-white mb-3">Та хэн нэгэнд итгэхгүй байна уу? <br /> Тэгвэл хайгаад үз.</h4>

                  <div className="mb-2">
                    <FormGroup check inline>
                      <Label check>
                        <Input type="checkbox" checked={true} /> <span className="text-white">Facebook</span>
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label check>
                        <Input disabled type="checkbox" /> <span className="text-white">Instagram <span className="text-muted" style={{ fontSize: 10 }}>(soon)</span></span>
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label check>
                        <Input disabled type="checkbox" /> <span className="text-white">Twitter <span className="text-muted" style={{ fontSize: 10 }}>(soon)</span></span>
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label check>
                        <Input disabled type="checkbox" /> <span className="text-white">Tik Tok <span className="text-muted" style={{ fontSize: 10 }}>(soon)</span></span>
                      </Label>
                    </FormGroup>

                  </div>

                  <FormGroup className=" mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FaSearch />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        // disabled={!user || success}
                        placeholder="Фэйсбүүк линк"
                        type="text"
                        onChange={e => setSearchValue(e.target.value)}
                      />
                      <InputGroupAddon addonType="append">
                        <Button
                          // disabled={checking === 'loading' || checking === 'success'}
                          color="primary"
                          onClick={searchReport}
                        >
                          Хайх
                        {/* {checking === 'loading' ? <ClipLoader size={18} /> : 'Шалгах'} */}
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </div>
              </Col>
              <Col lg="6">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white">
                    <div className="text-muted text-center mb-3">
                      <h2>Report нэмэх</h2>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5" style={{ display: 'flex', justifyContent: 'center' }}>
                    {loading ? (<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <ClipLoader size={25} />
                      <br />
                      {timer && <h6 style={{ textAlign: 'center' }}>
                        Хэрвээ удаан уншаад байвал та Chrome, Safari хөтөч дээр орно уу?
                      </h6>
                      }
                    </div>) : (
                      <>
                        {success ? (<>
                          <div>Амжилттай илгээлээ.</div>
                        </>) : (
                          <Form role="form">
                            {
                              !user ? (
                                <>
                                  <h6>Эхлээд нэвтрээрэй</h6>
                                  <button className="loginBtn loginBtn--facebook" onClick={loginFacebook}>
                                    Facebook-р нэвтрэх
                                  </button>
                                </>
                              ) : (
                                <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                                  <span>Hi, {user && user.displayName ? user.displayName : null}</span>
                                  <a href='#' onClick={e => { e.preventDefault(); handleLogOut() }} className="text-light" ><u>Гарах</u></a>
                                </div>
                              )
                            }
                            <FormGroup className="mb-1">
                              {user && checking !== 'success' ? (<div>
                                <h6 style={{ fontSize: 12, }}>
                                  Одоо репорлох хүнийхээ профайл линкийг хуулаад шалгаад үзээрэй!
                                </h6>
                              </div>) : null}
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
                                    {checking === 'loading' ? <ClipLoader size={18} /> : 'Шалгах'}
                                  </Button>
                                </InputGroupAddon>

                              </InputGroup>
                            </FormGroup><div className="mb-3">
                              {checking === 'success' ? <>
                                <span className="fb-account-detail">Нэр: {title} || </span>
                                <span className="fb-account-detail">Фэйсбүүк ID: {fbid}</span> <br />
                                <span>Профайлыг амжилттай холболоо. Тайлбар болон зургаа хавсаргаад илгээгээрэй.</span>
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
                            {user && <FormGroup>
                              <span style={{ fontSize: 10 }}>Бэлэн болсон зураг: {photos.length}/10</span>
                              <Uploader handleUploadPhoto={handleUploadPhoto} />
                            </FormGroup>}
                            <div className="custom-control custom-control-alternative custom-checkbox mb-3">
                              <input
                                className="custom-control-input"
                                id=" customCheckLogin"
                                type="checkbox"
                                onClick={e => setCollapsed(e.target.checked)}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor=" customCheckLogin"
                              >
                                <span>Дэлгэрэнгүй</span>
                              </label>
                            </div>
                            {/* Collapsible */}
                            <Collapse isOpened={collapsed} >
                              {questionData.map((data, qindex) => {
                                return (
                                  <>
                                    <div>{data.question}</div>

                                    {data.choices.map((choice, index) => {
                                      return (
                                        <div className="custom-control custom-control-alternative custom-checkbox mb-1 ml-5">
                                          <input
                                            className="custom-control-input"
                                            checked={answers[qindex][`answer${index}`]}
                                            id={`answer-${qindex}-${index}`}
                                            type="checkbox"
                                            onClick={e => { answerClick({ qindex, index, value: e.target.checked }) }}
                                          />
                                          <label
                                            className="custom-control-label"
                                            htmlFor={`answer-${qindex}-${index}`}
                                          >
                                            <span>{choice.text}</span>
                                          </label>
                                        </div>
                                      )
                                    })}

                                  </>
                                )
                              })}

                            </Collapse>
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
                      onClick={e => { e.preventDefault(); history.push('aboutus') }}
                    >
                      <small>Бид хэн бэ?</small>
                    </a>
                  </Col>
                  <Col className="text-right" xs="6">
                    <a
                      className="text-light"
                      href="#"
                      onClick={e => { e.preventDefault(); history.push('faq') }}
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
    </>
  );

}

export default Login;
