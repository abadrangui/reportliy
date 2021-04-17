import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Container,
  Row,
  Card,
  Col,
  CardBody,
} from "reactstrap";
import badrangui from "assets/img/badrangui.jpg";
import ganbayar from "assets/img/ganbayar.jpg";
import mendee from "assets/img/mendee.jpg";
import tuul from "assets/img/tuul.jpg";
import tuwshuu from "assets/img/tuwshuu.jpg";

const teamData = [
  {
    name: 'Х.Мэнд-Амар',
    position: 'Багийн ахлагч, судалгааны мэргэжилтэн',
    company: 'Голомт банк СБО албаны мэргэжилтэн',
    image: mendee,
  },
  {
    name: 'У.Ганбаяр',
    position: 'Зөвлөх',
    company: 'Лантуу Дохио ТББ-н тэргүүн',
    image: ganbayar,
  },
  {
    name: 'Tultora',
    position: 'Програм хангамжын хөгжүүлэгч',
    company: 'Скайтел ХХК, Програм хөгжүүлэлтийн хэлтэс',
    image: tuul,
  },
  {
    name: 'А.Түвшинтөр',
    position: 'UI Designer, Content Creator',
    company: 'Gulugun Muujgai',
    image: tuwshuu,
  },
  {
    name: 'А.Бадрангуй',
    position: 'Програм хангамжын хөгжүүлэгч',
    company: 'Мобиком ХХК, Систем хөгжүүлэлтийн хэлтэс',
    image: badrangui,
  },
]

export default ({ ...props }) => {

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
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
                <Row className="d-flex justify-content-center" >
                  <div className="card-profile-stats d-flex justify-content-center align-items-center">
                    <h2 className="text-center">Бидний тухай</h2>
                  </div>
                </Row>
                <Row className="d-flex justify-content-center border-top  py-3" lg="4">
                  <h3>"Гоё Хүнүүс" үгийн утга</h3>
                  {/* <p>Хамтдаа байхдаа биесээ ямар нэг шүүмжлэлгүйгээр хүлээн авч, жаргалтай дурсамжаа хуваалцдаг найзууд энэ вебийн эхлэлийг тавьсан. "Хүмүүс" гэдэг нийгмийн хэвшмэл ойлголт нь бусдын биднээс шаарддаг хүрч болшгүй хүлээлтээр дүүрэн баригдмал үзэл шиг санагддаг. Хэний ч түүх 3 сая хүний амьдралын дунджаар тодорхойлогдохгүй шүү дээ. Хүн бүр өөрийн дахин давтагдашгүй зам мөрийг гарган, өөр өөрийн өнгөөр гэрэлтэж амьдрал сүлэлддэг. Тиймээс өөрийнхөөрөө ХҮН байгаад хамтдаа хоршихын бэлгэдэн болгон ГОЁ ХҮНҮҮС нэрийг өгсөн ба бие биеэ бүрэн хүлээн зөвшөөрч хамтдаа урагшилцгаая гэсэн утгатай. </p> */}
                  <p className="mx-2 px-2">"Хүмүүс" гэдэг хэвшмэл ойлголт нь бусдын биднээс шаарддаг хүрч болшгүй хүлээлт шиг санагддаг. Хэний ч түүх 3 сая хүний амьдралын дунджаар тодорхойлогдохгүй. Тиймээс өөрийнхөөрөө ХҮН байгаад хамтдаа хоршихын бэлгэдэл болсон ГОЁ ХҮНҮҮС нэр нь бие биеэ бүрэн хүлээн зөвшөөрч хамтдаа урагшилцгаая гэсэн утгатай. </p>
                </Row>
                <div className="pt-5 border-top text-center">
                  <h3 className="mb-5">Гишүүдийн танилцуулга</h3>
                  <Row>
                    {teamData.map((item, index) => {
                      return (
                        <Col lg={{ size: 4, offset: index === 3 ? 2 : 0 }} className="mb-5" >
                          <Card>
                            <CardBody>
                              <div className="card-profile-image">
                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                  <img
                                    alt="..."
                                    className="rounded-circle"
                                    src={item.image}
                                  />
                                </a>
                              </div>
                              <div style={{ paddingTop: 100 }}>
                                <div className="text-center mt-5">
                                  <h3>
                                    {item.name}
                                  </h3>
                                  <div className="h6 font-weight-300">
                                    {item.position}
                                  </div>
                                  <div className="h6 mt-4">
                                    {item.company}
                                  </div>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      )
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