import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Container,
  Row,
  Card,
  Col,
} from "reactstrap";
import Chip from '@material-ui/core/Chip';
import ClipLoader from "react-spinners/ClipLoader";

import { firestore } from "../firebase";

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

const category = [
  {
    id: 1,
    name: 'Мэдлэг мэдээлэл'
  },
  {
    id: 2,
    name: 'Эцэг эхчүүдэд'
  },
  {
    id: 3,
    name: 'Урьдчилсан сэргийлэх арга зам'
  },
  {
    id: 4,
    name: 'Сэтгэлзүйн эрүүл мэнд'
  },
]

function compare(a, b) {
  if (a.order < b.order) {
    return -1;
  } else {
    return 1;
  }
}

export default ({ ...props }) => {

  const [advices, setAdvices] = useState([]);
  const [checked, setChecked] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    firestore.collection('advices').onSnapshot(snapshot => {
      if (!snapshot.empty) {
        let array = [];
        snapshot.forEach(doc => {
          array.push({ ...doc.data(), id: doc.id })
        })
        setAdvices(array);
        setLoading(false);
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
                <Row
                  className="d-flex justify-content-center"
                  lg="4"
                >
                  <div className=" d-flex justify-content-center">
                    <h2>Зөвлөгөө</h2>
                  </div>
                </Row>
                <Row className="py-3 d-flex justify-content-center" lg="4">
                  {category.map((item, index) => {
                    return (
                      <Chip
                        key={index}
                        variant={checked === index ? 'default' : 'outlined'}
                        color="primary"
                        className="mr-2 mb-1"
                        label={item.name}
                        onClick={() => { console.log("index ", index); setChecked(index) }}
                      />
                    )
                  })}
                </Row>
                <div className=" py-1 border-top text-center">
                  <Row>
                    {loading && <ClipLoader />}
                    {advices.length && advices.filter(item => item.category === (checked + 1)).sort(compare).map((data, index) => {
                      return (
                        <>
                          <div className='dz-message-container'>
                            <div className={index % 2 === 1 ? 'mx-5 mb-1 text-left' : 'mx-5 mb-1 text-right'}><b>{data.title}</b></div>
                            <div className={`dz-message-box${index % 2 === 0 ? '-right' : ''}`}>
                              <div className={`dz-message-box-text-${index % 2 === 0 ? 'right' : 'left'}`}>
                                {data.text}
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
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