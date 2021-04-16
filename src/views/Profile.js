import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

// reactstrap components
import {
  Container,
  Row,
  Card,
  Col,
  Button,
  Collapse,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { firestore } from '../firebase';
import Image from 'rc-image';

export default ({ ...props }) => {

  const { fbid } = useParams();
  const [reports, setReports] = useState([]);
  const [collapsed, setCollapsed] = useState(0)

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    firestore.collection('reports').where("fbid", "==", fbid).get().then(snapshot => {
      if (!snapshot.empty) {
        let array = []
        snapshot.forEach(doc => {
          array.push({ ...doc.data(), id: doc.id })
        })
        setReports(array);
      }
    })


  }, [])



  return (
    <>
      <main className="profile-page">
        <section className="section-profile-cover section-shaped my-0">
          {/* Circles background */}
          <div className="shape shape-style-1 shape-default alpha-4">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-white"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </section>
        <section className="section">
          <Container>
            <Card className="card-profile shadow mt-profile">
              <div className="px-4">
                <Row className="justify-content-space-between">
                  <Col
                    className="order-lg-3 text-lg-right align-self-lg-center"
                    lg="4"
                  >
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">{reports.length}</span>
                        <span className="description">РЕПОРТ</span>
                      </div>
                      {/* <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div> */}
                    </div>
                  </Col>
                  <Col className="order-lg-1 py-3" lg="4">
                    <div className="">
                      Нэр: {reports.length && reports[0].name}
                    </div>
                    <div>
                      Фэйсбүүк нэр: {reports.length && reports[0].fbid}
                    </div>
                  </Col>
                </Row>
                <div className=" py-5 border-top text-center">
                  <Row className="">
                    <Col lg="12">
                      <ListGroup>
                        {reports.length && reports.map((data, index) => {
                          return (
                            <ListGroupItem className="report-item11" tag="a" href="#" action onClick={() => {
                              if (collapsed === index) {
                                setCollapsed(-1);
                              } else {
                                setCollapsed(index)
                              }
                            }}>
                              <div className="display-flex w-100 flex-direction-row justify-content-space-between" >
                                <div>
                                  <div className="text-left" >{data.reason}</div>
                                  {collapsed === index ? null : (<div className="text-left text-muted size-12" >{data.photos.length} зураг</div>)}
                                </div>
                                <div className="text-muted" >{new Date().toDateString()}</div>
                              </div>
                              <Collapse isOpen={collapsed === index} >
                                <div className="mt-3">
                                  {data.photos.length && data.photos.map((img) => {
                                    return (
                                      <Image
                                        className="report-img"
                                        src={img}
                                        placeholder={<div className="report-img-placeholder" />}
                                        onClick={() => { console.log("muahsadjfais") }}
                                      />
                                    )
                                  })}
                                </div>
                              </Collapse>
                            </ListGroupItem>
                          )
                        })}
                      </ListGroup>
                    </Col>

                  </Row>
                  <Row>
                    <Col lg="9">
                      <p>
                        An artist of considerable range, Ryan — the name taken
                        by Melbourne-raised, Brooklyn-based Nick Murphy —
                        writes, performs and records all of his own music,
                        giving it a warm, intimate feel with a solid groove
                        structure. An artist of considerable range.
                  </p>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        Show more
                  </a>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card>
          </Container>
        </section>
      </main>

    </>
  );

}