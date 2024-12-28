import { MdSend } from "react-icons/md";

import "./Expense.css";

const ExpenseForm = ({handleCharge, charge, handleAmount, amount, handleSubmit, edit}) =>{
        return(
            <form onSubmit={handleSubmit}>
                <div className="form-center">
                    <div className="form-group">
                        <label htmlFor="charge">지출항목</label>
                        <input type="text" 
                        className="form-controll" 
                        id="charge" 
                        name="charge"
                        value={charge}
                        placeholder="예)주유비"
                        onChange={handleCharge
                        }/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">비용</label>
                        <input type="number" 
                        className="form-control" 
                        id="amount" 
                        name="amount"
                        value={amount}
                        placeholder="ex)100"
                        onChange={handleAmount
                        }/>
                    </div>
                </div>
                <button type="submit" className="btn">
                    {edit?"수정":"제출"}<MdSend className="btn-icon"/>
                </button>
            </form>
    )
}

export default ExpenseForm