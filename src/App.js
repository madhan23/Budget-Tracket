import Header from "./component/Header";
import BudgetSection from "./component/BudgetSection";
import { Container } from "react-bootstrap";
import { useBudget } from "./context/BudgetContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TotalSection from "./component/TotalSection";
function App() {
  const { budget, getBudgetExpenses } = useBudget();
  return (
    <Container className='my-1'>
      <>
        <Header />
        {budget.length === 0 && (
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <img
              src={`${process.env.PUBLIC_URL}/content-img.jpg`}
              alt='landingImage'
              width={"100%"}
            />
          </div>
        )}

        <Row>
          <Col xs={12} md={7} lg={8} xl={8}>
            <div className='budgetContainer'>
              {budget.map((budget) => {
                return (
                  <BudgetSection
                    key={budget.id}
                    spendAmt={getBudgetExpenses(budget.id).reduce(
                      (a, b) => a + b.amount,
                      0
                    )}
                    budget={budget}
                    grey
                  />
                );
              })}
            </div>
          </Col>
          <Col xs={12} md={5} lg={4} xl={4}>
            <div className='mt-2'>
              {budget.length !== 0 && <TotalSection />}
            </div>
          </Col>
        </Row>
      </>
    </Container>
  );
}

export default App;
