  // Component
  import { useState } from "react";
  import "./App.css";
  import ExpenseForm from "./components/ExpenseForm";
  import ExpenseList from "./components/ExpenseList";
  import Alert from "./components/Alert";
    /* props() : 컴포넌트 간의 데이터 전달 */
    /* properties 
    
    */
  const App = () => {
    /*
    constructor(props){
      super(props);
      this.state = {
        expense : [
          {id:1, charge: "연회비", amount:1600},
          {id:2, charge: "교통비", amount:400},
          {id:3, charge: "식비", amount:1200}
        ]
      }
    }
    */
    //항목
    const [charge, setCharge] = useState("");
    //비용
    const [amount, setAmount] = useState(0);
    //지출 리스트
    const [expense, setExpense] = useState([]) 
    //알림
    const [alert, setAlert] = useState({show:false});
    //수정할 항목
    const [id,setId] = useState('');
    //수정 상태
    const [edit, setEdit] = useState(false);

    const handleCharge = (e) => {
      setCharge(e.target.value);
      console.log(e.target.value);
    }
    const handleAmount = (e) => {
      setAmount(e.target.valueAsNumber);
      console.log(e.target.valueAsNumber);
    }
    const handleDelete = (id) => {
      //console.log(id);
      const newExpense = expense.filter(expense => expense.id != id)
      console.log(newExpense);
      setExpense(newExpense);
      handleAlert({type:"delete",text:"항목을 삭제했습니다."})
      //this.setState({expense:newExpense});
      /* React State : 리액트에서 데이터가 변할 때 화면을 다시 랜더링 */
    }
      const handleSubmit = (e) => {
        e.preventDefault();
        if(charge !== "" && amount >= 0){
          if(edit){
          //수정
            const newExpensea = expense.map(item => {
              return item.id === id ? {...item,charge,amount} : item
            })
            setExpense(newExpensea);
            setEdit(false);
            setAmount(0);
            setCharge("");
            handleAlert({type:"success", text:"수정이 완료되었습니다."})
          }else{
          //추가
            const newExpense = {id:crypto.randomUUID(),charge,amount};
            const newExpenses = [...expense,newExpense]
            setExpense(newExpenses);
            setCharge("");
            setAmount(0);
            handleAlert({type:"success", text:"예산 입력완료."})
          }
        }else{
          console.log("error");
          handleAlert({type:"danger",text:"메시지를 입력해주세요."})
        }
      }
    const handleAlert = ({type,text}) => {
      setAlert({show:true,type:type,text:text})
      setTimeout(()=>{
        setAlert({show:false});
      },5000);
    }

    const handleEdit = (id) =>{
      const exp = expense.find(item => item.id === id);
      console.log(exp);
      setId(id);
      setCharge(exp.charge);
      setAmount(exp.amount);
      setEdit(true);
    }
    
    const clearItem = () =>{
      setExpense([]);
    }

      return(
        <div className="main-container">
          {alert.show ? <Alert type={alert.type} text={alert.text}/>:null}
          <h1>예산계산기</h1>
          <div style={{width:'100%',backgroundColor:'white',padding:'1rem'}}>
            {/*입력폼*/}
            <ExpenseForm 
            handleCharge={handleCharge} 
            charge = {charge}
            handleAmount={handleAmount}
            amount = {amount}
            handleSubmit={handleSubmit}
            edit={edit}
            />
          </div>
          <div style={{width:'100%',backgroundColor:'white',padding:'1rem'}}>
            {/*리스트*/}
            <ExpenseList 
                      initialExpense={expense} 
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                      clearItem={clearItem}
            />
          </div>
          <div style={{display:'flex',justifyContent:'end',marginTop:'1rem'}}>
          <p style={{fontSize:"1.25rem"}}>
            총지출<span>
              {/* .reduce() 배열의 각 요소에 대해 주어진
              reducer 함수를 입력하고 하나의 결과값을 반환 
              acc: 누산기 , cur: 현재값 , idx: 현재 입력값 , src: 원본 배열
              */}
              {expense.reduce((acc,cur) => {
                return (acc += cur.amount);
              },0)}
              원</span>
          </p>

          </div>
        </div>
    )
  }
  export default App;