import React, { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Preview from "../../components/Preview/Preview";
import api from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllStores,
  getCurrentStore,
} from "../../redux/actions/stores.actions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function MarketPlace() {
  const dispatch = useDispatch();
  const { allStores } = useSelector((state) => state.stores);
  let openStores = [];

  if (allStores) {
    openStores = allStores.filter((store) => store.Products.length > 0);
  }

  useEffect(() => {
    api
      .landingStores()
      .then((allStores) => {
        dispatch(getAllStores(allStores.data));
        dispatch(getCurrentStore({}));
      })
      .catch((err) => console.log(err));
  }, []);

  if (!allStores) {
    return <h1>Loading...</h1>;
  }

  const styles = {
    div: {
      display: "flex",
      justifyContent: "center",
      lineHeight: "1"
    },

    h1: {
      // textDecoration: "underline",
      // textDecorationColor: "black"
      borderBottom: "1.5px solid",
      display: "inline-block",
      lineHeight: "0.85",
    },
  };
  return (
    <>
      <Header />
      <Container fluid style={{maxWidth: "75vw"}}>
        <div style={styles.div}>
          <h1 style={styles.h1}>Store Front Marketplace</h1>
        </div>
        <Row className="justify-content-md-center">
          {openStores.map((store) => (
            <Col>
              <Preview
                type="store"
                image={store.Products[0].image}
                name={store.store_name}
                key={store.id}
                storeId={store.id}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default MarketPlace;
