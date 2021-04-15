import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Container,
  Row,
} from "reactstrap";

export default ({ ...props }) => {

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [])



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
              <h1>FAQ</h1>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );

}