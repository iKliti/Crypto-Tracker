import logo from "./logo.svg";
import "./App.css";
import {
  Card,
  Label,
  CardBody,
  Input,
  Table,
  CustomInput,
  Row,
  Col,
  Button,
  CardHeader,
  ModalBody,
  Modal,
} from "reactstrap";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useSelector, useDispatch} from 'react-redux'
import { getCrypto } from "./Redux/Actions/crypto.actions";
import Select from "react-select";

function App() {

  const dispatch = useDispatch()
  const reduxStoreCrypto=useSelector((state)=>(state.CryptoReducer))
  const [userdata, setUserdata]=useState(localStorage.getItem('userdata') ? JSON.parse(localStorage.getItem('userdata')):[])



 
  
  //#region

  const [boolButton, setBoolButton] = useState(false);
  const [boolControlCrypto, setBoolControlCrypto] = useState(false);
  const [id, setId] = useState("");
  const [newCryptoValue, setNewCryptoValue] = useState("");
  const [options, setOptions]=useState([])


  //#endregion

  function GetData(){
    dispatch(getCrypto())
    console.log(reduxStoreCrypto)
    
  }

  useEffect(
    (e) => {
      console.log(reduxStoreCrypto)
      setOptions(reduxStoreCrypto?.data?.data?.data?.map((item)=>{
        return ({
          label:item.slug,
          value:item.metrics.market_data.price_usd,
          data:item
    
        })
      }))
    },
    [reduxStoreCrypto]
  );

  
function  DeleteCrypto(value){
  var tmp = userdata.filter(item => item.label !== value.label)
  setUserdata(tmp)
  localStorage.setItem('userdata', JSON.stringify(tmp))
}

  //#region dummy data
  //Data for cryptos
  const [cryptocoins, setCryptoCoins] = useState([
    {
      id: "1",
      name: "Bitcoin",
      shortcut: "BTC",
      value: "$7,1234",
      valuechange: 1.82,
    },
    {
      id: "2",
      name: "Etherum",
      shortcut: "ETH",
      value: "$1,1234",
      valuechange: -9.4,
    },
    {
      id: "3",
      name: "XRP",
      shortcut: "XRP",
      value: "$3",
      valuechange: 40,
    },
  ]);

  //#endregion
  return (
    <>
      <div>
      <Row>
        <Col className="text-right">
<Label onClick={()=>{
  localStorage.removeItem('userdata')
  setUserdata([])
}} style={{cursor:'pointer', textDecoration:'underline', backgroundColor:'#4281f5', color:'white' }}> Clear User</Label>
        </Col>
      </Row>
        <Row>
          <Col className="text-center p-5">
            <Card>
              <CardHeader style={{ backgroundColor: "#4281f5" }}>
                <Label style={{ fontSize: "20px" }} className="m-3">
                  CryptoTracker Pro
                </Label>
              </CardHeader>
              <CardBody>
                <Table>
                  { userdata?.map((e) => {
                    console.log(e)
                    return (
                      <>
                        <tr>
                          <td>
                            <Label size="lg">{e.label}</Label>
                            <br />
                            <Label style={{ color: "gray" }} size="sm">
                           { e.data.symbol}
                            </Label>
                          </td>
                          <td className="text-right">
                          
                            <Label
                              size="sm"
                              style={{
                                color: "green",
                              }}
                            >
                          
                            {'$'}  {e.data.metrics.market_data.price_usd}{" "}
                            </Label>
                          </td>
                          <td style={{width:'1%'}}>
<Label style={{color:'grey', cursor:"pointer"}} onClick={()=>{
  DeleteCrypto(e)
}} >x</Label>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                  <tr>
                  
                    <td colSpan={3} className="text-center">
                      <Button
                        color="primary"
                        onClick={() => {
                          console.log('kliti')
                          setBoolButton(!boolButton);
                         GetData()
                        }}
                      >
                       <Label style={{color:'black'}}> + Add a cryptocurrency</Label>
                      </Button>
                    </td>
                    
                  </tr>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        isOpen={boolButton}
        toggle={() => {
          setBoolButton(!boolButton);
        }}
      >
        <ModalBody>
          <Row>
            <Col>
              <Label>Add cryptocurrency:</Label>
              <br />
              <Select options={options} onChange={(c)=>{
                //kontroll qe vlerat te jene unike
                const result = userdata.find( ({ label }) => label === c.label );
                setBoolControlCrypto(false)
                if(result?.label){
                 setBoolControlCrypto(true)
                }
                else{
                  var tmp=userdata;
                  tmp.push(c)
                  setUserdata(tmp)
                
                localStorage.setItem('userdata', JSON.stringify(tmp))
                setBoolButton(false)
                }
            
              }} />
              <br />
              <Button style={{backgroundColor:"#4281f5"}}>ADD</Button>
            </Col>
          </Row>
          <Row>
          {
            boolControlCrypto ? (
              <Label style={{color:'red'}}> Crypto already exists in your list!</Label>
            ):""
          }
           
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
}

export default App;
